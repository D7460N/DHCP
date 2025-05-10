// view.js

// Handles rendering of dynamic content into the DOM based on API data
import { ul, h1, p, statusBanner } from './refs.js'; // Refs to key DOM nodes
import { setContent } from './utils.js'; // Utility to safely assign textContent
import { items, meta } from './api.js'; // Array of items and metadata fetched from the API

// Select the universal <template> from the DOM
// This single template includes all possible <item-*> tags used across tabs
const template = document.querySelector("template");

export function render(currentEndpoint) {
  // Clear previous content to avoid duplicates or stale rows
  ul.innerHTML = "";

  // Debug: confirm number of items to render
  // console.log("Rendering items:", items);

  // Iterate over each item in the dataset and populate rows from the template
  items.forEach(item => {
    // console.log("Rendering item:", item);

    // Clone the template content (deep copy of <li> structure)
    const clone = template.content.cloneNode(true);

    // Loop through each key in the item object to match against tag names
    for (const key in item) {
      // Convert camelCase keys to kebab-case (e.g., itemUpdated → item-updated)
      const tagBase = key.startsWith("item") ? key.slice(4) : key;
      const tag = tagBase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      // Attempt to find the corresponding custom element inside the clone
      const el = clone.querySelector(`item-${tag}`);
      // console.log(`Looking for: item-${tag}`, el);

      // If the element exists, assign its text content from the item value
      if (el) {
        const value = item[key];
        el.textContent = Array.isArray(value)
          ? value.join(", ")
          : typeof value === "boolean"
            ? (value ? "Yes" : "No")
            : value;
      }
    }

    // Append the filled-out <li> row to the <ul> container
    ul.appendChild(clone);
  });

  // Set heading and intro paragraph based on fetched metadata
  setContent(h1, meta.title);
  setContent(p, meta.intro);

  // Hide the status banner if data is available, show otherwise
  statusBanner.hidden = items.length > 0;
}
