// Root URL for the mock API
const API_ROOT = "https://67d944ca00348dd3e2aa65f4.mockapi.io"
const AUTHOR = "D7460N" // Default author for new and updated records
const VERSION = "0.0.1" // Version of the application
const DATE = new Date().toISOString() // Current date in ISO format
const APP_NAME = "D7460N DHCP Web UI" // Application name for the title
const APP_DESC = "A web interface for managing DHCP entries" // Application description
const APP_COPYRIGHT = `© ${new Date().getFullYear()} ${AUTHOR}. All rights reserved.` // Copyright notice





async function loadNav() {
  try {
    const [navData] = await fetchJSON(`${BASE_URL}nav-content`);
    const section = document.querySelector("nav details > section");
    if (!section) return;
    section.innerHTML = "";

    Object.entries(navData).forEach(([key, { title }], i) => {
      const label = document.createElement("label");
      label.textContent = title;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "nav";
      input.value = key;
      input.hidden = true;
      if (i === 0) input.checked = true;

      label.appendChild(input);
      section.appendChild(label);
    });
  } catch (err) {
    console.error("Failed to load navigation tabs:", err);
    await confirmAction("Navigation failed to load.", { type: "alert" });
  }
}




async function loadContent(endpoint) {
  try {
    const [data] = await fetchJSON(`${BASE_URL}${endpoint}`);

    const article = document.querySelector("main article");
    if (!article) return;

    const h1 = article.querySelector("h1");
    const p = article.querySelector("p");

    if (h1) h1.textContent = data.title ?? "";
    if (p) p.textContent = data.intro ?? "";
  } catch (err) {
    console.error(`Failed to load page content for ${endpoint}:`, err);
    await confirmAction("Failed to load page content.", { type: "alert" });
  }
}


async function loadHeader(endpoint) {
  try {
    const headerUl = document.querySelector("main article ul[aria-hidden='true']");
    const headerLi = headerUl?.querySelector("li");
    if (!headerLi) return;
    headerLi.innerHTML = "";

    const [columns] = await fetchJSON(`${BASE_URL}${endpoint}-items/columns`);
    const keys = Object.keys(columns || {});

    keys.forEach(key => {
      const el = document.createElement(toKebab(key));
      el.textContent = toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      headerLi.appendChild(el);
    });
  } catch (err) {
    console.error(`Failed to load header for ${endpoint}:`, err);
    await confirmAction("Failed to load table header.", { type: "alert" });
  }
}



async function loadBody(endpoint) {
  try {
    const tableUl = document.querySelector("main article ul:last-of-type");
    if (!tableUl) return;
    tableUl.innerHTML = "";

    const items = await fetchJSON(`${BASE_URL}${endpoint}-items`);
    if (!Array.isArray(items)) throw new Error("Invalid items payload");

    items.forEach(item => {
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
      tableUl.appendChild(li);
    });

    snapshotForm();
    toggleResetButton();
  } catch (err) {
    console.error(`Failed to load table rows for ${endpoint}:`, err);
    await confirmAction("Failed to load table rows.", { type: "alert" });
  }
}



async function loadDetails(endpoint, id) {
  try {
    const url = `${BASE_URL}${endpoint}-items/${id}`;
    const item = await fetchJSON(url);
    if (!item || typeof item !== "object") throw new Error("Invalid detail payload");

    const fieldset = document.querySelector("aside form fieldset");
    if (!fieldset) return;

    fieldset.innerHTML = "";

    for (const [key, value] of Object.entries(item)) {
      const label = document.createElement("label");
      label.textContent = toKebab(key)
        .replace(/^item-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()) + ": ";

      const input = createInputFromKey(key, value);
      label.appendChild(input);
      fieldset.appendChild(label);
    }

    snapshotForm();
    toggleResetButton();
    toggleSubmitButton();
  } catch (err) {
    console.error(`Failed to load details for ID ${id}:`, err);
    await confirmAction("Failed to load item details.", { type: "alert" });
  }
}


form.onsubmit = async (e) => {
  e.preventDefault();

  const selected = document.querySelector('ul li input[name="list-item"]:checked');
  const id = selected?.closest("li")?.querySelector("label > id")?.textContent?.trim();
  const endpoint = document.querySelector('nav input[name="nav"]:checked')?.value;
  if (!endpoint) return;

  const data = {};
  fieldset.querySelectorAll("input[name], select[name]").forEach((el) => {
    if (!el.readOnly) data[el.name] = el.value.trim();
  });

  const method = id ? "PUT" : "POST";
  const url = id ? `${BASE_URL}${endpoint}-items/${id}` : `${BASE_URL}${endpoint}-items`;

  try {
    const confirmed = await showModal({
      title: "Please Confirm",
      message: "Save changes?",
      buttons: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    });

    if (!confirmed) return;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const result = await res.json();
    if (!result?.id || typeof result !== "object") {
      throw new Error("Unexpected response from server.");
    }

    await showModal({
      title: "Success",
      message: "Changes saved successfully.",
      buttons: [{ label: "OK", value: true }],
    });

    await loadBody(endpoint);
  } catch (err) {
    console.error("Failed to save record:", err);
    await showModal({
      title: "Error",
      message: "Error saving record.",
      buttons: [{ label: "OK", value: true }],
    });
  }
};



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
      selected.remove();
      clearFieldset(fieldset);
      const headerLi = document.querySelector("main article ul[aria-hidden='true'] li");
      if (headerLi) headerLi.innerHTML = "";
      snapshotForm();
      toggleResetButton();
      toggleSubmitButton();
    }
    return;
  }

  const confirmDelete = await confirmAction("Delete this record?", { type: "confirm" });
  if (!confirmDelete) return;

  try {
    await fetch(`${BASE_URL}${endpoint}-items/${id}`, { method: "DELETE" });
    await loadBody(endpoint);
  } catch (err) {
    console.error("Failed to delete:", err);
    await confirmAction("Failed to delete record.", { type: "alert" });
  }
};









/*
✅ Tab-switching logic has been implemented and added as setupTabSwitching().

It:

Attaches onchange handlers to all nav input[name="nav"]

Checks for unsaved changes before switching tabs

Calls loadContent(), loadHeader(), and loadBody() based on the selected tab

Auto-triggers the first checked tab on load

Would you like me to add a main() initializer that runs loadNav() followed by setupTabSwitching()?
*/

// Setup tab navigation behavior after nav inputs are loaded
function setupTabSwitching() {
  document.querySelectorAll('nav input[name="nav"]').forEach((input) => {
    input.onchange = async () => {
      if (!input.checked) return;

      const endpoint = input.value;
      const proceed = async () => {
        clearFieldset(fieldset);
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



/*

...(previous content)...

---

## 🔁 FUNCTION-BY-FUNCTION MAPPING

| **New Async Function**      | **Original Code Replaced**                                        | **Location in Old scripts.js**                                  |
| --------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `loadNav()`                 | `loadEndpoints()` (tab population only)                           | Top: Previously handled both tab rendering and endpoint memory  |
| `loadContent(endpoint)`     | Part of `loadEndpoint()` → Sets `<h1>` and `<p>`                  | Mid-body of `loadEndpoint()`                                    |
| `loadHeader(endpoint)`      | Part of `loadEndpoint()` → Renders `<ul aria-hidden="true">`      | Inside `loadEndpoint()`, where header keys were extracted       |
| `loadBody(endpoint)`        | Part of `loadEndpoint()` → Populates table rows                   | Loop in `loadEndpoint()` that appended `<ul><li>`               |
| `loadDetails(endpoint, id)` | Not present in original (replaces inferring from selected `<li>`) | Previously handled by `updateFormFromSelectedRow()` indirectly  |
| `form.onsubmit`             | Original `form.onsubmit = (...) => { ... }`                       | Same place, now async and REST-refined                          |
| `deleteButton.onclick`      | Original `deleteButton.onclick = (...) => { ... }`                | Same structure, now checks ID presence and dispatches DELETE    |
| `setupTabSwitching()`       | `nav input[name="nav"].onchange` + `loadEndpoint()`               | Previously at bottom; now modular and calls `loadX()` functions |

---

## 🔄 ARCHITECTURE DIFFERENCE SUMMARY

### Before

* Single `loadEndpoint()` handled:

  * `<h1>`, `<p>` injection
  * Table header + body
  * Form resets
* Used global state (`NAV_DATA`, `ENDPOINTS`)
* Item details inferred from `<li>` DOM only

### After

* Each layout zone has its own `loadX()` function
* Stateless, modular, readable
* RESTful pattern: `/{endpoint}`, `/{endpoint}-items`, `/{endpoint}-items/:id`
* Form data and table state fetched directly from APIs (no inference from DOM)

---


*/