// render.js

// Handles rendering of UI elements based on current application state
// Updates headings, content blocks, and list items as needed

import { ul, h1, p, extraParagraphs, summaryDiv } from './refs.js';
import { setContent } from './utils.js';
import { items } from './api.js';

export function render() {
  // Render each list item <li> by assigning it a label and optional ID
  const lis = Array.from(ul.children);
  lis.forEach((li, i) => {
    const span = li.querySelector("span");
    const item = items[i];
    if (item && span) {
      span.textContent = item.itemName || item["item-name"] || "Unnamed";
      li.setAttribute("aria-label", item.id || `item-${i}`);
    } else {
      span.textContent = "";
      li.removeAttribute("aria-label");
    }
  });

  // Extract metadata from the first item in the array
  const meta = items[0] || {};

  // Assign top-level heading and intro paragraph
  setContent(h1, meta.h1 || meta.title);
  setContent(p, meta.p1 || meta.intro);

  // Assign additional paragraphs conditionally if present
  setContent(extraParagraphs[0], meta.p2);
  setContent(extraParagraphs[1], meta.p3);
  setContent(extraParagraphs[2], meta.p4);

  // Assign footer summary text
  setContent(summaryDiv, meta.div1);

  // No JS visibility toggles — CSS handles visibility via :empty/:has
}
