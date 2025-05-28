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
