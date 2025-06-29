# JavaScript Modules

## Purpose

JavaScript in D7460N handles:

- Data fetching (via `fetch()`)
- API interaction (CRUD)
- Semantic UI state (no direct DOM styling)
- Populates custom HTML elements

## Presentaion Layer

| Layer | Role                                                                           |
| ----- | ------------------------------------------------------------------------------ |
| HTML  | Structure only - intuitive semantic markup, A11y foundation                    |
| CSS   | Heuristics only - themes, conditional visual state via `:has()`, style queries |
| JS    | Data only - handling and delivery                                              |

```prolog
ARCHITECTURE ::

Single Page Application [ SPA ]
- HTML = front-loaded, empty, hidden
- CSS = hides elements withput data
- JS = delivers/removes data                                _ _ _ [ <APP-BANNER> - always visible ]
                                                           / _ _ _ [ <HEADER> - always visible ]
              _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ / / _ _ _ [ <ASIDE> - hidden/empty by default ]
              \___________________________________________\/ /
               \___________________________________________\/
   [ <NAV> ]   /\      \                            \       \
   _ _ _ _ _ _/  \      \                     _ _ _ [ Page content - <h1>, <p>, <ul>, etc. - hidden/empty by default ]
   Hidden/        \      \                   /        \       \
   empty by        \      \                 /          \       \
   default          \      \                            \       \    _ _ _ [ <FOOTER> -  always visible ]
                     \      \                            \       \  / _ _ _ [ <APP-BANNER> - always visible ]
                      \______\____________________________\_______\/ /
                       \___________________________________________\/
                        \_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\

```

## Markup

**Minimal semantic markup** == clean, perfomant, intuitive, overridable

- Ally foundation
- Minimal nesting
- Zero CSS classes, IDs, or `data-*`
- Zero inline scripts or styles
- Zerp dependencies
- Zerp compiling
- Zero build tools
- Preserves browser compatibility (future proof)
- Reduces erros to data/business logic

## API Handling Strategy

- The API layer supports both common JSON formats:
  - An object with `title`, `intro`, and `items[]`
  - An array where the first object contains those same fields
- This allows plug-and-play with diverse back-end implementations
- On success, `items`, `h1`, and `p` are updated, then `render()` is called
- On failure, `items` is cleared, text content is reset, and `render()` ensures fallback state

## Rendering Strategy

- A single universal `<template>` is used to render all tab content lists.
- The `<template>` contains a complete set of possible `<item-*>` fields.
- JS clones and fills the template for each row.
- Visibility is entirely handled by CSS — hidden if content is empty.
- The radio input uses `name="list-item"` across all rows.

Example template:

```html
<template>
	<li tabindex="0">
		<input type="radio" name="list-item" hidden />
		<item-name></item-name>
		<item-hostname></item-hostname>
		<item-ip></item-ip>
		<item-os></item-os>
		<item-type></item-type>
		<item-created></item-created>
		<item-updated></item-updated>
		<item-author></item-author>
		<item-modified></item-modified>
	</li>
</template>
```

### Visual Flow

```text
[TAB SELECTED] → [DATA FETCHED] → [TEMPLATE CLONED] → [FIELDS FILLED] → [CSS SHOWS VISIBLE CELLS ONLY]
```

- The flow starts from radio button tab change
- Triggers a fetch from the correct endpoint
- Each row is rendered from the template with the same logic
- Fields with no content remain empty and invisible thanks to CSS

<br>

---

<br>

## ① Initial Load Sequence

**Trigger:**

- The script initially runs on page load.

**Order & Flow:**

1. **`loadNavItems()`** (initial entry point)

   - Triggered immediately upon page load (`loadNavItems().then(...)`).
   - Fetches data from:

     ```javascript
     fetchJSON('navItems');
     ```

   - Dynamically creates navigation items (`<nav>` inputs).

2. **Default Tab Load**

   - Automatically triggers the first tab's data fetch after populating the navigation.
   - Specifically:

     ```javascript
     const selected = document.querySelector('nav input[name="nav"]:checked');
     if (selected?.onchange) selected.onchange();
     ```

   - Calls `loadPageContent(endpoint)` for the selected tab.

## ② Navigation (Tab Click) Sequence

**Trigger:**

- User clicks on a radio input in the `<nav>`.

**Order & Flow:**

- Each `<nav>` radio input has an `onchange` event bound at the end of the initial load:

  ```javascript
  input.onchange = () => { ... }
  ```

- When clicked, the flow is:

  1. Check for unsaved changes (`hasUnsavedChanges()`).
  2. Prompt user if there are unsaved changes.
  3. Fetch data from the selected endpoint:

     ```javascript
     loadPageContent(endpoint);
     ```

  - Example endpoint triggered:

    ```
    https://67d944ca00348dd3e2aa65f4.mockapi.io/manage
    ```

## ③ New Row Creation Sequence

**Trigger:**

- User clicks the "new row" button (`newButton.onclick`).

**Order & Flow:**

- Check for unsaved changes.
- Clears the form and table headers, then initializes a new row based on existing row keys or default keys.
- Does **not** trigger a new fetch from API—uses existing UI structure to create a new blank entry locally.

## ④ Form Submission Sequence

**Trigger:**

- User clicks "Save" (submit button) (`form.onsubmit`).

**Order & Flow:**

- Shows a confirmation modal to confirm saving changes.
- Submits either a `POST` (for new entries) or a `PUT` (for existing entries) to:

  ```javascript
  `${BASE_URL}${endpoint}`; // or `${BASE_URL}${endpoint}/${id}`
  ```

- After successful save, it automatically calls:

  ```javascript
  loadPageContent(endpoint);
  ```

  - Refreshes the table with updated data from the API.

## ⑤ Row Deletion Sequence

**Trigger:**

- User clicks the delete button (`deleteButton.onclick`).

**Order & Flow:**

- If the row is saved:

  - Confirms deletion, then sends a `DELETE` request to:

    ```javascript
    `${BASE_URL}${endpoint}/${id}`;
    ```

  - Refreshes the table afterward by calling:

    ```javascript
    loadPageContent(endpoint);
    ```

- If the row is unsaved:

  - Confirms discarding changes.
  - Clears form and removes unsaved row without API interaction.

## ⑥ Form Reset Sequence

**Trigger:**

- User clicks the reset button (`form.onreset`).

**Order & Flow:**

- Shows confirmation modal.
- Restores the form state from `originalData`.
- Does **not** involve an API call.

## Summary of API Calls & Their Triggers

| Call                            | Trigger             | API Endpoint                                  |
| ------------------------------- | ------------------- | --------------------------------------------- |
| Initial Navigation (`navItems`) | Page load           | `/navItems`                                   |
| Tab content load                | Nav input click     | `/manage`, `/faqs`, `/api-registration`, etc. |
| Save Form (`POST` or `PUT`)     | Form submit         | `/endpoint` or `/endpoint/:id`                |
| Delete Row (`DELETE`)           | Delete button click | `/endpoint/:id`                               |


## Configuration Module

`config.js` defines deployment settings such as the API base URL and optional feature flags.
Override this file to customize the host or toggle behaviors when using the scripts in other projects.

```javascript
export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';
export const OPTIONS = { showBanner: true, warnOnBlur: true };
```
