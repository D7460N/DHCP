// formController.js

// Controls item selection, form submission, and deletion logic for the sidebar form
// This module is responsible for managing user CRUD interactions with the API-bound data form

import {
  inputName, inputType, inputAuthor, inputModified,
  inputCreated, inputUpdated, form, aside, statusBanner
} from './refs.js';

import { AUTHOR, API_ROOT } from './config.js';
import { load, items } from './api.js';

export let activeItem = null; // Tracks the item currently being edited or viewed

// Handles selecting an item from the UL list and displaying its data in the sidebar form
export function handleSelectItem(e) {
  const li = e.target.closest("li"); // Find the closest <li> ancestor of the click target
  if (!li) return;
  const id = li.getAttribute("aria-label"); // Extract the identifier from the <li>
  const item = items.find(i => (i.id || `item-${items.indexOf(i)}`) === id); // Find the item by ID or fallback
  if (!item) return;

  // Populate the form fields with values from the selected item
  inputName.value = item.itemName || item["item-name"] || "";
  inputType.value = item.itemType || item["item-type"] || "";
  inputAuthor.value = item.itemAuthor || item["item-author"] || "";
  inputModified.value = item.itemModified || item["item-modified"] || "";
  inputCreated.value = item.itemCreated || item["item-created"] || "";
  inputUpdated.value = item.itemUpdated || item["item-updated"] || "";

  activeItem = item; // Store the selected item in global state
  aside.hidden = false; // Reveal the sidebar form for editing
}

// Handles form submission for creating or updating an item
export async function handleFormSubmit(e, currentEndpoint) {
  e.preventDefault(); // Prevent default form submission behavior
  if (!form.reportValidity()) return; // Stop if form fields are invalid

  const now = new Date().toISOString(); // Generate current timestamp

  // Construct a new item payload from form values
  const data = {
    itemName: inputName.value.trim(),
    itemType: inputType.value.trim(),
    itemAuthor: inputAuthor.value || AUTHOR,
    itemModified: AUTHOR,
    itemCreated: inputCreated.value || now,
    itemUpdated: now
  };

  try {
    if (activeItem && activeItem.id) {
      // If editing an existing item, send a PUT request to update
      await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      // If creating a new item, send a POST request to add
      await fetch(`${API_ROOT}/${currentEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    // After save, reset form and reload data
    activeItem = null;
    form.reset();
    aside.hidden = true;
    await load(`${API_ROOT}/${currentEndpoint}`);

  } catch (err) {
    // If the save fails, display an error
    console.error("Submit failed:", err);
    statusBanner.hidden = false;
    statusBanner.textContent = "Failed to save data. Try again later.";
  }
}

// Handles deletion of the currently selected item
export async function handleDeleteItem(currentEndpoint) {
  if (!activeItem?.id) return; // Exit if no item is currently selected
  try {
    // Perform delete request to remove the item from the backend
    await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, {
      method: "DELETE"
    });

    // Clear the form and reload updated list
    activeItem = null;
    form.reset();
    aside.hidden = true;
    await load(`${API_ROOT}/${currentEndpoint}`);
  } catch (err) {
    // If deletion fails, notify the user
    console.error("Delete failed:", err);
    statusBanner.hidden = false;
    statusBanner.textContent = "Failed to delete item. Please try again later.";
  }
}
