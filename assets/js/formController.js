// formController.js

// Controls item selection, form submission, and deletion logic for the sidebar form
// This module is responsible for managing user CRUD interactions with the API-bound data form

import {
  form,
  aside,
  statusBanner,
  deleteBtn
} from './refs.js';

import { AUTHOR, API_ROOT } from './config.js';
import { load, items } from './api.js';

export let activeItem = null; // Tracks the item currently being edited or viewed

// Handles selecting an item from the UL list and displaying its data in the sidebar form
export function handleSelectItem(e) {
  const radio = e.target.closest("li")?.querySelector("input[type='radio']");
  if (!radio || !radio.checked) return;

  const li = radio.closest("li");
  const listItems = Array.from(form.closest("app-container").querySelectorAll("ul li"));
  const index = listItems.indexOf(li);
  if (index === -1 || !items[index]) return;

  const item = items[index];

  const fieldset = form.querySelector("fieldset");
  const legend = fieldset.querySelector("legend");
  legend.textContent = item.itemName || item["item-name"] || "Details";

  // Fill <item-*> fields
  const editableFields = fieldset.querySelectorAll("[name]");
  editableFields.forEach(el => {
    const name = el.getAttribute("name");
    if (!name) return;
    const key = name.replace(/^item-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const value = item[key];
    if (value !== undefined) {
      el.textContent = value;
      el.setAttribute("value", value);
    } else {
      el.textContent = "";
      el.removeAttribute("value");
    }
  });

  activeItem = item;
  // aside visibility is handled by CSS via :has() logic
}

function getFieldValue(name) {
  const field = form.querySelector(`[name='${name}']`);
  return field ? field.textContent.trim() : "";
}

// Handles form submission for creating or updating an item
export async function handleFormSubmit(e, currentEndpoint) {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const now = new Date().toISOString();

  const data = {
    itemName: getFieldValue("item-name"),
    itemType: getFieldValue("item-type"),
    itemAuthor: getFieldValue("item-created-by") || AUTHOR,
    itemModified: AUTHOR,
    itemCreated: getFieldValue("item-created-at") || now,
    itemUpdated: now,
    scopeName: getFieldValue("item-scope-name"),
    ipStart: getFieldValue("item-ip-start"),
    ipEnd: getFieldValue("item-ip-end"),
    subnetMask: getFieldValue("item-subnet-mask"),
    leaseTime: getFieldValue("item-lease-time"),
    macAddress: getFieldValue("item-mac-address"),
    reservedIp: getFieldValue("item-reserved-ip"),
    clientName: getFieldValue("item-client-name"),
    optionCode: getFieldValue("item-option-code"),
    optionName: getFieldValue("item-option-name"),
    optionType: getFieldValue("item-option-type"),
    optionValue: getFieldValue("item-option-value")
  };

  try {
    if (activeItem && activeItem.id) {
      await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(`${API_ROOT}/${currentEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    activeItem = null;
    form.reset();
    await load(`${API_ROOT}/${currentEndpoint}`);

  } catch (err) {
    console.error("Submit failed:", err);
    statusBanner.hidden = false;
    statusBanner.textContent = "Failed to save data. Try again later.";
  }
}

// Handles deletion of the currently selected item
export async function handleDeleteItem(currentEndpoint) {
  if (!activeItem?.id) return;
  try {
    await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, {
      method: "DELETE"
    });

    activeItem = null;
    form.reset();
    await load(`${API_ROOT}/${currentEndpoint}`);
  } catch (err) {
    console.error("Delete failed:", err);
    statusBanner.hidden = false;
    statusBanner.textContent = "Failed to delete item. Please try again later.";
  }
}
