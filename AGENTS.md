# AGENTS.md

## Purpose

This file contains explicit instructions, architecture guidelines, coding standards, and conventions for AI agents (GPT, Codex, Copilot, automation scripts) when assisting with or analyzing the D7460N Architecture.

## 🚨 Critical Instructions

* Think all the way through the consequences. Solve the root. Avoid downstream waste.
* Prioritize accuracy, brevity, clarity, efficiency, and relevance above all.
* Never speculate or hallucinate. Confirm file and context existence explicitly.
* Strictly adhere to modern web standards (HTML5, CSS3).
* Always ensure compliance with ADA, WCAG, and Section 508 Accessibility Standards.

## 🏗️ Project Structure

* HTML markup minimal and semantic.
* CSS stored in `/assets/css/`.
* JavaScript, if explicitly required, placed under `/assets/js/`.
* Data files stored under `data/` as JSON.

## 💻 Coding Conventions

* Follow user's Prettier config strictly:

* Prioritize CSS-native solutions (container queries, `:has()`, intrinsic sizing/layout)
* AVOID JavaScript unless explicitly instructed; favor native HTML/CSS
* USE use `oninput` events instead of `addEventListener` or `eventlisteners`
* NEVER use JavaScript `addEventListener`
* NEVER use JavaScript `eventlisteners`
* FOLLOW established in-file coding patterns, paradigms, and conventions
* SCAN and or audit for already existing utilities, functions and features that can be reused for what you are tasked to do BEFORE creating a new one
* USE meaningful semantic HTML markup over generic meaningless `<div>` and or `<span>` elements

## `data-hooks`

> _"Where the rubber meets the road."_

* `data-hooks` is a line. The actual divide. The point at which "Separation of Concerns" actually happens. It is where scripting, JavaScript, and the data-side itself ends and the design, heuristics engineering, CSS rules logic, and UI side begins. It's the hand-off. Where the baton is passed. Where the rubber meets the road.
* JavaScript fetches the API endpoint JSON keys and creates and array.
* From there it creates standard non-shadow-DOM custom HTML elements or "UI endpoints" or hooks for the data to be populated or `data-hooks`.
* It does this by creating `data-hooks`
* They are non web-component, non-shadow-DOM, custom HTML elements created by fetching API endpoint JSON keys and adding the required dash. W3C specification do not specify where the dash should go. Only that it should include at least one dash. For JSON keys that are two or more words joined, example "dataitem", the dash is inserted between the two natural words. When there is a single word, example "item", the dash is appended to the end of the word.
* Use the custom

## 🌐 HTML Standards

* Use strictly semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
* Avoid unnecessary nesting; strictly follow the principles of separation of concerns and least power
* Scroll containers: explicitly apply `overflow:auto` only to the scrollable element (`<section>`), all ancestors (`<main><article>`) set to `overflow:hidden`
* Forms use native HTML validation attributes (`required`, `pattern`) and CSS (`:valid`, `:invalid`)
* Accessibility attributes (`aria-*`) correctly applied

## 🎨 CSS Guidelines

* Minimal specificity, minimal selectors
* Avoid ID selectors; prefer attribute or element selectors
* Always leverage modern CSS capabilities (`:has()`, intrinsic sizing, container queries)
* Strict adherence to the "direct ancestor `overflow:hidden`" scrolling rule
* Maintain clear diagnostic styles (pseudo-elements `::before`, `::after`) for layout debugging

## 🔧 JavaScript (if explicitly permitted)

* No frameworks (React, Vue, Angular, etc.)
* Pure native DOM APIs only
* JSON data fetched from local `data/` directory
* CRUD operations implemented minimally and natively
* ❗ Never use `addEventListener` or implicit event wiring.
* All interactivity must be explicitly bound to user-initiated `oninput`, `onsubmit`, or `onclick` handlers declared inline on the element.
* Navigation and data loading logic must derive from declarative HTML state. Do not rely on label text or DOM content for dynamic endpoint resolution.
* Use stable `value` attributes or structural index selectors (`nth-of-type`) for any state-driven logic.
* Base URL is fixed:

  ```txt
  https://67d944ca00348dd3e2aa65f4.mockapi.io/
  ```
* Valid endpoints:

  ```txt
  manage
  api-registration
  audit
  credentials
  faqs
  option-set
  option-types
  scope-type
  server-types
  servers
  variables
  settings
  ```
* Endpoint determination must not rely on text labels. Use static `value` attributes assigned in markup for stability.

## 📜 Markdown Documentation

* Always structured and concise (`.md` format)
* Markdown documentation placed under `docs/`
* `_README.md` in `css/`, `js/`, `images/`
* Accessibility and usability standards documentation prioritized
* Automatically update documentation

## 🛠️ Automation & CI/CD

* CI/CD uses GitHub Pages
* Commit messages: Imperative, short, precise
* Merge PRs only after accessibility and usability checks pass

## AI-Agent Behavior Instructions

* Never suggest unconfirmed repository structures or files
* Reference explicitly documented standards in this repo only
* Always consider the user's top priorities: GOD, Family, Country, Web
* User experience (UX) and usability must always be prioritized in guidance
* ⚠️ **Avoid unnecessary setup steps**: Do **not** scaffold or build boilerplate unless explicitly instructed. This app runs natively in-browser without compilation, bundling, or framework parsing. Assume a live-ready browser-native environment. Save compute cycles and avoid wasted output.

## 🚫 Explicitly Avoid

* Frameworks or JS-based state management
* Speculative answers or solutions
* Moral lectures or unsolicited opinions
* Use of `addEventListener` or external event delegation

## Environment Variables

```env
CODE_STYLE=compact
PREFERS_BREVITY=true
PREFERS_ACCURACY=true
PREFERS_SEPARATION_OF_CONCERNS=true
HTML_POLICY=no-divs,no-classes,no-ids,no-data-attrs
CSS_POLICY=layered,heuristics-only,accessibility-first
JS_POLICY=data-only,no-ui-logic,no-eventlisteners,no-addEventListener
FRAMEWORKS=none
DEPENDENCIES=none
OUTPUT_FORMAT=minimal,semantic,accessible
LAYOUT=holy-grail
SCROLL_CONTAINER=section-only
STRICT_MODE=true
DX_MODE=enabled
PREFERS_NATIVE=true
LLM_RUNTIME_TARGET=static-browser
UI_ARCHITECTURE=d7460n
HTML_MODE=semantic
CSS_MODE=heuristic
JS_MODE=data-only
NO_BOOTSTRAP=true
NO_CLASSNAME=true
NO_FRAMEWORK=true
NO_EVENTLISTENER=true
D7460N_MODE=true
```

## Core Rules

* **HTML**: Semantic only. No IDs, classes, `div`s, or `data-*`. Use native/custom elements only.
* **CSS**: All UI logic via `:has()`, `:empty`, `@layer`, container/style queries. No JS-controlled styles.
* **JavaScript**: Data fetch, hydrate, store only. No DOM manipulation or UI logic. No `addEventListener`.
* **Accessibility**: Always WCAG/508 compliant. No visual-only cues. Focus-visible required.
* **Layout**: Holy Grail. `<section>` scrolls. All ancestors `overflow: hidden`.

## Codex Mode Notes

Codex agents must:

* Prefer minimal, declarative solutions
* Avoid assumptions
* Validate output against provided HTML structure
* Output only necessary changes—no boilerplate unless explicitly requested

## AGENT Custom Instructions

> Last updated 2025.05.31

- These instructions override all other sources unless otherwise stated.
- Think step‑by‑step internally, then reply with the final code only.
- Read them at least twice before responding to user prompt
- After generating code, run an internal review: verify syntax, missing functions, and unused variables. Output the corrected version only.
- If accuracy cannot be 100% established and confirmed, start process over again until accuracy can be 100% confirmed. Accuracy is the utmost priority.
- Do not take shortcuts. 
- Do not skip code sections to save time.
- Do not fall back to general answers.
- Specificity is a priority.
- Contextual answers are a priority. 
- Before generating code or responding, check if context is lost. If context is lost, state that context was lost and then regain context. Never guess.
- Before responding, verify accuracy and modern best practices, utilizing web access as needed.
- Comply with these rules in every response, then if compliance is successful, clearly indicate compliance with these rules in every response. If compliance is not successful, indicate that also.
- When being constrained, admit constraints or limitations (e.g., low bandwidth or CPU usage).

- Verification Routine

- Mandatory Routine: Verify accuracy, completeness, and adherence to the latest best practices before every response.
- Explicit Indication: Before delivering the response, only after verification has occurred, clearly indicate that verification has occurred .

- Core Architectural Rules (Non-Negotiable)

Separation of Concerns

- HTML: Structure only (semantic elements).
- CSS: UI behavior, state, visibility, interaction.
- JS: Data handling only (no UI or styling logic).
- No Classes, IDs, Inline Styles or Scripts: All structure semantic, styles external.
- CSS-Driven UI: Use `:has()`, container queries, logical DOM for dynamic interactions. Native transitions only; no JS event listeners.

Scroll Control

- Scrollable Element: Scrolls (`overflow: auto`).
- Ancestor Control: All ancestor elements set to `overflow: hidden`.

Accessibility

- Full Accessibility: 508/WCAG compliance without relying on JS.

Layout & Structure

- Layout Grid: `<app-container>` with `<nav>`, `<main>`, `<aside>`.
- Semantic Elements: `<main>` holds one `<article>` at a time; `<aside>` for additional details.
- Forms: Always semantic (`<fieldset>`, `<legend>`, `<label>`, `<button>`).
- Validation using only CSS (`:valid`, `:invalid`, `:out-of-range`).
- Submit buttons disabled until form is valid.
- Validate new form inputs using only CSS (`:valid`, `:invalid`, `:out-of-range`).
- Holy Grail Layout: Responsive and full-bleed by default.

UI State Management

- Native Controls: Checkboxes, radios, CSS `:has()` and container style queries manage state.
- Dynamic UI: Use `:checked`, `:empty`, `:not()` for conditional UI.

Data Layer

- JS Role: Fetches and injects data into pre-existing DOM nodes.
- API Constraint: REST/JSON only; no frameworks.
- Supports internal (Swagger) and public editing.

Project Philosophy

- Dependency-Free
- No external frameworks.
- Browser-Native First
- Prioritize and utilize native browser features and progressive enhancement.
- Immediate Visual Completeness
- Avoid blank initial loads.
- Simplicity & Maintainability is a priority
- Keep everything explainable and maintainable

Organizational Strategy

Traceability: Every rule aligned to:

- UI: Look & behavior.
- UX: Usability/accessibility.
- DX: Developer simplicity.
- CX: Client/stakeholder outcomes.

AI Assistant Behavior

- No Generalization
- Avoid assumptions
- Only suggest changes explicitly requested or clearly justified
- Proactive Communication
- Alert to conflicts, missing context, or better alternatives
- Self-Check Protocol
- If ChatGPT is unsure, directly halt action and alert user
- Rigorous Change Verification
- Required: Confirm every change is explicitly justified and maintains original intent
