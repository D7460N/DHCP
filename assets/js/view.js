// view.js

// Handles rendering of dynamic content into the DOM based on API data
import { ul, h1, p, statusBanner } from "./refs.js" // Refs to key DOM nodes
import { setContent, populateItemElements } from "./utils.js"; // Utility to safely assign textContent
import { items, meta } from "./api.js" // Array of items and metadata fetched from the API

// Select the universal <template> from the DOM
// This single template includes all possible <item-*> tags used across tabs
const template = document.querySelector("template")

export function render(currentEndpoint) {
  // Clear previous content to avoid duplicates or stale rows
  ul.innerHTML = ""

  // Iterate over each item in the dataset and populate rows from the template
  items.forEach((item) => {
    // Clone the template content (deep copy of <li> structure)
    const clone = template.content.cloneNode(true)

    // Loop through each key in the item object to match against tag names
    populateItemElements(clone, item);

    // Removed aria-label usage — we use index-based matching via radio input selection
    ul.appendChild(clone)
  })

  // Set heading and intro paragraph based on fetched metadata
  setContent(h1, meta.title)
  setContent(p, meta.intro)

  // Hide the status banner if data is available, show otherwise
  statusBanner.hidden = items.length > 0
}
