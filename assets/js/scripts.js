// MARK: SCRIPTS.JS

// Purpose: Fetch JSON and inject values using custom elements generated from API keys

// MARK: CONSTANTS
const BASE_URL = "https://67d944ca00348dd3e2aa65f4.mockapi.io/"; // Base API URL

// MARK: DOM ELEMENT REFERENCES
const headerUl = document.querySelector("main article ul[aria-hidden='true']");
const ul = document.querySelector("main article ul[aria-hidden='true'] + ul");
const form = document.querySelector("aside form");
const fieldset = form.querySelector("fieldset");
const newButton = document.querySelector("main article button");
const deleteButton = form.querySelector('button[name="delete"]');
const resetButton = form.querySelector('button[name="reset"]');
const submitButton = form.querySelector('button[name="submit"]');
const navInputs = document.querySelectorAll('nav input[name="nav"]');

const ENDPOINTS = [];

function fetchJSON(url) {
  return fetch(url).then((r) => r.json());
}

function loadEndpoints() {
  return fetchJSON(`${BASE_URL}nav-content`).then(([data]) => {
    const keys = Object.keys(data || {});
    ENDPOINTS.splice(0, ENDPOINTS.length, ...keys);
    navInputs.forEach((input, i) => {
      const ep = keys[i];
      if (ep) input.value = ep;
    });
  });
}

function isValidEndpoint(name) {
  return ENDPOINTS.includes(name);
}

function toKebab(str) {
  let dashed = str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

  if (!dashed.includes("-")) {
    if (/^(name|type|id|date|time|url|ip|count|size|set|list|item)$/.test(dashed)) {
      dashed = `${dashed}-`;
    } else {
      dashed = dashed.replace(
        /(name|type|id|date|time|url|ip|count|size|set|list|item)$/,
        "-$1",
      );
    }
  }

  if (!dashed.includes("-")) dashed = `${dashed}-`;

  if (dashed.startsWith("-")) dashed = `${dashed.slice(1)}-`;

  return dashed;
}

function toCamel(str) {
  let result = str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (result.endsWith("-")) result = result.slice(0, -1);
  return result;
}

function registerCustomElements(keys) {
  keys.forEach((key) => {
    const tag = toKebab(key);
    if (tag.includes("-")) {
      document.createElement(tag);
    }
  });
}

form.oninput = () => {
  toggleResetButton();
  toggleSubmitButton();
};

// MARK: UTILITY: FORMAT ISO DATE TO INPUT[TYPE="DATETIME-LOCAL"] VALUE
function formatDateForInput(str) {
  const d = new Date(str);
  if (isNaN(d)) return "";
  return d.toISOString().slice(0, 16); // Trims to format: YYYY-MM-DDTHH:MM
}

// MARK: LIVE MIRROR HANDLER: INLINE ONINPUT FOR NATIVE FORM INPUTS
function mirrorToSelectedRow(event) {
  const input = event.target;
  const key = input.name;
  const selectedLi = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li");
  if (!selectedLi) return;

  const mirror = selectedLi.querySelector(`label > ${toKebab(key)}`);
  if (mirror && !input.readOnly) {
    mirror.textContent = input.value;
  }
}

// MARK: UTILITY: BUILD APPROPRIATE INPUT/SELECT BASED ON KEY-VALUE
function createInputFromKey(key, value) {
  const inputName = key;
  const val = value?.trim?.() ?? "";
  let element;

  const lowercaseVal = val.toLowerCase();
  const dhcpTypes = ["host", "ip", "url", "file", "service"];

  if (dhcpTypes.includes(lowercaseVal)) {
    element = document.createElement("select");
    element.name = inputName;
    element.required = true;

    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "Select Type";
    element.appendChild(emptyOpt);

    dhcpTypes.forEach((opt) => {
      const o = document.createElement("option");
      o.value = o.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
      if (opt === lowercaseVal) o.selected = true;
      element.appendChild(o);
    });
  } else {
    element = document.createElement("input");
    element.name = inputName;
    element.value = val;

    if (key === "id" || /^[a-f0-9\-]{36}$/.test(val)) {
      element.type = "hidden";
      element.oninput = mirrorToSelectedRow;
      return element;
    }

    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(val)) {
      element.type = "datetime-local";
      element.readOnly = true;
      element.tabIndex = -1;
      element.value = formatDateForInput(val);
    } else if (/author|modified|created|updated/.test(key)) {
      element.type = "text";
      element.readOnly = true;
      element.tabIndex = -1;
    } else {
      element.type = "text";
      element.required = val !== "";
      element.pattern = ".+";
    }
  }

  element.oninput = mirrorToSelectedRow; // Enable live mirroring
  return element;
}

// MARK: HEADER COLUMNS GENERATOR
function updateHeaderRow(sourceRow) {
  const headerLi = headerUl?.querySelector("li");
  if (!headerLi || !sourceRow) return;

  // Reuse list cleanup pattern from load()
  headerLi.innerHTML = "";

  sourceRow.querySelectorAll("label > *:not(input)").forEach((el) => {
    const key = toCamel(el.tagName.toLowerCase());
    const clone = el.cloneNode(false);
    clone.textContent = toKebab(key)
      .replace(/^item-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    headerLi.appendChild(clone);
  });
}

// MARK: LIST ITEM FACTORY
function createListItem(item = {}) {
  const li = document.createElement("li");
  li.tabIndex = 0;

  const label = document.createElement("label");
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
  return li;
}

// MARK: LOAD DATA FROM API AND RENDER INTO UI
function load(endpoint) {
  console.log("[LOAD]", endpoint);
  fetchJSON(endpoint)
    .then(([data]) => {
      console.log("[LOADED]", data);

      registerCustomElements(Object.keys(data.items[0] || {}));

      const seen = new Set();
      const duplicates = [];
      for (const item of data.items) {
        if (seen.has(item.id)) duplicates.push(item.id);
        seen.add(item.id);
      }
      if (duplicates.length) {
        console.error("[DUPLICATE ID DETECTED]", duplicates);
        alert(`Duplicate IDs found: ${duplicates.join(", ")}`);
        return;
      }

      ul.innerHTML = "";
      fieldset.innerHTML = "";

      const article = document.querySelector("main article:has(h1)");
      const h1 = article?.querySelector("h1");
      const intro = article?.querySelector("p");
      if (h1) h1.textContent = data.title ?? "";
      if (intro) intro.textContent = data.intro ?? "";

      data.items.forEach((item) => {
        const li = createListItem(item);
        ul.appendChild(li);
      });

      const firstRow = ul.querySelector("li");
      if (firstRow) updateHeaderRow(firstRow);

      snapshotForm();
      toggleResetButton();
    })
    .catch((err) => console.error("Failed to load data:", err));
}

// MARK: REFLECT LI DATA INTO FORM
function updateFormFromSelectedRow() {
  fieldset.innerHTML = "";
  const selectedRow = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li");
  if (!selectedRow) return;

  selectedRow.querySelectorAll("label > *:not(input)").forEach((source) => {
    const key = toCamel(source.tagName.toLowerCase());
    const value = source.textContent;

    const label = document.createElement("label");
    label.textContent =
      toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) + ": ";

    const input = createInputFromKey(key, value);
    label.appendChild(input);
    fieldset.appendChild(label);
  });

  snapshotForm();
  toggleResetButton();
}

// MARK: TRACK FROM ORIGINAL STATE
let originalData = {};
let snapshotLi = null;
function snapshotForm() {
  originalData = {};
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    originalData[el.name] = el.value;
  });
  snapshotLi = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li");
  toggleResetButton();
  toggleSubmitButton();
}
function hasUnsavedChanges() {
  return Array.from(
    fieldset.querySelectorAll("input[name], select[name]"),
  ).some((el) => el.value !== originalData[el.name]);
}
window.onbeforeunload = () => (hasUnsavedChanges() ? true : undefined);

function toggleResetButton() {
  if (!resetButton) return;
  const dirty = hasUnsavedChanges();
  resetButton.disabled = !dirty;
  form.dataset.dirty = dirty ? "true" : "false";
}

function toggleSubmitButton() {
  if (!submitButton) return;
  const dirty = hasUnsavedChanges();
  const valid = form.checkValidity();
  submitButton.disabled = !(dirty && valid);
}

function restoreForm() {
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    if (Object.prototype.hasOwnProperty.call(originalData, el.name)) {
      el.value = originalData[el.name];
    }
  });

  if (snapshotLi) {
    snapshotLi.querySelectorAll("label > *:not(input)").forEach((el) => {
      const key = toCamel(el.tagName.toLowerCase());
      if (Object.prototype.hasOwnProperty.call(originalData, key)) {
        el.textContent = originalData[key];
      }
    });
  }
}

// MARK: INITIAL TAB FETCH
loadEndpoints().then(() => {
  const selected = document.querySelector('nav input[name="nav"]:checked');
  const firstEndpoint = selected?.value;
  if (isValidEndpoint(firstEndpoint)) load(`${BASE_URL}${firstEndpoint}`);
});

// MARK: TAB SWITCH LOGIC
document.querySelectorAll('nav input[name="nav"]').forEach((input) => {
  input.onchange = () => {
    if (!input.checked) return;
    if (
      hasUnsavedChanges() &&
      !confirm("You have unsaved changes. Discard them?")
    )
      return;
    const endpoint = input.value;
    if (isValidEndpoint(endpoint)) load(`${BASE_URL}${endpoint}`);
  };
});

// MARK: NEW ROW CREATION
newButton.onclick = () => {
  if (
    hasUnsavedChanges() &&
    !confirm("You have unsaved changes. Discard them?")
  )
    return;

  fieldset.innerHTML = "";

  const templateRow = ul.querySelector("li");
  if (!templateRow) return;

  const item = {};

  templateRow.querySelectorAll("label > *:not(input)").forEach((spanT) => {
    const key = toCamel(spanT.tagName.toLowerCase());

    item[key] = "";

    const formLabel = document.createElement("label");
    formLabel.textContent =
      toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) + ": ";
    const input = createInputFromKey(key, "");
    formLabel.appendChild(input);
    fieldset.appendChild(formLabel);
  });

  const li = createListItem(item);
  ul.prepend(li);

  updateHeaderRow(li);
  li.querySelector('input[name="list-item"]').checked = true;

  snapshotForm();
};

// MARK: FORM SUBMIT
form.onsubmit = (e) => {
  e.preventDefault();
  const selected = document.querySelector(
    'ul li input[name="list-item"]:checked',
  );
  const id = selected
    ?.closest("li")
    ?.querySelector("label > id")
    ?.textContent?.trim();
  const endpoint = document.querySelector(
    'nav input[name="nav"]:checked',
  )?.value;
  if (!endpoint) return;

  const data = {};
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    if (!el.readOnly) data[el.name] = el.value.trim();
  });

  const method = id ? "PUT" : "POST";
  const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;

  console.log("[FORM SUBMIT]", { method, url, data });

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => confirmAction("Record saved.", "", { type: "alert" }))
    .then(() => load(`${BASE_URL}${endpoint}`))
    .catch((err) => {
      console.error("Failed to save record:", err);
      confirmAction("Error saving record.", "", { type: "alert" });
    });
};

// MARK: FORM RESET
form.onreset = (e) => {
  e.preventDefault();
  if (!confirm("Reset all changes?")) return;
  restoreForm();
  snapshotForm();
};

// MARK: DELETE HANDLER
deleteButton.onclick = () => {
  const selected = document.querySelector(
    'ul li input[name="list-item"]:checked',
  );
  const id = selected
    ?.closest("li")
    ?.querySelector("label > id")
    ?.textContent?.trim();
  const endpoint = document.querySelector(
    'nav input[name="nav"]:checked',
  )?.value;

  if (!selected || !id || !endpoint) {
    alert("Select a valid record to delete.");
    return;
  }

  confirmAction("Delete this record?", "", { type: "confirm" }).then((ok) => {
    if (!ok) return;
    fetch(`${BASE_URL}${endpoint}/${id}`, { method: "DELETE" }).then(() =>
      load(`${BASE_URL}${endpoint}`),
    );
  });
};

// MARK: MODAL CONFIRMATION
function confirmAction(title, message = "", { type = "confirm" } = {}) {
  return new Promise((resolve) => {
    const modal = document.querySelector("modal-confirm");
    modal.querySelector("h4").textContent = title;
    modal.querySelector("p").textContent = message;

    const [btnPrimary, btnSecondary] = modal.querySelectorAll("button");

    if (type === "confirm") {
      btnPrimary.textContent = "Yes";
      btnSecondary.textContent = "No";

      btnPrimary.onclick = () => {
        clearModal();
        resolve(true);
      };

      btnSecondary.onclick = () => {
        clearModal();
        resolve(false);
      };
    } else {
      btnPrimary.textContent = "Dismiss";
      btnPrimary.onclick = () => {
        clearModal();
        resolve();
      };
      btnSecondary.textContent = ""; // hide secondary button
      btnSecondary.onclick = null;
    }

    function clearModal() {
      modal.querySelector("h4").textContent = "";
      modal.querySelector("p").textContent = "";
      btnPrimary.textContent = "";
      btnSecondary.textContent = "";
    }
  });
}

// MARK: OFF-LINE
let offlineInterval
let offlineStartTime

function updateOnlineStatus() {
  const offlineMsg = document.querySelector('off-line p')

  if (navigator.onLine) {
    clearInterval(offlineInterval)
    offlineMsg.textContent = ''
  } else {
    offlineStartTime = Date.now()

    offlineInterval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - offlineStartTime) / 1000)
      offlineMsg.textContent = `Offline [ (${elapsedSec}s elapsed) ]`
    }, 1000)
  }
}

window.ononline = updateOnlineStatus
window.onoffline = updateOnlineStatus

updateOnlineStatus()
