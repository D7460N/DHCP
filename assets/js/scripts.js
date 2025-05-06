// MARK: MAP ACTIVE ARTICLE VIA CSS VISIBILITY
function getActiveArticleIndex() {
  const navRadios = [...document.querySelectorAll("nav input[type='radio']")];
  const checked = navRadios.find(input => input.checked);
  return navRadios.indexOf(checked);
}

function getArticleByIndex(index) {
  return document.querySelectorAll("main article")[index];
}

function clearAllTabContent() {
  const articles = document.querySelectorAll("main article");
  articles.forEach((article) => {
    const h1 = article.querySelector("h1");
    const p = article.querySelector("h1 + p");
    if (h1) h1.textContent = "";
    if (p) p.textContent = "";
  });
}

// MARK: MAP ASIDE + FIELDSET VIA VISIBLE FIELDSET
const aside = document.querySelector("aside");
const fieldset = aside.querySelector("form section fieldset:not([style*='display: none'])");

const fieldKeys = [
  "item-name",
  "item-created",
  "item-updated",
  "item-author",
  "item-modified",
  "item-type"
];

// MARK: POPULATE FORM
const populateForm = (item) => {
  fieldKeys.forEach((key) => {
    const input = fieldset.querySelector(`input[name="${key}"]`);
    if (input) {
      const val = item[key] || "";
      input.value = val;
      input.setAttribute("value", val);
    }
  });

  const checkbox = fieldset.querySelector('input[name="is-critical"]');
  if (checkbox) checkbox.checked = !!item["is-critical"];
};

// MARK: CLEAR FORM
const clearForm = () => {
  fieldKeys.forEach((key) => {
    const input = fieldset.querySelector(`input[name="${key}"]`);
    if (input) {
      input.value = "";
      input.setAttribute("value", "");
    }
  });

  const checkbox = fieldset.querySelector('input[name="is-critical"]');
  if (checkbox) checkbox.checked = false;
};

// MARK: CREATE ELEMENTS (for separate population, not run in tab load)
const createItem = (item) => {
  const index = getActiveArticleIndex();
  const article = getArticleByIndex(index);
  const tpl = article.querySelector("template");
  const ul = article.querySelector("section ul");

  const li = tpl.content.firstElementChild.cloneNode(true);

  li.querySelector("item-name").textContent = item["item-name"];
  li.querySelector("item-created").textContent = item["item-created"];
  li.querySelector("item-updated").textContent = item["item-updated"];
  li.querySelector("item-author").textContent = item["item-author"];
  li.querySelector("item-modified").textContent = item["item-modified"];
  li.querySelector("item-type").textContent = item["item-type"];

  const radio = li.querySelector('input[type="radio"]');
  const loadData = li.querySelector("load-data");

  li.onclick = (e) => {
    const current = fieldset.querySelector('input[name="item-name"]');
    if (current?.value === item["item-name"]) {
      clearForm();
      radio.checked = false;
      return;
    }

    radio.checked = true;
    loadData?.removeAttribute("hidden");
    populateForm(item);
  };

  ul.appendChild(li);
};

// MARK: LOAD ACTIVE TAB CONTENT (H1 and P only)
function loadTabContent() {
  clearAllTabContent();

  fetch("https://cdn.jsdelivr.net/gh/D7460N/DHCP@main/data/nav-content.json")
    .then((res) => res.json())
    .then((content) => {
      const index = getActiveArticleIndex();
      const tabKeys = [
  "manage",
  "faqs",
  "api-registration",
  "audit",
  "option-set",
  "option-types",
  "scope-type",
  "server-types",
  "servers",
  "credentials",
  "variables",
  "settings"
];
const key = tabKeys[index];
      if (!key || !content[key]) return;

      const article = getArticleByIndex(index);
      if (!article) return;

      const h1 = article.querySelector("h1");
      const p = article.querySelector("h1 + p");
      if (!h1 || !p) return;

      h1.textContent = content[key].title;
      p.textContent = content[key].intro;

      // Populate list items if 'items' exists
      if (key === "option-types" && Array.isArray(content[key].items)) {
        content[key].items.forEach(createItem);
      }
    });
}

// MARK: ONCHANGE HANDLERS FOR TABS
const navInputs = document.querySelectorAll("nav input[type='radio']");
navInputs.forEach((input) => input.onchange = loadTabContent);

// MARK: INITIAL LOAD
loadTabContent();

// MARK: SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}
