// MARK: FORMS.JS

import { OPTIONS, CONFIRM_FLAGS } from './config.js';
import { postJSON, putJSON, deleteJSON } from './fetch.js';
import { denormalizeRecord } from './schema.js';
import { loadPageContent, getFieldRules } from './loaders.js';
import {
	createListItem,
	toTagName,
	toCamel,
	setRowSelectHandler,
	injectRowValues,
	injectRowField,
	createInputFromKey,
	mirrorToSelectedRow,
	updateHeaderRow,
} from './inject.js';
import {
	snapshotForm,
	hasUnsavedChanges,
	unsavedCheck,
	removeInlineStyles,
	clearFieldset,
	isFormValid,
	restoreFormFields,
} from './utils.js';

// Form DOM element references
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
const savedMessage = form.querySelector('p[aria-live="polite"]');

// Form State Management
let originalData = {};
let snapshotLi = null;

// Form state functions
function checkUnsavedChanges() {
	return hasUnsavedChanges(fieldset.querySelectorAll('input[name], select[name]'), originalData);
}

function captureFormSnapshot() {
	originalData = snapshotForm(fieldset.querySelectorAll('input[name], select[name]'));
	snapshotLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
	updateButtonStates();
}

function restoreForm() {
	if (!originalData || !Object.keys(originalData).length) return;
	restoreFormFields(fieldset, originalData);
	if (snapshotLi) injectRowValues(snapshotLi, originalData);
}

// Consolidated button state management
function updateButtonStates() {
	const dirty = checkUnsavedChanges();
	const valid = isFormValid(form);
	const hasSelection = document.querySelector('ul li input[name="list-item"]:checked');

	// Update form dataset for CSS styling
	form.dataset.dirty = dirty ? 'true' : 'false';
	form.dataset.valid = valid ? 'true' : 'false';

	// Reset button: enabled when dirty
	if (resetItem) {
		resetItem.toggleAttribute('aria-disabled', !dirty);
	}

	// Submit button: enabled when dirty AND valid
	if (submitItem) {
		submitItem.toggleAttribute('aria-disabled', !(dirty && valid));
	}

	// Delete button: enabled when selection exists
	if (deleteItem) {
		deleteItem.toggleAttribute('aria-disabled', !hasSelection);
	}
}

// Form coordination
function updateFormFromSelectedRow() {
	clearFieldset(fieldset);

	const selectedRow = document
		.querySelector('ul li input[name="list-item"]:checked')
		?.closest('li');

	if (!selectedRow) {
		removeInlineStyles(mainEl);
		captureFormSnapshot();
		form.oninput();
		return;
	}

	selectedRow.querySelectorAll('label > *:not(input)').forEach(source => {
		const key = toCamel(source.tagName.toLowerCase());
		const value = source.textContent;

		const label = document.createElement('label');
		label.textContent =
			toTagName(key)
				.replace(/^item-/, '')
				.replace(/-/g, ' ')
				.replace(/\b\w/g, c => c.toUpperCase()) + ': ';

		const input = createInputFromKey(key, value, getFieldRules());
		input.oninput = (e) => mirrorToSelectedRow(e, injectRowField);
		label.appendChild(input);
		fieldset.appendChild(label);
	});

	captureFormSnapshot();
}

setRowSelectHandler(updateFormFromSelectedRow);

// Form event assignments
form.oninput = updateButtonStates;

// New item creation
newItem.onclick = async () => {
	unsavedCheck(CONFIRM_FLAGS.save, checkUnsavedChanges, () => {
		clearFieldset(fieldset);

		const existingLi = tableUl.querySelector('li');
		let keys;

		if (existingLi) {
			keys = Array.from(existingLi.querySelectorAll('label > *:not(input)')).map(el =>
				toCamel(el.tagName.toLowerCase()),
			);
		} else {
			keys = ['id', 'name', 'description', 'created', 'updated'];
		}

		const item = {};
		keys.forEach(key => {
			item[key] = '';
			const formLabel = document.createElement('label');
			formLabel.textContent =
				toTagName(key)
					.replace(/^item-/, '')
					.replace(/-/g, ' ')
					.replace(/\b\w/g, c => c.toUpperCase()) + ': ';

			const input = createInputFromKey(key, '', getFieldRules());
			input.oninput = (e) => mirrorToSelectedRow(e, injectRowField);
			formLabel.appendChild(input);
			fieldset.appendChild(formLabel);
		});

		const li = createListItem(item);
		tableUl.prepend(li);

		updateHeaderRow(li, headerUl, toCamel, toTagName);

		li.querySelector('input[name="list-item"]').checked = true;
		captureFormSnapshot();
	});
};

// Form submission
form.onsubmit = async e => {
	e.preventDefault();

	unsavedCheck(CONFIRM_FLAGS.save, checkUnsavedChanges, async () => {
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
			captureFormSnapshot();
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

// Form reset
form.onreset = e => {
	e.preventDefault();

	unsavedCheck(CONFIRM_FLAGS.reset, checkUnsavedChanges, () => {
		restoreForm();
		captureFormSnapshot();
	});
};

// Delete operation
deleteItem.onclick = () => {
	const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');
	if (!selected) return;

	const id = selected.querySelector('label > id')?.textContent?.trim();
	const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
	if (!endpoint) return;

	unsavedCheck(CONFIRM_FLAGS.delete, checkUnsavedChanges, async () => {
		if (!id) {
			selected.remove();
			clearFieldset(fieldset);
			headerUl.querySelector('li').innerHTML = '';
			captureFormSnapshot();
			return;
		}

		try {
			await deleteJSON(`${endpoint}/${id}`);
			await loadPageContent(endpoint);
			captureFormSnapshot();
		} catch (err) {
			console.error('Failed to delete:', err);
			const intro = document.querySelector('main article > p');
			if (intro) intro.textContent = '⚠️ Error deleting record.';
		}
	});
};

// Close form
if (closeItem) {
	closeItem.onclick = () => {
		unsavedCheck(CONFIRM_FLAGS.close, checkUnsavedChanges, () => {
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
			captureFormSnapshot();
		});
	};
}

// Save confirmation on page blur
if (OPTIONS.warnOnBlur) {
	window.onblur = () => {
		if (checkUnsavedChanges()) {
			CONFIRM_FLAGS.save.value = true;
			CONFIRM_FLAGS.delete.value = true;
		}
	};
}

// Initialize button states on load
console.log('Initializing buttons:', { resetItem, submitItem, deleteItem });
updateButtonStates();
