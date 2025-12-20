import { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { TextSelection } from "@/lib/highlight/types";
import { applyHighlights } from "@/lib/highlight/utils";
import {
  deleteTextSelection,
  getTextSelectionsByLiveSession,
  saveTextSelection,
} from "@/utils/db";

interface UseHighlightProps {
  processedText: string[];
  currentPage: number;
  sessionId: string;
}

export function useHighlight({
  processedText,
  currentPage,
  sessionId,
}: UseHighlightProps) {
  const processedTextRef = useRef(processedText);
  useEffect(() => {
    processedTextRef.current = processedText;
  }, [processedText]);
  const [highlighted, setHighlighted] = useState<TextSelection[]>([]);
  const [pendingSelections, setPendingSelections] = useState<
    Omit<TextSelection, "id">[] | null
  >(null);
  const [actionCoords, setActionCoords] = useState<{ x: number; y: number }>();
  const [openAction, setOpenAction] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });

  useEffect(() => {
    getTextSelectionsByLiveSession(sessionId)
      .then((selections) => setHighlighted(selections))
      .catch((err) => console.error("Failed load selections", err));
  }, [sessionId]);

  const highlightedHTML = useMemo(() => {
    return processedText.map((part, idx) => {
      if (!part.startsWith("<p") && !part.startsWith("<strong")) return part;
      const raw = part?.replace(/^<p[^>]*>/, "")?.replace(/<\/p>$/, "");
      const sel = highlighted.filter(
        (s) => s.paragraphIdx === idx && s.currentPage === currentPage,
      );
      const inner = sel.length ? applyHighlights(raw, sel) : raw;
      return `<p data-pindex="${idx}">${inner}</p>`;
    });
  }, [processedText, highlighted, currentPage]);

  const addHighlight = useCallback(async () => {
    if (!pendingSelections?.length) return;
    try {
      const saved: TextSelection[] = [];
      for (const sel of pendingSelections) {
        const id = await saveTextSelection({ ...sel, currentPage, sessionId });
        saved.push({ ...sel, id, currentPage, sessionId });
      }
      setHighlighted((prev) => [...prev, ...saved]);
    } catch (err) {
      console.error("save selection fail", err);
    } finally {
      setPendingSelections(null);
      setOpenAction({ show: false, id: null });
      window.getSelection()?.removeAllRanges();
    }
  }, [pendingSelections, currentPage, sessionId]);

  const removeHighlight = useCallback(
    async (id: string) => {
      try {
        await deleteTextSelection(id);
        const numericId = typeof id === "string" ? Number(id) : id;
        const target = highlighted.find((n) => n.id === numericId);
        const groupId = target?.groupId;
        setHighlighted((prev) =>
          groupId
            ? prev.filter((highlight) => highlight.groupId !== groupId)
            : prev.filter((highlight) => highlight.id !== numericId),
        );
      } catch (e) {
        console.error("delete highlight fail", e);
      } finally {
        setOpenAction({ show: false, id: null });
      }
    },
    [highlighted],
  );

  const onUserSelect = useCallback(
    (selection: Selection, coords: { x: number; y: number }) => {
      if (!selection || selection.isCollapsed) return;
      const range = selection.getRangeAt(0);
      const {
        startContainer,
        endContainer,
        startOffset: localStart,
        endOffset: localEnd,
      } = range;

      const paragraphOf = (node: Node): HTMLParagraphElement | null =>
        (node.nodeType === 3
          ? (node.parentElement as HTMLElement)
          : (node as HTMLElement)
        ).closest("p");

      const getPIndex = (n: Node) =>
        Number(
          (n.nodeType === Node.ELEMENT_NODE
            ? (n as Element)
            : n.parentElement
          )?.closest("p")?.dataset.pindex ?? -1,
        );

      const offsetAbs = (p: HTMLParagraphElement, node: Node, off: number) => {
        const full = p.textContent ?? "";
        const lead = full.match(/^\s*/)?.[0].length ?? 0;
        const r = document.createRange();
        r.setStart(p, 0);
        r.setEnd(node, off);
        return Math.max(0, r.toString().length - lead);
      };

      const startP = paragraphOf(startContainer);
      const endP = paragraphOf(endContainer);
      if (!startP || !endP) return;

      const startIdx = getPIndex(startContainer);
      const endIdx = getPIndex(endContainer);
      if (startIdx === -1 || endIdx === -1) return;

      const selections: Omit<TextSelection, "id">[] = [];
      const groupId = `${performance.now()}-${sessionId}`;

      for (
        let idx = Math.min(startIdx, endIdx);
        idx <= Math.max(startIdx, endIdx);
        idx++
      ) {
        const raw = processedTextRef.current[idx]
          ?.replace(/^<p[^>]*>/, "")
          ?.replace(/<\/p>$/, "")
          ?.replace(/<strong[^>]*>/, "")
          ?.replace(/<\/strong>/, "")
          ?.replace(/<em[^>]*>/, "")
          ?.replace(/<\/em>/, "")
          ?.replace(/<i[^>]*>/, "")
          ?.replace(/<\/i>/, "")
          ?.trim();
        let startOffset = 0;
        let endOffset = raw.length;
        if (idx === startIdx)
          startOffset = offsetAbs(startP, startContainer, localStart);
        if (idx === endIdx) endOffset = offsetAbs(endP, endContainer, localEnd);
        selections.push({
          startOffset,
          endOffset,
          selectedText: raw.slice(startOffset, endOffset),
          paragraphIdx: idx,
          groupId: groupId,
          currentPage,
          sessionId,
        });
      }
      setPendingSelections(selections);
      setActionCoords(coords);
      setOpenAction({ show: true, id: null });
    },
    [currentPage, sessionId],
  );

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const idAttr = target.getAttribute("id");
      const cls = target.getAttribute("class");
      if (idAttr?.startsWith("fessior-") && cls?.includes("highlighted")) {
        const uid = idAttr.replace("fessior-", "");
        setActionCoords({ x: e.clientX, y: e.clientY });
        setOpenAction({ show: true, id: uid });
      }
    };
    document
      .getElementById("session-page")
      ?.addEventListener("click", listener);
    return () =>
      document
        .getElementById("session-page")
        ?.removeEventListener("click", listener);
  }, []);

  return {
    highlightedHTML,
    openAction,
    setOpenAction,
    coords: actionCoords,
    addHighlight,
    removeHighlight,
    onUserSelect,
  };
}
