# Application Style Guide

> This style guide governs all structural, behavioral, interactive, look/feel,
> and accessibility conventions across the UI. It enforces a declarative,
> dependency-free architecture with strict accessibility and maintainability
> constraints.

---

## 📐 Layout Structure

| Element           | Purpose                              | Notes                                 |
| ----------------- | ------------------------------------ | ------------------------------------- |
| `<app-container>` | Application shell container          | Contains all layout regions           |
| `<header>`        | Top banner containing logo/user info | No classes or ARIA needed if semantic |
| `<nav>`           | Primary navigation section           | Uses `<details><summary>` pairs only  |
| `<main>`          | Main content container               | Always contains a single `<article>`  |
| `<aside>`         | Detail/edit panel                    | Must include `<h2>` and close button  |
| `<footer>`        | Informational footer                 | Use for version, credits, metadata    |

---

## 🧱 Structural Conventions

| Pattern                      | Enforced Practice                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| No `<div>`/`<span>`          | Semantic HTML only                                                                                                           |
| No `class`, `id`, `data-*`   | Structure and state inferred by hierarchy                                                                                    |
| Scrollable containers        | `<details>`/`<section>`, `<article>`/`<ul>` and `<form>`/`<fieldset>` are `overflow: auto`. All ancestors `overflow: hidden` |
| One `<article>` at a time    | Avoid parallel primary views                                                                                                 |
| Use `<fieldset>`/`<legend>`  | For all grouped form inputs                                                                                                  |
| All buttons must have `type` | Prevent implicit `submit` behavior                                                                                           |
| Use `<ul><li>` for tables    | Custom elements allowed inside `<li>`                                                                                        |

---

## 🧠 UI Logic via CSS Only

| Feature              | CSS-Only Strategy                               |
| -------------------- | ----------------------------------------------- |
| Column visibility    | Checkbox toggle + `:has()` selectors            |
| Detail view toggling | Populate `<aside>`; visible if non-empty        |
| Form validity        | `:valid`, `:invalid`, `:out-of-range`           |
| Button states        | `:not(:disabled)` and `:not(:empty)`            |
| Save/reset state     | Controlled with `:not(:empty)` + dirty tracking |
| Section expansion    | `<details>` / `<summary>` only                  |

---

## ✅ Live Regions

| Use Case                | Role                               | Notes                            |
| ----------------------- | ---------------------------------- | -------------------------------- |
| Status update           | `role="status"`                    | For success and passive messages |
| Error/urgent            | `role="alert"`                     | For failure or warnings          |
| Avoid redundant content | Use visible text OR ARIA, not both |                                  |

---

## ✅ Keyboard & Focus

| Rule                     | Requirement                                   |
| ------------------------ | --------------------------------------------- |
| All interactive elements | Must be focus-able via `Tab`                  |
| Focus order              | Matches DOM order                             |
| Focus indicators         | Use `outline` or equivalent — must be visible |
| Skip to content          | Optional, if layout is complex                |
| Forms                    | Inputs must be reachable and label-linked     |

---

## ✅ Error Handling

| Context             | Requirement                                                   |
| ------------------- | ------------------------------------------------------------- |
| Form validation     | Use `:invalid`, `:valid`, `required`, `pattern`, `min`, `max` |
| Error messaging     | Use inline `<p role="alert">` near field                      |
| No modals           | Errors must appear in context                                 |
| One error per field | No duplicate announcements                                    |

---

## ✅ Color Contrast

| Rule                                 | Requirement                         |
| ------------------------------------ | ----------------------------------- |
| Text contrast ratio                  | Minimum 4.5:1 (normal), 3:1 (large) |
| UI element boundaries (e.g. buttons) | Must meet 3:1 against background    |
| Hover/focus states                   | Must not rely on color alone        |
| Disabled state                       | Must still maintain 3:1 if legible  |

---

## 🌐 Accessibility (508 / WCAG 2.2 AA)

| Rule                | Requirement                                                |
| ------------------- | ---------------------------------------------------------- |
| Native HTML > ARIA  | Use ARIA only when semantic HTML is insufficient           |
| Forms               | Use explicit `<label>` or `aria-label`                     |
| Landmark roles      | `<main>`, `<nav>`, `<header>`, `<footer>`                  |
| Custom elements     | Use `title` or `aria-label` if they convey information     |
| Live regions        | Use `role="status"` or `role="alert"` for dynamic messages |
| No redundant labels | Avoid duplicate visible + ARIA labels                      |
| Heading order       | Must be hierarchical (`<h1>` → `<h2>`, never skipped)      |

---

## 🔄 JavaScript Responsibilities (Data Layer Only)

| Scope                  | Allowed                                             |
| ---------------------- | --------------------------------------------------- |
| Fetching API JSON      | ✅                                                  |
| Injecting content      | ✅                                                  |
| Manipulating structure | ❌                                                  |
| UI event listeners     | ❌                                                  |
| Assigning classes/IDs  | ❌                                                  |
| Observing inputs       | Only through `form.oninput` or mutation fallback    |
| Modal behavior         | Visibility toggled via content presence, not script |

---

## 🧩 Custom Elements

| Tag Name               | Function                      | Accessibility Notes                                     |
| ---------------------- | ----------------------------- | ------------------------------------------------------- |
| `<app-banner>`         | Displays inline system status | Use `role="status"` or `role="alert"`                   |
| `<app-logo>`           | Brand/logo region             | Must use `title` for screen readers                     |
| `<app-user>`           | User/account info             | Must use `title`                                        |
| `<powered-by>`         | Credit line                   | Decorative or `title` optional                          |
| `<app-version>`        | Version number                | `title` with full version info                          |
| `<custom-elements>`    | Table columns                 | Dynamically generated from API endpoint keys and values |
| `<custom-form-inputs>` | Form inputs                   | Dynamically generated from API endpoint keys and values |

---

## 🧪 Form Validation (Native Only)

| Validation Type     | How Implemented                                   |
| ------------------- | ------------------------------------------------- |
| Required fields     | `required` attribute                              |
| Pattern constraints | `pattern="[A-Za-z0-9]{4}"`                        |
| Range constraints   | `min`, `max`, `step`                              |
| State feedback      | CSS `:valid` / `:invalid`                         |
| Submit gating       | `:valid` + `:not(:empty)` triggers visible submit |

---

## 🛑 Reserved Practices

- For easily overriding defaults

| Practice                    | Reason                                   |
| --------------------------- | ---------------------------------------- |
| `onclick`, `onchange`, etc. | Breaks separation of concerns            |
| Global event listeners      | Violates architectural rules             |
| JavaScript-driven UI state  | Handled via structure + CSS only         |
| Non-semantic layout         | Breaks accessibility & structure rules   |
| Classes, IDs, data-\*       | All UI logic must derive from native DOM |
| Nested CSS rules            | Resets specificity, easily overridden    |

---

## 🎨 Light/Dark Modes & Decoupled Theming

Fully declarative, zero-dependency theming — including light/dark modes and
project-specific branding — without modifying the DOM or using JavaScript.

---

## 🔄 System-Based Light/Dark Mode

| Mechanism               | Implementation                       |
| ----------------------- | ------------------------------------ |
| Color scheme detection  | Uses `@media (prefers-color-scheme)` |
| No toggle elements      | Mode matches OS/browser setting      |
| Accessibility compliant | All contrast meets WCAG 2.2 AA       |

### Example:

```css
:root {
  --text: black;
  --bg: white;
  --accent: navy;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: white;
    --bg: #111;
    --accent: cyan;
  }
}
```

### Usage:

```css
body {
  color: var(--text);
  background-color: var(--bg);
}
button {
  border-color: var(--accent);
}
```

---

## ✅ Summary

The Architecture is:

- **Accessible by default**
- **Semantic, declarative, and durable**
- **Zero-dependency**
- **Compliant with all modern standards and best-practices**
- **Future-compatible and cross-framework adaptable**
- **Native dark/light mode via prefers-color-scheme**
- **Project-brand themes using @layer**
- **Centralized control via design tokens (--\*)**
- **Full accessibility compliance out-of-the-box**
- **Plug-and-play override layering with no JS, no classes, and no markup
  mutation**
