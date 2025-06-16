// MARK: SCRIPTS.JS

// Purpose: Fetch JSON and inject values using custom elements generated from API keys

// Global storage object for navigation data fetched from the API
let NAV_DATA = {}; // holds navItems JSON

// MARK: Base URL and fetch helper
import { BASE_URL, fetchJSON } from './fetchJSON.js';

// Define references to frequently accessed DOM elements for efficient reuse throughout the script
const headerUl = document.querySelector('main article ul[aria-hidden="true"]');
const tableUl = document.querySelector('main article ul[aria-hidden="true"] + ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('fieldset');
const mainEl = document.querySelector('main');
const newButton = document.querySelector('main article button');
const closeButton = document.querySelector('aside button[aria-label="Close"]');
const deleteButton = form.querySelector('button[aria-label="Delete"]');
const resetButton = form.querySelector('button[aria-label="Reset"]');
const submitButton = form.querySelector('button[aria-label="Save"]');
const navInputs = document.querySelectorAll('nav input[name="nav"]');

// Array containing all valid endpoint identifiers
const ENDPOINTS = [];

// MARK: UTILITY FUNCTIONS
// General-purpose utility functions used across the script

// Load navigation endpoints from API and dynamically populate navigation controls
function loadEndpoints() {
	// Fetches navigation content from the API and updates navigation inputs
	return fetchJSON('navItems').then(text => {
		const [data] = JSON.parse(text);
		NAV_DATA = data; // store full nav content
		const keys = Object.keys(data || {});
		ENDPOINTS.splice(0, ENDPOINTS.length, ...keys);

		const navSection = document.querySelector('nav details > section');
		if (!navSection) return;

		// Clear existing navigation items
		navSection.innerHTML = '';

		// Dynamically create navigation radio buttons based on the fetched data
		keys.forEach((key, i) => {
			const { title } = data[key] || {};
			const label = document.createElement('label');
			label.textContent = title;

			const input = document.createElement('input');
			input.type = 'radio';
			input.name = 'nav';
			input.value = key; // key = endpoint
			input.hidden = true;
			if (i === 0) input.checked = true; // Check the first input by default

			label.appendChild(input);
			navSection.appendChild(label);
		});
	});
}

// Check endpoint validity against predefined endpoint list
function isValidEndpoint(name) {
	// Returns true if the provided endpoint name is within the list of valid endpoints
	return ENDPOINTS.includes(name);
}

// String & Format Utilities
// function toKebab(str) {
//   let dashed = str
//     .replace(/([a-z])([A-Z])/g, "$1-$2")
//     .replace(/_/g, "-")
//     .toLowerCase()

//   if (!dashed.includes("-")) {
//     dashed = `${dashed}-`
//   }

//   return dashed
// }

// Convert string to kebab-case for generating valid custom element names
function toKebab(str) {
	// Converts strings from camelCase or snake_case to kebab-case, ensuring compatibility with HTML custom elements
	if (!str || typeof str !== 'string') return 'unknown-tag';

	// Replace camelCase and snake_case with kebab-case
	let dashed = str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/_/g, '-')
		.toLowerCase();

	// Handle numeric strings or special characters by prefixing unknown
	if (!/^[a-z][a-z0-9-]*$/.test(dashed)) {
		dashed = `unknown-${dashed.replace(/[^a-z0-9-]/g, '')}`;
	}

	if (!dashed.includes('-')) dashed = `${dashed}-`;

	return dashed;
}

// Convert kebab-case strings to camelCase
function toCamel(str) {
	// Transforms kebab-case strings into camelCase format
	let result = str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
	if (result.endsWith('-')) result = result.slice(0, -1);
	return result;
}

// Format date strings for input elements (YYYY-MM-DDTHH:MM)
function formatDateForInput(str) {
	// Formats a date string into ISO format suitable for HTML datetime-local inputs
	const d = new Date(str);
	if (isNaN(d)) return '';
	return d.toISOString().slice(0, 16); // Trims to format: YYYY-MM-DDTHH:MM
}

// Load data from a specific API endpoint and populate the UI elements accordingly
async function loadEndpoint(endpoint) {
	// Log the endpoint being loaded for debugging purposes
	console.log('[LOAD]', endpoint);

	// Clear existing UI content to prepare for new data
	headerUl.querySelectorAll('li').forEach(li => (li.innerHTML = ''));
	tableUl.innerHTML = '';

	// Clear the header content but keep the header structure intact
	const headerLi = headerUl.querySelector('li');
	if (headerLi) {
		headerLi.innerHTML = ''; // Clears header content while preserving the element
	}

	try {
		// Fetch primary data from the given API endpoint
		const text = await fetchJSON(endpoint);
		const [data] = JSON.parse(text);

		// Ensure `data.items` is a valid array; if not, attempt to re-fetch or default to empty
		if (!Array.isArray(data.items)) {
			try {
				const retryText = await fetchJSON(endpoint);
				data.items = JSON.parse(retryText);
			} catch {
				data.items = []; // Set default empty array if fetch fails again
			}
		}

		// Log the loaded data for further verification and debugging
		console.log('[LOADED]', data);

		// Generate and populate table headers
		const keys = Object.keys(data.items[0] || {});

		// Generate header elements dynamically based on keys from the first item
		keys.forEach(key => {
			// Convert the key into a valid custom HTML element tag name (kebab-case)
			const el = document.createElement(toKebab(key));
			// Set readable text for each header item
			el.textContent = toKebab(key)
				.replace(/^item-/, '')
				.replace(/-/g, ' ')
				.replace(/\b\w/g, c => c.toUpperCase());
			headerLi.appendChild(el);
		});

		// Initialize custom elements in the DOM based on fetched keys
		initCustomEls(keys);

		// Detect duplicate item IDs to ensure data integrity and avoid UI conflicts
		const seen = new Set();
		const duplicates = [];

		for (const item of data.items) {
			if (seen.has(item.id)) duplicates.push(item.id);
			seen.add(item.id);
		}

		// If duplicates exist, log an error, inform the user, and halt further processing
		if (duplicates.length) {
			console.error('[DUPLICATE ID DETECTED]', duplicates);
			alert(`Duplicate IDs found: ${duplicates.join(', ')}`);
			return;
		}

		// Clear the fieldset to prepare for new item inputs or edits
		fieldset.innerHTML = '';

		// Populate the main article's title and introductory paragraph dynamically from the fetched data
		const article = document.querySelector('main article');
		const h1 = article?.querySelector('h1');
		const intro = article?.querySelector('p');
		if (h1) h1.textContent = data.title ?? '';
		if (intro) intro.textContent = data.intro ?? '';

		// Populate each item into the UI as individual table rows
		data.items.forEach(item => {
			const li = createListItem(item);
			tableUl.appendChild(li);
		});

		// Snapshot the current form state for tracking unsaved changes
		snapshotForm();

		// Update UI buttons based on form state (reset/save button toggling)
		toggleResetButton();
	} catch (err) {
		// Log the error and inform the user via a modal if data loading fails
		console.error('Failed to load data:', err);
		alert('Failed to load data.');
	}
}

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
	// Compares current input/select values to their original snapshot to detect changes.
	return Array.from(fieldset.querySelectorAll('input[name], select[name]')).some(
		el => el.value !== originalData[el.name],
	);
}

// MARK: BANNER
async function loadAppBanner() {
	try {
		const text = await fetchJSON('app-banner');
		const [first] = JSON.parse(text);

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
		const msg = '⚠️ Network error: Could not load banner';

		// For each <app-banner><p>, display the error message inline
		// Again: no class, no attributes, only structural content
		document.querySelectorAll('app-banner > p').forEach(p => {
			p.textContent = msg;
		});
	}
}

loadAppBanner();

// Form State Utilities
// MARK: TRACK FROM ORIGINAL STATE

// Object to store the original values of form fields, used to detect unsaved changes
let originalData = {};

// Reference to the currently selected list item (used for restoring form data visually to the list)
let snapshotLi = null;

// Capture the current state of form fields into `originalData`
// This function is called to take a snapshot after loading data or resetting changes
function snapshotForm() {
	// Reset `originalData` to empty object to capture fresh snapshot of form state
	originalData = {};

	// Loop over each form field within the fieldset, recording the current values
	fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
		originalData[el.name] = el.value;
	});

	// Capture reference to currently selected list item, if any
	snapshotLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');

	// After taking snapshot, update state of Reset and Submit buttons
	toggleResetButton();
	toggleSubmitButton();
}

// Restore form fields to previously captured state stored in `originalData`
// This function is typically triggered by a form reset action
function restoreForm() {
	// Restore each form input/select element's value from the original snapshot
	fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
		// Check explicitly if the property exists in originalData to avoid undefined assignments
		if (Object.prototype.hasOwnProperty.call(originalData, el.name)) {
			el.value = originalData[el.name];
		}
	});

	// Restore corresponding visual representation in the selected list item, if present
	if (snapshotLi) {
		snapshotLi.querySelectorAll('label > *:not(input)').forEach(el => {
			// Convert element tag name back to camelCase to match keys stored in originalData
			const key = toCamel(el.tagName.toLowerCase());

			// Restore text content of list item's corresponding fields
			if (Object.prototype.hasOwnProperty.call(originalData, key)) {
				el.textContent = originalData[key];
			}
		});
	}
}

// Toggle the disabled state of the Reset button based on form changes
function toggleResetButton() {
	// Guard clause: ensure the reset button exists before proceeding
	if (!resetButton) return;

	// Determine if the form currently has unsaved changes
	const dirty = hasUnsavedChanges();

	// Disable the reset button if no changes; enable it otherwise
	resetButton.disabled = !dirty;

	// Update the form element's data attribute to reflect if the form has unsaved changes (useful for CSS state indicators)
	form.dataset.dirty = dirty ? 'true' : 'false';
}

// Toggle the disabled state of the Submit button based on form validity and changes
function toggleSubmitButton() {
	// Guard clause: ensure the submit button exists before proceeding
	if (!submitButton) return;

	// Determine if the form has unsaved changes
	const dirty = hasUnsavedChanges();

	// Check if the form fields currently meet validation requirements (e.g., required fields filled, patterns matched)
	const valid = form.checkValidity();

	// Disable the submit button unless the form both has unsaved changes and passes validation
	submitButton.disabled = !(dirty && valid);
}

// Initialize custom HTML elements dynamically based on provided keys
function initCustomEls(keys) {
	// Iterate over each key to dynamically create custom elements, ensuring browser recognition
	keys.forEach(key => {
		// Convert each key to a kebab-case format appropriate for custom HTML elements
		const tag = toKebab(key);

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
			toKebab(key)
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
	toggleResetButton();
}

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
function createListItem(item = {}) {
	// Create a new list item (<li>) element to represent a single row in the list/table
	const li = document.createElement('li');

	// Create a hidden checkbox input element for toggling selection state of the row

	// Make the list item focusable via keyboard for improved accessibility
	li.tabIndex = 0;

	// Create a label element to group inputs and data fields clearly
	const label = document.createElement('label');

	// Create a hidden checkbox input element for toggling selection state of the row
	const toggle = document.createElement('input');
	toggle.type = 'checkbox';
	toggle.name = 'row-toggle';
	toggle.hidden = true; // Keep hidden; can be styled or controlled via other UI triggers
	toggle.oninput = handleRowToggle; // Attach event handler for row toggling
	label.appendChild(toggle); // Append the checkbox to the label

	// Create a hidden radio input element to facilitate exclusive row selection and form updates
	const input = document.createElement('input');
	input.type = 'radio';
	input.name = 'list-item';
	input.hidden = true; // Hidden as UI interaction is handled through other visible elements
	input.oninput = () => updateFormFromSelectedRow(); // Load form fields when selected
	label.appendChild(input); // Append the radio button to the label

	// Populate the row dynamically with elements created from the item's key-value pairs
	for (const [key, value] of Object.entries(item)) {
		// Convert key into a valid custom element (kebab-case tag name)
		const el = document.createElement(toKebab(key));

		// Set the content of this custom element to the corresponding item value
		el.textContent = value ?? ''; // Default to empty string if value is null or undefined

		// Append the populated element to the label for visual representation of the data
		label.appendChild(el);
	}

	// Append the fully constructed label to the list item (<li>) element
	li.appendChild(label);

	// Return the fully assembled list item ready to be appended to the table/list UI
	return li;
}

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
		clone.textContent = toKebab(key)
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

	// Find the currently selected row (<li>) based on the checked radio button
	const selectedLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');

	// Guard clause: exit early if no row is currently selected
	if (!selectedLi) return;

	// Find the corresponding element within the selected row using kebab-case conversion of the input name
	const mirror = selectedLi.querySelector(`label > ${toKebab(key)}`);

	// If the corresponding element exists and the input is editable, mirror the input's value to it
	if (mirror && !input.readOnly) {
		mirror.textContent = input.value;
	}
}

// Dynamically creates and returns a form input element tailored to the given key-value pair
function createInputFromKey(key, value) {
	// Use the provided key directly as the name attribute for the form element
	const inputName = key;

	// Safely trim the input value if possible; default to empty string if undefined or null
	const val = value?.trim?.() ?? '';

	// Variable to hold the dynamically created form element
	let element;

	// Convert the value to lowercase to handle case-insensitive comparisons for certain input types
	const lowercaseVal = val.toLowerCase();

	// Define specific DHCP-related types that should be represented as a select/dropdown
	const dhcpTypes = ['host', 'ip', 'url', 'file', 'service'];

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
		if (key === 'id' || /^[a-f0-9\-]{36}$/.test(val)) {
			element.type = 'hidden';
			element.oninput = mirrorToSelectedRow; // Ensure hidden value syncs with UI
			return element; // Immediately return hidden element as no further processing needed
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
	toggleResetButton();

	// Update the enabled or disabled state of the submit button,
	// based on both the presence of unsaved changes and form validity
	toggleSubmitButton();

	submitButton.value = '';
	deleteButton.value = '';
	resetButton.value = '';
	closeButton.value = '';
};

// MARK: MAIN APPLICATION LOGIC

// MARK: INITIAL TAB FETCH
// Fetch initial navigation data, then set up event listeners for navigation inputs
loadEndpoints().then(() => {
	// Iterate over each navigation radio input element to set its change event listener
	document.querySelectorAll('nav input[name="nav"]').forEach(input => {
		// Attach an event listener triggered when the input state changes (radio button selection)
		input.onchange = () => {
			// Guard clause: only proceed if the current input is checked (selected)
			if (!input.checked) return;

			// Helper function defining the actions to perform when navigating to a new endpoint
			const proceed = () => {
				// Find the label containing the selected input (useful for UI feedback if needed)
				const label = input.closest('label');

				// Retrieve the endpoint identifier from the selected input's value attribute
				const endpoint = input.value;

				// Trigger data loading for the chosen endpoint, updating the main content accordingly
				if (endpoint) loadEndpoint(endpoint);
			};

			// Before proceeding, check if there are unsaved form changes
			if (hasUnsavedChanges()) {
				if (window.confirm('You have unsaved changes. Discard them?')) {
					proceed();
				}
			} else {
				proceed();
			}
		};
	});

	// Automatically trigger the onchange event for the initially selected navigation input (if any),
	// causing the initial endpoint data to load immediately on page load
	const selected = document.querySelector('nav input[name="nav"]:checked');
	if (selected?.onchange) selected.onchange();
});

// MARK: NEW ROW CREATION
// Event handler triggered when the "New" button is clicked to create a new form entry
newButton.onclick = async () => {
	// First, check if there are unsaved form changes
	if (hasUnsavedChanges() && !window.confirm('You have unsaved changes. Discard them?')) return; // If user declines, exit without making changes

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
			toKebab(key)
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
			const headerEl = document.createElement(toKebab(key));

			// Generate a user-friendly, readable header text from the key
			headerEl.textContent = toKebab(key)
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
	toggleResetButton();
};

// MARK: FORM SUBMIT

// Event handler triggered when the form is submitted (e.g., user clicks "Save" button)
form.onsubmit = async e => {
	e.preventDefault();

	if (submitButton.value !== 'confirm-save') {
		submitButton.value = 'confirm-save';
		return;
	}

	const selected = document.querySelector('ul li input[name="list-item"]:checked');
	const id = selected?.closest('li')?.querySelector('label > id')?.textContent?.trim();
	const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
	if (!endpoint) return;

	const data = {};
	fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
		if (!el.readOnly) data[el.name] = el.value.trim();
	});

	const method = id ? 'PUT' : 'POST';
	const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;

	try {
		const res = await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error('Save failed');

		submitButton.value = ''; // reset
		await loadEndpoint(endpoint);
	} catch (err) {
		console.error('Failed to save:', err);
		const intro = document.querySelector('main article > p');
		if (intro) intro.textContent = '⚠️ Error saving record.';
	}
};

// MARK: FORM RESET

// Event handler triggered when the form reset event occurs (e.g., user clicks the "Reset" button)
form.onreset = e => {
	e.preventDefault();

	if (resetButton.value !== 'confirm-reset') {
		resetButton.value = 'confirm-reset';
		return;
	}

	restoreForm();
	snapshotForm();
	resetButton.value = '';
	submitButton.value = '';
	deleteButton.value = '';
	closeButton.value = '';
};

// MARK: DELETE HANDLER

deleteButton.onclick = async () => {
	const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
	if (!selected) return;

	const id = selected.querySelector('label > id')?.textContent?.trim();
	const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;

	if (!endpoint) return;

	if (!id) {
		if (deleteButton.value !== 'confirm-delete') {
			deleteButton.value = 'confirm-delete';
			return;
		}

		selected.remove();
		clearFieldset(fieldset);
		headerUl.querySelector('li').innerHTML = '';
		snapshotForm();
		toggleResetButton();
		toggleSubmitButton();
		deleteButton.value = ''; // reset
		return;
	}

	if (deleteButton.value !== 'confirm-delete') {
		deleteButton.value = 'confirm-delete';
		return;
	}

	try {
		await fetch(`${BASE_URL}${endpoint}/${id}`, { method: 'DELETE' });
		deleteButton.value = ''; // reset
		await loadEndpoint(endpoint);
	} catch (err) {
		console.error('Failed to delete:', err);
		const intro = document.querySelector('main article > p');
		if (intro) intro.textContent = '⚠️ Error deleting record.';
	}
};

// MARK: CLOSE ASIDE

closeButton.onclick = () => {
	const closeAside = () => {
		const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
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

		closeButton.value = '';
		submitButton.value = '';
		resetButton.value = '';
		deleteButton.value = '';
	};

	if (closeButton.value !== 'confirm-close') {
		closeButton.value = 'confirm-close';
		return;
	}

	closeAside();
};
