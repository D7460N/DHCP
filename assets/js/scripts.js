// MARK: SCRIPTS.JS

import { OPTIONS, BANNER_ENDPOINT, ENDPOINTS, CONFIRM_FLAGS, DHCP_TYPES } from './config.js';
import { fetchJSON, postJSON, putJSON, deleteJSON } from './fetch.js';
import { denormalizeRecord } from './schema.js';
import { loadNavItems, loadPageContent, getFieldRules } from './loaders.js';
import {
	createListItem,
	toTagName,
	toCamel,
	setRowSelectHandler,
	injectFormFields,
	injectRowValues,
	injectRowField,
} from './inject.js';
import {
	formatDateForInput,
	snapshotForm as captureSnapshot,
	hasUnsavedChanges as detectChanges,
} from './utils.js';

// Shared fetch utilities provided by fetch.js

// Define references to frequently accessed DOM elements for efficient reuse throughout the script
const headerUl = document.querySelector('main article ul[aria-hidden="true"]');
const tableUl = document.querySelector('main article ul[aria-hidden="true"] + ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('fieldset');
const mainEl = document.querySelector('main');
const newItem = document.querySelector('main article [aria-label*="new item"]');
const closeItem = document.querySelector('aside [aria-label="Close"]');
const deleteItem = form.querySelector('[aria-label="Delete"]');
const resetItem = form.querySelector('[aria-label="Reset"]');
const submitItem = form.querySelector('[aria-label="Save"]');
const savedMessage = submitItem.nextElementSibling;
const navInputs = document.querySelectorAll('nav input[name="nav"]');

// Load navigation endpoints from API and dynamically populate navigation controls

// String & Format Utilities
// function toTagName(str) {
//   let dashed = str
//     .replace(/([a-z])([A-Z])/g, "$1-$2")
//     .replace(/_/g, "-")
//     .toLowerCase()

//   if (!dashed.includes("-")) {
//     dashed = `${dashed}-`
//   }

//   return dashed
// }

// Format date strings for input elements handled by utils.js
// Load data from a specific API endpoint and populate the UI elements accordingly

// DOM Manipulation Utilities
function removeInlineStyles(element) {
	// Removes any inline styles directly applied to the given HTML element.
	if (element && element instanceof HTMLElement) {
		element.removeAttribute('style');
	}
}

// Clears all inner content of the provided fieldset element.
function clearFieldset(fieldsetElement) {
	// Checks if provided element is a valid HTML fieldset before clearing.
	if (fieldsetElement && fieldsetElement instanceof HTMLElement) {
		fieldsetElement.innerHTML = '';
	}
}

// Validation Utilities
function isValid() {
	// Returns true if the entire form is currently valid based on HTML validation attributes.
	return form.checkValidity();
}

// Detects if there are any unsaved changes compared to the original form data snapshot.
function hasUnsavedChanges() {
	return detectChanges(fieldset.querySelectorAll('input[name], select[name]'), originalData);
}
// MARK: BANNER
async function loadBannerContent() {
	try {
		// Retrieve banner data using the shared fetchJSON utility
		const bannerText = await fetchJSON(BANNER_ENDPOINT);
		const [first] = JSON.parse(bannerText);

		// Trim the banner string (if it exists), or prepare a fallback if empty
		const message = first?.banner?.trim();
		const fallback = message || 'ℹ️ No banner message configured.';

		// Locate all <p> elements that are direct children of <app-banner>
		// Replace their textContent with the banner message or fallback
		document.querySelectorAll('app-banner > p').forEach(p => {
			p.textContent = fallback;

			// No need for data-error or classes; visual feedback is handled via structural CSS (e.g., :empty, :has())
		});
	} catch (err) {
		// Determine error message based on the type of failure
		const msg = err.message.startsWith('STATUS')
			? `⚠️ Server responded with code ${err.message.slice(7)}` // Slice removes 'STATUS ' prefix
			: `⚠️ Network error: Could not load banner`; // Generic fallback if fetch or JSON parsing failed

		// For each <app-banner><p>, display the error message inline
		// Again: no class, no attributes, only structural content
		document.querySelectorAll('app-banner > p').forEach(p => {
			p.textContent = msg;
		});
	}
}

if (OPTIONS.showBanner) loadBannerContent();

// Form State Utilities
// MARK: TRACK FROM ORIGINAL STATE

// Object to store the original values of form fields, used to detect unsaved changes
let originalData = {};

// Reference to the currently selected list item (used for restoring form data visually to the list)
let snapshotLi = null;

// Capture the current state of form fields into `originalData`
// This function is called to take a snapshot after loading data or resetting changes
function snapshotForm() {
	originalData = captureSnapshot(fieldset.querySelectorAll('input[name], select[name]'));
	snapshotLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
	toggleResetItem();
	toggleSubmitItem();
}

// Restore form fields to previously captured state stored in `originalData`
// This function is typically triggered by a form reset action
function restoreForm() {
	if (!originalData || !Object.keys(originalData).length) return;

	injectFormFields(originalData);
	if (snapshotLi) injectRowValues(snapshotLi, originalData);
}

// Toggle the disabled state of the Reset button based on form changes
function toggleResetItem() {
	// Guard clause: ensure the reset button exists before proceeding
	if (!resetItem) return;

	// Determine if the form currently has unsaved changes
	const dirty = hasUnsavedChanges();

	// Disable the reset button if no changes; enable it otherwise
	resetItem.disabled = !dirty;

	// Update the form element's data attribute to reflect if the form has unsaved changes (useful for CSS state indicators)
	form.dataset.dirty = dirty ? 'true' : 'false';

	const status = form.querySelector('output');
	if (!status) return;

	if (!dirty) {
		status.textContent = 'Nothing to save or reset.';
		status.hidden = false;
	} else if (!form.checkValidity()) {
		status.textContent = 'Please complete required fields.';
		status.hidden = false;
	} else {
		status.hidden = true;
	}
}

// Toggle the disabled state of the Submit button based on form validity and changes
function toggleSubmitItem() {
	// Guard clause: ensure the submit button exists before proceeding
	if (!submitItem) return;

	// Determine if the form has unsaved changes
	const dirty = hasUnsavedChanges();

	// Check if the form fields currently meet validation requirements (e.g., required fields filled, patterns matched)
	const valid = form.checkValidity();

	// Disable the submit button unless the form both has unsaved changes and passes validation
	submitItem.disabled = !(dirty && valid);

	const status = form.querySelector('output');
	if (!status) return;

	if (!dirty) {
		status.textContent = 'ℹ️ Nothing to save or reset.';
		status.hidden = false;
	} else if (!form.checkValidity()) {
		status.textContent = '⚠️ Please complete required fields.';
		status.hidden = false;
	} else {
		status.hidden = true;
	}
}

// Confirmation logic utility: guards critical actions based on dirty state
function unsavedCheck(flagRef, condition, proceed) {
	if (!flagRef.value && condition()) {
		flagRef.value = true;
		return;
	}
	flagRef.value = false;
	proceed();
}

// Initialize custom HTML elements dynamically based on provided keys
function initCustomEls(keys) {
	// Iterate over each key to dynamically create custom elements, ensuring browser recognition
	keys.forEach(key => {
		// Convert each key to a kebab-case format appropriate for custom HTML elements
		const tag = toTagName(key);

		// Only attempt to define the custom element if it is a valid HTML custom element (must contain at least one dash)
		if (tag.includes('-')) {
			// Dynamically create the custom element to inform the browser it exists, aiding in proper rendering and styling
			document.createElement(tag);
		}
	});
}

// Update the form fields based on the currently selected table row
function updateFormFromSelectedRow() {
	// Clear the existing content in the form fieldset to prepare for new input fields
	fieldset.innerHTML = '';

	// Find the currently selected table row by locating the checked input within the list
	const selectedRow = document
		.querySelector('ul li input[name="list-item"]:checked')
		?.closest('li');

	// If no row is selected, reset the form state and exit the function
	if (!selectedRow) {
		removeInlineStyles(mainEl); // Remove any inline styles applied to the main element
		snapshotForm(); // Capture the current empty form state as baseline
		form.oninput(); // Trigger form state updates (buttons disabled, etc.)
		return; // Early exit as there is no selected row to process
	}

	// Populate the form fields dynamically based on the content of the selected row
	selectedRow.querySelectorAll('label > *:not(input)').forEach(source => {
		// Convert the source element's tag name into a JavaScript-friendly camelCase key
		const key = toCamel(source.tagName.toLowerCase());

		// Retrieve the current text content value from the selected row's element
		const value = source.textContent;

		// Create a new form label element for the current field
		const label = document.createElement('label');

		// Set the label's text, making it user-friendly and readable (e.g., "First Name:")
		label.textContent =
			toTagName(key)
				.replace(/^item-/, '') // Remove 'item-' prefix if present
				.replace(/-/g, ' ') // Replace dashes with spaces
				.replace(/\b\w/g, c => c.toUpperCase()) + ': '; // Capitalize first letters

		// Generate the appropriate input element (e.g., text input, select dropdown) based on the key and value
		const input = createInputFromKey(key, value);

		// Append the generated input element to its corresponding label
		label.appendChild(input);

		// Append the fully assembled label-input pair to the form's fieldset
		fieldset.appendChild(label);
	});

	// After updating fields, capture the current state of the form to track unsaved changes
	snapshotForm();

	// Update the reset button's enabled/disabled state based on the form's current state
	toggleResetItem();
}

setRowSelectHandler(updateFormFromSelectedRow);

// MARK: List & Row Utilities
// Handles the event when a row's toggle checkbox is clicked, ensuring only one row is active at a time
function handleRowToggle(event) {
	// Identify the checkbox element that triggered this event
	const checkbox = event.target;

	// Find the nearest list item element (<li>) containing the clicked checkbox
	const li = checkbox.closest('li');

	// Find the corresponding radio button within the same list item (used for selection)
	const radio = li.querySelector('input[type="radio"][name="list-item"]');

	// If the clicked checkbox is now checked, uncheck all other checkboxes to ensure single-row selection
	if (checkbox.checked) {
		tableUl.querySelectorAll('input[name="row-toggle"]').forEach(cb => {
			if (cb !== checkbox) cb.checked = false;
		});
	}

	// Sync the radio button checked state with the checkbox (selected/unselected state consistency)
	radio.checked = checkbox.checked;

	// Dispatch an input event from the radio button to trigger form updates (like loading form fields)
	radio.dispatchEvent(new Event('input', { bubbles: true }));
}

// Creates and returns a new list item element (<li>) representing a row populated with provided data
// function createListItem(item = {}) {
// 	// Create a new list item (<li>) element to represent a single row in the list/table
// 	const li = document.createElement('li');

// 	// Create a hidden checkbox input element for toggling selection state of the row

// 	// Make the list item focusable via keyboard for improved accessibility
// 	li.tabIndex = 0;

// 	// Create a label element to group inputs and data fields clearly
// 	const label = document.createElement('label');

// 	// Create a hidden checkbox input element for toggling selection state of the row
// 	const toggle = document.createElement('input');
// 	toggle.type = 'checkbox';
// 	toggle.name = 'row-toggle';
// 	toggle.hidden = true; // Keep hidden; can be styled or controlled via other UI triggers
// 	toggle.oninput = handleRowToggle; // Attach event handler for row toggling
// 	label.appendChild(toggle); // Append the checkbox to the label

// 	// Create a hidden radio input element to facilitate exclusive row selection and form updates
// 	const input = document.createElement('input');
// 	input.type = 'radio';
// 	input.name = 'list-item';
// 	input.hidden = true; // Hidden as UI interaction is handled through other visible elements
// 	input.oninput = () => updateFormFromSelectedRow(); // Load form fields when selected
// 	label.appendChild(input); // Append the radio button to the label

// 	// Populate the row dynamically with elements created from the item's key-value pairs
// 	for (const [key, value] of Object.entries(item)) {
// 		// Convert key into a valid custom element (kebab-case tag name)
// 		const el = document.createElement(toTagName(key));

// 		// Set the content of this custom element to the corresponding item value
// 		el.textContent = value ?? ''; // Default to empty string if value is null or undefined

// 		// Append the populated element to the label for visual representation of the data
// 		label.appendChild(el);
// 	}

// 	// Append the fully constructed label to the list item (<li>) element
// 	li.appendChild(label);

// 	// Return the fully assembled list item ready to be appended to the table/list UI
// 	return li;
// }

// Updates the header row elements based on the structure and content of a given source row
function updateHeaderRow(sourceRow) {
	// Locate the existing header list item (<li>) in the DOM
	const headerLi = headerUl?.querySelector('li');

	// Safety check: Ensure both header element and source row are present before proceeding
	if (!headerLi || !sourceRow) return;

	// Clear out any existing content from the header list item to prepare for fresh header content reusing list cleanup pattern from load()
	headerLi.innerHTML = '';

	// Loop through each child element of the provided source row (excluding input elements)
	sourceRow.querySelectorAll('label > *:not(input)').forEach(el => {
		// Convert the element's tag name to camelCase format to standardize key naming
		const key = toCamel(el.tagName.toLowerCase());

		// Create a shallow clone of the current element without child nodes, to maintain original element structure
		const clone = el.cloneNode(false);

		// Generate user-friendly, readable text for the header by formatting the element's tag name
		clone.textContent = toTagName(key)
			.replace(/^item-/, '') // Remove 'item-' prefix if present
			.replace(/-/g, ' ') // Replace dashes with spaces for readability
			.replace(/\b\w/g, c => c.toUpperCase()); // Capitalize the first letter of each word

		// Append the formatted clone as a header column to the header list item
		headerLi.appendChild(clone);
	});
}

// Function to update ("mirror") input changes directly to the selected row's visual representation
function mirrorToSelectedRow(event) {
	// Identify the input element that triggered the event
	const input = event.target;

	// Extract the key from the input's "name" attribute for finding the corresponding UI element
	const key = input.name;

	// Find the currently selected row (<li>) based on the checked radio input
	const selectedLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');

	// Guard clause: exit early if no row is currently selected
	if (!selectedLi) return;

	// Find the corresponding element within the selected row using kebab-case conversion of the input name
	if (!input.readOnly) {
		injectRowField(selectedLi, key, input.value);
	}
}

// Dynamically creates and returns a form input element tailored to the given key-value pair
function createInputFromKey(key, value) {
	// Use the provided key directly as the name attribute for the form element
	const inputName = key;

	// Safely trim the input value if possible; default to empty string if undefined or null
	const val = value?.trim?.() ?? '';

	const rule = getFieldRules()?.[key];
	if (rule?.type === 'select') {
		const select = document.createElement('select');
		select.name = key;
		select.required = true;

		const optBlank = document.createElement('option');
		optBlank.value = '';
		optBlank.textContent = 'Select...';
		select.appendChild(optBlank);

		for (const opt of rule.options ?? []) {
			const o = document.createElement('option');
			o.value = o.textContent = opt;
			if (opt === value) o.selected = true;
			select.appendChild(o);
		}

		select.oninput = mirrorToSelectedRow;
		return select;
	}

	if (rule?.type === 'toggle') {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = key;
		checkbox.checked = value === 'true' || value === true;
		checkbox.oninput = mirrorToSelectedRow;
		return checkbox;
	}

	if (rule?.type === 'textarea') {
		const textarea = document.createElement('textarea');
		textarea.name = key;
		textarea.value = value ?? '';
		textarea.required = !!value;
		textarea.oninput = mirrorToSelectedRow;
		return textarea;
	}

	if (rule?.type === 'datetime') {
		const input = document.createElement('input');
		input.type = 'datetime-local';
		input.name = key;
		input.value = formatDateForInput(value);
		input.readOnly = true;
		input.tabIndex = -1;
		input.oninput = mirrorToSelectedRow;
		return input;
	}

	// Variable to hold the dynamically created form element
	let element;

	// Convert the value to lowercase to handle case-insensitive comparisons for certain input types
	const lowercaseVal = val.toLowerCase();

	// Define specific DHCP-related types that should be represented as a select/dropdown
	const dhcpTypes = DHCP_TYPES;

	// If the provided value matches one of the DHCP types, create a dropdown select element
	if (dhcpTypes.includes(lowercaseVal)) {
		// Create a new select dropdown element
		element = document.createElement('select');
		element.name = inputName; // Set the input name attribute
		element.required = true; // Make the dropdown selection required

		// Add an empty default option prompting the user to make a selection
		const emptyOpt = document.createElement('option');
		emptyOpt.value = '';
		emptyOpt.textContent = 'Select Type';
		element.appendChild(emptyOpt);

		// Populate the select element with options corresponding to DHCP types
		dhcpTypes.forEach(opt => {
			const o = document.createElement('option');
			o.value = o.textContent = opt.charAt(0).toUpperCase() + opt.slice(1); // Capitalize first letter for readability

			// Set the current option as selected if it matches the original value
			if (opt === lowercaseVal) o.selected = true;

			// Append the option to the select element
			element.appendChild(o);
		});
	} else {
		// If not a DHCP type, create a standard input element (usually a text input)
		element = document.createElement('input');
		element.name = inputName; // Assign the input name attribute
		element.value = val; // Set the input's initial value

		// Special handling: If the key is 'id' or the value matches a UUID pattern, hide the input
		// if (key === 'id' || /^[a-f0-9\-]{36}$/.test(val)) {
		// 	element.type = 'hidden';
		// 	element.oninput = mirrorToSelectedRow; // Ensure hidden value syncs with UI
		// 	return element; // Immediately return hidden element as no further processing needed
		// }

		// Special handling: If the key is 'id' or the value matches a UUID pattern, disable editing
		if (key === 'id' || /^[a-f0-9\-]{36}$/.test(val)) {
			element.type = 'text';
			element.readOnly = true;
			element.tabIndex = -1;
			element.ariaDisabled = 'true'; // optional
			element.oninput = mirrorToSelectedRow;
		}

		// If value matches an ISO date format, use a datetime-local input and set it as read-only
		if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(val)) {
			element.type = 'datetime-local';
			element.readOnly = true; // Prevent editing of autogenerated timestamp
			element.tabIndex = -1; // Remove from keyboard navigation
			element.value = formatDateForInput(val); // Format ISO date appropriately for input display

			// If key indicates metadata fields, make input read-only and exclude from tab navigation
		} else if (/author|modified|created|updated/.test(key)) {
			element.type = 'text';
			element.readOnly = true; // User cannot edit these system-generated fields
			element.tabIndex = -1; // Exclude from keyboard navigation for better UX

			// For all other standard text inputs, ensure field is required if a value was previously present
		} else {
			element.type = 'text';
			element.required = val !== ''; // Set as required if a previous non-empty value existed
			element.pattern = '.+'; // Enforce at least one character entered by user
		}
	}

	// Attach event listener to sync input changes visually with the corresponding selected row
	element.oninput = mirrorToSelectedRow; // Enable live mirroring

	// Return the fully configured form input element
	return element;
}

// Event listener triggered whenever any input within the form changes
form.oninput = () => {
	// Immediately update the enabled or disabled state of the reset button,
	// depending on whether there are unsaved changes in the form
	toggleResetItem();

	// Update the enabled or disabled state of the submit button,
	// based on both the presence of unsaved changes and form validity
	toggleSubmitItem();
};

// MARK: MAIN APPLICATION LOGIC

// MARK: INITIAL TAB FETCH
export function setupNavHandlers() {
	document.querySelectorAll('nav input[name="nav"]').forEach(input => {
		input.onchange = () => {
			if (!input.checked) return;
			const proceed = () => {
				const endpoint = input.value;
				if (!endpoint) return;
				loadPageContent(endpoint).then(() => {
					snapshotForm();
					toggleResetItem();
				});
			};
			unsavedCheck(CONFIRM_FLAGS.save, hasUnsavedChanges, proceed);
		};
	});
}

// MARK: NEW ROW CREATION
// Event handler triggered when the "New" button is clicked to create a new form entry
newItem.onclick = async () => {
	// First, check if there are unsaved form changes
	unsavedCheck(CONFIRM_FLAGS.save, hasUnsavedChanges, () => {
		// Clear the form's current input fields to prepare for creating a new entry
		fieldset.innerHTML = '';

		// Attempt to retrieve keys from the first existing table row (to maintain field consistency)
		const existingLi = tableUl.querySelector('li');

		// Declare a variable to store field keys to be used for new entry creation
		let keys;

		if (existingLi) {
			// Extract keys from the existing table row's child elements (excluding input elements)
			keys = Array.from(existingLi.querySelectorAll('label > *:not(input)')).map(el =>
				toCamel(el.tagName.toLowerCase()),
			);
		} else {
			// 🚩 Provide a minimal default schema if no existing rows are present
			keys = ['id', 'name', 'description', 'created', 'updated'];
		}

		// Initialize an empty item object to represent the new entry
		const item = {};

		// Iterate over each key to dynamically create form fields
		keys.forEach(key => {
			// Initialize each item's field with an empty string value
			item[key] = '';

			// Create a label element for the current form field
			const formLabel = document.createElement('label');

			// Set the label's text content to be human-readable, derived from the field's key
			formLabel.textContent =
				toTagName(key)
					.replace(/^item-/, '') // Remove 'item-' prefix, if present
					.replace(/-/g, ' ') // Replace hyphens with spaces for readability
					.replace(/\b\w/g, c => c.toUpperCase()) + ': '; // Capitalize each word

			// Generate an input element appropriate for the current key (with empty initial value)
			const input = createInputFromKey(key, '');

			// Append the generated input field to its corresponding label
			formLabel.appendChild(input);

			// Append the complete label-input combination to the form's fieldset
			fieldset.appendChild(formLabel);
		});

		// Create a new list item (<li>) element for the new entry using the previously prepared data fields
		const li = createListItem(item);

		// Insert the newly created list item at the very beginning (top) of the table UI
		tableUl.prepend(li);

		// Explicitly populate the header row if it is currently empty (ensures table headers always exist)
		const headerLi = headerUl.querySelector('li');

		// Check if the header row element exists and currently has no child elements (empty header row)
		if (headerLi && headerLi.childElementCount === 0) {
			// Iterate over each data field key to generate corresponding header elements
			keys.forEach(key => {
				// Dynamically create header elements using the kebab-case format of each key
				const headerEl = document.createElement(toTagName(key));

				// Generate a user-friendly, readable header text from the key
				headerEl.textContent = toTagName(key)
					.replace(/^item-/, '') // Remove the 'item-' prefix, if present
					.replace(/-/g, ' ') // Replace dashes with spaces for readability
					.replace(/\b\w/g, c => c.toUpperCase()); // Capitalize each word for improved presentation

				// Append the newly created header element to the header row (<li>)
				headerLi.appendChild(headerEl);
			});
		}

		// Programmatically select (check) the newly created list item's radio input
		// to immediately reflect it as the currently active item in the UI
		li.querySelector('input[name="list-item"]').checked = true;

		// Take a snapshot of the current form state to track changes against this new baseline
		snapshotForm();

		// Update the reset button state (enabled or disabled) based on current form data state
		toggleResetItem();
	});
};

// MARK: FORM SUBMIT

// Event handler triggered when the form is submitted (e.g., user clicks "Save" button)
form.onsubmit = async e => {
	e.preventDefault();

	unsavedCheck(CONFIRM_FLAGS.save, hasUnsavedChanges, async () => {
		const selected = document.querySelector('ul li input[name="list-item"]:checked');
		const id = selected?.closest('li')?.querySelector('label > id')?.textContent?.trim();
		const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
		if (!endpoint) return;

		const data = {};
		fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
			if (!el.readOnly) data[el.name] = el.value.trim();
		});
		const payload = denormalizeRecord(endpoint, data);

		try {
			if (id) {
				await putJSON(`${endpoint}/${id}`, payload);
			} else {
				await postJSON(endpoint, payload);
			}

			submitItem.setAttribute('aria-label', 'saved');
			savedMessage.textContent = `Saved ${new Date().toLocaleTimeString()}`;
			await loadPageContent(endpoint);
			snapshotForm();
			toggleResetItem();
			setTimeout(() => {
				savedMessage.textContent = '';
			}, 2000);
		} catch (err) {
			console.error('Failed to save:', err);
			const intro = document.querySelector('main article > p');
			if (intro) intro.textContent = '⚠️ Error saving record.';
		}
	});
};

// MARK: FORM RESET

// Event handler triggered when the form reset event occurs (e.g., user clicks the "Reset" button)
form.onreset = e => {
	e.preventDefault();

	unsavedCheck(CONFIRM_FLAGS.reset, hasUnsavedChanges, () => {
		restoreForm();
		snapshotForm();
	});
};

// MARK: DELETE HANDLER

deleteItem.onclick = () => {
	const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
	if (!selected) return;

	const id = selected.querySelector('label > id')?.textContent?.trim();
	const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
	if (!endpoint) return;

	unsavedCheck(CONFIRM_FLAGS.delete, hasUnsavedChanges, async () => {
		if (!id) {
			// Unsaved item: just remove from UI
			selected.remove();
			clearFieldset(fieldset);
			headerUl.querySelector('li').innerHTML = '';
			snapshotForm();
			toggleResetItem();
			toggleSubmitItem();
			return;
		}

		// Existing item: delete from server
		try {
			await deleteJSON(`${endpoint}/${id}`);
			await loadPageContent(endpoint);
			snapshotForm();
			toggleResetItem();
		} catch (err) {
			console.error('Failed to delete:', err);
			const intro = document.querySelector('main article > p');
			if (intro) intro.textContent = '⚠️ Error deleting record.';
		}
	});
};

// MARK: CLOSE ASIDE
if (closeItem) {
	closeItem.onclick = () => {
		unsavedCheck(CONFIRM_FLAGS.close, hasUnsavedChanges, () => {
			const selected = document
				.querySelector('ul li input[name="list-item"]:checked')
				?.closest('li');
			if (selected) {
				const radio = selected.querySelector('input[name="list-item"]');
				if (radio) radio.checked = false;
				const toggle = selected.querySelector('input[name="row-toggle"]');
				if (toggle) toggle.checked = false;
			}
			clearFieldset(fieldset);
			form.oninput();
			removeInlineStyles(mainEl);
			snapshotForm();
		});
	};
}

// Prompt user to save or delete when page loses focus if there are unsaved changes
if (OPTIONS.warnOnBlur) {
	window.onblur = () => {
		if (hasUnsavedChanges()) {
			CONFIRM_FLAGS.save.value = true;
			CONFIRM_FLAGS.delete.value = true;
		}
	};
}
