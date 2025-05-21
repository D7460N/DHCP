// === scripts.js (REWRITTEN: No Custom Elements, Fully Native Inputs) ===
// Purpose: Fetch JSON, inject content into UL/LI and FORM using native HTML form elements only

// === Constants ===
const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/'; // Base API URL

// === DOM Element References ===
const ul = document.querySelector('main article section ul');
const form = document.querySelector('aside form');
const fieldset = form.querySelector('fieldset');
const newButton = document.querySelector('button');
const resetButton = form.querySelector('[data-reset]');

form.oninput = () => {
  toggleResetButton();
};

// === Utility: Format ISO Date to input[type="datetime-local"] value ===
function formatDateForInput(str) {
  const d = new Date(str);
  if (isNaN(d)) return '';
  return d.toISOString().slice(0, 16); // Trims to format: YYYY-MM-DDTHH:MM
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

// === Header Columns Generator ===
function updateHeaderRow(sourceRow) {
  const headerLi = document.querySelector('main article > ul li')
  if (!headerLi || !sourceRow) return

  // Reuse list cleanup pattern from load()
  headerLi.innerHTML = ''

  // Adapt span[data-key] query from updateFormFromSelectedRow()
  sourceRow.querySelectorAll('span[data-key]').forEach(spanSource => {
    const key = spanSource.getAttribute('data-key')
    const clone = spanSource.cloneNode(false)
    clone.textContent = key
      .replace(/^item-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    headerLi.appendChild(clone)
  })
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

      const firstRow = ul.querySelector('li')
      if (firstRow) updateHeaderRow(firstRow)

      snapshotForm();
      toggleResetButton();
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
  toggleResetButton();
}

// === Track Form Original State ===
let originalData = {};
let snapshotLi = null;
function snapshotForm() {
  originalData = {};
  fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
    originalData[el.name] = el.value;
  });
  snapshotLi = document.querySelector('ul li input[type="radio"]:checked')?.closest('li');
  toggleResetButton();
}
function hasUnsavedChanges() {
  return Array.from(fieldset.querySelectorAll('input[name], select[name]')).some(el => el.value !== originalData[el.name]);
}
window.onbeforeunload = () => hasUnsavedChanges() ? true : undefined;

function toggleResetButton() {
  if (!resetButton) return;
  const dirty = hasUnsavedChanges();
  resetButton.disabled = !dirty;
  form.dataset.dirty = dirty ? 'true' : 'false';
}

function restoreForm() {
  fieldset.querySelectorAll('input[name], select[name]').forEach(el => {
    if (Object.prototype.hasOwnProperty.call(originalData, el.name)) {
      el.value = originalData[el.name];
    }
  });

  if (snapshotLi) {
    snapshotLi.querySelectorAll('span[data-key]').forEach(span => {
      const key = span.getAttribute('data-key');
      if (Object.prototype.hasOwnProperty.call(originalData, key)) {
        span.textContent = originalData[key];
      }
    });
  }
}

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

// === New Row Creation ===
newButton.onclick = () => {
  if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard them?')) return;

  fieldset.innerHTML = '';

  const templateRow = ul.querySelector('li');
  if (!templateRow) return;

  const li = document.createElement('li');
  li.tabIndex = 0;

  const label = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'list-item';
  radio.hidden = true;
  radio.oninput = () => updateFormFromSelectedRow();
  label.appendChild(radio);

  templateRow.querySelectorAll('span[data-key]').forEach(spanT => {
    const key = spanT.getAttribute('data-key');
    const span = document.createElement('span');
    span.setAttribute('data-key', key);
    span.textContent = '';
    label.appendChild(span);

    const formLabel = document.createElement('label');
    formLabel.textContent = key.replace(/^item-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ': ';
    const input = createInputFromKey(key, '');
    formLabel.appendChild(input);
    fieldset.appendChild(formLabel);
  });

  li.appendChild(label);
  ul.appendChild(li);

  // Apply header update using same span[data-key] loop logic
  updateHeaderRow(li)
  radio.checked = true;

  snapshotForm();
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
  })
    .then(() => confirmAction('Record saved.', { type: 'alert' }))
    .then(() => load(`${BASE_URL}${tab}`))
    .catch(err => {
      console.error('Failed to save record:', err);
      confirmAction('Error saving record.', { type: 'alert' });
    });
};

// === Form Reset ===
form.onreset = e => {
  e.preventDefault();
  if (!confirm('Reset all changes?')) return;
  restoreForm();
  snapshotForm();
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
function confirmAction(title, message, { type = 'confirm' } = {}) {
  return new Promise(resolve => {
    const modal = document.querySelector('modal-confirm');
    modal.querySelector('h4').textContent = title;
    modal.querySelector('p').textContent = message;

    const [btnPrimary, btnSecondary] = modal.querySelectorAll('button');

    if (type === 'confirm') {
      btnPrimary.textContent = 'Yes';
      btnSecondary.textContent = 'No';

      btnPrimary.onclick = () => {
        clearModal();
        resolve(true);
      };

      btnSecondary.onclick = () => {
        clearModal();
        resolve(false);
      };
    } else {
      btnPrimary.textContent = 'Dismiss';
      btnPrimary.onclick = () => {
        clearModal();
        resolve();
      };
      btnSecondary.textContent = ''; // hide secondary button
      btnSecondary.onclick = null;
    }

    function clearModal() {
      modal.querySelector('h4').textContent = '';
      modal.querySelector('p').textContent = '';
      btnPrimary.textContent = '';
      btnSecondary.textContent = '';
    }
  });
}
