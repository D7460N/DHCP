// Mapping of tab names to their corresponding API endpoints
const API_MAP = {
  "manage": "manage", // Tab for managing DHCP entries
  "faqs": "faqs", // Frequently asked questions
  "option-types": "option-types", // DHCP option type definitions
  "api-registration": "api-registration", // Tab for API configuration
  "audit": "audit", // Tab for system audit logs
  "option-set": "option-set", // Groups of options for reuse
  "scope-type": "scope-type", // IP scope classifications
  "server-types": "server-types", // Server role types
  "servers": "servers", // DHCP server inventory
  "credentials": "credentials", // Scheduled tasks and login credentials
  "variables": "variables", // Dynamic or static configuration values
  "settings": "settings" // Application-level configuration
};

// Root URL for the mock API
const API_ROOT = "https://67d944ca00348dd3e2aa65f4.mockapi.io"
const AUTHOR = "D7460N" // Default author for new and updated records

// DOM elements and logic wiring
const ul = document.querySelector("main article ul") // UL used to list entries on the "option-types" tab
ul.onclick = selectItem // Clicking on a list item loads it into the form for editing

const aside = document.querySelector("aside") // The aside panel contains the editable form
const form = aside.querySelector("form") // Form in the aside panel
form.onsubmit = submitForm // Submits new or updated items to the API

// Input fields for form data binding
const [inputName, inputType, inputAuthor, inputModified, inputCreated, inputUpdated] = form.querySelectorAll("input")
const [submitBtn, deleteBtn] = form.querySelectorAll("button") // Buttons for form submission and deletion
deleteBtn.onclick = deleteItem // Triggers item deletion

const h1 = document.querySelector("h1") // Main heading of the active tab
const p = document.querySelector("h1 + p") // Intro paragraph below the heading
const statusBanner = document.querySelector("load-data") // Status message display block

// Initial application state
let items = [] // Loaded item data
let activeItem = null // Currently selected item
let currentEndpoint = API_MAP["option-types"] // Default starting tab is "option-types"

// Listen for tab (radio button) changes and fetch associated data dynamically
// This allows users to switch between sections and have the corresponding data pulled automatically
const navInputs = document.querySelectorAll("nav input[type='radio']")
navInputs.forEach(input => input.onchange = handleNav)

// Handles navigation by determining selected tab and fetching its JSON
function handleNav(e) {
  const section = e.target.closest("label")?.textContent.trim().toLowerCase().replace(/ /g, "-")
  if (section && API_MAP[section]) {
    currentEndpoint = API_MAP[section]
    load(`${API_ROOT}/${currentEndpoint}`) // Load content for the selected section
  } else {
    items = []
    render() // Clear render and notify about missing data source
    statusBanner.hidden = false
    statusBanner.textContent = `No data mapping for section: ${section}`
  }
}

// Load initial content (default tab)
load(`${API_ROOT}/${currentEndpoint}`)

// Fetches JSON data from a given API URL, updates internal state, and triggers rendering.
// Handles both success and error cases with appropriate user feedback via a live status banner.
async function load(url) {
  try {
    statusBanner.hidden = false
    statusBanner.textContent = "Loading data..."
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    items = await res.json()
    render() // Reflect new data in the UI
    statusBanner.hidden = true
  } catch (err) {
    console.error("Data load failed:", err)
    items = []
    render() // Clear any old data from UI
    statusBanner.hidden = false
    statusBanner.textContent = "Error loading data. Please check your connection or try again later."
  }
}

// Maps the fetched data to UI elements including list items, heading, and intro paragraph.
// Also conditionally toggles visibility of the list based on current tab and data availability.
function render() {
  const lis = Array.from(ul.children) // List items in the article UL
  lis.forEach((li, i) => {
    const span = li.querySelector("span") // The span inside each li
    const item = items[i] // Item from API
    if (item && span) {
      span.textContent = item.itemName || item["item-name"] || "Unnamed" // Assign label
      li.setAttribute("aria-label", item.id || `item-${i}`)
    } else {
      span.textContent = ""
      li.removeAttribute("aria-label")
    }
  })

  // Title and intro paragraph
  const title = items[0]?.title || ""
  const intro = items[0]?.intro || ""
  h1.textContent = title
  p.textContent = intro

  // Only display UL if tab is "items" and data exists
  ul.style.display = (currentEndpoint === "items" && items.length > 0) ? "block" : "none"
}

// Populates the aside form when a list item is clicked
function selectItem(e) {
  const li = e.target.closest("li")
  if (!li) return
  const id = li.getAttribute("aria-label")
  const item = items.find(i => (i.id || `item-${items.indexOf(i)}`) === id)
  if (!item) return

  // Assign item properties to form fields
  inputName.value = item.itemName || item["item-name"] || ""
  inputType.value = item.itemType || item["item-type"] || ""
  inputAuthor.value = item.itemAuthor || item["item-author"] || ""
  inputModified.value = item.itemModified || item["item-modified"] || ""
  inputCreated.value = item.itemCreated || item["item-created"] || ""
  inputUpdated.value = item.itemUpdated || item["item-updated"] || ""

  activeItem = item
  aside.hidden = false // Show the editing panel
}

// Processes form submission to either update an existing item or create a new one based on whether activeItem.id is present
async function submitForm(e) {
  e.preventDefault()
  if (!form.reportValidity()) return // Skip invalid form
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
    await load(`${API_ROOT}/${currentEndpoint}`) // Reload list
  } catch (err) {
    console.error("Submit failed:", err)
    statusBanner.hidden = false
    statusBanner.textContent = "Failed to save data. Try again later."
  }
}

// Sends DELETE request for the currently selected item
async function deleteItem() {
  if (!activeItem?.id) return
  try {
    await fetch(`${API_ROOT}/${currentEndpoint}/${activeItem.id}`, { method: "DELETE" })
    activeItem = null
    form.reset()
    aside.hidden = true
    await load(`${API_ROOT}/${currentEndpoint}`) // Refresh list
  } catch (err) {
    console.error("Delete failed:", err)
    statusBanner.hidden = false
    statusBanner.textContent = "Failed to delete item. Please try again later."
  }
}
