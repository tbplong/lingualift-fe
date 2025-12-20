import DOMPurify from "dompurify";
import { marked } from "marked";

marked.use({
  pedantic: false,
  gfm: true,
});

const h1ClassName =
  "font-bold text-[20px] md:text-[24px] 2xl:text-[28px] block w-full text-center mt-4 mb-2";
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  // Header 1
  if (node.tagName === "H1") {
    const currentClass = node.getAttribute("class");
    if (!currentClass) {
      node.setAttribute("class", h1ClassName);
    } else if (currentClass.includes(h1ClassName)) return;
  }

  // Image
  if (node.tagName === "IMG") {
    const currentClass = node.getAttribute("class") || "";
    if (currentClass.includes("rounded-lg")) return;
    node.setAttribute("class", currentClass + " rounded-lg");
  }

  // Replace
  if (node?.tagName === "OL" || node?.tagName === "LI") {
    const newNode = document.createElement("p");
    while (node.firstChild) {
      newNode.appendChild(node.firstChild);
    }
    node?.parentNode?.replaceChild(newNode, node);
  }
});
// NHAT: will be used for inline inputs feature
// const regex = /(\{\{\w+\}\})/g;

export function useProcessTextToHTML(
  markdownText: string | undefined | null,
): string[] {
  // Trim: VERY IMPORTANT! Otherwise, it will not parse correctly
  // e.g. <space><space><img /> => <pre><code>&lt;img /&gt;</code></pre>
  // e.g. <img /> => <img />

  if (!markdownText) return [""];
  const html = marked.parse(markdownText.trim(), { async: false });
  const sanitized = DOMPurify.sanitize(html, {
    FORBID_TAGS: ["code"],
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitized, "text/html");

  // Split the doc into html children
  const parts = Array.from(doc.body.children).map((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      return child.textContent || "";
    }
    return child.outerHTML || "";
  });

  return parts;
}
