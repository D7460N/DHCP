// === scripts.js ===
// Purpose: Fetch JSON, define custom elements, and inject content into UL/LI and FORM
// HTML and CSS are in charge of layout, visibility, and user interaction

// === URL Base for JSON Fetch ===
const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

// === DOM Roots (Static References) ===
const ul = document.querySelector('main article section ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('section fieldset');
const newButton = document.querySelector('button');

// Optional form hook reserved for extension (no DOM watching here)
form.oninput = () => {};

// === 1. Custom Element Definitions (Data Hooks) ===
function normalizeKeyToTag(key) {
  let prefixed = /^item/i.test(key) ? key : `item-${key}`;
  prefixed = prefixed.replace(/[^a-zA-Z0-9]/g, '-');
  prefixed = prefixed.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
  let tag = prefixed.toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!/^[a-z][a-z0-9\-]*-[a-z0-9\-]+$/.test(tag)) {
    throw new Error(`Invalid tag name: ${tag}`);
  }
  return tag;
}

const definedTags = new Map();

function defineCustomElement(tagName, originalKey = tagName) {
  let finalTag = tagName;
  if (definedTags.has(tagName)) {
    const priorKey = definedTags.get(tagName);
    if (priorKey !== originalKey) {
      let suffix = 1;
      while (definedTags.has(`${tagName}-${suffix}`)) suffix++;
      finalTag = `${tagName}-${suffix}`;
      console.warn(`Collision detected for "${tagName}". Redefined as <${finalTag}> for key "${originalKey}".`);
    } else {
      return tagName;
    }
  }

  class EditableField extends HTMLElement {
    static formAssociated = true;
    constructor() {
      super();
      this._internals = this.attachInternals();
      this.contentEditable = true;
      this.spellcheck = false;
      this.onfocus = () => this._internals.setFormValue(this.textContent);
      this.onblur = () => this._internals.setFormValue(this.textContent);
      this.oninput = () => {
        this._internals.setFormValue(this.textContent);
        const selectedLi = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
        if (selectedLi) {
          const mirror = selectedLi.querySelector(finalTag);
          if (mirror) mirror.textContent = this.textContent;
        }
      };
    }
    set data(val) {
      this.textContent = val ?? '';
      this._internals.setFormValue(val ?? '');
    }
    get value() {
      return this.textContent;
    }
  }

  customElements.define(finalTag, EditableField);
  definedTags.set(finalTag, originalKey);
  return finalTag;
}

// === 2. JSON Fetch + Data Injection (Render Phase) ===
function load(endpoint) {
  fetch(endpoint)
    .then(res => res.json())
    .then(([data]) => {
      ul.innerHTML = '';
      fieldset.innerHTML = '';

      const article = document.querySelector('main article:has(h1)');
      const h1 = article?.querySelector('h1');
      const intro = article?.querySelector('p');
      if (h1) h1.textContent = data.title ?? '';
      if (intro) intro.textContent = data.intro ?? '';

      data.items.forEach(item => {
        const li = document.createElement('li');
        li.tabIndex = 0;

        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'list-item';
        input.hidden = true;
        label.appendChild(input);

        for (const [key, value] of Object.entries(item)) {
  try {
    const tag = normalizeKeyToTag(key);
    const finalTag = defineCustomElement(tag, key);

    if (!finalTag || !customElements.get(finalTag)) {
      throw new Error(`Custom element <${finalTag}> is not defined.`);
    }

    const liEl = document.createElement(finalTag);
    liEl.textContent = value;
    label.appendChild(liEl);
  } catch (err) {
    console.error(`Error rendering <li> for key "${key}":`, err);
  }
        }

        li.appendChild(label);
        ul.appendChild(li);
      });

      snapshotForm();
    })
    .catch(err => console.error('Failed to load data:', err));
}

// === 3. Live Add Row and Bind Editors ===
function createNewRow() {
  const li = document.createElement('li');
  li.tabIndex = 0;

  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'list-item';
  input.hidden = true;
  input.checked = true;
  label.appendChild(input);

  const editableKeys = ['itemName', 'itemType', 'itemAuthor'];

  editableKeys.forEach(key => {
    const tag = normalizeKeyToTag(key);
    const finalTag = defineCustomElement(tag, key);

    const liEl = document.createElement(finalTag);
    liEl.textContent = '';
    label.appendChild(liEl);
  });

  li.appendChild(label);
  ul.appendChild(li);
  li.querySelector('input[type="radio"]').checked = true;
  updateFormFromSelectedRow();
}

// === 4. Change Detection (Snapshot/Dirty Check) ===
let originalSnapshot = '';
function snapshotForm() {
  const items = document.querySelectorAll('form [contenteditable]');
  originalSnapshot = Array.from(items).map(el => el.textContent).join('|');
}
function hasUnsavedChanges() {
  const items = document.querySelectorAll('form [contenteditable]');
  const current = Array.from(items).map(el => el.textContent).join('|');
  return current !== originalSnapshot;
}
window.onbeforeunload = () => hasUnsavedChanges() ? true : undefined;

// === 5. Init Fetch from Selected Tab (HTML-driven) ===
const selected = document.querySelector('nav input[name="nav"]:checked');
const label = selected?.closest('label');
const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
if (tab) load(`${BASE_URL}${tab}`);

// === 6. Tab Data Fetch on Change (user-only) ===
document.querySelectorAll('nav input[name="nav"]').forEach(input => {
  input.onchange = () => {
    if (!input.checked) return;

    if (hasUnsavedChanges()) {
      if (!confirm('You have unsaved changes. Discard them?')) return;
    }

    const label = input.closest('label');
    const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    if (tab) load(`${BASE_URL}${tab}`);
  };
});

// === 7. Initialize New Record via Button ===

// === 8. Row Selection → Populate Form from Checked LI ===
function updateFormFromSelectedRow() {
  const selectedRow = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
  if (!selectedRow) return;

  fieldset.innerHTML = '';

  selectedRow.querySelectorAll('label > *:not(input)').forEach(source => {
    const tag = source.tagName?.toLowerCase?.();
    if (!tag || !/^[a-z][a-z0-9\-]*-[a-z0-9\-]+$/.test(tag)) {
      console.error(`Invalid or malformed tag: "${tag}" — source node may be corrupted.`);
      return;
    }
    if (!customElements.get(tag)) {
      console.error(`Custom element <${tag}> is not defined. JSON may contain unexpected or malformed keys.`);
      return;
    }
    try {
            const formEl = document.createElement(tag);
    formEl.contentEditable = true;
    formEl.spellcheck = false;
    formEl.textContent = source.textContent;
    formEl.oninput = () => {
      source.textContent = formEl.textContent;
    };
          fieldset.appendChild(formEl);
    } catch (e) {
      console.warn(`Failed to create element <${tag}>:`, e);
    }
  });

  snapshotForm();
}

// Run it when a row is clicked
ul.addEventListener('change', e => {
  if (e.target.name === 'list-item') {
    updateFormFromSelectedRow();
  }
});
newButton.onclick = () => {
  if (hasUnsavedChanges()) {
    if (!confirm('You have unsaved changes. Discard them?')) return;
  }
  createNewRow();
};
