// main.js

// Import configuration values like API endpoints and app constants
import { API_MAP, API_ROOT } from './config.js';

// Import necessary DOM references for form and navigation control
import { ul, form, deleteBtn, navInputs } from './refs.js';

// Import event handlers for item interaction and form CRUD operations
import { handleSelectItem, handleFormSubmit, handleDeleteItem } from './formController.js';

// Import load logic for fetching and rendering API data
import { load } from './api.js';

// Track the currently active section to determine endpoint usage
let currentEndpoint = API_MAP["option-types"];

// Bind click handler to the UL element to allow item selection
ul.onchange = handleSelectItem;

// Bind form submission to either update or create new records
form.onsubmit = (e) => handleFormSubmit(e, currentEndpoint);

// Bind delete button to handle item deletion logic
deleteBtn.onclick = () => handleDeleteItem(currentEndpoint);

// Set up change listeners on navigation inputs (tabs) to fetch correct data
navInputs.forEach(input => {
  input.onchange = (e) => {
    const section = e.target.closest("label")?.textContent.trim().toLowerCase().replace(/ /g, "-");
    if (section && API_MAP[section]) {
      currentEndpoint = API_MAP[section]; // Update the current endpoint based on selected tab
      load(`${API_ROOT}/${currentEndpoint}`); // Fetch and display content for the selected tab
    }
  };
});

// Perform initial data load for default tab
load(`${API_ROOT}/${currentEndpoint}`);
