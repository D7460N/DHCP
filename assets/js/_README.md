# JavaScript Modules

## Purpose

JavaScript in D7460N handles:
- Data fetching (via `fetch()`)
- API interaction (CRUD)
- Semantic UI state (no direct DOM styling)
- Event control for forms and navigation

## Presentaion Layer

| Layer     | Role                                 |
|-----------|--------------------------------------|
| HTML      | Structure only - intuitive semantic markup, A11y foundation |
| CSS       | Heuristics only - themes, conditional visual state via `:has()`, style queries|
| JS        | Data only - handling and delivery |

```
ARCHITECTURE ::

Single Page Application [ SPA ]
- HTML = front-loaded, empty, hidden
- CSS = hides elements withput data       [ <banner> - visible ]
- JS = delivers/removes data             / [ <header> - visible ]
________________________________________/ /
\_______________________________________\/
 \_______________________________________\
  .     ._ _ _ _ _ _ _ _ _ _ _ _ _ _._ _ _._ _ [ <nav> - hidden/empty by default ]
   .    /.                  _ _ _ _ _._ _ _._ _ [ <h1>, <p>, <ul> - hidden/empty by default ]
    .  /  .                /          .     ._ _ [ <aside> - hidden/empty by default ]
     .     .           `_\/_           .    /.
      .     .           ./\ .           .  /  .
       .     .                           .     .
        ________________________________________
        \_______________________________________\
         \_______________________________________\


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
    <input type="radio" name="list-item" hidden>
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
