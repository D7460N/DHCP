// MARK: SCRIPTS.JS

// Purpose: Fetch JSON and inject values using custom elements generated from API keys

let NAV_DATA = {} // holds nav-content JSON


// MARK: CONSTANTS
const BASE_URL = "https://67d944ca00348dd3e2aa65f4.mockapi.io/" // Base API URL

// MARK: DOM ELEMENT REFERENCES
const headerUl = document.querySelector('main article ul[aria-hidden="true"]')
const tableUl = document.querySelector('main article ul[aria-hidden="true"] + ul')
const form = document.querySelector("aside form")
const fieldset = form.querySelector("fieldset")
const mainEl = document.querySelector("main")
const newButton = document.querySelector("main article button")
const closeButton = document.querySelector('aside button[aria-label="Close"]')
const deleteButton = form.querySelector('button[aria-label="Delete"]')
const resetButton = form.querySelector('button[aria-label="Reset"]')
const submitButton = form.querySelector('button[aria-label="Save"]')
const navInputs = document.querySelectorAll('nav input[name="nav"]')

const ENDPOINTS = []

// MARK: UTILITY FUNCTIONS

// Fetch & Data Handling
function fetchJSON(url) { return fetch(url).then((r) => r.json()) }
function loadEndpoints() {
  return fetchJSON(`${BASE_URL}nav-content`).then(([data]) => {
    NAV_DATA = data; // store full nav content

    const keys = Object.keys(data || {});
    ENDPOINTS.splice(0, ENDPOINTS.length, ...keys);

    const navSection = document.querySelector('nav details > section');
    if (!navSection) return;

    navSection.innerHTML = '';

    keys.forEach((key, i) => {
      const { title } = data[key] || {};

      const label = document.createElement('label');
      label.textContent = title;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'nav';
      input.value = key; // key = endpoint
      input.hidden = true;
      if (i === 0) input.checked = true;

      label.appendChild(input);
      navSection.appendChild(label);
    });
  });
}


function isValidEndpoint(name) {
  return ENDPOINTS.includes(name)
}
// String & Format Utilities
function toKebab(str) {
  let dashed = str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase()

  if (!dashed.includes("-")) {
    if (
      /^(name|type|id|date|time|url|ip|count|size|set|list|item)$/.test(dashed)
    ) {
      dashed = `${dashed}-`
    } else {
      dashed = dashed.replace(
        /(name|type|id|date|time|url|ip|count|size|set|list|item)$/,
        "-$1"
      )
    }
  }
  if (!dashed.includes("-")) dashed = `${dashed}-`
  if (dashed.startsWith("-")) dashed = `${dashed.slice(1)}-`
  return dashed
}
function toCamel(str) {
  let result = str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  if (result.endsWith("-")) result = result.slice(0, -1)
  return result
}
function formatDateForInput(str) {
  const d = new Date(str)
  if (isNaN(d)) return ""
  return d.toISOString().slice(0, 16) // Trims to format: YYYY-MM-DDTHH:MM
}

// MARK: Custom Element Utilities
async function loadEndpoint(endpoint) {
  console.log("[LOAD]", endpoint);

  // Clear existing content first
  headerUl.querySelectorAll("li").forEach(li => li.innerHTML = "");
  tableUl.innerHTML = "";

  const headerLi = headerUl.querySelector("li");
  if (headerLi) {
    headerLi.innerHTML = ""; // clears content of li but preserves the li itself
  }

  try {
    const [data] = await fetchJSON(endpoint);
    console.log("[LOADED]", data);

    const keys = Object.keys(data.items[0] || {});

    // Explicitly populate the header independently
    keys.forEach(key => {
      const el = document.createElement(toKebab(key));
      el.textContent = toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      headerLi.appendChild(el);
    });

    initCustomEls(keys);

    const seen = new Set();
    const duplicates = [];

    for (const item of data.items) {
      if (seen.has(item.id)) duplicates.push(item.id);
      seen.add(item.id);
    }

    if (duplicates.length) {
      console.error("[DUPLICATE ID DETECTED]", duplicates);
      await confirmAction(`Duplicate IDs found: ${duplicates.join(", ")}`, { type: "alert" });
      return;
    }

    fieldset.innerHTML = "";

    const article = document.querySelector("main article");
    const h1 = article?.querySelector("h1");
    const intro = article?.querySelector("p");
    if (h1) h1.textContent = data.title ?? "";
    if (intro) intro.textContent = data.intro ?? "";

    // Populate table rows separately
    data.items.forEach((item) => {
      const li = createListItem(item);
      tableUl.appendChild(li);
    });

    snapshotForm();
    toggleResetButton();
  } catch (err) {
    console.error("Failed to load data:", err);
    await confirmAction("Failed to load data.", { type: "alert" });
  }
}




// DOM Manipulation Utilities
function removeInlineStyles(element) {
  if (element && element instanceof HTMLElement) {
    element.removeAttribute("style")
  }
}
function clearFieldset(fieldsetElement) {
  if (fieldsetElement && fieldsetElement instanceof HTMLElement) {
    fieldsetElement.innerHTML = ""
  }
}

// Validation Utilities
function isValid() {
  return form.checkValidity();
}
function hasUnsavedChanges() {
  return Array.from(
    fieldset.querySelectorAll("input[name], select[name]")
  ).some((el) => el.value !== originalData[el.name])
}

// Modal & UI Utilities
function showModal({ title = "", message = "", buttons = [] }) {
  return new Promise((resolve) => {
    const modal = document.querySelector("modal-")
    if (!modal) return resolve(null)

    modal.querySelector("h4").textContent = title
    modal.querySelector("p").textContent = message

    const modalButtons = modal.querySelectorAll("button")
    modalButtons.forEach((btn, index) => {
      const buttonData = buttons[index]
      btn.textContent = buttonData ? buttonData.label : ""
      btn.onclick = buttonData
        ? () => {
          clearModal()
          resolve(buttonData.value)
        }
        : null
    })

    function clearModal() {
      modal.querySelector("h4").textContent = ""
      modal.querySelector("p").textContent = ""
      modalButtons.forEach((btn) => {
        btn.textContent = ""
        btn.onclick = null
      })
    }
  })
}

// Form State Utilities
// MARK: TRACK FROM ORIGINAL STATE
let originalData = {}
let snapshotLi = null
function snapshotForm() {
  originalData = {}
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    originalData[el.name] = el.value
  })
  snapshotLi = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li")
  toggleResetButton()
  toggleSubmitButton()
}
function restoreForm() {
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    if (Object.prototype.hasOwnProperty.call(originalData, el.name)) {
      el.value = originalData[el.name]
    }
  })

  if (snapshotLi) {
    snapshotLi.querySelectorAll("label > *:not(input)").forEach((el) => {
      const key = toCamel(el.tagName.toLowerCase())
      if (Object.prototype.hasOwnProperty.call(originalData, key)) {
        el.textContent = originalData[key]
      }
    })
  }
}
function toggleResetButton() {
  if (!resetButton) return
  const dirty = hasUnsavedChanges()
  resetButton.disabled = !dirty
  form.dataset.dirty = dirty ? "true" : "false"
}
function toggleSubmitButton() {
  if (!submitButton) return
  const dirty = hasUnsavedChanges()
  const valid = form.checkValidity()
  submitButton.disabled = !(dirty && valid)
}
function initCustomEls(keys) {
  keys.forEach((key) => {
    const tag = toKebab(key);
    if (tag.includes("-")) {
      document.createElement(tag);
    }
  });
}
function updateFormFromSelectedRow() {
  fieldset.innerHTML = ""
  const selectedRow = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li")
  if (!selectedRow) {
    removeInlineStyles(mainEl) // <- Clear main inline styles
    snapshotForm()
    form.oninput()
    return
  }

  selectedRow.querySelectorAll("label > *:not(input)").forEach((source) => {
    const key = toCamel(source.tagName.toLowerCase())
    const value = source.textContent

    const label = document.createElement("label")
    label.textContent =
      toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) + ": "

    const input = createInputFromKey(key, value)
    label.appendChild(input)
    fieldset.appendChild(label)
  })

  snapshotForm()
  toggleResetButton()
}

// MARK: List & Row Utilities
function handleRowToggle(event) {
  const checkbox = event.target
  const li = checkbox.closest("li")
  const radio = li.querySelector('input[type="radio"][name="list-item"]')

  if (checkbox.checked) {
    tableUl.querySelectorAll('input[name="row-toggle"]').forEach((cb) => {
      if (cb !== checkbox) cb.checked = false
    })
  }

  radio.checked = checkbox.checked
  radio.dispatchEvent(new Event("input", { bubbles: true }))
}
function createListItem(item = {}) {
  const li = document.createElement("li")
  li.tabIndex = 0

  const label = document.createElement("label")

  const toggle = document.createElement("input")
  toggle.type = "checkbox"
  toggle.name = "row-toggle"
  toggle.hidden = true
  toggle.oninput = handleRowToggle
  label.appendChild(toggle)

  const input = document.createElement("input")
  input.type = "radio"
  input.name = "list-item"
  input.hidden = true
  input.oninput = () => updateFormFromSelectedRow()
  label.appendChild(input)

  for (const [key, value] of Object.entries(item)) {
    const el = document.createElement(toKebab(key))
    el.textContent = value ?? ""
    label.appendChild(el)
  }

  li.appendChild(label)
  return li
}
function updateHeaderRow(sourceRow) {
  const headerLi = headerUl?.querySelector("li")
  if (!headerLi || !sourceRow) return

  // Reuse list cleanup pattern from load()
  headerLi.innerHTML = ""

  sourceRow.querySelectorAll("label > *:not(input)").forEach((el) => {
    const key = toCamel(el.tagName.toLowerCase())
    const clone = el.cloneNode(false)
    clone.textContent = toKebab(key)
      .replace(/^item-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    headerLi.appendChild(clone)
  })
}
// MARK: OFF-LINE
let offlineInterval
let offlineStartTime
window.ononline = updateOnlineStatus
window.onoffline = updateOnlineStatus
updateOnlineStatus()
function updateOnlineStatus() {
  const offlineMsg = document.querySelector("off-line p")

  if (navigator.onLine) {
    clearInterval(offlineInterval)
    offlineMsg.textContent = ""
  } else {
    offlineStartTime = Date.now()

    offlineInterval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - offlineStartTime) / 1000)
      offlineMsg.textContent = `Offline [ (${elapsedSec}s elapsed) ]`
    }, 1000)
  }
}
function mirrorToSelectedRow(event) {
  const input = event.target
  const key = input.name
  const selectedLi = document
    .querySelector('ul li input[name="list-item"]:checked')
    ?.closest("li")
  if (!selectedLi) return

  const mirror = selectedLi.querySelector(`label > ${toKebab(key)}`)
  if (mirror && !input.readOnly) {
    mirror.textContent = input.value
  }
}
function createInputFromKey(key, value) {
  const inputName = key
  const val = value?.trim?.() ?? ""
  let element

  const lowercaseVal = val.toLowerCase()
  const dhcpTypes = ["host", "ip", "url", "file", "service"]

  if (dhcpTypes.includes(lowercaseVal)) {
    element = document.createElement("select")
    element.name = inputName
    element.required = true

    const emptyOpt = document.createElement("option")
    emptyOpt.value = ""
    emptyOpt.textContent = "Select Type"
    element.appendChild(emptyOpt)

    dhcpTypes.forEach((opt) => {
      const o = document.createElement("option")
      o.value = o.textContent = opt.charAt(0).toUpperCase() + opt.slice(1)
      if (opt === lowercaseVal) o.selected = true
      element.appendChild(o)
    })
  } else {
    element = document.createElement("input")
    element.name = inputName
    element.value = val

    if (key === "id" || /^[a-f0-9\-]{36}$/.test(val)) {
      element.type = "hidden"
      element.oninput = mirrorToSelectedRow
      return element
    }

    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(val)) {
      element.type = "datetime-local"
      element.readOnly = true
      element.tabIndex = -1
      element.value = formatDateForInput(val)
    } else if (/author|modified|created|updated/.test(key)) {
      element.type = "text"
      element.readOnly = true
      element.tabIndex = -1
    } else {
      element.type = "text"
      element.required = val !== ""
      element.pattern = ".+"
    }
  }

  element.oninput = mirrorToSelectedRow // Enable live mirroring
  return element
}
form.oninput = () => {
  toggleResetButton()
  toggleSubmitButton()
}


// MARK: MAIN APPLICATION LOGIC

// MARK: INITIAL TAB FETCH
loadEndpoints().then(() => {
  document.querySelectorAll('nav input[name="nav"]').forEach((input) => {
    input.onchange = () => {
      if (!input.checked) return

      const proceed = () => {
        const label = input.closest("label")
        const endpoint = input.value
        if (endpoint) loadEndpoint(`${BASE_URL}${endpoint}`)
      }

      if (hasUnsavedChanges()) {
        confirmAction("You have unsaved changes. Discard them?", {
          type: "confirm",
        }).then((ok) => {
          if (ok) proceed()
        })
      } else {
        proceed()
      }
    }
  })

  const selected = document.querySelector('nav input[name="nav"]:checked');
  if (selected?.onchange) selected.onchange()
});

// MARK: NEW ROW CREATION
newButton.onclick = async () => {
  if (
    hasUnsavedChanges() &&
    !(await confirmAction("You have unsaved changes. Discard them?", { type: "confirm" }))
  )
    return;

  fieldset.innerHTML = "";

  // Attempt to get keys from the first existing table row
  const existingLi = tableUl.querySelector("li");

  let keys;

  if (existingLi) {
    // Keys from existing table row
    keys = Array.from(existingLi.querySelectorAll("label > *:not(input)"))
      .map(el => toCamel(el.tagName.toLowerCase()));
  } else {
    // 🚩 Minimal default fallback schema
    keys = ["id", "name", "description", "created", "updated"];
  }

  const item = {};

  keys.forEach((key) => {
    item[key] = ""; // Initialize empty values

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
  tableUl.prepend(li);

  // Handle headers explicitly
  const headerLi = headerUl.querySelector("li");
  if (headerLi && headerLi.childElementCount === 0) {
    keys.forEach(key => {
      const headerEl = document.createElement(toKebab(key));
      headerEl.textContent = toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      headerLi.appendChild(headerEl);
    });
  }

  li.querySelector('input[name="list-item"]').checked = true;
  snapshotForm();
  toggleResetButton();
};


// MARK: FORM SUBMIT
form.onsubmit = (e) => {
  e.preventDefault()
  const selected = document.querySelector('ul li input[name="list-item"]:checked');
  const id = selected?.closest("li")?.querySelector("label > id")?.textContent?.trim();
  const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
  if (!endpoint) return;

  const data = {};
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    if (!el.readOnly) data[el.name] = el.value.trim();
  });

  const method = id ? "PUT" : "POST";
  const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;

  console.log("[FORM SUBMIT]", { method, url, data });

  showModal({
    title: "Please Confirm",
    message: "Save changes?",
    buttons: [{ label: "Yes", value: true }, { label: "No", value: false }],
  })

    .then((confirmed) => {
      if (!confirmed) return; // Explicitly stop if user clicks "No"

      return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    })

    .then((res) => {
      if (res && res.ok !== false) {
        showModal({
          title: "Success",
          message: "Changes saved successfully.",
          buttons: [{ label: "OK", value: true }],
        });
        loadEndpoint(`${BASE_URL}${endpoint}`);
      } else if (res && res.ok === false) {
        throw new Error("Network response was not ok.");
      }
    })

    .catch((err) => {
      console.error("Failed to save record:", err);
      showModal({
        title: "Error",
        message: "Error saving record.",
        buttons: [{ label: "OK", value: true }],
      });
    });
};

// MARK: FORM RESET
form.onreset = (e) => {
  e.preventDefault()
  confirmAction("Reset all changes?", { type: "confirm" }).then((ok) => {
    if (!ok) return
    restoreForm() // explicitly restore original state instead of clearing
    snapshotForm()
  })
}

// MARK: DELETE HANDLER
deleteButton.onclick = async () => {
  const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest("li");

  if (!selected) {
    await confirmAction("No row selected to delete.", { type: "alert" });
    return;
  }

  const idEl = selected.querySelector("label > id");
  const id = idEl?.textContent?.trim();

  const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;

  if (!id) {
    const confirmClear = await confirmAction("Discard unsaved new record?", { type: "confirm" });
    if (confirmClear) {
      selected.remove();                 // Remove the new unsaved row
      clearFieldset(fieldset);           // Clear the form fields

      // Explicitly clear the header as well
      const headerLi = headerUl.querySelector("li");
      if (headerLi) headerLi.innerHTML = "";

      snapshotForm();                    // Reset the snapshot state
      toggleResetButton();               // Disable/reset buttons
      toggleSubmitButton();              // Disable submit button
    }
    return;
  }

  const confirmDelete = await confirmAction("Delete this record?", { type: "confirm" });
  if (!confirmDelete) return;

  try {
    await fetch(`${BASE_URL}${endpoint}/${id}`, { method: "DELETE" });
    await loadEndpoint(`${BASE_URL}${endpoint}`); // refresh the table
  } catch (err) {
    console.error("Failed to delete:", err);
    await confirmAction("Failed to delete record.", { type: "alert" });
  }
};



// MARK: CLOSE ASIDE
closeButton.onclick = () => {
  const closeAside = () => {
    const selected = document.querySelector('ul li input[name="list-item"]:checked')?.closest("li")

    if (selected) {
      const radio = selected.querySelector('input[name="list-item"]')
      const toggle = selected.querySelector('input[name="row-toggle"]')
      if (radio) radio.checked = false
      if (toggle) toggle.checked = false
    }

    clearFieldset(fieldset) // <-- Call your new utility clearly
    form.oninput()

    removeInlineStyles(mainEl)

    snapshotForm()
  }
  if (hasUnsavedChanges()) {
    confirmAction("You have unsaved changes. Discard them?", {
      type: "confirm",
    }).then((ok) => {
      if (ok) closeAside()
    })
  } else {
    closeAside()
  }
}

// === confirmAction using Unified Modal ===
function confirmAction(message, { type = "confirm" } = {}) {
  const config = {
    title: type === "confirm" ? "Please Confirm" : "Notice",
    message,
    buttons:
      type === "confirm"
        ? [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]
        : [{ label: "OK", value: true }],
  }

  return showModal(config)
}

// MARK: APPLICATION-LEVEL EVENT HANDLERS (Before Unload Warning)
window.onbeforeunload = (e) => {
  if (!hasUnsavedChanges()) return;
  e.preventDefault();
  confirmAction("You have unsaved changes. Reload and discard them?", {
    type: "confirm",
  }).then((ok) => {
    if (ok) location.reload();
  });
  return ""; // Needed for browser compatibility
};
