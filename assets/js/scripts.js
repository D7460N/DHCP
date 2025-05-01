// scripts.js

// MARK: MAP DATA
const ul = document.querySelector("main section ul")
const aside = document.querySelector("aside")
const fieldset = aside.querySelector("aside form section fieldset")

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
  const tpl = document.querySelector('template[data-template="list-item"]')
  const li = tpl.content.firstElementChild.cloneNode(true)

  li.querySelector("item-name a").textContent = item["item-name"]
  li.querySelector("item-created").textContent = item["item-created"]
  li.querySelector("item-updated").textContent = item["item-updated"]
  li.querySelector("item-author").textContent = item["item-author"]
  li.querySelector("item-modified").textContent = item["item-modified"]
  li.querySelector("item-type").textContent = item["item-type"]

  const radio = li.querySelector('input[type="radio"]')
  const loadData = li.querySelector("load-data")

  li.onclick = (e) => {
    if (e.target.tagName === "A") e.preventDefault()

    const current = fieldset.querySelector('input[name="item-name"]')
    if (current?.value === item["item-name"]) {
      clearForm()
      radio.checked = false
      return
    }

    radio.checked = true
    loadData?.removeAttribute("hidden")
    populateForm(item)
  }

  return li
}

// MARK: FETCH DATA
fetch("https://cdn.jsdelivr.net/gh/D7460N/DHCP@main/data/data.json")
  .then((res) => res.json())
  .then((data) => data.forEach((item) => ul.appendChild(createItem(item))))


// MARK: SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err))
}
