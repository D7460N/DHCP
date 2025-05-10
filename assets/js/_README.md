# JavaScript Modules

## Purpose

JavaScript in D7460N handles:
- Data fetching (via `fetch()`)
- API interaction (CRUD)
- Semantic UI state (no direct DOM styling)
- Event control for forms and navigation

## Philosophy

| Layer     | Role                                 |
|-----------|--------------------------------------|
| HTML      | Structure and semantics               |
| CSS       | UI layout and visual state via `:has()` |
| JS        | Data handling, rendering, and event coordination |

## Module Structure

| File             | Responsibility                     |
|------------------|-------------------------------------|
| `config.js`       | Constants, endpoints, version info  |
| `utils.js`        | Shared helper functions             |
| `refs.js`         | DOM references                      |
| `api.js`          | Data service layer (`fetch`, load)  |
| `view.js`         | DOM rendering and content binding   |
| `formController.js` | Handles form submit, update, delete |
| `app.js`          | Main entry point: wires modules     |

## Principles

- All modules use **ES Modules** (`import/export`)
- No classes, no global functions, no inline scripts
- Fully browser-native, framework-free
