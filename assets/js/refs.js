// refs.js

// This file contains all DOM element references used across the app.
// Centralizing these queries makes it easy to manage and avoids duplication.

// Main content list for displaying tab-related items
export const ul = document.querySelector("section ul");


// Sidebar form used for viewing and editing selected items
export const aside = document.querySelector("aside");
export const form = aside.querySelector("form");

// Individual input fields for data binding
export const [inputName, inputType, inputAuthor, inputModified, inputCreated, inputUpdated] = form.querySelectorAll("input");

// Submit and delete buttons in the form
export const [submitBtn, deleteBtn] = form.querySelectorAll("button");

// Heading and introductory paragraph for each tab
export const h1 = document.querySelector("h1");
export const p = document.querySelector("h1 + p");

// Additional content paragraphs in the article for contextual notes
export const extraParagraphs = document.querySelectorAll("main article p:nth-of-type(n+2):not(:first-of-type)");

// Footer-style summary div at the bottom of the article
export const summaryDiv = document.querySelector("main article div");

// Live status banner for displaying loading or error messages
export const statusBanner = document.querySelector("load-data");

// Radio inputs used for navigating between tabbed sections
export const navInputs = document.querySelectorAll("nav input[type='radio']");
