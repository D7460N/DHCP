# AGENT.md: Universal Agent Configuration File

_Category: Informational_ _Date: July 2025_

---

## 1. 👋 Introduction

This file gives any AI-powered coding agent a unified understanding of this
codebase—structure, commands, conventions—so you don't need scattered config
files.

**🎯 QUICK START FOR AI ASSISTANTS: Read `docs/PROJECT-STATE.md` first for
complete project understanding and current status.**

**D7460N** is a browser-native, fully declarative architecture for building
scalable, maintainable front-end systems. It follows JAMstack principles,
operates as a Single Page Application (SPA), and is implemented as a Progressive
Web App (PWA). It eliminates runtime dependencies and avoids JavaScript-driven
UI logic by embracing modern standards: semantic HTML, CSS state management, and
data-only JavaScript modules.

---

## 2. Project Structure & Organization

- Root: static entry point (HTML, CSS, JS); no server or CLI
- `assets/`: CSS only (D7460N-architected, UI via CSS)
- `src/`: data-processing code, no UI/event logic
- `tests/`: unit and integration tests

---

## 3. Build, Test & Development Commands

This project is built to run natively in the browser with no build steps,
bundlers, transpilers, or dependency managers. No NPM, no packages, and no
frameworks are used.

- Preview: Open `index.html` directly in any browser
- Testing: open each test HTML file in the browser; no external runner required
- Linting: run your preferred static analysis tool if needed

---

## 4. Code Style & Conventions

UI logic is handled entirely via CSS (e.g., `:has()`, `:checked`, `:empty`)

Structure is defined declaratively in HTML

JavaScript only handles pure data concerns

- **JS**: data-only, no UI/event code
- **CSS**: handles UI/state via `:has()`, container queries
- **HTML**: semantic structure only (`<app-container>`, `<nav>`, `<details>`,
  `<summary>`, `<main>`, `<article>`, `<aside>`, `<form>`, `<fieldset>`)
- Tabs for code; 2 spaces for YAML/JSON/MD/HTML/CSS/JS
- Strict linting; no inline styles or JS event handlers, no event listeners

---

## 5. Architecture & Design Patterns

UI logic is handled entirely via CSS (e.g., `:has()`, `:checked`, `:empty`)

Structure is defined declaratively in HTML

JavaScript only handles pure data concerns

- Separation of concerns: HTML (structure), CSS (UI), JS (data)
- Scrollable content must use `overflow-y: auto;` ancestor elements
  `overflow: hidden;`
- Declarative, CSS-driven, human-triggered interactivity; no JS listeners
- Data fetch/manipulation/delivery only via JS; no framework or dependencies
- Form validation via HTML attributes and CSS pseudo-classes only
- Follow Least Power Principle - HTML first, CSS next, JS last (data only)

---

## 6. Code Style & Conventions

### HTML

- No inline classes, IDs, data-\*, styles, scripts, or data
- Structure-only: semantic elements (`<header>`, `<nav>`, `<details>`,
  `<summary>`, `<main>`, `<article>`, `<form>`, `<fieldset>`, etc.)
- Inputs use attributes only; values injected from JS

### CSS

- UI logic via `:has()`, `:checked`, `:empty`, `@container`
- Form validation via `:valid`, `:invalid`, `:out-of-range`
- Scroll behavior: all scrollable elements have `overflow: auto;` ancestors
  `overflow: hidden;`
- Fallbacks handled using `::before` on missing structural elements

### JS

- Strict separation: JS never controls UI heuristics, behaviour, state, or
  styling
- Modules only fetch, transform, and inject data
- No event listeners for anything ever
- DOM mutation limited to whitelisted functions (`clearFieldset`,
  `removeInlineStyles`, etc.)
- Use named imports, avoid default exports
- AI-generated logic must check if existing functions and modules already handle
  the required functionality before implementing new logic
- Do not reimplement or duplicate logic that already exists across modules
- All JS modules must be self-contained and not rely on global state or side
  effects
- All JS modules must be idempotent and safe to run multiple times without
  unintended consequences
- All JS modules must be designed to work with the provided `schema.js` for data
  structure consistency
- All JS modules must be able to run in a browser environment without any
  external dependencies
- All agents, humans, and tools must read every JS module line-by-line before
  attempting any changes to ensure full context and architectural continuity
- Use `schema.js` to ensure data structure consistency across all JS modules
- Follow the schema-driven approach for all data transformations and injections
- Ensure all JS modules are self-contained and do not rely on global state or
  side effects
- Ensure all JS modules are designed to work in a browser environment without
  any external dependencies

---

## 7. Architecture & Design Patterns

- Holy Grail Layout via `<app-container>` using semantic regions
- Custom Elements generated from JSON keys using `toTagName()`
- Schema-driven DOM injection from schema.js
- Rules engine governs visibility, order, required fields
- Declarative form inputs: generated inside `<fieldset>` + native validation
- Fallbacks for missing content, not empty content
- Progressive enhancement: immediate visual completeness with no JS dependency
- No hardcoded data in HTML, CSS, or JS
- No inline styles, scripts, or event handlers in HTML
- No external dependencies, frameworks, or libraries
- No server-side rendering or dynamic content generation
- No build steps, bundlers, or transpilers
- No NPM, packages, or dependency managers
- No CLI commands or scripts
- No event listeners or handlers in JS
- No global state or side effects in JS
- No complex state management in JS

---

## 8. Testing Guidelines

- Unit tests cover JavaScript modules that handle data logic only—no UI or event
  code is tested
- Integration tests to verify data flow and outputs
- No UI testing in JS; UI is CSS/HTML-only—verify manually or via visual testing
  tools
- Use browser dev tools to inspect DOM structure and CSS styles
- Ensure all JS modules are idempotent and can be run multiple times without
  side effects
- Validate all data inputs in JS modules against `schema.js`

---

## 9. Security Considerations

- Must be able to work with JS turned off
- Must remain data-agnostic
- No sensitive data in code or config
- Validate all data inputs in JS modules
- Follow least-privilege principle in data handling

---

## 10. Configuration & Migration

- No configuration files; all settings are hardcoded in JS modules
- No migration scripts; all data is static and schema-driven
- No environment variables; all constants are defined in `config.js`
- No symlinks or external references; all files are self-contained
- No external dependencies; all code is self-contained and runs in the browser
- No CLI commands or scripts; all functionality is accessible via the browser
- No build steps, bundlers, or transpilers; all code is ready to run in the
  browser
- No server-side rendering or dynamic content generation; all content is static
  and schema-driven
- No external configuration files; all settings are hardcoded in JS `config.js`
- No external references; all files are self-contained and run in the browser

### Use:

```bash
mv .cursorrules AGENT.md && ln -s AGENT.md .cursorrules
mv .windsurfrules AGENT.md && ln -s AGENT.md .windsurfrules
mv CLAUDE.md AGENT.md && ln -s AGENT.md CLAUDE.md
ln -s AGENTS.md AGENT.md
mv .github/copilot-instructions.md AGENT.md && ln -s ../../AGENT.md .github/copilot-instructions.md
mv .replit.md AGENT.md && ln -s AGENT.md .replit.md
```

---

## 11. Tool Integration

- Native support: Amp (since 2025-05-07), multiple AGENT.md (since 2025-07-07)
- Symlink-based support: Claude Code, Cursor, Gemini CLI, OpenAI Codex, Replit,
  Windsurf

---

## 12. File References

### HTML

- `index.html` — Main entry point, loads CSS and JS

### CSS

- `alerts.css` — Alert and notification styles.
- `a11y.css` — Accessibility — focus indicators, visual clarity, focus states,
  visually hidden text, ARIA support styling, non-visual hints and keyboard
  cues, compliance with WCAG/508 for inputs and interactions.
- `cards.css` — Card styles and layouts
- `diag.css` — Render diagnostic output and structure visibility in views.
  Structure and output for diagnostics display. Debug-only; visible only in
  diagnostic views. System output, evaluation messages.
- `fallbacks.css` — Show pseudo-element fallback messaging for missing
  structure. Show warnings via `::before` on missing required structure. No JS,
  only visible when DOM is incomplete. Structural error handling and debugging.
- `fonts.css` — Load and configure typographic font-face rules. Declare
  `@font-face` and font stack rules. No layout or visual behavior logic.
  Consistent branding typography.
- `forms.css` — Style native form elements with consistent spacing, validation.
  Style `<form>`, `<fieldset>`, `<input>`, `<label>` etc. CSS-only validation
  using `:valid`, `:invalid`. Form control styling and accessible validation.
- `images.css` — Image handling and responsive images
- `layout.css` — Define structural grid and container layout across views.
  Define Holy Grail layout using semantic containers. Grid/flex layout, logical
  DOM alignment. Page structure, header/sidebar/footer layout.
- `lists.css` — List styles and responsive lists
- `loading.css` — Display animated loading states using native CSS animation.
  Render spinners, animated states during data fetch (natural state between
  click to fetch data and when fetched data arrives in the DOM). Keyframe-based
  animations, `visibility`-based toggles.
- `print.css` — Print styles and media queries
- `reset.css` — Normalize browser defaults for consistent baseline styling. Zero
  out user-agent margins/padding. Normalize styles. No color, layout, or
  component rules. Always loaded first for clean CSS base.
- `responsive.css` — Adapt layout across screen sizes using `@container` queries
  without using breakpoints. No JS, fully native layout shifting. Supports most
  screen sizes and shapes.
- `scrollbars.css` — Standardize scrollable container appearance and behavior.
  Theme and style native scrollbars. Scoped to scrollable elements only. Ensure
  consistent scroll UX across OS/browsers.
- `themes.css` — Define one to many color themes and theming variables. Define
  CSS variables for light/dark/system color schemes. No direct styling;
  variables only. Color branding, adaptive UI switching.
- `typography.css` - Typography styles
- `forms.css` — Form styles and validation
- `themes.css` — Color palette and theming
- `tooltips.css` — Tooltip styles and positioning
- `transitions.css` — Provide smooth CSS-native transitions and animations.
  Provide smooth transitions for interactive elements. Pure CSS, no JS
  interaction. State change feedback (hover/focus/expand).
- `typography.css` — Apply typographic rhythm, line height, heading styles. Set
  base font size, headers, spacing, line height. Content readability focus.
  Standard text hierarchy across components. Fluid typography for readability
  and consistency.

### JS

- `app.js` — Acts as the **main entry point** for initializing the UI. Imports
  `loaders.js` functions to fetch and render navigation, banners, and content.
  Calls `initApp()` on load to populate the UI based on the user's nav selection
  and settings. It does **NOT** define global event listeners or app-wide state.
  It does **NOT** manage form logic, error handling, or configuration mutation.
  It performs no DOM manipulation beyond selection and delegation to loader
  functions.
- `config.js` — Centralizes static configuration for API interaction and UI
  behavior. Defines base URLs, endpoint names, dropdown options, feature
  toggles, and JSON headers. Exposes global flags for warning modals and
  unsaved-change confirmations. It does **NOT** contain any logic, computation,
  or dynamic behavior. It does **NOT** modify or derive values at runtime. No
  dependency on external state or side effects.
- `env.js` — Detects the runtime environment (`dev`, `test`, `prod`) based on
  the hostname. Exports environment constants (`isDev`, `isTest`, `isProd`) for
  conditional logic. It does **NOT** fetch external settings or use cookies,
  query params, or localStorage. No environment-specific configuration is set
  here—only classification. It does **NOT** support override or manual toggling
  at runtime.
- `errors.js` — Exports a single `logError()` function to standardize error
  logging to the console. Accepts a context label and an optional error object.
  It does **NOT** define or return structured error objects. No integration with
  telemetry, UI messaging, or retry logic. No classification, codes, or severity
  levels—just raw console output.
- `fetch.js` — Provides wrapper functions for RESTful HTTP requests:
  `fetchJSON`, `postJSON`, `putJSON`, and `deleteJSON`. Normalizes endpoint
  formatting via `BASE_URL`. Validates response status and parses payloads (with
  an implicit parse check via `JSON.parse`). It does **NOT** retry, cache, or
  batch requests. Does **NOT** expose error messages beyond thrown status-based
  `Error()`. No timeout, abort handling, or schema validation on responses.
- `inject.js` — Creates and injects list items (`<li>`) into a `ul` based on
  JSON object data. Provides utility converters: `toTagName()` (for custom
  elements) and `toCamel()`. Manages row toggle state and synchronizes selected
  row with form field population. Binds a customizable `rowSelectHandler()` to
  respond to row selection.
- `loaders.js` — Orchestrates the loading and injection of banner, navigation,
  and page content. Applies schema normalization and rule inference to incoming
  data before injection. Maintains a cache of field rules per endpoint
  (`RULES_CACHE`) and exposes the active rule set. It does **NOT** manage UI
  state or styling—it only fetches, normalizes, and injects. Does **NOT**
  support pagination, filters, or incremental loading strategies. Lacks error
  retry or debounce/throttle mechanics on fetch operations.
- `rules.js` — Analyzes a list of records to infer UI field rules dynamically
  based on value patterns. Categorizes field types (`toggle`, `datetime`,
  `text`, `select`, `textarea`, `number`) using regex, value counts, and field
  names. Applies read-only or required flags based on field name or data
  completeness. It does **NOT** validate user input or enforce the rules at
  runtime. It doesn't support custom rule overrides or external schema
  injection. No support for nested fields, arrays, or deeply structured objects.
- `schema.js` — Provides field remapping dictionaries (`ENDPOINT_SCHEMAS`) to
  normalize API responses into a unified shape. Exposes `normalizeRecord()` to
  transform raw data using base and endpoint-specific mappings. Auto-generates
  reverse mappings to support serialization or form rendering from normalized
  keys. It does **NOT** enforce data types, required fields, or validation
  constraints. Schema rules are static—no dynamic or user-defined schema
  injection. No transformation of nested objects, only flat key remapping.
- `sw.js` — Registers a service worker to manage caching and offline behavior.
  Pre-caches critical static assets (HTML, CSS, JS, logo). Implements install,
  activate, and fetch handlers for offline-first behavior. It does **NOT**
  intercept dynamic API calls (e.g., POST/PUT). It does **NOT** include runtime
  caching strategies or version diffing. No push notification handling or
  background sync queue logic.
- `utils.js` — Provides stateless utility functions for form value tracking,
  date formatting, and normalization. Supports `hasUnsavedChanges()` and
  `unsavedCheck()` logic for tracking dirty form state and gating user actions.
  Includes helper formatting for keys (`normalizeKey`) and date strings
  (`formatDateForInput`). It does **NOT** mutate UI or interact with the DOM
  directly. No external dependencies, side effects, or application-specific
  logic. Does **NOT** persist or retrieve any state—fully functional and
  reactive.

### **🚨 CRITICAL: CSS-First Hidden Checkbox Pattern**

**DO NOT "FIX" THIS - IT'S INTENTIONALLY ADVANCED:**

```html
<label role="button" name="submit" aria-label="Save">
  Save
  <input type="checkbox" />
  <!-- CSS state hook -->
</label>
```

**Why:** 100-1000x faster than JS, secure, accessible, works without JS
**Rules:** Never replace with `<button>`, never add JS event handlers **Read:**
`docs/PROJECT-STATE.md` for complete architecture explanation

Subdirectories (e.g., /admin/, /dashboard/) may include their own AGENT.md files
for localized subsystem documentation.
