# JavaScript Modules

## Purpose

JavaScript in D7460N handles:

- Data fetching (via `fetch()`)
- API interaction (CRUD)
- Semantic UI state (no direct DOM styling)
- Populates custom HTML elements

## Presentaion Layer

| Layer | Role                                                                           | URL |
| ----- | ------------------------------------------------------------------------------ | --- 
| HTML  | Structure only - intuitive semantic markup, A11y foundation                    | See [HTML README](https://github.com/D7460N/DHCP/blob/main/assets/css/README.md)
| CSS   | Heuristics only - themes, conditional visual state via `:has()`, style queries | See [CSS README](https://github.com/D7460N/DHCP/blob/main/assets/css/README.md)
| JS    | Data only - handling and delivery                                              | You are here

## Markup

**Minimal semantic markup** == clean, perfomant, intuitive, overridable

- A11y foundation
- Minimal nesting
- Zero CSS classes, IDs, or `data-*`
- Zero inline scripts or styles
- Zero dependencies
- Zero compiling
- Zero build tools
- Preserves browser compatibility (future proof)
- Reduces erros to data/business logic

## API Handling Strategy

- The API layer supports both common JSON formats:
  - An object with `title`, `intro`, and `items[]`
  - An array where the first object contains those same fields
- This allows plug-and-play with diverse back-end implementations
- On success, `items`, `h1`, and `p` are updated, then `render()` is called
- On failure, `items` is cleared, text content is reset, and `render()` ensures
  fallback state

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

   - Automatically triggers the first tab's data fetch after populating the
     navigation.
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

- Each `<nav>` radio input has an `onchange` event bound at the end of the
  initial load:

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
- Clears the form and table headers, then initializes a new row based on
  existing row keys or default keys.
- Does **not** trigger a new fetch from API—uses existing UI structure to create
  a new blank entry locally.

## ④ Form Submission Sequence

**Trigger:**

- User clicks "Save" (submit button) (`form.onsubmit`).

**Order & Flow:**

- Shows a confirmation modal to confirm saving changes.
- Submits either a `POST` (for new entries) or a `PUT` (for existing entries)
  to:

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

`config.js` defines deployment settings such as the API base URL and optional
feature flags. Override this file to customize the host or toggle behaviors when
using the scripts in other projects.

```javascript
export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';
export const OPTIONS = { showBanner: true, warnOnBlur: true };
```

## Additional Modules

- `errors.js` - centralized error logging via `logError()`
- `env.js` - runtime environment detection (`isDev`, `isTest`, `isProd`)

## 🚨 **CRITICAL: CSS-First Philosophy - Minimal JavaScript**

### **JavaScript's LIMITED Role**

In this architecture, JavaScript has a **very specific and constrained
purpose**:

#### **✅ JavaScript SHOULD Handle:**

- Data fetching via `fetch()`
- API interactions (CRUD operations)
- Form data serialization/deserialization
- ARIA attribute management for accessibility (`aria-disabled`, `aria-live`)
- Page content injection after API responses

#### **❌ JavaScript SHOULD NOT Handle:**

- UI interactions (CSS handles via `:checked`, `:has()`)
- Visual state changes (CSS handles via selectors)
- Button enable/disable animations (CSS handles via `[aria-disabled]`)
- Panel show/hide logic (CSS handles via hidden checkbox states)
- Loading spinners (CSS handles via `:checked` triggers)

### **The Hidden Checkbox Pattern**

**IMPORTANT**: Buttons use
`<label role="button"><input type="checkbox"></label>` pattern:

```html
<label role="button" name="submit" aria-label="Save">
  Save
  <input type="checkbox" />
  <!-- CSS state hook -->
</label>
```

**JavaScript's role**: Only manage `aria-disabled` attributes **CSS's role**:
Handle all visual interactions via checkbox `:checked` state

### **Why This Constraint?**

1. **Performance**: CSS is 100-1000x faster than JavaScript DOM manipulation
2. **Security**: Less JavaScript = smaller XSS attack surface
3. **Accessibility**: Native HTML semantics provide keyboard navigation
4. **Reliability**: CSS behavior is more predictable than JavaScript events
5. **Progressive Enhancement**: App works without JavaScript

### **Developer Guidelines**

- ❌ **Never** add `addEventListener` or inline event handlers for UI
- ❌ **Never** manipulate `style.display`, `classList`, or visual properties
- ❌ **Never** replace the hidden checkbox pattern with "conventional" buttons
- ✅ **Do** manage data flow and API communication
- ✅ **Do** update ARIA attributes for accessibility
- ✅ **Do** inject content into semantic HTML containers

**This is intentional architectural sophistication - not a limitation to
"fix".**
