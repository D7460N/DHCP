# AGENTS.md

## Purpose

This file contains explicit instructions, architecture guidelines, coding standards, and conventions for AI agents (GPT, Codex, Copilot, automation scripts) when assisting with or analyzing the D7460N Architecture.

## 🚨 Critical Instructions

* Prioritize accuracy, brevity, clarity, efficiency, and relevance above all.
* Never speculate or hallucinate. Confirm file and context existence explicitly.
* Strictly adhere to modern web standards (HTML5, CSS3).
* Always ensure compliance with ADA, WCAG, and Section 508 Accessibility Standards.

## 🏗️ Project Structure

* HTML markup minimal and semantic.
* CSS stored in `assets/css/`.
* JavaScript, if explicitly required, placed under `assets/js/`.
* Data files stored under `data/` as JSON.

## 💻 Coding Conventions

* Follow user's Prettier config strictly:

```json
{"semi":false,"singleQuote":true,"tabWidth":2,"trailingComma":"none","printWidth":80,"arrowParens":"avoid","bracketSpacing":true,"jsxBracketSameLine":false,"useTabs":false,"htmlWhitespaceSensitivity":"css","endOfLine":"lf"}
```

* Prefer ternary operator: `thing ? 'value' : null`
* Array definitions always use bracket syntax: `[value]`
* Prioritize CSS-native solutions (container queries, `:has()`, intrinsic sizing/layout)
* Avoid JavaScript unless explicitly instructed; favor native HTML/CSS

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

## Environment Variables

```env
CODE_STYLE=compact
PREFERS_BREVITY=true
PREFERS_ACCURACY=true
PREFERS_SEPARATION_OF_CONCERNS=true
HTML_POLICY=no-divs,no-classes,no-ids,no-data-attrs
CSS_POLICY=layered,heuristics-only,accessibility-first
JS_POLICY=data-only,no-ui-logic
FRAMEWORKS=none
DEPENDENCIES=none
OUTPUT_FORMAT=minimal,semantic,accessible
LAYOUT=holy-grail
SCROLL_CONTAINER=section-only
STRICT_MODE=true
DX_MODE=enabled
PREFERS_NATIVE=true
```

## Core Rules

* **HTML**: Semantic only. No IDs, classes, `div`s, or `data-*`. Use native/custom elements only.
* **CSS**: All UI logic via `:has()`, `:empty`, `@layer`, container/style queries. No JS-controlled styles.
* **JavaScript**: Data fetch, hydrate, store only. No DOM manipulation or UI logic.
* **Accessibility**: Always WCAG/508 compliant. No visual-only cues. Focus-visible required.
* **Layout**: Holy Grail. `<section>` scrolls. All ancestors `overflow: hidden`.

## Codex Mode Notes

Codex agents must:

* Prefer minimal, declarative solutions
* Avoid assumptions
* Validate output against provided HTML structure
* Output only necessary changes—no boilerplate unless explicitly requested
