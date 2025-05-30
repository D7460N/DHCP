// === scripts.js (REWRITTEN: No Custom Elements, Fully Native Inputs) ===
// Purpose: Fetch JSON, inject content into UL/LI and FORM using native HTML form elements only

// === Constants ===
const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

// MARK: DOM ELEMENT REFERENCES
const headerUl = document.querySelector("main article ul[aria-hidden='true']");
const tableUl = document.querySelector("main article ul:last-of-type");
const form = document.querySelector("aside form");
const fieldset = form.querySelector("fieldset");
const mainEl = document.querySelector("main");
const newButton = document.querySelector("main article button");
const closeButton = document.querySelector('aside button[aria-label="Close"]');
const deleteButton = form.querySelector('button[aria-label="Delete"]');
const resetButton = form.querySelector('button[aria-label="Reset"]');
const submitButton = form.querySelector('button[aria-label="Save"]');
const navInputs = document.querySelectorAll('nav input[name="nav"]');



// === Utility: Format ISO Date to datetime-local ===
function formatDateForInput(str) {
  const d = new Date(str);
  if (isNaN(d)) return '';
  return d.toISOString().slice(0, 16);
}


// === Live Mirror Handler: Inline oninput for native form inputs ===
function mirrorToSelectedRow(event) {
  const input = event.target;
  const key = input.name;
  const selectedLi = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
  if (!selectedLi) return;

  const mirror = selectedLi.querySelector(`span[data-key="${key}"]`);
  if (mirror && !input.readOnly) {
    mirror.textContent = input.value;
  }
}

// === Utility: Create Input from Key and Value ===
function createInputFromKey(key, value) {
  const inputName = key;
  const val = value?.trim?.() ?? '';
  let element;

  const lowercaseVal = val.toLowerCase();
  const dhcpTypes = ['host', 'ip', 'url', 'file', 'service'];

  if (dhcpTypes.includes(lowercaseVal)) {
    element = document.createElement('select');
    element.name = inputName;
    element.required = true;

    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = 'Select Type';
    element.appendChild(emptyOpt);

    dhcpTypes.forEach(opt => {
      const o = document.createElement('option');
      o.value = o.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
      if (opt === lowercaseVal) o.selected = true;
      element.appendChild(o);
    });
  } else {
    element = document.createElement('input');
    element.name = inputName;
    element.value = val;

    if (key === 'id' || /^[a-f0-9\-]{36}$/.test(val)) {
      element.type = 'hidden';
      element.oninput = mirrorToSelectedRow;
      return element;
    }

    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(val)) {
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
  }

  // ✅ Always apply mirroring if editable
  element.oninput = mirrorToSelectedRow;
  return element;
}

form.oninput = () => {
  toggleResetButton()
  toggleSubmitButton()
}


// === Load Data from API and Render into UI ===
function load(endpoint) {
  console.log('[LOAD]', endpoint);
  fetchJSON(endpoint)
    .then(res => res.json())
    .then(([data]) => {
      console.log('[LOADED]', data);

      const seen = new Set();
      const duplicates = [];
      for (const item of data.items) {
        if (seen.has(item.id)) duplicates.push(item.id);
        seen.add(item.id);
      }
      if (duplicates.length) {
        console.error('[DUPLICATE ID DETECTED]', duplicates);
        alert(`Duplicate IDs found: ${duplicates.join(', ')}`);
        return;
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
        input.oninput = () => updateFormFromSelectedRow();
        label.appendChild(input);

        for (const [key, value] of Object.entries(item)) {
          const span = document.createElement('span');
          span.setAttribute('data-key', key);
          span.textContent = value;
          label.appendChild(span);
        }

        li.appendChild(label);
        ul.appendChild(li);
      });

      snapshotForm();
    })
    .catch(err => console.error('Failed to load data:', err));
}

// === Reflect LI Data Into Form (Native Inputs) ===
function updateFormFromSelectedRow() {
  fieldset.innerHTML = '';
  const selectedRow = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
  if (!selectedRow) return;

  selectedRow.querySelectorAll('label > span[data-key]').forEach(source => {
    const key = source.getAttribute('data-key');
    const value = source.textContent;

    const label = document.createElement('label');
    label.textContent = key.replace(/^item-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ': ';

    const input = createInputFromKey(key, value);
    label.appendChild(input);
    fieldset.appendChild(label);
  });

  snapshotForm();
}

// === Track Form Original State ===
let originalSnapshot = '';
function snapshotForm() {
  const items = fieldset.querySelectorAll('input, select');
  originalSnapshot = Array.from(items).map(el => el.value).join('|');
}
function hasUnsavedChanges() {
  const items = fieldset.querySelectorAll('input, select');
  const current = Array.from(items).map(el => el.value).join('|');
  return current !== originalSnapshot;
}
window.onbeforeunload = () => hasUnsavedChanges() ? true : undefined;

// === Initial Tab Fetch ===
const selected = document.querySelector('nav input[name="nav"]:checked');
const label = selected?.closest('label');
const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
if (tab) load(`${BASE_URL}${tab}`);

// === Tab Switch Logic ===
document.querySelectorAll('nav input[name="nav"]').forEach(input => {
  input.onchange = () => {
    if (!input.checked) return;
    if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard them?')) return;
    const label = input.closest('label');
    const tab = label?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    if (tab) load(`${BASE_URL}${tab}`);
  };
});

// === New Row Placeholder (NO FORM POPULATED YET) ===
newButton.onclick = () => {
  if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard them?')) return;
  alert('Row creation UI not yet implemented in rewritten script.');
};

// === Form Submit ===
form.onsubmit = e => {
  e.preventDefault();
  const selected = document.querySelector('ul li input[type="radio"]:checked');
  const id = selected?.closest('li')?.querySelector('span[data-key="id"]')?.textContent?.trim();
  const tab = document.querySelector('nav input[name="nav"]:checked')?.closest('label')?.textContent.trim().toLowerCase().replace(/\s+/g, '-');
  if (!tab) return;

  const data = {};
  fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
    if (!el.readOnly) data[el.name] = el.value.trim();
  });

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${BASE_URL}${tab}/${id}` : `${BASE_URL}${tab}`;

  console.log('[FORM SUBMIT]', { method, url, data });

  fetchJSON(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => load(`${BASE_URL}${tab}`));
};

// === Form Reset ===
form.onreset = () => {
  if (!confirm('Reset all changes?')) return;
  updateFormFromSelectedRow();
};

// === Delete Handler ===
document.querySelector('[data-delete]').onclick = () => {
  const selected = document.querySelector('ul li input[type="radio"]:checked');
  const id = selected?.closest('li')?.querySelector('span[data-key="id"]')?.textContent?.trim();
  const tab = document.querySelector('nav input[name="nav"]:checked')?.closest('label')?.textContent.trim().toLowerCase().replace(/\s+/g, '-');

  confirmAction('Delete this record?', { type: 'confirm' }).then(ok => {
    if (!selected || !id || !tab || !ok) return;
    fetchJSON(`${BASE_URL}${tab}/${id}`, { method: 'DELETE' }).then(() => load(`${BASE_URL}${tab}`));
  });
};

// === Modal Confirmation ===
async function confirmAction(message, { type = 'confirm' } = {}) {
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


// MARK: NEW ROW CREATION
newButton.onclick = async () => {
  if (
    hasUnsavedChanges() &&
    !(await confirmAction("You have unsaved changes. Discard them?", { type: "confirm" }))
  ) return;

  clearFieldset(fieldset);

  const keys = ["id", "itemName", "itemType", "itemCreated", "itemUpdated", "itemAuthor", "itemModified"];
  const item = {};
  keys.forEach(key => {
    item[key] = "";
    const label = document.createElement("label");
    label.textContent = toKebab(key).replace(/^item-/, "").replace(/-/g, " ").replace(/\w/g, c => c.toUpperCase()) + ": ";
    const input = createInputFromKey(key, "");
    label.appendChild(input);
    fieldset.appendChild(label);
  });

  const li = document.createElement("li");
  li.tabIndex = 0;
  const label = document.createElement("label");

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.name = "row-toggle";
  toggle.hidden = true;
  toggle.oninput = handleRowToggle;
  label.appendChild(toggle);

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "list-item";
  input.hidden = true;
  input.oninput = () => updateFormFromSelectedRow();
  label.appendChild(input);

  for (const [key, value] of Object.entries(item)) {
    const el = document.createElement(toKebab(key));
    el.textContent = value ?? "";
    label.appendChild(el);
  }

  li.appendChild(label);
  tableUl.prepend(li);

  const headerLi = headerUl.querySelector("li");
  if (headerLi && headerLi.childElementCount === 0) {
    keys.forEach(key => {
      const headerEl = document.createElement(toKebab(key));
      headerEl.textContent = toKebab(key).replace(/^item-/, "").replace(/-/g, " ").replace(/\w/g, (c) => c.toUpperCase());
      headerLi.appendChild(headerEl);
    });
  }

  li.querySelector('input[name="list-item"]').checked = true;
  snapshotForm();
  toggleResetButton();
};

// MARK: CLOSE ASIDE
closeButton.onclick = () => {
  const closeAside = () => {
    const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest("li");
    if (selected) {
      const radio = selected.querySelector('input[name="list-item"]');
      const toggle = selected.querySelector('input[name="row-toggle"]');
      if (radio) radio.checked = false;
      if (toggle) toggle.checked = false;
    }
    clearFieldset(fieldset);
    form.oninput();
    removeInlineStyles(mainEl);
    snapshotForm();
  };

  if (hasUnsavedChanges()) {
    confirmAction("You have unsaved changes. Discard them?", {
      type: "confirm",
    }).then((ok) => {
      if (ok) closeAside();
    });
  } else {
    closeAside();
  }
};

// MARK: REGISTER CUSTOM ELEMENTS
function initCustomEls(keys) {
  keys.forEach((key) => {
    const tag = toKebab(key);
    if (tag.includes("-")) {
      document.createElement(tag);
    }
  });
}