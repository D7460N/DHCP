// api.js

// Responsible for fetching data from the API and updating the UI
// This module centralizes all logic related to external data requests

import { render } from './view.js'; // DOM update logic
import { setContent } from './utils.js'; // Utility for safe content updates
import { h1, p } from './refs.js'; // Element for live status feedback

export let items = []; // Shared data array that other modules rely on
export let meta = { title: "", intro: "" }; // Stores title and intro for current tab

// Fetch JSON data from a URL endpoint and update the UI accordingly
// This function is designed to handle both object and array structures
export async function load(url) {
  try {
    // Perform the fetch request
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();

    // Smart hybrid: support both object and array structures
    const data = Array.isArray(json) ? json[0] : json;

    // Store items and metadata
    items = Object.values(data).find(v => Array.isArray(v)) || [];
    meta.title = data.title || "";
    meta.intro = data.intro || "";

    render();
  } catch (err) {
    // Handle any errors during fetch
    console.error("Failed to load data:", err);
    items = [];
    meta.title = "";
    meta.intro = "";
    render();
  }
}
