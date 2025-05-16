// === scripts.js ===
// Purpose: Fetch JSON, define custom elements, and inject content into UL/LI and FORM
// HTML and CSS are in charge of layout, visibility, and user interaction

// === Constants ===
const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

// === DOM Element References ===
const ul = document.querySelector('main article section ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('form fieldset');
const newButton = document.querySelector('button');

form.oninput = () => {}; // Reserved for future extension

// === Normalize Keys into Custom Tag Names ===
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

// === Custom Element Registry ===
const definedTags = new Map();

// === Define Form-Associated Custom Elements ===
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

// === Load Data from API and Render into UI ===
function load(endpoint) {
  console.log('[LOAD]', endpoint);
  fetch(endpoint)
    .then(res => res.json())
    .then(([data]) => {
      console.log('[LOADED]', data);

// ✅ ID Integrity Check
const seen = new Set();
const duplicates = [];

for (const item of data.items) {
  if (seen.has(item.id)) {
    duplicates.push(item.id);
  }
  seen.add(item.id);
}

if (duplicates.length) {
  console.error('[DUPLICATE ID DETECTED]', duplicates);
  alert(`Duplicate IDs found: ${duplicates.join(', ')}`);
  return; // ❌ Stop rendering
}

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
        input.oninput = () => updateFormFromSelectedRow();

        for (const [key, value] of Object.entries(item)) {
          try {
            const tag = normalizeKeyToTag(key);
            const finalTag = defineCustomElement(tag, key);
            if (!finalTag || !customElements.get(finalTag)) throw new Error(`Custom element <${finalTag}> is not defined.`);
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

// === Insert New Blank Row for Creation ===
function createNewRow() {
  const li = document.createElement('li');
  li.tabIndex = 0;

  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'list-item';
  input.hidden = true;
  input.checked = true;
  input.oninput = () => updateFormFromSelectedRow();
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

// === Track Form Original State ===
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

// === Initial Tab Fetch on Page Load ===
const selected = document.querySelector('nav input[name="nav"]:checked');
const label = selected?.closest('label');
const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
if (tab) load(`${BASE_URL}${tab}`);

// === Tab Switch Logic with Unsaved Change Check ===
document.querySelectorAll('nav input[name="nav"]').forEach(input => {
  input.onchange = () => {
    if (!input.checked) return;
    if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard them?')) return;
    const label = input.closest('label');
    const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    if (tab) load(`${BASE_URL}${tab}`);
  };
});

// === Add New Row on Button Click ===
newButton.onclick = () => {
  if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard them?')) return;
  createNewRow();
};

// === Save Handler (POST or PUT) ===
form.onsubmit = e => {
  e.preventDefault();
  const selected = document.querySelector('ul li input[type="radio"]:checked');
  const id = selected?.closest('li')?.querySelector('item-id')?.textContent?.trim();
  const tab = document.querySelector('nav input[name="nav"]:checked')?.closest('label')?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
  if (!tab) return;
  const data = {};
  fieldset.querySelectorAll('[contenteditable]').forEach(el => {
    const key = definedTags.get(el.tagName.toLowerCase());
    if (key) data[key] = el.textContent.trim();
  });
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${BASE_URL}${tab}/${id}` : `${BASE_URL}${tab}`;

  console.log('[FORM SUBMIT]');
  console.log('  ID:', id);
  console.log('  TAB:', tab);
  console.log('  METHOD:', method);
  console.log('  URL:', url);
  console.log('  PAYLOAD:', data);

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => load(`${BASE_URL}${tab}`));
};

// === Reset Handler ===
form.onreset = () => {
  if (!confirm('Reset all changes?')) return;
  updateFormFromSelectedRow();
};

// === Delete Handler ===
document.querySelector('[data-delete]').onclick = () => {
  const selected = document.querySelector('ul li input[type="radio"]:checked');
  const id = selected?.closest('li')?.querySelector('item-id')?.textContent?.trim();
  const tab = document.querySelector('nav input[name="nav"]:checked')?.closest('label')?.textContent.trim().toLowerCase().replace(/\s+/g, '-');

  confirmAction('Delete this record?', { type: 'confirm' }).then(ok => {
    if (!selected || !id || !tab || !ok) return;

    console.log('[DELETE]');
    console.log('  ID:', id);
    console.log('  TAB:', tab);
    console.log('  URL:', `${BASE_URL}${tab}/${id}`);

    fetch(`${BASE_URL}${tab}/${id}`, { method: 'DELETE' })
      .then(() => load(`${BASE_URL}${tab}`));
  });
};


// === Reflect LI Data Into Form ===
function updateFormFromSelectedRow() {
  fieldset.innerHTML = '';
  const selectedRow = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
  if (!selectedRow) return;
  fieldset.innerHTML = '';
  selectedRow.querySelectorAll('label > *:not(input)').forEach(source => {
    const tag = source.tagName?.toLowerCase?.();
    if (!tag || !/^[a-z][a-z0-9\-]*-[a-z0-9\-]+$/.test(tag)) return;
    if (!customElements.get(tag)) return;
    try {
      const formEl = document.createElement(tag);
      const readOnlyTags = ['item-created', 'item-updated', 'item-modified', 'item-author'];
      formEl.contentEditable = !readOnlyTags.includes(tag);
      formEl.spellcheck = false;
      formEl.textContent = source.textContent;
      formEl.oninput = () => {
        source.textContent = formEl.textContent;
      };
      const wrap = document.createElement('label'); wrap.textContent = tag.replace(/^item-/, '') + ': '; wrap.appendChild(formEl); fieldset.appendChild(wrap);
    } catch (e) {
      console.warn(`Failed to create element <${tag}>:`, e);
    }
  });
  snapshotForm();
}


// === Modal Prompt Handler ===
function confirmAction(message, { type = 'confirm' } = {}) {
  return new Promise(resolve => {
    let modal = document.getElementById('modal-confirm');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-confirm';
      modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <p></p>
          <div class="modal-buttons"></div>
        </div>`;
      document.body.appendChild(modal);
    }

    modal.querySelector('p').textContent = message;
    const buttons = modal.querySelector('.modal-buttons');
    buttons.innerHTML = '';

    if (type === 'confirm') {
      ['Yes', 'No'].forEach(label => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.onclick = () => {
          modal.classList.remove('show');
          resolve(label === 'Yes');
        };
        buttons.appendChild(btn);
      });
    } else {
      const btn = document.createElement('button');
      btn.textContent = 'Dismiss';
      btn.onclick = () => {
        modal.classList.remove('show');
        resolve(false);
      };
      buttons.appendChild(btn);
    }

    modal.classList.add('show');
  });
}
