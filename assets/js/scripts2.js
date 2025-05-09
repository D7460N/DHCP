// Mapping of tab names to their corresponding API endpoints
const API_MAP = {
  "manage": "manage",
  "faqs": "faqs",
  "option-types": "option-types",
  "api-registration": "api-registration",
  "audit": "audit",
  "option-set": "option-set",
  "scope-type": "scope-type",
  "server-types": "server-types",
  "servers": "servers",
  "credentials-and-background-jobs": "credentials-and-background-jobs",
  "variables": "variables",
  "settings": "settings"
};

// Root URL for the mock API
const API_ROOT = "https://67d944ca00348dd3e2aa65f4.mockapi.io"
const AUTHOR = "D7460N" // Default author for new and updated records
const VERSION = "0.0.1" // Version of the application
const APP_NAME = "D7460N DHCP" // Name of the application
const APP_DESC = "Let the CSS renaissance begin." // Description of the application

// DOM elements
const ul = document.querySelector("main article ul")
ul.onclick = selectItem // Attach click handler to list for selecting an item

const aside = document.querySelector("aside")
const form = aside.querySelector("form")
form.onsubmit = submitForm // Attach form submission handler

const [inputName, inputType, inputAuthor, inputModified, inputCreated, inputUpdated] = form.querySelectorAll("input")
const [submitBtn, deleteBtn] = form.querySelectorAll("button")
deleteBtn.onclick = deleteItem // Attach delete handler to delete button

const h1 = document.querySelector("h1") // Title of current section
const p = document.querySelector("h1 + p") // Intro paragraph of current section
const statusBanner = document.querySelector("load-data") // Live region for status messages

// App state
let items = []
let activeItem = null
let currentEndpoint = API_MAP["option-types"] // Start with default tab

// Handle navigation changes from radio button tabs
function handleNav(e) {
  const section = e.target.closest("label")?.textContent.trim().toLowerCase().replace(/ /g, "-")
  if (section && API_MAP[section]) {
    currentEndpoint = API_MAP[section]
    load(`${API_ROOT}/${currentEndpoint}`)
  } else {
    items = []
    render()
    statusBanner.hidden = false
    statusBanner.textContent = `No data mapping for section: ${section}`
  }
}

// Initial load
load(`${API_ROOT}/${currentEndpoint}`)

// Fetch data from the current endpoint and update the UI
async function load(url) {
  try {
    statusBanner.hidden = false
    statusBanner.textContent = "Loading data..."
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    items = await res.json()
    render()
    statusBanner.hidden = true
  } catch (err) {
    console.error("Data load failed:", err)
    items = []
    render()
    statusBanner.hidden = false
    statusBanner.textContent = "Error loading data. Please check your connection or try again later."
  }
}

// Render all DOM elements based on current data
function render() {
  const lis = Array.from(ul.children)
  lis.forEach((li, i) => {
    const span = li.querySelector("span")
    const item = items[i]
    if (item && span) {
      span.textContent = item.itemName || item["item-name"] || "Unnamed"
      li.setAttribute("aria-label", item.id || `item-${i}`)
    } else {
      span.textContent = ""
      li.removeAttribute("aria-label")
    }
  })

  // Update title and paragraph based on metadata in first record
  const title = items[0]?.title || ""
  const intro = items[0]?.intro || ""
  h1.textContent = title
  p.textContent = intro

  // Only show list if on items endpoint and it contains data
  ul.style.display = (currentEndpoint === "items" && items.length > 0) ? "block" : "none"
}

// Handle user selecting an item from the list
function selectItem(e) {
  const li = e.target.closest("li")
  if (!li) return
  const id = li.getAttribute("aria-label")
  const item = items.find(i => (i.id || `item-${items.indexOf(i)}`) === id)
  if (!item) return

  // Populate form inputs with selected item's data
  inputName.value = item.itemName || item["item-name"] || ""
  inputType.value = item.itemType || item["item-type"] || ""
  inputAuthor.value = item.itemAuthor || item["item-author"] || ""
  inputModified.value = item.itemModified || item["item-modified"] || ""
  inputCreated.value = item.itemCreated || item["item-created"] || ""
  inputUpdated.value = item.itemUpdated || item["item-updated"] || ""

  activeItem = item
  aside.hidden = false
}

// Submit handler for creating or updating items
async function submitForm(e) {
  e.preventDefault()
  if (!form.reportValidity()) return
  const now = new Date().toISOString()
  const data = {
    itemName: inputName.value.trim(),
    itemType: inputType.value.trim(),
    itemAuthor: inputAuthor.value || AUTHOR,
    itemModified: AUTHOR,
    itemCreated: inputCreated.value || now,
    itemUpdated: now
  }
  try {
    if (activeItem && activeItem.id) {
      // Update existing item
      await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    } else {
      // Create new item
      await fetch(`${API_ROOT}/${currentEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    }
    activeItem = null
    form.reset()
    aside.hidden = true
    await load(`${API_ROOT}/${currentEndpoint}`)
  } catch (err) {
    console.error("Submit failed:", err)
    statusBanner.hidden = false
    statusBanner.textContent = "Failed to save data. Try again later."
  }
}

// Delete the currently selected item
async function deleteItem() {
  if (!activeItem?.id) return
  try {
    await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, { method: "DELETE" })
    activeItem = null
    form.reset()
    aside.hidden = true
    await load(`${API_ROOT}/${currentEndpoint}`)
  } catch (err) {
    console.error("Delete failed:", err)
    statusBanner.hidden = false
    statusBanner.textContent = "Failed to delete item. Please try again later."
  }
}
