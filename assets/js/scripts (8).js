// scripts.js

// MARK: CONSTANTS
const BASE_URL = "https://67d944ca00348dd3e2aa65f4.mockapi.io/";

// MARK: UTILITY FUNCTIONS
function fetchJSON(url) {
  return fetch(url).then((r) => r.json());
}
function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}
function toCamel(str) {
  let result = str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (result.endsWith("-")) result = result.slice(0, -1);
  return result;
}
function formatDateForInput(str) {
  const d = new Date(str);
  if (isNaN(d)) return "";
  return d.toISOString().slice(0, 16);
}
function mirrorToSelectedRow(event) {
  const input = event.target;
  const key = input.name;
  const selectedLi = document.querySelector('ul li input[name="list-item"]:checked')?.closest("li");
  if (!selectedLi) return;
  const mirror = selectedLi.querySelector(`label > ${toKebab(key)}`);
  if (mirror && !input.readOnly) {
    mirror.textContent = input.value;
  }
}
function createInputFromKey(key, value) {
  const val = value?.trim?.() ?? "";
  let element;
  const lowercaseVal = val.toLowerCase();
  const dhcpTypes = ["host", "ip", "url", "file", "service"];

  if (dhcpTypes.includes(lowercaseVal)) {
    element = document.createElement("select");
    element.name = key;
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
    element.name = key;
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

  element.oninput = mirrorToSelectedRow;
  return element;
}
function removeInlineStyles(element) {
  if (element && element instanceof HTMLElement) {
    element.removeAttribute("style");
  }
}
function clearFieldset(fieldsetElement) {
  if (fieldsetElement && fieldsetElement instanceof HTMLElement) {
    fieldsetElement.innerHTML = "";
  }
  removeInlineStyles(document.querySelector("main"));
}
function isValid() {
  return document.querySelector("aside form").checkValidity();
}
function hasUnsavedChanges() {
  const original = window.originalData || {};
  return Array.from(document.querySelectorAll("fieldset input[name], select[name]"))
    .some((el) => el.value !== original[el.name]);
}
function snapshotForm() {
  const fieldset = document.querySelector("aside form fieldset");
  window.originalData = {};
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    window.originalData[el.name] = el.value;
  });
}
function toggleResetButton() {
  const resetButton = document.querySelector('button[aria-label="Reset"]');
  if (!resetButton) return;
  const dirty = hasUnsavedChanges();
  resetButton.disabled = !dirty;
  document.querySelector("form").dataset.dirty = dirty ? "true" : "false";
}
function toggleSubmitButton() {
  const submitButton = document.querySelector('button[aria-label="Save"]');
  if (!submitButton) return;
  const dirty = hasUnsavedChanges();
  const valid = isValid();
  submitButton.disabled = !(dirty && valid);
}



// MARK: FORM INTERACTION

document.querySelector("form").oninput = () => {
  toggleResetButton();
  toggleSubmitButton();

  const formData = {};
  document.querySelectorAll("fieldset input[name], select[name]").forEach(el => {
    formData[el.name] = el.value;
  });
  localStorage.setItem("formData", JSON.stringify(formData));
};

// MARK: TAB SWITCHING INIT
function setupTabSwitching() {
  document.querySelectorAll('nav input[name="nav"]').forEach((input) => {
    input.onchange = async () => {
      if (!input.checked) return;

      const endpoint = input.value;
      const proceed = async () => {
        clearFieldset(document.querySelector("fieldset"));
        await loadContent(endpoint);
        await loadHeader(endpoint);
        await loadBody(endpoint);
      };

      if (hasUnsavedChanges()) {
        const ok = await confirmAction("You have unsaved changes. Discard them?", { type: "confirm" });
        if (ok) await proceed();
      } else {
        await proceed();
      }
    };
  });

  const selected = document.querySelector('nav input[name="nav"]:checked');
  if (selected?.onchange) selected.onchange();
}

// MARK: MISSING FROM ORIGINAL

function handleRowToggle(event) {
  const checkbox = event.target;
  const li = checkbox.closest("li");
  const radio = li.querySelector('input[type="radio"][name="list-item"]');

  if (checkbox.checked) {
    document.querySelectorAll('input[name="row-toggle"]').forEach((cb) => {
      if (cb !== checkbox) cb.checked = false;
    });
  }

  radio.checked = checkbox.checked;
  radio.dispatchEvent(new Event("input", { bubbles: true }));
}

function updateFormFromSelectedRow() {
  const fieldset = document.querySelector("aside form fieldset");
  if (!fieldset) return;
  fieldset.innerHTML = "";
  const selectedRow = document.querySelector('ul li input[name="list-item"]:checked')?.closest("li");
  if (!selectedRow) {
    removeInlineStyles(document.querySelector("main"));
    snapshotForm();
    document.querySelector("form").oninput();
    return;
  }

  selectedRow.querySelectorAll("label > *:not(input)").forEach((source) => {
    const key = toCamel(source.tagName.toLowerCase());
    const value = source.textContent;

    const label = document.createElement("label");
    label.textContent =
      toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\w/g, (c) => c.toUpperCase()) + ": ";

    const input = createInputFromKey(key, value);
    label.appendChild(input);
    fieldset.appendChild(label);
  });

  snapshotForm();
  toggleResetButton();
  toggleSubmitButton();
}

function showModal({ title = "", message = "", buttons = [] }) {
  return new Promise((resolve) => {
    const modal = document.querySelector("modal-");
    if (!modal) return resolve(null);

    modal.querySelector("h4").textContent = title;
    modal.querySelector("p").textContent = message;

    const modalButtons = modal.querySelectorAll("button");
    modalButtons.forEach((btn, index) => {
      const buttonData = buttons[index];
      btn.textContent = buttonData ? buttonData.label : "";
      btn.onclick = buttonData
        ? () => {
            clearModal();
            resolve(buttonData.value);
          }
        : null;
    });

    function clearModal() {
      modal.querySelector("h4").textContent = "";
      modal.querySelector("p").textContent = "";
      modalButtons.forEach((btn) => {
        btn.textContent = "";
        btn.onclick = null;
      });
    }
  });
}

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
  };

  return showModal(config);
}

// MARK: RESTORE FROM LOCAL STORAGE
document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("formData");
  if (!storedData) return;

  try {
    const parsed = JSON.parse(storedData);
    const fieldset = document.querySelector("aside form fieldset");
    if (!fieldset) return;

    Object.entries(parsed).forEach(([key, value]) => {
      const input = fieldset.querySelector(`[name="${key}"]`);
      if (input) input.value = value;
    });

    snapshotForm();
    toggleResetButton();
    toggleSubmitButton();
  } catch (e) {
    console.warn("Failed to restore formData from localStorage:", e);
  }
});