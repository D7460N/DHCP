# Developer Guide: Index

Welcome to the developer implementation guide for the architecture. This guide is designed for fast, practical onboarding. It assumes no build tools, no frameworks, and no prior exposure to the architecture.

---

## Quick Start

1. Clone the repo and open in VS Code
2. All UI elements are native HTML, styled via modern CSS using selectors like `:has()` and container queries
3. JavaScript is only used to fetch JSON data and inject it into semantic custom tags
4. Forms, layout, and routing are all CSS-driven and declarative
5. No build steps, no dependencies, no runtime toolchains

---

## Sections

- [`layout.md`](layout.md) - How layout is scaffolded using Holy Grail pattern and scroll containment
- [`components.md`](components.md) - Custom elements and how they're used for UI data binding
- [`forms.md`](forms.md) - CSS-only validation and accessible forms
- [`routing.md`](routing.md) - Navigation using radio buttons and `:has()`
- [`data.md`](data.md) - JSON structure and fetch logic
- [`performance.md`](performance.md) - Why this approach loads faster
- [`accessibility.md`](accessibility.md) - How it passes WCAG/508 without JS
- [`comparison.md`](comparison.md) - How it maps to tasks in React/Vue (no opinions, just parity)

---

## Frequently Referenced Concepts

- CSS `:has()` for state and visibility
- Semantic HTML with no classes or IDs
- Scroll control using overflow logic
- Flat DOM structure with minimal nesting
- Component architecture via custom HTML elements
- Declarative validation using native input logic
- Fetching local JSON data into static HTML structure

For details, see the full [ADD Document](../ADD.md) or open `/docs/` for project-wide guidance.

> This guide is designed to get you building right away — not to explain why. If you're here to ship fast, you're in the right place.
