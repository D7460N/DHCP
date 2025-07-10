# AGENT.md: Universal Agent Configuration File

*Category: Informational*
*Date: July 2025*

---

## 1. 👋 Introduction

This file gives any AI-powered coding agent a unified understanding of this codebase—structure, commands, conventions—so you don’t need scattered config files.

---

## 2. Project Structure & Organization

* Root: static entry point (HTML, CSS, JS); no server or CLI
* `assets/`: CSS only (D7460N-architected, UI via CSS)
* `src/`: data-processing code, no UI/event logic
* `tests/`: unit and integration tests

---

## 3. Build, Test & Development Commands

This project is built to run natively in the browser with no build steps, bundlers, transpilers, or dependency managers. No NPM, no packages, and no frameworks are used.

* Preview: Open `index.html` directly in any browser
* Testing: open each test HTML file in the browser; no external runner required
* Linting: run your preferred static analysis tool if needed

---

## 4. Code Style & Conventions

UI logic is handled entirely via CSS (e.g., `:has()`, `:checked`, `:empty`)

Structure is defined declaratively in HTML

JavaScript only handles pure data concerns

* **JS**: data-only, no UI/event code
* **CSS**: handles UI/state via `:has()`, container queries
* **HTML**: semantic structure only (`<app-container>`, `<nav>`, `<details>`, `<summary>`, `<main>`, `<article>`, `<aside>`, `<form>`, `<fieldset>`)
* Tabs for code; 2 spaces for YAML/JSON/MD/HTML/CSS/JS
* Strict linting; no inline styles or JS event handlers, no event listeners

---

## 5. Architecture & Design Patterns

UI logic is handled entirely via CSS (e.g., `:has()`, `:checked`, `:empty`)

Structure is defined declaratively in HTML

JavaScript only handles pure data concerns

* Separation of concerns: HTML (structure), CSS (UI), JS (data)
* Scrollable content must use `overflow-y: auto;` ancestor elements `overflow: hidden;`
* Declarative, CSS-driven, human-triggered interactivity; no JS listeners
* Data fetch/manipulation/delivery only via JS; no framework or dependencies
* Form validation via HTML attributes and CSS pseudo-classes only
* Follow Least Power Principle - HTML first, CSS next, JS last (data only)

---

## 6. Testing Guidelines

* Unit tests cover JavaScript modules that handle data logic only—no UI or event code is tested
* Integration tests to verify data flow and outputs
* No UI testing in JS; UI is CSS/HTML-only—verify manually or via visual testing tools

---

## 7. Security Considerations

* Must be able to work with JS turned off
* Must remain data-agnostic
* No sensitive data in code or config
* Validate all data inputs in JS modules
* Follow least-privilege principle in data handling

---

## 8. Configuration & Migration

### 8.1. Legacy Config Migration

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

## 9. Tool Integration

* Native support: Amp (since 2025-05-07), multiple AGENT.md (since 2025-07-07)
* Symlink-based support: Claude Code, Cursor, Gemini CLI, OpenAI Codex, Replit, Windsurf

---

## 10. File References

Agent tooling MAY include other files via `@filename.md` for additional context.

---

*Author: Geoffrey Huntley (Sourcegraph, Inc.)*
*Status: Informational*
