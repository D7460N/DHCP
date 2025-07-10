# AGENT.md: Universal Agent Configuration File

*Category: Informational*
*Date: July 2025*

---

## 1. 👋 Introduction

This file gives any AI-powered coding agent a unified understanding of this codebase—structure, commands, conventions—so you don't need scattered config files.

**D7460N** is a browser-native, fully declarative architecture for building scalable, maintainable front-end systems. It follows JAMstack principles, operates as a Single Page Application (SPA), and is implemented as a Progressive Web App (PWA). It eliminates runtime dependencies and avoids JavaScript-driven UI logic by embracing modern standards: semantic HTML, CSS state management, and data-only JavaScript modules.

---

## 2. Project Structure & Organization

- Root: static entry point (HTML, CSS, JS); no server or CLI
- `assets/`: CSS only (D7460N-architected, UI via CSS)
- `src/`: data-processing code, no UI/event logic
- `tests/`: unit and integration tests

---

## 3. Build, Test & Development Commands

This project is built to run natively in the browser with no build steps, bundlers, transpilers, or dependency managers. No NPM, no packages, and no frameworks are used.

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
- **HTML**: semantic structure only (`<app-container>`, `<nav>`, `<details>`, `<summary>`, `<main>`, `<article>`, `<aside>`, `<form>`, `<fieldset>`)
- Tabs for code; 2 spaces for YAML/JSON/MD/HTML/CSS/JS
- Strict linting; no inline styles or JS event handlers, no event listeners

---

## 5. Architecture & Design Patterns

UI logic is handled entirely via CSS (e.g., `:has()`, `:checked`, `:empty`)

Structure is defined declaratively in HTML

JavaScript only handles pure data concerns

- Separation of concerns: HTML (structure), CSS (UI), JS (data)
- Scrollable content must use `overflow-y: auto;` ancestor elements `overflow: hidden;`
- Declarative, CSS-driven, human-triggered interactivity; no JS listeners
- Data fetch/manipulation/delivery only via JS; no framework or dependencies
- Form validation via HTML attributes and CSS pseudo-classes only
- Follow Least Power Principle - HTML first, CSS next, JS last (data only)

---

## 6. Code Style & Conventions

HTML

- No inline classes, IDs, data-*, styles, scripts, or data
- Structure-only: semantic elements (`<header>`, `<nav>`, `<details>`, `<summary>`, `<main>`, `<article>`, `<form>`, `<fieldset>`, etc.)
- Inputs use attributes only; values injected from JS

CSS

- UI logic via `:has()`, `:checked`, `:empty`, `@container`
- Form validation via `:valid`, `:invalid`, `:out-of-range`
- Scroll behavior: all scrollable elements have `overflow: auto;` ancestors `overflow: hidden;`
- Fallbacks handled using `::before` on missing structural elements

JS

- Strict separation: JS never controls UI heuristics, behaviour, state, or styling
- Modules only fetch, transform, and inject data
- No event listeners for anything ever
- DOM mutation limited to whitelisted functions (`clearFieldset`, `removeInlineStyles`, etc.)
- Use named imports, avoid default exports
- AI-generated logic must check if existing functions and modules already handle the required functionality before implementing new logic
- Do not reimplement or duplicate logic that already exists across modules
- All JS modules must be self-contained and not rely on global state or side effects
- All JS modules must be idempotent and safe to run multiple times without unintended consequences
- All JS modules must be designed to work with the provided `schema.js` for data structure consistency
- All JS modules must be able to run in a browser environment without any external dependencies
- All agents, humans, and tools must read every JS module line-by-line before attempting any changes to ensure full context and architectural continuity
- Use `schema.js` to ensure data structure consistency across all JS modules
- Follow the schema-driven approach for all data transformations and injections
- Ensure all JS modules are self-contained and do not rely on global state or side effects
- Ensure all JS modules are designed to work in a browser environment without any external dependencies

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

- Unit tests cover JavaScript modules that handle data logic only—no UI or event code is tested
- Integration tests to verify data flow and outputs
- No UI testing in JS; UI is CSS/HTML-only—verify manually or via visual testing tools
- Use browser dev tools to inspect DOM structure and CSS styles
- Ensure all JS modules are idempotent and can be run multiple times without side effects
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
- No build steps, bundlers, or transpilers; all code is ready to run in the browser
- No server-side rendering or dynamic content generation; all content is static and schema-driven
- No external configuration files; all settings are hardcoded in JS `config.js`
- No external references; all files are self-contained and run in the browser

Use:

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
- Symlink-based support: Claude Code, Cursor, Gemini CLI, OpenAI Codex, Replit, Windsurf

---

## 12. File References

HTML

- *index.html* — Main entry point, loads CSS and JS

CSS

- *fallbacks.css* — Structural fallbacks for missing elements only
- *layout.css* — Main styles for layout
- *typography.css* - Typography styles
- *forms.css* — Form styles and validation
- *themes.css* — Color palette and theming
- *alerts.css* — Alert and notification styles
- *tooltips.css* — Tooltip styles and positioning
- *cards.css* — Card styles and layouts
- *lists.css* — List styles and responsive lists
- *images.css* — Image handling and responsive images
- *responsive.css* — Media queries and responsive design
- *print.css* — Print styles and media queries
- *a11y.css* — Accessibility styles and ARIA attributes
- *transitions.css* — Animations and transitions
- *images.css* — Image handling and responsive images
- *forms.css* — Form styles and validation
- *colors.css* — Color palette and theming

JS

- *app.js* — Entry point: orchestrates JSON loading, DOM population
- *config.js* — Environment variables and remote endpoint constants
- *rules.js* — Rule engine defining visibility, order, and constraints
- *schema.js* — Schema metadata mapping for JSON -> DOM injection
- *inject.js* — Transforms JSON keys into custom HTML tags
- *form.js* — Form state logic (restore, mirror, toggle buttons)
- *utils.js* — Utility functions for data manipulation

Subdirectories (e.g., /admin/, /dashboard/) may include their own AGENT.md files for localized subsystem documentation.
