// utils.js

// Safely sets text content of an element
export function setContent(el, value) {
  if (el) el.textContent = value || "";
}

// Formats a raw ISO timestamp into a human-readable string
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

// Clears the value of each input element passed to it
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

// Populates custom <item-*> elements with data from item object
export function populateItemElements(container, item) {
  for (const key in item) {
    const tagBase = key.startsWith("item") ? key.slice(4) : key;
    const tag = tagBase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const el = container.querySelector(`item-${tag}`);
    if (el) el.textContent = Array.isArray(item[key])
      ? item[key].join(", ")
      : typeof item[key] === "boolean"
      ? item[key] ? "Yes" : "No"
      : item[key];
  }
}

// Extracts values from custom <item-*> elements into a plain object
export function extractItemValues(container) {
  const data = {};
  container.querySelectorAll("[name]").forEach(el => {
    const name = el.getAttribute("name");
    if (!name) return;
    const key = name.replace(/^item-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    data[key] = el.textContent.trim();
  });
  return data;
}
