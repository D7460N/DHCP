# Accessibility Checklist Ready 

Concise accessibility checklist ready — covers semantic HTML, color contrast, focus, ARIA, keyboard navigation, and verification steps.

Below is a **practical, modern accessibility checklist** focused on **HTML + CSS first**, with ARIA baked into the HTML and leveraged by CSS. It aligns with WCAG principles and real-world audits.

---

## ✅ Semantic Markup (HTML First)

* Use **native elements for their purpose**:

  * `<header> <nav> <main> <section> <article> <aside> <footer>`
  * `<a>` for offshore links
  * `<label>` with nested `<input type="checkbox">` enable full state control and actions that `<button>` alone cannot natively do.
* One `<app-container>` per page
* One `<main>` per page
* Use **heading levels in order** (`h1 → h2 → h3`, no skipping)
* Lists for lists (`<ul>`, `<ol>`, `<li>`), not styled divs
* Tables only for tabular data:

  * `<caption>`, `<thead>`, `<th scope="col|row">`
* Images:

  * Meaningful images → accurate `alt`
  * Decorative images → `alt=""`
* Forms:

  * Every input has a visible label
  * Use `<fieldset>` + `<legend>` for grouped controls
  * Errors described in text, not color alone

---

## 🎨 Color & Contrast (CSS)

* Text contrast:

  * Normal text: **≥ 4.5:1**
  * Large text (≥ 18pt or 14pt bold): **≥ 3:1**
* UI components & focus indicators: **≥ 3:1**
* Never rely on color alone to convey meaning
* Support user preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```
* Avoid low-contrast placeholder text as labels

---

## 🎯 Focus States & Visibility

* Never remove focus outlines unless replaced with better ones
* Ensure **highly visible focus styles**:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order follows DOM order (don’t fix with CSS hacks)
* Modals:

  * Focus moves into modal on open
  * Focus returns to trigger on close

---

## ⌨️ Keyboard Navigation

* Entire site usable with **keyboard only**
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom components:

  * Support `Enter` and `Space`
* Skip link at top of page:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions must have keyboard equivalents

---

## 🧭 ARIA (Use Sparingly)

**Rule:** *Native HTML first. ARIA only when HTML can’t do the job.*

* Never add ARIA that duplicates native semantics
  ❌ `role="button"` on `<button>`
* Common valid uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for active navigation
  * `aria-live` for async updates (errors, status)
* Do **not**:

  * Override native roles
  * Use ARIA to fix broken markup
* If you need lots of ARIA → reconsider the component design

---

## 📐 Layout & Responsiveness

* Responsive layouts that don’t break zoom:

  * Test at **200–400% zoom**
* Avoid fixed heights that clip text
* Use logical properties when possible:

  ```css
  margin-inline-start
  padding-block
  ```

---

## 🧪 Testing & Validation

* Keyboard-only test (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test (NVDA / VoiceOver)
* Automated checks:

  * axe
  * Lighthouse (Accessibility tab)
* Manual checks always required (automation ≠ compliance)

---

## 🧠 Mindset (Most Important)

* Accessibility is **structural**, not decorative
* HTML defines meaning → CSS enhances → JS augments
* If it works without CSS and JS, you’re usually doing it right

---

If you want next:

* **HTML-only accessibility starter template**
* **CSS focus/contrast utility patterns**
* **Accessible component patterns (menus, dialogs, tabs)**


### ♿ Modern HTML & CSS Accessibility Checklist

Use this as a **build-time and review-time checklist**. Prioritize **native HTML**, then CSS, and only then ARIA.

---

## 1) Semantic Markup (HTML First)

* Use elements for meaning, not appearance

  * `<header> <nav> <main> <section> <article> <aside> <footer>`
* One `<main>` landmark per page
* Headings are hierarchical and ordered (`h1 → h2 → h3`)
* Use real controls:

  * `<button>` for actions
  * `<a>` for navigation
* Lists use `<ul>/<ol>/<li>` (no faux lists)
* Tables only for data:

  * `<caption>`, `<th>`, `scope`
* Images:

  * Informative → meaningful `alt`
  * Decorative → `alt=""`
* Forms:

  * Every input has a visible `<label>`
  * Group related inputs with `<fieldset><legend>`
  * Errors are text-based (not color-only)

---

## 2) Color & Contrast (CSS)

* Text contrast:

  * Normal text ≥ **4.5:1**
  * Large text ≥ **3:1**
* UI components & focus indicators ≥ **3:1**
* Never rely on color alone to convey meaning
* Avoid placeholder-as-label patterns
* Respect user preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

## 3) Focus States & Visibility

* Do **not** remove focus outlines without replacement
* Use `:focus-visible`, not `:focus`

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order follows DOM order
* Modals:

  * Focus moves into modal on open
  * Focus returns to trigger on close

---

## 4) Keyboard Navigation

* Site is fully usable with keyboard only
* All interactive elements are tabbable
* No keyboard traps
* Custom controls support:

  * `Enter` and `Space`
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

## 5) ARIA (Last Resort)

**Rule:** Native HTML first. ARIA only when necessary.

* Never duplicate native semantics
  ❌ `role="button"` on `<button>`
* Valid, common uses:

  * `aria-label` (only if no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for active nav items
  * `aria-live` for async status/error messages
* Do not:

  * Override native roles
  * Use ARIA to fix broken HTML

---

## 6) Layout, Zoom & Resilience

* Layout works at **200–400% zoom**
* No fixed heights that clip text
* Avoid absolute positioning for core content
* Prefer logical properties:

  ```css
  margin-inline
  padding-block
  ```

---

## 7) Testing (Non‑Optional)

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test (NVDA / VoiceOver)
* Automated tools (supplemental only):

  * axe
  * Lighthouse
* Manual review always required

---

## 8) Guiding Principle

If it:

* Works without CSS
* Works without JS
* Makes sense read aloud

…it’s usually accessible.

---

**Automation note:** This checklist is intended for repeated scheduled review during design, build, and QA phases.


### ♿ Accessibility Checklist — Modern HTML & CSS (Build + QA)

Use this as a **repeatable audit list**. Favor **native HTML**, enhance with **CSS**, and use **ARIA only when unavoidable**.

---

## 1) Semantic Markup (Structure & Meaning)

* Use elements by purpose:

  * Landmarks: `<header> <nav> <main> <footer>`
  * Content: `<section> <article> <aside>`
* Exactly **one `<main>`** per page.
* Headings are logical and sequential (no skipped levels).
* Controls:

  * Actions → `<button>`
  * Navigation → `<a href>`
* Lists are real lists (`<ul>/<ol>/<li>`).
* Tables only for data; include `<caption>`, `<th>`, and proper `scope`.
* Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* Forms:

  * Every control has a visible `<label>`
  * Group related fields with `<fieldset><legend>`
  * Error messages are textual and programmatically associated.

---

## 2) Color & Contrast (Perceptibility)

* Contrast ratios:

  * Body text ≥ **4.5:1**
  * Large text ≥ **3:1**
  * UI parts & focus indicators ≥ **3:1**
* Don’t encode meaning by color alone (add text/icons).
* Avoid placeholders as labels.
* Respect user motion preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

## 3) Focus States (Visibility & Order)

* Never remove focus without a visible replacement.
* Prefer `:focus-visible`:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order matches DOM order.
* Dialogs/modals:

  * Focus moves inside on open
  * Focus returns to the trigger on close

---

## 4) Keyboard Navigation (Operability)

* Full functionality with keyboard only.
* All interactive elements are tabbable.
* No keyboard traps.
* Custom widgets support **Enter** and **Space**.
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only behaviors have keyboard equivalents.

---

## 5) ARIA (Targeted, Minimal)

**Principle:** Don’t add ARIA where native HTML already works.

* Never duplicate native roles or override semantics.
* Appropriate uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` in navigation
  * `aria-live` for async status/errors
* If ARIA feels extensive, re-evaluate the markup.

---

## 6) Layout, Zoom & Resilience

* Content remains usable at **200–400% zoom**.
* Avoid fixed heights that clip text.
* Don’t rely on absolute positioning for core reading order.
* Prefer logical properties:

  ```css
  margin-inline;
  padding-block;
  ```

---

## 7) Testing (Required)

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space).
* Screen reader smoke test.
* Automated checks (supplemental): axe, Lighthouse.
* Manual review remains essential.

---

## 8) Rule of Thumb

If it:

* Makes sense without CSS,
* Works without JS,
* Reads clearly aloud,

…it’s likely accessible.


### ♿ Accessibility Checklist — Modern HTML & CSS (Automation Edition)

**Principle:** *HTML provides meaning → CSS provides clarity → ARIA fills unavoidable gaps.*

---

## 1) Semantic Markup (Foundation)

* Use elements by meaning, not appearance:

  * `<header> <nav> <main> <section> <article> <aside> <footer>`
* Exactly **one `<main>`** per page.
* Heading order is logical and sequential (no skips).
* Use **native controls**:

  * Actions → `<button>`
  * Navigation → `<a href>`
* Lists are real lists (`<ul>/<ol>/<li>`).
* Tables only for data:

  * `<caption>`, `<th>`, correct `scope`.
* Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* Forms:

  * Every control has a visible `<label>`
  * Group related inputs with `<fieldset><legend>`
  * Errors are text-based and programmatically associated.

---

## 2) Color & Contrast (Perceptibility)

* Contrast ratios:

  * Body text ≥ **4.5:1**
  * Large text ≥ **3:1**
  * UI components & focus indicators ≥ **3:1**
* Never rely on color alone to convey meaning.
* Avoid placeholder-as-label patterns.
* Respect motion preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

## 3) Focus States (Visibility & Order)

* Never remove focus outlines without a visible replacement.
* Prefer `:focus-visible`:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order matches DOM order (no CSS reordering hacks).
* Dialogs/modals:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

## 4) Keyboard Navigation (Operability)

* Entire site usable with keyboard only.
* All interactive elements are tabbable.
* No keyboard traps.
* Custom components support **Enter** and **Space**.
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents.

---

## 5) ARIA (Minimal, Intentional)

**Rule:** If native HTML can do it, ARIA must not be used.

* Never duplicate or override native semantics.
* Valid, common uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for navigation
  * `aria-live` for async status or error messages
* If ARIA usage grows large, the markup is likely wrong.

---

## 6) Layout, Zoom & Resilience

* Content remains usable at **200–400% zoom**.
* No fixed heights that clip text.
* Avoid absolute positioning for reading order.
* Prefer logical properties:

  ```css
  margin-inline;
  padding-block;
  ```

---

## 7) Testing (Required Every Run)

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space).
* Screen reader smoke test.
* Automated checks (supplemental only): axe, Lighthouse.
* Manual review is always required.

---

## 8) Final Heuristic

If it:

* Works without CSS,
* Works without JS,
* Makes sense when read aloud,

…it is usually accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Automation Run)

**Core principle:** *Use native HTML for meaning, CSS for clarity, ARIA only when HTML cannot express intent.*

---

### 1. Semantic Markup (Structure & Meaning)

* Use semantic elements instead of generic containers
  `<header> <nav> <main> <section> <article> <aside> <footer>`
* Exactly **one `<main>`** per document
* Headings follow logical order (no skipped levels)
* Correct element choice:

  * User actions → `<button>`
  * Navigation → `<a href>`
* Use real lists (`<ul>/<ol>/<li>`)
* Tables only for data:

  * `<caption>`, `<th>`, correct `scope`
* Images:

  * Informational → meaningful `alt`
  * Decorative → `alt=""`
* Forms:

  * Every input has a visible `<label>`
  * Group related fields with `<fieldset><legend>`
  * Errors are text-based and associated with controls

---

### 2. Color & Contrast (Perception)

* Contrast minimums:

  * Normal text: **4.5:1**
  * Large text: **3:1**
  * UI components & focus indicators: **3:1**
* Never rely on color alone to convey meaning
* Avoid placeholder text as labels
* Respect reduced motion:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3. Focus States (Visibility & Order)

* Never remove focus outlines without replacement
* Use `:focus-visible` for keyboard users:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order follows DOM order
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### 4. Keyboard Navigation (Operability)

* Entire site usable with keyboard only
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom components support **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

### 5. ARIA (Minimal & Intentional)

* Do **not** duplicate native semantics
* Never override native roles
* Appropriate uses:

  * `aria-label` (only if no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for active navigation
  * `aria-live` for async status or error messages
* Heavy ARIA usage usually signals incorrect markup

---

### 6. Layout, Zoom & Resilience

* Content usable at **200–400% zoom**
* No fixed heights that clip text
* Avoid CSS reordering for reading order
* Prefer logical properties:

  ```css
  margin-inline;
  padding-block;
  ```

---

### 7. Validation & Testing

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated checks (supplemental): axe, Lighthouse
* Manual review is mandatory

---

### 8. Final Heuristic

If it works:

* Without CSS
* Without JavaScript
* When read aloud

…it is likely accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Production‑Ready)

**Baseline rule:** Native HTML first. CSS enhances. ARIA only fills real gaps.

---

### 1. Semantic Markup (Structure & Meaning)

* Use semantic elements, not generic containers
  `<header> <nav> <main> <section> <article> <aside> <footer>`
* Exactly **one `<main>`** per page
* Headings are hierarchical and sequential (no skips)
* Correct control choice:

  * Actions → `<button>`
  * Navigation → `<a href>`
* Use real lists (`<ul>/<ol>/<li>`)
* Tables only for data:

  * `<caption>`, `<th>`, correct `scope`
* Images:

  * Informative → meaningful `alt`
  * Decorative → `alt=""`
* Forms:

  * Every control has a visible `<label>`
  * Group related fields with `<fieldset><legend>`
  * Errors are text-based and associated with inputs

---

### 2. Color & Contrast (Perceptibility)

* Contrast minimums:

  * Normal text ≥ **4.5:1**
  * Large text ≥ **3:1**
  * UI components & focus indicators ≥ **3:1**
* Never rely on color alone to convey meaning
* Avoid placeholder-as-label patterns
* Respect reduced motion:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3. Focus States (Visibility & Order)

* Never remove focus outlines without replacement
* Use `:focus-visible`:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order matches DOM order
* Dialogs/modals:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### 4. Keyboard Navigation (Operability)

* Entire site usable with keyboard only
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom controls support **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

### 5. ARIA (Minimal, Intentional)

* Do **not** duplicate or override native semantics
* Valid uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for navigation
  * `aria-live` for async status or error messages
* Heavy ARIA usage usually indicates broken markup

---

### 6. Layout, Zoom & Resilience

* Content usable at **200–400% zoom**
* No fixed heights that clip text
* Avoid CSS reordering for reading order
* Prefer logical properties:

  ```css
  margin-inline;
  padding-block;
  ```

---

### 7. Verification

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated checks are **supplemental only**
* Manual review is mandatory

---

### 8. Final Heuristic

If it works:

* Without CSS
* Without JavaScript
* When read aloud

…it is usually accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Concise)

**Principle:** *Native HTML for meaning → CSS for clarity → ARIA only when HTML can’t express intent.*

---

### 1) Semantic Markup (HTML)

* Use semantic elements: `<header> <nav> <main> <section> <article> <aside> <footer>`
* One `<main>` per page
* Headings are ordered and meaningful (no skips)
* Use correct controls:

  * Actions → `<button>`
  * Navigation → `<a href>`
* Real lists (`<ul>/<ol>/<li>`), not styled divs
* Tables only for data (`<caption>`, `<th>`, proper `scope`)
* Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* Forms:

  * Visible `<label>` for every control
  * Group related fields with `<fieldset><legend>`
  * Errors are text-based and programmatically associated

---

### 2) Color & Contrast (CSS)

* Contrast minimums:

  * Normal text ≥ **4.5:1**
  * Large text ≥ **3:1**
  * UI components & focus indicators ≥ **3:1**
* Don’t rely on color alone to convey meaning
* Avoid placeholder-as-label patterns
* Respect motion preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3) Focus States (Visibility & Order)

* Never remove focus without a visible replacement
* Prefer `:focus-visible`:

  ```css
  :focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  ```
* Focus order matches DOM order
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### 4) Keyboard Navigation

* Fully usable with keyboard only
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom components support **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

### 5) ARIA (Minimal, Intentional)

* Don’t duplicate or override native semantics
* Valid uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for navigation
  * `aria-live` for async status/errors
* Heavy ARIA usage usually signals incorrect markup

---

### 6) Layout, Zoom & Resilience

* Usable at **200–400% zoom**
* Avoid fixed heights that clip text
* Don’t reorder reading order with CSS
* Prefer logical properties (`margin-inline`, `padding-block`)

---

### 7) Verification

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated checks are supplemental; manual review required

---

**Heuristic:** If it works without CSS, without JS, and makes sense read aloud, it’s usually accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Automation Run)

**Operating rule:** *Prefer native HTML semantics, reinforce with CSS, use ARIA only when semantics can’t express intent.*

---

### 1) Semantic Markup (HTML)

* Use elements for meaning, not layout
  (`<header> <nav> <main> <section> <article> <aside> <footer>`)
* Exactly **one `<main>`** per document
* Headings form a logical outline (no level skipping)
* Choose the correct control:

  * Actions → `<button>`
  * Navigation → `<a href>`
* Use real lists (`<ul>/<ol>/<li>`)
* Tables only for data; include `<caption>`, `<th>`, and proper `scope`
* Images:

  * Informative → descriptive `alt`
  * Decorative → `alt=""`
* Forms:

  * Visible `<label>` for every input
  * Group related fields with `<fieldset><legend>`
  * Errors are text-based and programmatically associated

---

### 2) Color & Contrast (CSS)

* Minimum contrast:

  * Body text **≥ 4.5:1**
  * Large text **≥ 3:1**
  * UI parts & focus indicators **≥ 3:1**
* Never rely on color alone to convey meaning
* Avoid placeholder-only labels
* Respect reduced motion:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3) Focus States (Visibility & Order)

* Do not remove focus indicators without a clear replacement
* Use keyboard-only focus styling:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order follows DOM order
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to the trigger on close

---

### 4) Keyboard Navigation (Operability)

* Entire site usable with keyboard alone
* All interactive elements are tabbable
* No keyboard traps
* Custom controls respond to **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

### 5) ARIA (Minimal & Intentional)

* Never duplicate or override native semantics
* Appropriate uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles
  * `aria-current="page"` for active navigation
  * `aria-live` for async status or error messages
* Extensive ARIA usually indicates incorrect markup

---

### 6) Layout, Zoom & Resilience

* Content remains usable at **200–400% zoom**
* Avoid fixed heights that clip text
* Don’t reorder reading order with CSS
* Prefer logical properties (`margin-inline`, `padding-block`)

---

### 7) Verification

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated checks are supplemental; manual review required

---

**Final check:** If it works without CSS, without JS, and makes sense when read aloud, it’s typically accessible.


## ♿ Web Accessibility Checklist (Modern HTML & CSS)

**Guiding principle:** *Start with correct HTML. Use CSS for presentation. Add ARIA only when semantics are missing.*

---

### 1) Semantic Markup (HTML First)

* Use semantic elements for structure and meaning
  (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
* Exactly **one `main`** landmark per page
* Headings form a clear hierarchy (no skipped levels)
* Correct element choice:

  * User actions → `button`
  * Navigation → `a[href]`
* Use real lists and tables (no div-based replicas)
* Tables (data only):

  * Include `caption`, `th`, correct `scope`
* Images:

  * Informational → meaningful `alt`
  * Decorative → `alt=""`
* Forms:

  * Every control has a visible `label`
  * Group related controls with `fieldset` + `legend`
  * Errors are text-based and programmatically associated

---

### 2) Color & Contrast (Perceivable Content)

* Minimum contrast ratios:

  * Normal text: **4.5:1**
  * Large text: **3:1**
  * UI components & focus indicators: **3:1**
* Do not rely on color alone to convey meaning
* Placeholders are not labels
* Respect reduced-motion preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3) Focus States (Visible & Predictable)

* Never remove focus outlines without a visible alternative
* Use keyboard-only focus styling:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order follows DOM order
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### 4) Keyboard Navigation (Operable Without a Mouse)

* Entire site usable with keyboard only
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom components support **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only behaviors have keyboard equivalents

---

### 5) ARIA (Minimal and Intentional)

* Do **not** duplicate native semantics
* Never override correct HTML roles
* Appropriate uses:

  * `aria-label` (only when no visible label exists)
  * `aria-expanded` for toggles/accordions
  * `aria-current="page"` for active navigation
  * `aria-live` for async status or error messages
* Extensive ARIA usually signals incorrect markup

---

### 6) Layout, Zoom & Resilience

* Content usable at **200–400% zoom**
* Avoid fixed heights that clip text
* Do not change reading order with CSS
* Prefer logical properties:

  * `margin-inline`, `padding-block`

---

### 7) Verification

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated tools are supplemental, not sufficient
* Manual review is required

---

### Final Sanity Check

If it:

* Works without CSS
* Works without JavaScript
* Makes sense when read aloud

…it is likely accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Automation #6)

**Guiding rule:** *Correct HTML creates accessibility by default. CSS must not break it. ARIA is a last resort.*

---

### 1) Semantic Markup (HTML Structure)

* Use semantic elements instead of generic containers
  `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
* Exactly **one `main`** landmark per page
* Headings are hierarchical and sequential (no level skipping)
* Use the correct native element:

  * Actions → `button`
  * Navigation → `a[href]`
* Use real lists and real tables (no div-based substitutes)
* Tables (data only):

  * Include `caption`
  * Use `th` with correct `scope`
* Images:

  * Informative → meaningful `alt`
  * Decorative → `alt=""`
* Forms:

  * Every control has a visible `label`
  * Group related inputs with `fieldset` + `legend`
  * Errors are text-based and programmatically associated

---

### 2) Color & Contrast (Perceivability)

* Minimum contrast ratios:

  * Normal text: **4.5:1**
  * Large text: **3:1**
  * UI components & focus indicators: **3:1**
* Never rely on color alone to convey meaning
* Placeholders are not labels
* Respect user motion preferences:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }
  ```

---

### 3) Focus States (Visibility & Order)

* Never remove focus indicators without a visible replacement
* Prefer keyboard-only focus styling:

  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
* Focus order matches DOM order (no CSS reordering)
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### 4) Keyboard Navigation (Operability)

* Entire site usable with keyboard only
* All interactive elements reachable via `Tab`
* No keyboard traps
* Custom components respond to **Enter** and **Space**
* Provide a skip link:

  ```html
  <a href="#main">Skip to content</a>
  ```
* Hover-only interactions have keyboard equivalents

---

### 5) ARIA (Minimal, Correct, Intentional)

* Never duplicate native semantics
* Never override correct HTML roles
* Valid uses:

  * `aria-label` (only if no visible label exists)
  * `aria-expanded` for toggles/accordions
  * `aria-current="page"` for active navigation
  * `aria-live` for async status and error messages
* Large amounts of ARIA usually indicate broken markup

---

### 6) Layout, Zoom & Resilience

* Content remains usable at **200–400% zoom**
* Avoid fixed heights that clip text
* Do not change reading order with CSS
* Prefer logical properties:

  * `margin-inline`
  * `padding-block`

---

### 7) Verification (Required)

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated tools are supplemental only
* Manual review is mandatory

---

### Final Sanity Check

If it works:

* Without CSS
* Without JavaScript
* When read aloud

…it is usually accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Non‑Interactive Automation)

**Objective:** Build accessibility *by default* using native HTML and resilient CSS.
**Scope:** Semantic markup, color contrast, focus states, ARIA, keyboard navigation.

---

### A. Semantic Markup (HTML = Accessibility)

**PASS if all are true:**

* Document landmarks are explicit: `header`, `nav`, `main`, `footer`
* Exactly **one** `main` element
* Heading levels form a strict outline (H1 → H6, no skips)
* Controls use correct elements:

  * Actions → `button`
  * Navigation → `a[href]`
* Lists are real (`ul/ol/li`), not styled text
* Tables are data-only and include:

  * `caption`
  * `th` with proper `scope`
* Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* Forms:

  * Every input has a visible `label`
  * Related inputs grouped with `fieldset` / `legend`
  * Errors are text-based and programmatically associated

---

### B. Color & Contrast (CSS = Perception)

**Minimum ratios:**

* Text: **4.5:1**
* Large text: **3:1**
* UI + focus indicators: **3:1**

**Rules:**

* Meaning is never conveyed by color alone
* Placeholder text is not a label
* Motion respects user preference:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}
```

---

### C. Focus States (Visibility & Order)

**PASS if:**

* Focus is always visible
* `:focus-visible` is used for keyboard users

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

* Focus order matches DOM order
* Modals/dialogs:

  * Focus moves inside on open
  * Focus returns to trigger on close

---

### D. Keyboard Navigation (Operability)

**PASS if:**

* Entire site works with keyboard only
* All interactive elements are tabbable
* No keyboard traps
* Custom controls respond to **Enter** and **Space**
* Skip link exists:

```html
<a href="#main">Skip to content</a>
```

* Hover-only interactions have keyboard equivalents

---

### E. ARIA (Last Resort)

**Rules:**

* Never duplicate native semantics
* Never override correct HTML roles

**Acceptable uses only:**

* `aria-label` (only when no visible label exists)
* `aria-expanded` (toggles / accordions)
* `aria-current="page"` (active navigation)
* `aria-live` (async status or errors)

> Excess ARIA = broken HTML

---

### F. Layout, Zoom & Resilience

**PASS if:**

* Content works at **200–400% zoom**
* No fixed heights that clip text
* Reading order is not altered with CSS
* Logical properties are used (`margin-inline`, `padding-block`)

---

### G. Verification (Required)

* Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* Screen reader smoke test
* Automated tools used **only** as supplements
* Manual review completed

---

### Final Rule

If it works:

* without CSS
* without JavaScript
* and makes sense when read aloud

…it is very likely accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Audit‑Style)

**Rule of thumb:** *Native HTML gives you accessibility for free. CSS must not break it. ARIA fills gaps only.*

---

### ✅ 1. Semantic Markup (HTML)

* ☐ Use semantic landmarks (`header`, `nav`, `main`, `footer`)
* ☐ Exactly **one** `main` per page
* ☐ Heading levels are logical and sequential
* ☐ Correct elements:

  * Actions → `button`
  * Navigation → `a[href]`
* ☐ Real lists (`ul/ol/li`), not styled text
* ☐ Tables are data‑only:

  * `caption`
  * `th` + correct `scope`
* ☐ Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* ☐ Forms:

  * Visible `label` for every control
  * `fieldset` + `legend` for groups
  * Errors are text and programmatically linked

---

### 🎨 2. Color & Contrast

* ☐ Text contrast ≥ **4.5:1**
* ☐ Large text ≥ **3:1**
* ☐ UI + focus indicators ≥ **3:1**
* ☐ Meaning not conveyed by color alone
* ☐ Placeholders are not labels
* ☐ Reduced motion respected:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}
```

---

### 🔎 3. Focus States

* ☐ Focus is always visible
* ☐ `:focus-visible` used for keyboard users

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

* ☐ Focus order matches DOM order
* ☐ Modals manage focus correctly (in on open, back on close)

---

### ⌨️ 4. Keyboard Navigation

* ☐ Entire site usable without a mouse
* ☐ All interactive elements tabbable
* ☐ No keyboard traps
* ☐ Custom controls support **Enter** and **Space**
* ☐ Skip link present:

```html
<a href="#main">Skip to content</a>
```

* ☐ Hover‑only interactions have keyboard equivalents

---

### 🧩 5. ARIA (Minimal Use)

* ☐ No ARIA where native HTML works
* ☐ No role overrides of correct elements
* ☐ Valid use only:

  * `aria-label` (no visible label)
  * `aria-expanded`
  * `aria-current="page"`
  * `aria-live` (async status/errors)

> Excess ARIA = broken markup.

---

### 🔍 6. Layout, Zoom & Resilience

* ☐ Works at **200–400% zoom**
* ☐ No fixed heights that clip text
* ☐ CSS does not change reading order
* ☐ Logical properties used (`margin-inline`, `padding-block`)

---

### 🧪 7. Verification

* ☐ Keyboard‑only test passed
* ☐ Screen reader smoke test passed
* ☐ Automated tools used as *supplement*
* ☐ Manual review completed

---

### Final Gate

If it works **without CSS**, **without JS**, and **read aloud**,
it is very likely accessible.


## ♿ Accessibility Checklist — Modern HTML & CSS (Run #6, Compact)

**Core rule:** *Native HTML first. CSS must not break it. ARIA only fills gaps.*

---

### 1) Semantic Markup (Structure = Meaning)

* ☐ Use landmarks: `header`, `nav`, `main`, `footer` (one `main` only)
* ☐ Headings form a strict outline (no skips)
* ☐ Correct elements:

  * Actions → `button`
  * Navigation → `a[href]`
* ☐ Lists and tables are real (no div replicas)
* ☐ Data tables include `caption`, `th`, proper `scope`
* ☐ Images:

  * Informative → accurate `alt`
  * Decorative → `alt=""`
* ☐ Forms:

  * Visible `label` for every control
  * `fieldset`/`legend` for groups
  * Errors are text-based and programmatically linked

---

### 2) Color & Contrast (Perception)

* ☐ Text ≥ **4.5:1** (large text ≥ **3:1**)
* ☐ UI & focus indicators ≥ **3:1**
* ☐ Meaning not conveyed by color alone
* ☐ Placeholders are not labels
* ☐ Reduced motion respected:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}
```

---

### 3) Focus States (Visibility & Order)

* ☐ Focus is always visible (no outline removal without replacement)
* ☐ Keyboard-only styling via `:focus-visible`

```css
:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
```

* ☐ Focus order matches DOM order
* ☐ Dialogs manage focus (in on open, back on close)

---

### 4) Keyboard Navigation (Operable)

* ☐ Entire site usable without a mouse
* ☐ All interactive elements tabbable
* ☐ No keyboard traps
* ☐ Custom controls support **Enter** and **Space**
* ☐ Skip link present:

```html
<a href="#main">Skip to content</a>
```

* ☐ Hover-only behaviors have keyboard equivalents

---

### 5) ARIA (Minimal, Correct)

* ☐ No ARIA where native HTML suffices
* ☐ No role overrides of correct elements
* ☐ Valid uses only:

  * `aria-label` (when no visible label exists)
  * `aria-expanded`
  * `aria-current="page"`
  * `aria-live` (async status/errors)

---

### 6) Layout, Zoom & Resilience

* ☐ Usable at **200–400%** zoom
* ☐ No fixed heights that clip text
* ☐ CSS does not change reading order
* ☐ Prefer logical properties (`margin-inline`, `padding-block`)

---

### 7) Verification

* ☐ Keyboard-only pass (Tab / Shift+Tab / Enter / Space)
* ☐ Screen reader smoke test
* ☐ Automated tools used as supplements
* ☐ Manual review completed

**Final gate:** Works without CSS, without JS, and makes sense when read aloud.


## ♿ Accessibility Checklist — Modern HTML & CSS (Automation Run #6)

**Principle:** *Accessibility is a by‑product of correct HTML. CSS must preserve it. ARIA only patches gaps.*

---

### 1) Semantic Markup (Foundation)

* ☐ Use native landmarks: `header`, `nav`, `main`, `footer`
* ☐ Exactly **one** `main` element per page
* ☐ Headings form a true outline (no skipped levels)
* ☐ Choose elements by purpose:

  * User action → `button`
  * Navigation → `a[href]`
* ☐ Lists use `ul/ol/li`
* ☐ Tables are data-only and include `caption`, `th`, correct `scope`
* ☐ Images:

  * Meaningful → descriptive `alt`
  * Decorative → `alt=""`
* ☐ Forms:

  * Every control has a visible `label`
  * Groups use `fieldset` + `legend`
  * Errors are text-based and programmatically associated

---

### 2) Color & Contrast (Perception)

* ☐ Text contrast ≥ **4.5:1**
* ☐ Large text ≥ **3:1**
* ☐ UI components & focus indicators ≥ **3:1**
* ☐ Meaning is never color-only
* ☐ Placeholders are not labels
* ☐ Motion respects user preference:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}
```

---

### 3) Focus States (Visibility & Logic)

* ☐ Focus is always visible
* ☐ Use `:focus-visible` for keyboard users

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

* ☐ Focus order follows DOM order
* ☐ Dialogs manage focus correctly (in on open, back on close)

---

### 4) Keyboard Navigation (Operability)

* ☐ Site usable with keyboard only
* ☐ All interactive elements tabbable
* ☐ No keyboard traps
* ☐ Custom controls support **Enter** and **Space**
* ☐ Skip link exists:

```html
<a href="#main">Skip to content</a>
```

* ☐ Hover-only interactions have keyboard equivalents

---

### 5) ARIA (Minimal, Correct Use)

* ☐ No ARIA when native HTML suffices
* ☐ No role overrides of correct elements
* ☐ Valid uses only:

  * `aria-label` (when no visible label exists)
  * `aria-expanded`
  * `aria-current="page"`
  * `aria-live` (async status/errors)

> Excess ARIA usually indicates broken semantics.

---

### 6) Layout, Zoom & Robustness

* ☐ Content usable at **200–400% zoom**
* ☐ No fixed heights that clip text
* ☐ CSS does not alter reading order
* ☐ Prefer logical properties (`margin-inline`, `padding-block`)

---

### 7) Verification

* ☐ Keyboard-only pass completed
* ☐ Screen reader smoke test completed
* ☐ Automated tools used as supplements
* ☐ Manual review completed

---

**Final gate:** If it works without CSS, without JavaScript, and makes sense when read aloud, it is very likely accessible.
