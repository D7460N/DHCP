// helpers.js

// A collection of utility functions used across the application.
// These functions support rendering, formatting, and interaction behaviors.

// Safely sets text content of an element
// If no element is passed or the value is empty, the textContent is cleared
export function setContent(el, value) {
  if (el) el.textContent = value || "";
}

// Formats a raw ISO timestamp into a human-readable string
// Example: 2024-05-01T12:00:00Z => "5/1/2024 12:00:00 PM"
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

// Clears the value of each input element passed to it
// Accepts any number of input elements
export function clearFields(...fields) {
  fields.forEach(field => {
    if (field) field.value = "";
  });
}

// Creates a DOM element of a given tag and optionally sets its text content
export function createElement(tag, text) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  return el;
}
