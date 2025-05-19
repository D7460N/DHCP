// === scripts.js (REWRITTEN: No Custom Elements, Fully Native Inputs) ===
// Purpose: Fetch JSON, inject content into UL/LI and FORM using native HTML form elements only

// === Constants ===
const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/'; // Base API URL

// === DOM Element References ===
const ul = document.querySelector('main article section ul'); // Target list container
const form = document.querySelector('aside form'); // Main editable form
const fieldset = form.querySelector('fieldset'); // Form field grouping
const newButton = document.querySelector('button'); // New row button

form.oninput = () => {
  const resetBtn = form.querySelector('button[type="reset"]');
  if (resetBtn) resetBtn.disabled = !hasUnsavedChanges();
}; // Reserved for future extension (placeholder)

// === Utility: Format ISO Date to input[type="datetime-local"] value ===
function formatDateForInput(str) {
  const d = new Date(str);
  if (isNaN(d)) return '';
  return d.toISOString().slice(0, 16); // Trims to format: YYYY-MM-DDTHH:MM
}

// === Live Mirror Handler: Reflect form edits into list view ===
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

// === Utility: Build appropriate input/select based on key-value ===
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

  element.oninput = mirrorToSelectedRow; // Enable live mirroring
  return element;
}

// === Load Data from API and Render into UI ===
function load(endpoint) {
  console.log('[LOAD]', endpoint);
  fetch(endpoint)
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
      const resetBtn = form.querySelector('button[type="reset"]');
      if (resetBtn) resetBtn.disabled = true;
    })
    .catch(err => console.error('Failed to load data:', err));
}

// === Reflect LI Data Into Form ===
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

  // Explicitly set initial button state correctly after snapshot
  const resetBtn = form.querySelector('button[type="reset"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  resetBtn.disabled = true;
  submitBtn.disabled = !form.checkValidity(); // crucial fix
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

  fieldset.innerHTML = '';
  const sampleFields = {
    "Name": "",
    "Type": "Host",
    "Created By": "Current User",
    "Date Created": new Date().toISOString()
  };

  Object.entries(sampleFields).forEach(([key, value]) => {
    const label = document.createElement('label');
    label.textContent = key + ': ';
    const input = createInputFromKey(key.toLowerCase().replace(/ /g, '-'), value);
    label.appendChild(input);
    fieldset.appendChild(label);
  });

  snapshotForm();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = false;
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

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => load(`${BASE_URL}${tab}`));
};

// === Form Reset ===
form.onreset = () => {
  if (!confirm('Reset all changes?')) return;
  updateFormFromSelectedRow();
  const resetBtn = form.querySelector('button[type="reset"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  resetBtn.disabled = true;
  submitBtn.disabled = true;
};


// === Delete Handler ===
document.querySelector('[data-delete]').onclick = () => {
  const selected = document.querySelector('ul li input[type="radio"]:checked');
  const id = selected?.closest('li')?.querySelector('span[data-key="id"]')?.textContent?.trim();
  const tab = document.querySelector('nav input[name="nav"]:checked')?.closest('label')?.textContent.trim().toLowerCase().replace(/\s+/g, '-');

  if (!selected || !id || !tab) {
    alert('Select a valid record to delete.');
    return;
  }

  confirmAction('Delete this record?', { type: 'confirm' }).then(ok => {
    if (!ok) return;
    fetch(`${BASE_URL}${tab}/${id}`, { method: 'DELETE' })
      .then(() => load(`${BASE_URL}${tab}`));
  });
};


// === Modal Confirmation ===
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

      // ❗️ Correct appending location within <app-container>
      document.querySelector('app-container').appendChild(modal);
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
