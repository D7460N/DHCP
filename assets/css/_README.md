# /css/README.md

## Purpose

This directory contains all global and scoped CSS styles used in the D7460N architecture. All styling enforces layout, visibility, interactivity, spacing, and heuristics **without using classes, IDs, or inline styles**.

**HTML** = Structure  

**CSS** = UI logic  

**JS** = Data transmission, API, and fetch calls.

## Style Architecture

Styles are separated using [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer):

- `@layer reset` → Normalization and box-sizing
- `@layer layout` → Grid, Holy Grail, scroll containment
- `@layer typography` → Semantic element presentation
- `@layer heuristics` → UI feedback, state changes (`:has()`, `:checked`, `:empty`)
- `@layer diagnostics` → Optional CSS overlay for layout/accessibility testing

## Visibility & UI Heuristics

All UI states are handled using CSS selectors. Examples:

- `:has()` is used to show/hide panels based on checked radios or DOM content
- `[hidden]`, `:empty`, and `[aria-expanded]` are used to control visibility
- Forms rely on `:valid`, `:invalid`, and `form:has(:invalid)` for validation display logic

## Scroll Behavior

Only the `<section>` element may scroll, unless explicitly justified. All ancestors must have `overflow: hidden;` to enforce clean containment and responsive scroll performance.

## Spacing Rules

- Margins and padding are only applied to content-carrying elements like `<h1>`–`<h6>`, `<p>`, and custom tags like `<item-name>`
- Containers (e.g., `<article>`, `<section>`) do **not** carry spacing rules
- This supports layout flexibility and consistent inheritance

## Accessibility Styling

- Focus states must be clearly visible without relying on outline alone
- Contrast ratios are WCAG 2.1 AA compliant (see `/a11y/readme.md` if applicable)

## Related Docs

- `/layout/readme.md`: structural enforcement
- `/components/readme.md`: tag semantics
- `d7460n-dev-guide/forms.md`: validation logic

## Tofix

- map data to correct form in JS
- `<aside>` and vertical layout
- light theme

// TODO

## Todo

- add item JS/data logiic
- delete item JS/data logiic
- edit item JS/data logiic
