// MARK: INJECT.JS
import { logError } from './errors.js';
import { formatDateForInput } from './utils.js';

export let rowSelectHandler = () => {};

export function setRowSelectHandler(fn) {
  if (typeof fn === 'function') rowSelectHandler = fn;
}

export function toCamel(str = '') {
  let result = str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (result.endsWith('-')) result = result.slice(0, -1);
  return result;
}

export function toTagName(str = '') {
  if (!str || typeof str !== 'string') return 'unknown-tag';
  let dashed = str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
  if (!/^[a-z][a-z0-9-]*$/.test(dashed)) {
    dashed = `unknown-${dashed.replace(/[^a-z0-9-]/g, '')}`;
  }
  if (!dashed.includes('-')) dashed = `${dashed}-`;
  return dashed;
}

const headerUl = document.querySelector('main article ul[aria-hidden="true"]');
const tableUl = document.querySelector('main article ul[aria-hidden="true"] + ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('fieldset');

function initCustomEls(keys = []) {
  keys.forEach(key => {
    const tag = toTagName(key);
    if (tag.includes('-')) document.createElement(tag);
  });
}

function handleRowToggle(event) {
  const checkbox = event.target;
  const li = checkbox.closest('li');
  const radio = li.querySelector('input[type="radio"][name="list-item"]');
  if (checkbox.checked) {
    tableUl.querySelectorAll('input[name="row-toggle"]').forEach(cb => {
      if (cb !== checkbox) cb.checked = false;
    });
  }
  radio.checked = checkbox.checked;
  radio.dispatchEvent(new Event('input', { bubbles: true }));
}

export function createListItem(item = {}) {
  const li = document.createElement('li');
  li.tabIndex = 0;
  const label = document.createElement('label');

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.name = 'row-toggle';
  toggle.hidden = true;
  toggle.oninput = handleRowToggle;
  label.appendChild(toggle);

  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'list-item';
  input.hidden = true;
  input.oninput = () => rowSelectHandler();
  label.appendChild(input);

  for (const [key, value] of Object.entries(item)) {
    const el = document.createElement(toTagName(key));
    el.textContent = value ?? '';
    label.appendChild(el);
  }

  li.appendChild(label);
  return li;
}

export function injectNavItems(data = {}) {
  const detailEls = document.querySelectorAll('nav details');
  Object.entries(data).forEach(([groupKey, groupValue], index) => {
    const detail = detailEls[index];
    if (!detail) return;
    const summary = detail.querySelector('summary');
    const section = detail.querySelector('section');
    if (summary) summary.textContent = groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
    if (section) section.innerHTML = '';
    Object.entries(groupValue).forEach(([key, { title }], i) => {
      const label = document.createElement('label');
      label.textContent = title || key;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'nav';
      input.value = key;
      input.hidden = true;
      if (i === 0 && index === 0) input.checked = true;

      // Add onchange event handler directly to the input (minimal JS per project philosophy)
      input.onchange = () => {
        if (!input.checked) return;
        // Clear the aside panel when switching tabs
        import('./forms.js').then(({ clearAsidePanel }) => {
          clearAsidePanel();
        });
        // Import loadPageContent dynamically to avoid circular dependencies
        import('./loaders.js').then(({ loadPageContent }) => {
          loadPageContent(key);
        });
      };

      label.appendChild(input);
      section.appendChild(label);
    });
  });
}

export function injectPageContent(endpoint = '', data = {}) {
  headerUl.querySelectorAll('li').forEach(li => (li.innerHTML = ''));
  tableUl.innerHTML = '';
  const headerLi = headerUl.querySelector('li');
  if (headerLi) headerLi.innerHTML = '';

  const keys = Object.keys(data.items?.[0] || {});
  keys.forEach(key => {
    const el = document.createElement(toTagName(key));
    el.textContent = toTagName(key)
      .replace(/^item-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    headerLi.appendChild(el);
  });

  initCustomEls(keys);

  const seen = new Set();
  const duplicates = [];
  for (const item of data.items || []) {
    if (seen.has(item.id)) duplicates.push(item.id);
    seen.add(item.id);
  }

  if (duplicates.length) {
    logError('[DUPLICATE ID DETECTED]', duplicates);
    const intro = document.querySelector('main article > p');
    if (intro) intro.textContent = `⚠️ Duplicate IDs: ${duplicates.join(', ')}`;
    return;
  }

  fieldset.innerHTML = '';

  const article = document.querySelector('main article');
  const h1 = article?.querySelector('h1');
  const intro = article?.querySelector('p');
  if (h1) h1.textContent = data.title ?? '';
  if (intro) intro.textContent = data.description ?? '';

  (data.items || []).forEach(item => {
    const li = createListItem(item);
    tableUl.appendChild(li);
  });
}

export function injectFormFields(data = {}) {
  fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
    if (Object.prototype.hasOwnProperty.call(data, el.name)) {
      el.value = data[el.name];
    }
  });
}

export function injectRowValues(li, data = {}) {
  if (!li) return;
  li.querySelectorAll('label > *:not(input)').forEach(el => {
    const key = toCamel(el.tagName.toLowerCase());
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      el.textContent = data[key];
    }
  });
}

export function injectRowField(li, name = '', value = '') {
  if (!li) return;
  const target = li.querySelector(`label > ${toTagName(name)}`);
  if (target) target.textContent = value ?? '';
}

// Form field creation utilities
export function createInputFromKey(key, value, fieldRules = {}) {
	const inputName = key;
	const val = value?.trim?.() ?? '';

	const rule = fieldRules[key];
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

		return select;
	}

	if (rule?.type === 'toggle') {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = key;
		checkbox.checked = value === 'true' || value === true;
		return checkbox;
	}

	if (rule?.type === 'textarea') {
		const textarea = document.createElement('textarea');
		textarea.name = key;
		textarea.value = value ?? '';
		textarea.required = !!value;
		return textarea;
	}

	if (rule?.type === 'datetime') {
		const input = document.createElement('input');
		input.type = 'datetime-local';
		input.name = key;
		input.value = formatDateForInput(value);
		input.readOnly = true;
		input.tabIndex = -1;
		return input;
	}

	// Default to text input
	const element = document.createElement('input');
	element.name = inputName;
	element.value = val;

	// Special handling for read-only fields
	if (key === 'id' || /^[a-f0-9\-]{36}$/.test(val)) {
		element.type = 'text';
		element.readOnly = true;
		element.tabIndex = -1;
		element.ariaDisabled = 'true';
	} else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(val)) {
		element.type = 'datetime-local';
		element.readOnly = true;
		element.tabIndex = -1;
		element.value = formatDateForInput(val);
	} else if (/author|modified|created|updated/.test(key)) {
		element.type = 'text';
		element.readOnly = true;
		element.tabIndex = -1;
	} else {
		element.type = 'text';
		element.required = val !== '';
		element.pattern = '.+';
	}

	return element;
}

export function mirrorToSelectedRow(event, injectRowField) {
	const input = event.target;
	const key = input.name;
	const selectedLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest('li');

	if (!selectedLi) return;

	if (!input.readOnly) {
		injectRowField(selectedLi, key, input.value);
	}
}

export function updateHeaderRow(sourceRow, headerUl, toCamel, toTagName) {
	const headerLi = headerUl?.querySelector('li');
	if (!headerLi || !sourceRow) return;

	headerLi.innerHTML = '';

	sourceRow.querySelectorAll('label > *:not(input)').forEach(el => {
		const key = toCamel(el.tagName.toLowerCase());
		const clone = el.cloneNode(false);
		clone.textContent = toTagName(key)
			.replace(/^item-/, '')
			.replace(/-/g, ' ')
			.replace(/\b\w/g, c => c.toUpperCase());
		headerLi.appendChild(clone);
	});
}
