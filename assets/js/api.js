// load.js

// Responsible for fetching data from the API and updating the UI
// This module centralizes all logic related to external data requests

import { setContent } from './utils.js'; // Utility for safe content updates
import { render } from './view.js'; // DOM update logic
import { statusBanner } from './refs.js'; // Element for live status feedback

export let items = []; // Shared data array that other modules rely on

// Load JSON data from a given endpoint and update UI accordingly
export async function load(url) {
  try {
    // Indicate that loading is in progress
    statusBanner.hidden = false;
    statusBanner.textContent = "Loading data...";

    // Perform the fetch request
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    // Parse and store the fetched data
    items = await res.json();

    // Update the interface with new data
    render();
    statusBanner.hidden = true;
  } catch (err) {
    // Handle any errors during fetch
    console.error("Data load failed:", err);
    items = [];
    render();
    statusBanner.hidden = false;
    statusBanner.textContent = "Error loading data. Please check your connection or try again later.";
  }
}
