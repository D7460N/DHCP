// MARK: MAP ACTIVE ARTICLE VIA CSS VISIBILITY
function getActiveArticleIndex() {
  const navRadios = [...document.querySelectorAll("nav input[type='radio']")]
  const checked = navRadios.find((input) => input.checked)
  return navRadios.indexOf(checked)
}

function getArticleByIndex(index) {
  return document.querySelectorAll("main article")[index]
}

function clearAllTabContent() {
  const articles = document.querySelectorAll("main article")
  articles.forEach((article) => {
    const h1 = article.querySelector("h1")
    const p = article.querySelector("h1 + p")
    if (h1) h1.textContent = ""
    if (p) p.textContent = ""

    const ul = article.querySelector("section ul")
    if (ul) ul.replaceChildren()
  })
}


// MARK: MAP ASIDE
const aside = document.querySelector("aside")

const fieldKeys = [
  "item-name",
  "item-created",
  "item-updated",
  "item-author",
  "item-modified",
  "item-type",
]

// MARK: POPULATE FORM
const populateForm = (item) => {
  const fieldset = getVisibleFieldset()
  fieldKeys.forEach((key) => {
    const input = fieldset.querySelector(`input[name="${key}"]`)
    if (input) {
      const val = item[key] || ""
      input.value = val
      input.setAttribute("value", val)
    }
  })

  const checkbox = fieldset.querySelector('input[name="is-critical"]')
  if (checkbox) checkbox.checked = !!item["is-critical"]
}

// MARK: CLEAR FORM
const clearForm = () => {
  const fieldset = getVisibleFieldset()
  fieldKeys.forEach((key) => {
    const input = fieldset.querySelector(`input[name="${key}"]`)
    if (input) {
      input.value = ""
      input.setAttribute("value", "")
    }
  })

  const checkbox = fieldset.querySelector('input[name="is-critical"]')
  if (checkbox) checkbox.checked = false
}

// MARK: CREATE ELEMENTS
const createItem = (item) => {
  const index = getActiveArticleIndex()
  const article = getArticleByIndex(index)
  const tpl = article.querySelector("template")
  const ul = article.querySelector("section ul")

  const li = tpl.content.firstElementChild.cloneNode(true)

  li.querySelector("item-name").textContent = item["item-name"]
  li.querySelector("item-created").textContent = item["item-created"]
  li.querySelector("item-updated").textContent = item["item-updated"]
  li.querySelector("item-author").textContent = item["item-author"]
  li.querySelector("item-modified").textContent = item["item-modified"]
  li.querySelector("item-type").textContent = item["item-type"]

  const radio = li.querySelector('input[type="radio"]')
  const loadData = li.querySelector("load-data")

  li.onclick = (e) => {
    const fieldset = getVisibleFieldset()
    const current = fieldset.querySelector('input[name="item-name"]')
    if (current?.value === item["item-name"]) {
      clearForm()
      radio.checked = false
      return
    }

    radio.checked = true
    loadData?.removeAttribute("hidden")

    Object.entries(item).forEach(([key, value]) => {
      const input = fieldset.querySelector(`[name="${key}"]`)
      if (input) {
        input.value = value
        input.setAttribute("value", value)
      }
    })
  }

  ul.appendChild(li)
}

// MARK: LOAD ACTIVE TAB CONTENT
function loadTabContent() {
  clearAllTabContent()
  fetch(
    "https://cdn.jsdelivr.net/gh/D7460N/DHCP@main/data/nav-content.json?nocache=timestamp"
  )
    .then((res) => res.json())
    .then((content) => {
      const index = getActiveArticleIndex()
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
        "settings",
      ]
      const key = tabKeys[index]
      if (!key || !content[key]) return

      const article = getArticleByIndex(index)
      if (!article) return

      const h1 = article.querySelector("h1")
      const p = article.querySelector("h1 + p")
      if (!h1 || !p) return

      h1.textContent = content[key].title
      p.textContent = content[key].intro

      if (key === "option-types" && Array.isArray(content[key].items)) {
        content[key].items.forEach(createItem)
      }
    })
}

// MARK: ONCHANGE HANDLERS FOR TABS
const navInputs = document.querySelectorAll("nav input[type='radio']")
navInputs.forEach((input) => {
  input.onchange = () => {
    clearForm()
    loadTabContent()
  }
})

// MARK: INITIAL LOAD
loadTabContent()

// MARK: FIELDSET MAPPING FOR OPTION-TYPES ITEMS
function loadFieldsetData() {
  fetch(
    "https://cdn.jsdelivr.net/gh/D7460N/DHCP@main/data/nav-content.json?nocache=timestamp"
  )
    .then((res) => res.json())
    .then((content) => {
      const index = getActiveArticleIndex()
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
        "settings",
      ]
      const key = tabKeys[index]
      if (key === "option-types" && Array.isArray(content[key].items)) {
        content[key].items.forEach(populateForm)
      }
    })
}

// MARK: SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err))
}

// MARK: UTILITIES FOR STRUCTURAL INDEXING
function getSelectedRowIndex(articleIndex) {
  const article = document.querySelectorAll("main article")[articleIndex]
  const rowRadios = [...article.querySelectorAll("ul li input[type='radio']")]
  return rowRadios.findIndex(r => r.checked)
}

function getVisibleFieldset() {
  const tabIndex = getActiveArticleIndex()
  return document.querySelectorAll("aside form section fieldset")[tabIndex]
}

function populateActiveForm(dataset) {
  const tabIndex = getActiveArticleIndex()
  const rowIndex = getSelectedRowIndex(tabIndex)
  const item = dataset?.[rowIndex]
  const fieldset = getVisibleFieldset()
  if (!item || !fieldset) return

  Object.entries(item).forEach(([key, value]) => {
    const input = fieldset.querySelector(`[name="${key}"]`)
    if (input) input.value = value
  })
}
