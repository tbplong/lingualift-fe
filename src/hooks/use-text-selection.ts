import { useEffect, useRef } from "react";
import { useDebounceCallback } from "usehooks-ts";

type SelectionHandler = (
  selection: Selection,
  coords: { x: number; y: number },
) => void;

export function useTextSelection(
  onSelectionChange?: SelectionHandler,
  debounceTime = 300,
) {
  const handleSelectionChangeDebounced = useDebounceCallback(
    (selection: Selection | null, coords?: { x: number; y: number }) => {
      if (!selection || selection.isCollapsed || !onSelectionChange) return;
      onSelectionChange(selection, coords ?? { x: 0, y: 0 });
    },
    debounceTime,
  );

  const handleSelectionChangeDebouncedRef = useRef(
    handleSelectionChangeDebounced,
  );
  const currentSelectionRef = useRef<Selection | null>(null);

  useEffect(() => {
    handleSelectionChangeDebouncedRef.current = handleSelectionChangeDebounced;
  }, [handleSelectionChangeDebounced]);

  useEffect(() => {
    const debouncedHandler = handleSelectionChangeDebouncedRef.current;
    let isSelecting = false;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      currentSelectionRef.current = selection;
      if (!isSelecting && selection && !selection.isCollapsed) {
        debouncedHandler(selection);
      }
    };

    const handleMouseDown = () => {
      isSelecting = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      isSelecting = false;
      if (
        currentSelectionRef.current &&
        !currentSelectionRef.current.isCollapsed
      ) {
        debouncedHandler(currentSelectionRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleTouchStart = () => {
      isSelecting = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      isSelecting = false;
      if (
        currentSelectionRef.current &&
        !currentSelectionRef.current.isCollapsed
      ) {
        const touch = e.changedTouches[0];
        debouncedHandler(currentSelectionRef.current, {
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    };

    const handlePointerDown = () => {
      isSelecting = true;
    };
    const handlePointerUp = (e: PointerEvent) => {
      isSelecting = false;
      if (
        currentSelectionRef.current &&
        !currentSelectionRef.current.isCollapsed
      ) {
        debouncedHandler(currentSelectionRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", (e: MouseEvent) => handleMouseUp(e));
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      debouncedHandler.cancel();
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
}
