# New CSS‑Only UI Guidance

Concise, enforceable CSS‑only architecture: layered patterns, naming rules, layout strategy, state model, and an audit checklist you can apply immediately.

Below is **CSS‑only, scalable UI architecture guidance** that is **data‑agnostic, framework‑agnostic, and platform‑agnostic**, designed to work **without JavaScript** and to scale from static documents to server‑rendered systems.

---

## 1. Core Principles (CSS as the UI Engine)

**CSS owns UI state.**
All interactivity, layout, and conditional rendering is expressed via:

* selectors
* custom properties
* cascade & inheritance
* media / container / state queries

**HTML is semantic, immutable data.**
HTML provides:

* meaning
* accessibility
* structure
  It never encodes presentation logic.

**No runtime logic.**
State flows from:

* attributes
* pseudo‑classes
* media conditions
* user interaction

---

## 2. Layered Architecture (CSS API Model)

Use **intent‑based layers**, not component trees.

```css
@layer reset, tokens, base, layout, composition, states, themes, overrides;
```

### Layer Responsibilities

| Layer         | Purpose                      |
| ------------- | ---------------------------- |
| `reset`       | Normalize only what’s broken |
| `tokens`      | Design system primitives     |
| `base`        | Element defaults             |
| `layout`      | Flow & structure             |
| `composition` | Reusable patterns            |
| `states`      | Conditional UI logic         |
| `themes`      | Contextual overrides         |
| `overrides`   | Emergency / local fixes      |

> **Rule:** Higher layers never redefine lower‑layer meaning.

---

## 3. Token System (CSS Custom Properties)

Tokens are **data**, not styles.

```css
@layer tokens {
  :root {
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --radius-1: 0.25rem;
    --color-fg: hsl(220 15% 20%);
    --color-bg: hsl(0 0% 100%);
  }
}
```

### Token Rules

* No semantic names (`--button-padding` ❌)
* No context leakage
* No duplication
* Tokens never contain layout logic

---

## 4. Semantic HTML → CSS API Mapping

HTML expresses **what it is**, CSS decides **how it behaves**.

```html
<article>
  <header>
    <h2>Title</h2>
  </header>
  <p>Content</p>
</article>
```

```css
@layer base {
  article {
    display: block;
    padding: var(--space-3);
  }

  article > header {
    margin-block-end: var(--space-2);
  }
}
```

No classes.
No IDs.
No data attributes.

---

## 5. Composition Patterns (Classless Reuse)

Use **structural selectors** instead of utility classes.

### Stack Pattern

```css
@layer composition {
  :where(section, article, main) {
    display: grid;
    gap: var(--space-3);
  }
}
```

### Cluster Pattern

```css
@layer composition {
  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
}
```

These patterns scale automatically across frameworks.

---

## 6. State Management Without JavaScript

### Attribute‑Driven State

```html
<section aria-expanded="true"></section>
```

```css
@layer states {
  [aria-expanded="false"] {
    display: none;
  }
}
```

### Pseudo‑Class State

```css
details[open] > summary {
  font-weight: bold;
}
```

### Media / Container State

```css
@container (min-width: 40rem) {
  article {
    grid-template-columns: 2fr 1fr;
  }
}
```

> **CSS is the state machine.**

---

## 7. Naming Conventions (CSS API, Not BEM)

Avoid component‑scoped names.
Prefer **behavioral and relational naming**.

### Good

```css
article > header
nav ul
main > section
```

### Acceptable (when necessary)

```css
.is-hidden
.is-active
.has-sidebar
```

### Avoid

```css
.card__title
.btn-primary
.layout-wrapper
```

---

## 8. Modularity Without Components

Modules are **files + layers**, not DOM blocks.

```
css/
 ├─ tokens.css
 ├─ base.css
 ├─ layout.css
 ├─ composition.css
 ├─ states.css
 ├─ themes.css
```

Each file:

* owns one concern
* exports behavior via selectors
* never assumes markup structure beyond semantics

---

## 9. Theming & Context Overrides

Theme via **context selectors**, not variables per component.

```css
@layer themes {
  [data-theme="dark"] {
    --color-bg: hsl(220 15% 10%);
    --color-fg: hsl(0 0% 95%);
  }
}
```

Works with:

* server rendering
* print
* static export
* no JS

---

## 10. Scalability Rules (Non‑Negotiable)

1. **Never encode UI meaning in HTML**
2. **Never couple CSS to a framework**
3. **Never rely on class presence for layout**
4. **Prefer structure → composition → state**
5. **If CSS can infer it, HTML must not say it**

---

## 11. Mental Model

Think of CSS as:

> **A declarative rules engine reacting to document state**

Not:

* styling
* utilities
* components

---

## 12. Result

This approach yields:

* Zero‑JS interactivity
* Infinite framework portability
* Predictable cascade behavior
* WCAG‑native accessibility
* Long‑term maintainability

---

If you want next:

* A **reference folder structure**
* A **CSS‑only accordion / tabs / modal system**
* A **migration guide from utility CSS**
* A **validation checklist for architectural drift**

Say the word.


Below is **new, non‑repeating guidance** focused on **CSS‑only UI architecture** that scales across **data models, frameworks, and platforms**, with **no JavaScript required for UI state**.

---

## 1. Treat CSS as a Deterministic UI Runtime

CSS is not decoration; it is a **rules engine**.

**Inputs**

* document structure
* attributes
* media / container conditions
* user interaction pseudo‑classes

**Outputs**

* layout
* visibility
* affordances
* state transitions

HTML is immutable input.
CSS is the interpreter.

---

## 2. Architectural Model: CSS as a Public API

Design CSS like a stable API surface.

### Three Axes (never mix them)

1. **Structure** – semantic HTML only
2. **Behavior** – selectors & state logic
3. **Presentation** – tokens & themes

Violation of this separation is the root cause of unscalable CSS.

---

## 3. Layered CSS Contract (Hard Boundaries)

```css
@layer reset, tokens, semantics, layout, composition, state, theme, override;
```

### Layer Rules

* Lower layers **never depend on higher layers**
* Higher layers **only refine, never redefine**
* Each layer answers exactly one question

| Layer       | Question it answers                |
| ----------- | ---------------------------------- |
| reset       | What must be neutralized?          |
| tokens      | What values exist?                 |
| semantics   | How do elements behave by default? |
| layout      | How does space flow?               |
| composition | How do elements relate?            |
| state       | When does behavior change?         |
| theme       | How does context alter appearance? |
| override    | What must temporarily win?         |

---

## 4. Naming Strategy: No Components, No Utilities

### What You **Do Not** Name

* components
* variants
* breakpoints
* use cases

### What You **May** Name

* states
* relationships
* capabilities

```css
/* acceptable */
.is-hidden
.is-expanded
.has-aside

/* discouraged */
.card-primary
.button-large
.grid-3col
```

If a class encodes *what something is*, it will not scale.
If it encodes *how something behaves*, it might.

---

## 5. Structural Selectors as the Primary Mechanism

Prefer **document relationships** over class hooks.

```css
main > section {
  display: grid;
  gap: var(--space-3);
}

article > header + * {
  margin-block-start: var(--space-2);
}
```

This creates:

* automatic inheritance
* framework portability
* zero markup churn

---

## 6. Composition Patterns (Classless by Default)

Patterns are **selector recipes**, not components.

### Stack

```css
:where(section, article, aside) {
  display: grid;
  gap: var(--space-3);
}
```

### Cluster

```css
nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
```

### Switcher

```css
@container (min-width: 48rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }
}
```

Patterns are opt‑in via structure, not classes.

---

## 7. State Without JavaScript

### Attribute State

```css
[aria-expanded="false"] {
  display: none;
}
```

### Native Controls

```css
details[open] > summary {
  font-weight: 600;
}
```

### Interaction State

```css
:focus-visible {
  outline: 2px solid currentColor;
}
```

### Environmental State

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
  }
}
```

CSS handles state transitions declaratively and accessibly.

---

## 8. Token System: Values Only, No Intent

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --radius-1: 0.25rem;
  --color-fg: hsl(220 15% 20%);
  --color-bg: hsl(0 0% 100%);
}
```

**Rules**

* tokens never reference elements
* tokens never imply purpose
* semantics decide how tokens are used

---

## 9. Contextual Theming (Not Per‑Component)

```css
[data-theme="dark"] {
  --color-bg: hsl(220 15% 10%);
  --color-fg: hsl(0 0% 95%);
}
```

Themes modify **inputs**, not rules.

Works identically for:

* SSR
* static export
* email
* print
* no‑JS environments

---

## 10. Modularity = Files + Layers (Not DOM Blocks)

```
css/
├─ reset.css
├─ tokens.css
├─ semantics.css
├─ layout.css
├─ composition.css
├─ state.css
├─ theme.css
```

Each file:

* owns a single concern
* exports behavior via selectors
* makes no assumptions about frameworks or data

---

## 11. Scalability Constraints (Enforced)

1. No IDs, no presentational classes
2. No data attributes for styling
3. No breakpoint‑specific markup
4. No duplicated selectors across layers
5. No UI meaning encoded in HTML

If any rule is broken, scalability stops.

---

## 12. Outcome

This architecture yields:

* infinite framework portability
* zero JS UI dependency
* WCAG‑native interaction
* minimal markup
* long‑term maintainability

---

This completes **automation run #2** for **🏗️ Build a scalable CSS API**.


### 🏗️ Automation Run #3 — CSS‑Only, Scalable UI Architecture

*(New material only; no repetition from prior runs. Non‑interactive.)*

---

## 1. Constraint‑First Design (Reverse the Usual Thinking)

Design **from invariants backward**, not from components forward.

**Invariants**

* HTML is semantic and stable
* CSS is the only UI logic layer
* No JS‑driven state
* No framework assumptions
* No class‑driven layout

Everything else is negotiable.

---

## 2. Contract‑Driven CSS (Explicit Inputs → Deterministic Output)

Treat CSS rules as **pure functions**:

```
(input: structure + attributes + environment) → output: UI
```

### Allowed Inputs

* Element type
* Element relationship
* ARIA / native attributes
* Media / container queries
* User interaction pseudo‑classes

### Forbidden Inputs

* Framework classes
* Generated markup
* JS‑mutated attributes
* Data-* styling hooks

---

## 3. Architecture Pattern: “Semantic Core, Behavioral Shell”

### Semantic Core (HTML)

* Expresses *what exists*
* Never expresses *how it looks*
* Never expresses *when it changes*

### Behavioral Shell (CSS)

* Infers behavior from structure
* Encodes layout + interaction
* Reacts to environment and state

**Result:** identical HTML works in email, SSR, static export, and design systems.

---

## 4. Layer Model (Enforced, Not Optional)

```css
@layer normalize, tokens, semantics, flow, patterns, state, context, patch;
```

### Key Difference from Prior Runs

* **`flow`** = document rhythm (block, inline, reading order)
* **`patterns`** = relational geometry (stack, cluster, switcher)
* **`context`** = ancestor‑driven mutation (themes, density, locale)

No layout rules belong in `semantics`.
No selectors in `tokens`.
No value overrides in `state`.

---

## 5. Naming: Capability‑Based, Not Identity‑Based

### What a name may describe

* Capability: `is-collapsible`
* Condition: `is-disabled`
* Relationship: `has-aside`

### What a name must never describe

* Visual style
* Size
* Variant
* Role

If a name wouldn’t survive a redesign, it’s invalid.

---

## 6. Zero‑JS State Patterns (Beyond the Obvious)

### Disclosure via Native Focus Order

```css
section:focus-within > .details {
  display: block;
}
```

### Mode Switching via Root Attributes

```css
html[data-density="compact"] {
  --space-scale: 0.75;
}
```

### Progressive Reveal via Structural Position

```css
li:nth-child(n+6) {
  display: none;
}
ul:focus-within li {
  display: list-item;
}
```

State is inferred, not stored.

---

## 7. Layout Without Breakpoints (Environment‑Driven)

Prefer **capability queries** over viewport logic.

```css
@container (inline-size > 45rem) {
  main {
    grid-template-columns: 2fr 1fr;
  }
}
```

```css
@media (pointer: coarse) {
  button {
    min-height: 44px;
  }
}
```

The UI adapts to *conditions*, not devices.

---

## 8. Modularity Strategy: Orthogonal Files, Not Components

**Modules are concerns, not widgets.**

```
css/
├─ tokens/
│  ├─ color.css
│  ├─ space.css
│  └─ motion.css
├─ semantics/
│  ├─ text.css
│  ├─ lists.css
│  └─ media.css
├─ patterns/
│  ├─ stack.css
│  ├─ cluster.css
│  └─ switcher.css
├─ state/
│  └─ visibility.css
```

Any file can be deleted without breaking HTML meaning.

---

## 9. Drift Detection Checklist (Run This Mentally)

If **any** answer is “yes”, scalability is already failing:

* Does CSS require a specific framework?
* Does layout depend on a class name?
* Does markup change for breakpoints?
* Does a token encode intent?
* Does a selector describe a component?

---

## 10. Failure Modes to Guard Against

| Smell                    | Root Cause          | Fix                   |
| ------------------------ | ------------------- | --------------------- |
| “Just one utility class” | Short‑term override | Add a pattern         |
| Deep selectors           | Component thinking  | Flatten via structure |
| Variant explosion        | Identity naming     | Capability naming     |
| Media‑query sprawl       | Device thinking     | Container logic       |

---

## 11. Outcome of This Model

* Same HTML works everywhere
* CSS becomes predictable and testable
* Zero JS for layout or interaction
* Long‑term survivability across platforms
* Architecture resists entropy by design

---

**Automation status:** ✅ Run #3 complete
**Scope:** Architecture patterns, naming, modularity
**JS dependency:** None
**Repeat content:** None


### 🏗️ Automation Run #4 — CSS‑Only UI at Scale

*(All content is new. No repetition. Non‑interactive.)*

---

## 1. Think in **Systems**, Not Screens

A scalable, platform‑agnostic UI is **not** a collection of pages or components.
It is a **ruleset that survives unknown data, unknown frameworks, and unknown outputs**.

Design for:

* HTML documents
* server rendering
* static export
* email / print
* embedded content
* partial hydration (or none)

If the CSS assumes a runtime, it is not scalable.

---

## 2. The “Lowest Possible Commitment” Rule

Every CSS decision should commit to **as little intent as possible**.

### Bad Commitment

```css
.card {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
```

### Lowest Commitment

```css
article {
  display: grid;
  gap: var(--space-3);
}
```

Structure implies behavior.
Classes imply assumptions.

---

## 3. Architecture Pattern: **Axis Separation**

Separate CSS along **orthogonal axes**, not features.

| Axis       | Owns                   |
| ---------- | ---------------------- |
| Values     | tokens                 |
| Meaning    | semantic elements      |
| Flow       | document rhythm        |
| Geometry   | composition patterns   |
| Conditions | state & environment    |
| Context    | theme, density, locale |

If a file touches more than one axis, it is mis‑scoped.

---

## 4. Use CSS as a Constraint Solver (Not a Layout Tool)

Prefer **min/max, clamp, and intrinsic sizing** over fixed rules.

```css
main {
  max-inline-size: min(100%, 70rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}
```

This:

* removes breakpoints
* adapts to unknown containers
* works everywhere (including print)

---

## 5. Logical Properties = Platform Agnosticism

Never assume:

* left/right
* top/bottom
* horizontal writing

```css
section {
  padding-block: var(--space-3);
  padding-inline: var(--space-2);
}
```

This enables:

* RTL
* vertical writing modes
* future platform reuse

---

## 6. Naming Convention: **State Is the Only Thing Worth Naming**

### Allowed

```css
.is-hidden
.is-collapsed
.is-readonly
```

### Strongly Discouraged

```css
.layout-main
.component-x
.util-gap-md
```

If something must be renamed when design changes, it was named incorrectly.

---

## 7. Modular Strategy: **Delete‑Safe CSS**

A module is valid only if:

* it can be removed without breaking HTML semantics
* it introduces no required markup
* it has no hard dependency on another module

### Example: Visibility Module

```css
@layer state {
  [hidden],
  .is-hidden {
    display: none !important;
  }
}
```

Works with:

* native HTML
* attributes
* optional class fallback

---

## 8. State Inference Patterns (Advanced)

### Capability‑Based State

```css
@media (hover: hover) {
  a:hover {
    text-decoration-thickness: 2px;
  }
}
```

### Density via Root Context

```css
:root {
  --density: 1;
}

[data-density="compact"] {
  --density: 0.75;
}

* {
  padding: calc(var(--space-2) * var(--density));
}
```

No JS state. No recalculation logic.

---

## 9. Zero‑JS Progressive Disclosure (Robust Pattern)

```css
section > * + * {
  display: none;
}

section:focus-within > *,
section:hover > * {
  display: block;
}
```

* keyboard accessible
* pointer aware
* degrades gracefully
* no script dependency

---

## 10. Testing Strategy (Often Ignored, Critical for Scale)

Test CSS against **unknowns**, not designs:

* Empty content
* Overlong text
* Nested semantics
* Print preview
* Reduced motion
* Forced colors
* Narrow containers
* RTL direction

If CSS survives those, it will survive frameworks.

---

## 11. Common Scalability Killers (Watchlist)

| Smell                      | Why It Breaks        |
| -------------------------- | -------------------- |
| “Just one helper class”    | Starts utility creep |
| Breakpoint‑specific markup | Locks platform       |
| Variant naming             | Explodes complexity  |
| Component selectors        | Prevents reuse       |
| Tokenized intent           | Hard‑codes design    |

---

## 12. End State

A correct implementation yields:

* identical HTML across platforms
* CSS that acts as a deterministic engine
* zero JS for layout or interaction
* long‑term resilience to change
* architectural calm instead of entropy

---

**Automation status:** ✅ Run #4 complete
**System goal:** 🏗️ Build a scalable CSS API
**JavaScript dependency:** None
**Assumptions:** None


### 🏗️ Automation Run #5 — CSS‑Only UI Architecture (Advanced, Non‑Repeating)

---

## 1. Treat the **Cascade** as the Primary Control Plane

Scalability comes from **predictable precedence**, not selector cleverness.

**Rule hierarchy**

1. Source order (files)
2. `@layer`
3. Selector specificity (kept intentionally low)
4. Inheritance
5. Context (media / container / attributes)

Design so **order solves conflicts**, not specificity.

```css
@layer reset, tokens, base, flow, patterns, state, context, override;
```

If you need `!important`, the layer model is broken.

---

## 2. Selector Budgeting (Hard Constraint)

Impose a **selector budget** to prevent entropy.

**Allowed**

* element selectors
* relationship selectors (`>`, `+`, `~`)
* attribute selectors (semantic / ARIA only)
* pseudo‑classes

**Disallowed**

* descendant chains > 3 levels
* ID selectors
* visual class hooks
* compound class selectors

Example (valid):

```css
article > header + * { margin-block-start: var(--space-2); }
```

Example (invalid):

```css
.page .card .card__title span { … }
```

---

## 3. Architecture Pattern: **Behavioral Inference**

Never *declare* behavior. Always **infer it**.

### Instead of

```html
<section class="collapsible">
```

### Infer from semantics

```html
<details>
  <summary>Title</summary>
  <p>Content</p>
</details>
```

```css
details > * + * {
  padding-block-start: var(--space-2);
}
```

HTML already encodes intent. CSS interprets it.

---

## 4. Naming Convention: **Escape Hatches Only**

Names exist **only** for cases structure cannot express.

### Reserved Prefixes

* `is-*` → transient state
* `has-*` → structural condition
* `can-*` → capability / affordance

```css
.is-hidden { display: none; }
.has-sidebar { grid-template-columns: 1fr 20rem; }
.can-scroll { overflow: auto; }
```

No other prefixes are allowed.

---

## 5. Modular Strategy: **Axis‑Pure Modules**

Each module must align to exactly **one axis**.

| Axis      | Examples                    |
| --------- | --------------------------- |
| Values    | spacing, color, motion      |
| Semantics | headings, lists, forms      |
| Flow      | block rhythm, reading order |
| Patterns  | stack, cluster, switcher    |
| State     | visibility, disabled        |
| Context   | theme, density, locale      |

If a file spans axes, split it.

---

## 6. Layout Without Layout Classes

All layout emerges from **context + structure**.

```css
main {
  display: grid;
  gap: var(--space-4);
}

main > aside {
  order: 2;
}

@container (min-width: 50rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }

  main > aside {
    order: initial;
  }
}
```

Same HTML.
Different environments.
Zero markup changes.

---

## 7. Data‑Agnostic UI via Attribute Semantics

CSS must not care *what* the data is.

```css
[aria-busy="true"] {
  opacity: 0.5;
  pointer-events: none;
}

[aria-invalid="true"] {
  outline: 2px solid var(--color-error);
}
```

These attributes work with:

* server data
* static HTML
* any framework
* no JS UI logic

---

## 8. Progressive Enhancement Without JS

Design **interaction ceilings**, not dependencies.

```css
@media (prefers-reduced-motion: no-preference) {
  details[open] {
    transition: block-size 200ms ease;
  }
}
```

If the condition fails, the UI still works.

---

## 9. CSS as a Read‑Only State Machine

CSS may **observe state**, never mutate it.

Allowed:

* `:hover`
* `:focus-within`
* `[open]`
* media / container queries

Forbidden:

* encoding business rules
* simulating data changes
* synchronizing unrelated state

State flows **into** CSS, never out.

---

## 10. Anti‑Patterns That Break Portability

| Pattern             | Why It Fails         |
| ------------------- | -------------------- |
| Component selectors | Lock markup          |
| Utility stacks      | Hide intent          |
| Variant naming      | Exponential growth   |
| Breakpoint markup   | Platform coupling    |
| Tokenized intent    | Design fossilization |

---

## 11. Long‑Term Scalability Test

Your CSS passes if:

* the same HTML renders acceptably in print
* layout survives unknown container widths
* removing a module degrades gracefully
* no selector encodes product language
* design changes don’t rename classes

---

## 12. End State (What This Buys You)

* Single HTML source of truth
* CSS as deterministic interpreter
* No JS for UI logic
* Framework‑proof styling
* Architecture that resists decay

---

**Automation:** Run #5 complete
**Objective:** 🏗️ Build a scalable CSS API
**JS UI dependency:** None
**Repetition:** None


### 🏗️ Automation Run #6 — CSS‑Only UI Architecture (Meta‑Stability & Longevity)

*(Non‑interactive · New content only · No repetition from Runs #1–#5)*

---

## 1. Design for **Temporal Scalability**, Not Just Structural Scalability

Most CSS architectures fail over **time**, not size.

A scalable, agnostic UI must survive:

* design refreshes
* content model changes
* ownership changes
* partial rewrites
* platform drift

**Key insight:**

> CSS should encode *rules that age well*, not *decisions that age poorly*.

---

## 2. Architecture Pattern: **Decision Deferral**

Every CSS rule should answer:

> “Is this the *latest possible moment* to make this decision?”

### Example: Typography

❌ Early commitment

```css
h2 {
  font-size: 1.5rem;
}
```

✅ Deferred commitment

```css
h2 {
  font-size: clamp(1.2em, 1em + 1vw, 1.8em);
}
```

Deferral reduces:

* breakpoint sprawl
* redesign churn
* downstream overrides

---

## 3. CSS as a **Policy Engine**

Instead of encoding layouts, encode **policies**.

### Policy Examples

* “Siblings are spaced consistently”
* “Primary content grows before secondary”
* “Interactive affordances respect user capability”
* “Density adjusts by context, not component”

```css
* + * {
  margin-block-start: var(--flow-space, var(--space-3));
}
```

This rule:

* applies everywhere
* survives redesigns
* requires no markup changes

---

## 4. Naming Convention Upgrade: **Semantic Escape Velocity**

Names should be rare enough that **their existence signals exception**.

### Rule

> If a behavior is common, it must not require a name.

### Example

❌ Named default

```css
.stack { display: grid; gap: 1rem; }
```

✅ Unnamed default

```css
main, section, article {
  display: grid;
  gap: var(--space-3);
}
```

Classes exist only when *escaping the default*, never to create it.

---

## 5. Modular Strategy: **Inversion‑Safe Modules**

A module must remain valid even if:

* imported first
* imported last
* imported alone

### Technique: No cross‑module assumptions

```css
/* valid module */
@layer flow {
  * + * {
    margin-block-start: var(--space-3);
  }
}
```

No dependency on:

* tokens being present
* layouts existing
* themes loaded

This makes modules reorderable and removable.

---

## 6. Structural Resilience Pattern

Design selectors so **extra wrappers do not break layout**.

### Fragile

```css
main > section > article { … }
```

### Resilient

```css
main article { … }
```

The goal is **DOM elasticity**:

* CMS inserts
* framework wrappers
* server annotations

---

## 7. Data‑Agnostic Styling via **Meaningful Absence**

CSS should handle missing data gracefully.

```css
img:not([src]) {
  display: none;
}
```

```css
p:empty {
  display: none;
}
```

This avoids:

* conditional rendering logic
* JS guards
* template branching

Absence becomes a valid state.

---

## 8. Interaction Without State Explosion

Avoid encoding multiple UI states.
Prefer **continuous responses**.

### Example: Emphasis Instead of Modes

```css
article:hover {
  background: color-mix(in srgb, currentColor 5%, transparent);
}
```

No:

* “active”
* “inactive”
* “selected”
* “unselected”

Just response to interaction.

---

## 9. Platform‑Agnostic Spacing Strategy

Never tie spacing to components or layouts.

```css
:root {
  --space-scale: 1;
}

[data-density="compact"] {
  --space-scale: 0.8;
}

* {
  padding-block: calc(var(--space-2) * var(--space-scale));
}
```

Same CSS works for:

* mobile
* desktop
* print
* embedded views

---

## 10. Anti‑Fragile Cascade Strategy

Design so **unexpected selectors fail safely**.

* Use `:where()` to zero specificity
* Prefer broad rules over narrow ones
* Let later layers refine, not fight

```css
:where(nav a) {
  text-decoration: none;
}
```

This prevents specificity arms races.

---

## 11. Governance Rule (Critical for Teams)

> **Any new class must justify why structure, attributes, or state could not express the same behavior.**

If it can’t, reject the class.

This single rule prevents:

* utility creep
* component sprawl
* architecture erosion

---

## 12. End State (Run #6 Outcome)

This approach yields a UI system that:

* survives long timelines
* tolerates unknown platforms
* adapts to unknown data
* resists architectural entropy
* requires no JS for UI logic

CSS becomes:

> **A stable policy layer interpreting an evolving document.**

---

**Automation status:** ✅ Run #6 complete
**System:** 🏗️ Build a scalable CSS API
**Temporal focus:** Long‑term survivability
**JavaScript UI dependency:** None


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Operational Playbook)**

*(Non‑interactive · New material · No repetition from prior runs)*

This run focuses on **operationalizing** a CSS‑only, agnostic UI: how to *govern*, *evolve*, and *enforce* it at scale without JavaScript.

---

## 1. Define a **CSS Contract** (What CSS Is Allowed to Do)

**CSS responsibilities**

* Interpret document semantics
* Infer layout from relationships
* React to environment and state
* Apply values via tokens

**CSS non‑responsibilities**

* Encode product meaning
* Store application state
* Depend on frameworks or build tools
* Require specific class names to function

If a rule violates this contract, it does not ship.

---

## 2. Architecture Pattern: **Rule → Policy → Outcome**

Avoid “do X here” rules. Prefer **policy rules** that generalize.

```css
/* Policy: adjacent content breathes */
* + * {
  margin-block-start: var(--flow-space, var(--space-3));
}
```

* No component coupling
* No layout assumptions
* Survives unknown content

---

## 3. Enforced Layer Topology (With Ownership)

```css
@layer
  normalize,  /* browser fixes */
  tokens,     /* values only */
  semantics,  /* element defaults */
  flow,       /* reading rhythm */
  patterns,   /* relational geometry */
  state,      /* conditional behavior */
  context,    /* environment overrides */
  override;   /* last-resort patches */
```

**Ownership rule:**
Each layer has a single owner and a single purpose. Cross‑layer edits are rejected.

---

## 4. Naming Convention: **Exception‑Only Vocabulary**

Names exist only when structure cannot express behavior.

**Allowed prefixes**

* `is-` (transient state)
* `has-` (structural condition)
* `can-` (capability)

```css
.is-hidden { display: none; }
.has-aside { grid-template-columns: 1fr 20rem; }
.can-scroll { overflow: auto; }
```

No other naming schemes are permitted.

---

## 5. Modular Strategy: **Delete‑Safe Modules**

A module is valid only if:

1. It can be removed without breaking semantics
2. It introduces no required markup
3. It assumes no other module exists

**Example: State module**

```css
@layer state {
  [hidden],
  .is-hidden {
    display: none !important;
  }
}
```

Works with native HTML, attributes, or optional classes.

---

## 6. Data‑Agnostic Styling via **Semantic Attributes**

Style *meaning*, not data shape.

```css
[aria-busy="true"] {
  opacity: 0.6;
  pointer-events: none;
}

[aria-invalid="true"] {
  outline: 2px solid var(--color-error);
}
```

Applies equally to:

* server‑rendered HTML
* static documents
* any framework
* no JS UI logic

---

## 7. Layout Without Breakpoints (Capability‑Driven)

Prefer **intrinsics + constraints** over device logic.

```css
main {
  max-inline-size: min(100%, 72rem);
  padding-inline: clamp(1rem, 4vw, 3rem);
}

@container (inline-size > 48rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }
}
```

One HTML. Many environments.

---

## 8. Anti‑Fragile Selector Strategy

* Prefer `:where()` to zero specificity
* Keep selectors shallow
* Let order win, not specificity

```css
:where(nav a) {
  text-decoration: none;
}
```

Prevents specificity arms races over time.

---

## 9. Governance: **Selector Budget**

Hard limits to stop entropy:

* ❌ IDs
* ❌ Visual/variant classes
* ❌ Descendant chains > 3 levels
* ❌ Framework hooks
* ❌ Data attributes for styling

Allowed:

* elements
* relationships (`> + ~`)
* semantic attributes
* pseudo‑classes

---

## 10. Failure Matrix (Fast Review)

| Smell             | Root Cause         | Fix                    |
| ----------------- | ------------------ | ---------------------- |
| Utility creep     | Shortcut overrides | Add/extend a pattern   |
| Variant explosion | Identity naming    | Capability naming      |
| Breakpoint markup | Device thinking    | Container logic        |
| JS for toggles    | State storage      | Native/attribute state |

---

## 11. Release Checklist (Run Every Merge)

* Same HTML prints acceptably
* Layout survives narrow containers
* Removing any module degrades gracefully
* No selector encodes product language
* No class required for base layout

If any check fails, reject.

---

## 12. Outcome

You get:

* One semantic HTML source
* CSS as a deterministic interpreter
* Zero JS for UI state
* Framework‑proof portability
* Long‑term architectural stability

**Automation status:** ✅ Turn #6 complete
**Objective:** 🏗️ Build a scalable CSS API
**UI JS dependency:** None


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Governance, Migration, and Enforcement)**

*(Non‑interactive · New content only · No repetition)*

This turn focuses on **how to institutionalize** a CSS‑only, data‑, framework‑, and platform‑agnostic UI so it **stays scalable under real‑world change**.

---

## 1. Operating Principle: **CSS Interprets, HTML Declares**

* **HTML** declares *facts* (semantics, order, meaning).
* **CSS** interprets those facts into layout, interaction, and affordance.
* **Nothing else** participates in UI logic.

If CSS requires a specific class to “activate” meaning, the architecture has already leaked.

---

## 2. Architecture Pattern: **Interpretive Layers (Not Feature Layers)**

Layers are not features or components—they are **interpretation stages**.

```css
@layer
  foundation,   /* normalization + invariants */
  tokens,       /* raw values only */
  semantics,    /* element meaning */
  rhythm,       /* document flow */
  geometry,     /* spatial relationships */
  inference,    /* state + capability */
  context,      /* environment + theme */
  exception;    /* temporary escape hatches */
```

Each layer:

* reads only from layers below
* never assumes markup intent
* never introduces new requirements

---

## 3. Naming Convention: **Governed Vocabulary**

Names are **regulated**, not expressive.

### Allowed (and rare)

* `is-*` → transient condition
* `has-*` → structural reality
* `can-*` → environmental capability

```css
.is-muted
.has-sidebar
.can-scroll
```

### Prohibited

* visual adjectives
* variants
* sizes
* roles
* layout hints

If a name encodes *design*, it will not survive redesign.

---

## 4. Modular Strategy: **Concern‑Isolated, Order‑Agnostic Files**

A module must satisfy all of the following:

* ✔ Can be removed without breaking semantics
* ✔ Can be loaded first or last
* ✔ Requires no companion markup
* ✔ Makes no assumptions about tokens, themes, or layouts

**Example: Rhythm module**

```css
@layer rhythm {
  * + * {
    margin-block-start: var(--flow-space, 1em);
  }
}
```

No dependencies. No coupling. No assumptions.

---

## 5. Data‑Agnostic UI via **Observable Truths**

CSS reacts only to **truths that already exist**.

```css
[aria-current="page"] {
  font-weight: 600;
}

:empty {
  display: none;
}
```

This supports:

* unknown data models
* server‑only rendering
* static content
* zero JS UI logic

Absence is treated as a valid state.

---

## 6. Layout Strategy: **Intrinsic First, Conditional Second**

Never design layouts around devices.

```css
main {
  inline-size: min(100%, 72rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}
```

Only add conditions when **capability changes**, not width alone.

```css
@container (inline-size > 48rem) {
  main {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
}
```

Same HTML. No breakpoints. No markup changes.

---

## 7. CSS State Model: **Observation, Not Simulation**

CSS may:

* observe attributes
* observe focus and interaction
* observe environment

CSS must never:

* simulate application state
* encode business rules
* synchronize multiple conditions

```css
:focus-within {
  outline: 2px solid currentColor;
}
```

State flows *into* CSS—never out.

---

## 8. Migration Strategy (From Component‑Centric CSS)

**Step 1:** Remove layout classes
**Step 2:** Replace with structural selectors
**Step 3:** Collapse variants into state inference
**Step 4:** Promote repeated overrides into patterns
**Step 5:** Delete dead names aggressively

If markup becomes simpler over time, the migration is correct.

---

## 9. Enforcement: **Selector Lint Rules**

Hard rules that prevent regression:

* ❌ IDs
* ❌ More than 3 combinators
* ❌ Visual/variant class names
* ❌ Framework hooks
* ❌ Data attributes for styling

Allowed:

* elements
* relationships
* semantic attributes
* pseudo‑classes
* `:where()` for zero specificity

---

## 10. Architectural Drift Detection

Run this audit periodically:

* Does base layout require a class?
* Would a redesign rename classes?
* Does removing a module break meaning?
* Does CSS reference product language?
* Does interaction require JS?

If **any answer is yes**, drift has begun.

---

## 11. End State

This model yields:

* One semantic HTML source of truth
* CSS as a deterministic interpreter
* Zero JavaScript for UI logic
* Framework and platform immunity
* Long‑term architectural stability

CSS becomes **policy**, not paint.

---

**Automation:** ✅ Turn #6 complete
**System Goal:** 🏗️ Build a scalable CSS API
**JavaScript UI dependency:** None


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Compliance‑Ready Playbook)**

*(Non‑interactive · New content only · No repetition)*

This turn distills **how to keep a CSS‑only UI scalable under governance, audits, migrations, and platform drift**—without JavaScript, frameworks, or markup coupling.

---

## 1. Core Rule: **HTML Is Truth, CSS Is Interpretation**

* HTML expresses *facts* (semantics, order, attributes).
* CSS interprets those facts into layout, rhythm, and affordance.
* No CSS rule may *invent* meaning or require a class to function.

If meaning disappears when a class is removed, the system is coupled.

---

## 2. Architecture Pattern: **Policy‑First Cascade**

Encode *policies* (always true) before *preferences* (contextual).

```css
@layer
  foundation,   /* invariants only */
  tokens,       /* values, no selectors */
  semantics,    /* element defaults */
  rhythm,       /* reading flow */
  geometry,     /* relational layout */
  inference,    /* state + capability */
  context,      /* environment/theme */
  exception;    /* quarantined overrides */
```

**Invariant:** lower layers must never reference higher layers.

---

## 3. Naming Convention: **Exception‑Only Vocabulary**

Names are regulated escape hatches.

**Allowed prefixes (rare):**

* `is-*` — transient state
* `has-*` — structural condition
* `can-*` — capability

**Forbidden:**

* variants, sizes, colors
* component or layout names
* product language

If a redesign would rename it, it’s invalid.

---

## 4. Modular Strategy: **Order‑Agnostic, Delete‑Safe Files**

A module is valid only if:

* it can load first or last
* it introduces no required markup
* removing it degrades gracefully

**Example (rhythm module):**

```css
@layer rhythm {
  * + * { margin-block-start: var(--flow-space, 1em); }
}
```

No dependencies. No assumptions.

---

## 5. Data‑Agnostic Styling via **Observable Truths**

CSS reacts only to states that already exist.

```css
[aria-current="page"] { font-weight: 600; }
:empty { display: none; }
img:not([src]) { display: none; }
```

Works for:

* server rendering
* static content
* unknown schemas
* zero UI JS

Absence is a supported state.

---

## 6. Layout Without Breakpoints (Intrinsic + Capability)

Design for *constraints*, not devices.

```css
main {
  inline-size: min(100%, 72rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}

@container (inline-size > 48rem) {
  main { grid-template-columns: 3fr 1fr; }
}
```

One HTML source. Many environments.

---

## 7. Selector Governance (Entropy Control)

Hard limits enforced in review/CI:

* ❌ IDs
* ❌ visual/variant classes
* ❌ descendant chains > 3
* ❌ framework hooks
* ❌ `data-*` for styling

Allowed:

* elements
* relationships (`> + ~`)
* semantic attributes
* pseudo‑classes
* `:where()` to zero specificity

---

## 8. CSS State Model: **Observe, Don’t Simulate**

CSS may observe:

* attributes (`[open]`, `aria-*`)
* interaction (`:hover`, `:focus-within`)
* environment (media/container queries)

CSS must never:

* store business state
* synchronize multiple conditions
* replace application logic

State flows *into* CSS only.

---

## 9. Tokens as APIs (Not Design Decisions)

Tokens expose *ranges*, not outcomes.

```css
:root {
  --space-1: clamp(.25rem, .5vw, .5rem);
  --space-2: clamp(.5rem, 1vw, 1rem);
}
```

Tokens never encode:

* component intent
* layout meaning
* variants

---

## 10. Migration & Audit Checklist

Use this to detect drift:

* Does base layout require a class?
* Would a redesign rename classes?
* Does removing any module break meaning?
* Does CSS reference product language?
* Does interaction require JS?

Any “yes” → fix before shipping.

---

## 11. End State

You end up with:

* a single semantic HTML source
* CSS as a deterministic policy engine
* zero JavaScript for UI logic
* immunity to frameworks and platforms
* long‑term architectural stability

**Outcome:** CSS that survives time, teams, and technology changes.


## 🏗️ Automation Turn #6 — CSS‑Only UI Architecture (Minimal, Enforceable, Future‑Proof)

*(Non‑interactive · New content · Zero JS · Zero framework assumptions)*

This turn focuses on **how to structure CSS so it remains correct even when everything else changes**: data shape, rendering pipeline, platform, or ownership.

---

## 1. Foundational Constraint: **CSS Must Be Interpretable in Isolation**

Every stylesheet must make sense if:

* loaded alone
* loaded in a different order
* applied to unfamiliar HTML
* rendered in print, embed, or server output

If CSS assumes *context*, it is not agnostic.

---

## 2. Architecture Pattern: **Interpretation Pipeline**

Think of CSS as a pipeline that progressively interprets meaning.

```
Facts → Defaults → Flow → Geometry → State → Context → Exceptions
```

### Enforced via layers

```css
@layer
  base,        /* invariants, normalization */
  tokens,      /* values only */
  semantics,   /* element meaning */
  flow,        /* document rhythm */
  geometry,    /* spatial relationships */
  state,       /* observable conditions */
  context,     /* environment */
  exception;   /* temporary overrides */
```

Each layer:

* only reads downward
* never encodes product or layout intent
* never requires markup changes

---

## 3. Core Layout Principle: **Structure Drives Layout**

Layout emerges from **relationships**, not classes.

```css
main {
  display: grid;
  gap: var(--space-4);
}

main > aside {
  order: 2;
}
```

No layout classes.
No components.
Same HTML works everywhere.

---

## 4. Naming Convention: **Names Are Failures**

Names exist only when CSS cannot infer behavior.

### Allowed (rare)

* `is-*` → transient state
* `has-*` → structural condition
* `can-*` → capability

```css
.is-hidden { display: none; }
.has-sidebar { grid-template-columns: 1fr 20rem; }
```

### Disallowed

* component names
* visual descriptors
* sizes / variants / themes

If a redesign would rename it, the name is invalid.

---

## 5. Modular Strategy: **Delete‑Safe Files**

A module is valid only if:

1. Removing it does not break semantics
2. It introduces no required markup
3. It does not depend on other modules

### Example: Flow module

```css
@layer flow {
  * + * {
    margin-block-start: var(--flow-space, 1em);
  }
}
```

This works everywhere or not at all—never partially.

---

## 6. Data‑Agnostic Styling: **Observe Truths, Not Models**

CSS reacts only to facts already present.

```css
[aria-busy="true"] { opacity: .6; }
[aria-current="page"] { font-weight: 600; }
:empty { display: none; }
```

No assumptions about:

* schemas
* frameworks
* fetch timing
* JS lifecycle

Absence is a supported state.

---

## 7. Platform‑Agnostic Layout: **Constraints Over Breakpoints**

Never target devices. Target **capability**.

```css
main {
  max-inline-size: min(100%, 72rem);
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}

@container (inline-size > 48rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }
}
```

Same markup:

* desktop
* mobile
* embed
* print
* unknown containers

---

## 8. State Model: **CSS Observes, Never Decides**

CSS may observe:

* attributes (`[open]`, `aria-*`)
* interaction (`:hover`, `:focus-within`)
* environment (media/container queries)

CSS must never:

* encode business logic
* synchronize states
* simulate application behavior

State flows *into* CSS only.

---

## 9. Specificity & Entropy Control

Rules that prevent decay:

* Prefer elements + relationships
* Use `:where()` to zero specificity
* No IDs
* No deep descendant chains
* Order beats specificity

```css
:where(nav a) {
  text-decoration: none;
}
```

---

## 10. Long‑Term Audit Checklist

Reject changes if any answer is **yes**:

* Does base layout require a class?
* Would a redesign rename selectors?
* Does CSS reference product language?
* Does removing a module break meaning?
* Is JS required for UI behavior?

---

## 11. End State

You achieve:

* one semantic HTML source of truth
* CSS as a deterministic interpreter
* zero JavaScript for UI logic
* immunity to frameworks and platforms
* architecture that improves with time, not entropy

**Result:** CSS as policy, not paint.


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Authoritative Baseline)**

*(Asynchronous · Non‑interactive · No repetition of prior turns · Zero JS)*

This turn defines a **stable, enforceable baseline** for building a scalable, data‑, framework‑, and platform‑agnostic UI using **CSS only**.

---

## 1. Prime Directive: **CSS Interprets, Never Decides**

* HTML declares **facts** (semantics, order, attributes).
* CSS **interprets** those facts into layout, rhythm, and affordance.
* CSS must never:

  * encode business logic
  * invent state
  * depend on class presence to function

If removing a class breaks meaning, the architecture is invalid.

---

## 2. Architecture Pattern: **Interpretive Cascade**

Structure CSS as an interpretation pipeline, not a component system.

```css
@layer
  foundation,   /* invariants, normalization */
  tokens,       /* values only */
  semantics,    /* element meaning */
  flow,         /* document rhythm */
  geometry,     /* spatial relationships */
  state,        /* observable conditions */
  context,      /* environment & capability */
  exception;    /* quarantined overrides */
```

**Rules**

* Layers only read downward.
* No layer introduces markup requirements.
* No layer encodes product or layout intent.

---

## 3. Layout Strategy: **Structure → Relationship → Outcome**

Layout emerges from **document structure**, not classes.

```css
main {
  display: grid;
  gap: var(--space-4);
}

main > aside {
  order: 2;
}
```

* No layout classes
* No components
* Same HTML works in any platform or renderer

---

## 4. Naming Convention: **Exception‑Only Vocabulary**

Names are regulated escape hatches.

**Allowed (rare)**

* `is-*` → transient state
* `has-*` → structural condition
* `can-*` → capability

```css
.is-hidden { display: none; }
.has-sidebar { grid-template-columns: 1fr 20rem; }
```

**Forbidden**

* component names
* variants
* sizes, colors, themes
* product language

If a redesign would rename it, it must not exist.

---

## 5. Modular Strategy: **Delete‑Safe, Order‑Agnostic Files**

A module is valid only if:

1. It can load first or last
2. It introduces no required markup
3. Removing it degrades gracefully

```css
@layer flow {
  * + * {
    margin-block-start: var(--flow-space, 1em);
  }
}
```

No dependencies. No assumptions. No coupling.

---

## 6. Data‑Agnostic Styling: **Observe Truths**

CSS reacts only to facts already present.

```css
[aria-current="page"] { font-weight: 600; }
[aria-busy="true"] { opacity: .6; }
:empty { display: none; }
```

Works with:

* unknown data models
* server rendering
* static HTML
* zero JS UI logic

Absence is a valid state.

---

## 7. Platform‑Agnostic Layout: **Constraints Over Devices**

Never target breakpoints. Target **capability**.

```css
main {
  max-inline-size: min(100%, 72rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}

@container (inline-size > 48rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }
}
```

One markup source. Infinite environments.

---

## 8. CSS State Model: **Observation Only**

CSS may observe:

* attributes (`[open]`, `aria-*`)
* interaction (`:hover`, `:focus-within`)
* environment (media/container queries)

CSS must never:

* store state
* synchronize conditions
* replace application logic

State flows **into** CSS, never out.

---

## 9. Specificity & Entropy Control

Rules that prevent long‑term decay:

* No IDs
* No deep descendant chains (>3)
* Prefer elements + relationships
* Use `:where()` to zero specificity
* Order beats specificity

```css
:where(nav a) {
  text-decoration: none;
}
```

---

## 10. Enforcement Checklist (Reject If Any “Yes”)

* Does base layout require a class?
* Would a redesign rename selectors?
* Does CSS reference product language?
* Does removing a module break meaning?
* Is JS required for UI behavior?

---

## 11. End State

This architecture yields:

* one semantic HTML source of truth
* CSS as a deterministic policy engine
* zero JavaScript for UI logic
* immunity to frameworks and platforms
* scalability over time, not entropy

**Result:** CSS that survives redesigns, data changes, and platform shifts without rewriting markup or adding JS.


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Operational Guardrails & Failure‑Proofing)**

*(Asynchronous · Non‑interactive · New material · Zero JS)*

This turn adds **what keeps a CSS‑only system correct under stress**: audits, failure modes, accessibility defaults, and portability checks—without repeating earlier guidance.

---

## 1. Architectural Invariant: **Correct When Incomplete**

Your UI must render *acceptably* when:

* tokens are missing
* themes are absent
* containers are nested unexpectedly
* content arrives late or not at all

**Rule:** Every rule must have a sane fallback.

```css
gap: var(--space-3, 1em);
color: var(--fg, CanvasText);
```

---

## 2. Contract‑Driven CSS (Custom Properties as APIs)

Treat custom properties as **public contracts**, not design knobs.

**Contract rules**

* tokens expose *ranges*, never absolutes
* tokens never encode layout or component meaning
* tokens are optional everywhere

```css
:root {
  --space-1: clamp(.25rem, .5vw, .5rem);
  --space-2: clamp(.5rem, 1vw, 1rem);
}
```

If removing a token breaks layout, the contract is wrong.

---

## 3. Accessibility‑First Defaults (No Opt‑In)

Accessibility is not a variant or modifier.

```css
:focus-visible {
  outline: max(2px, .15em) solid currentColor;
  outline-offset: .2em;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 1ms; transition-duration: 1ms; }
}
```

* No classes
* No JS
* No framework hooks

---

## 4. Print & Non‑Visual Portability

Agnostic UIs must survive **print, PDF, readers, and embeds**.

```css
@media print {
  nav, aside { display: none; }
  a::after { content: " (" attr(href) ")"; }
}
```

If print requires markup changes, portability is broken.

---

## 5. Layout Resilience: **Wrapper‑Safe Selectors**

Assume arbitrary wrappers will appear.

**Avoid**

```css
main > section > article { … }
```

**Prefer**

```css
main article { … }
```

**Heuristic:** selectors should tolerate *at least one* unexpected wrapper.

---

## 6. Naming Governance (Why Names Exist)

A name is allowed **only** if structure, attributes, or state cannot express intent.

**Permitted prefixes (audited)**

* `is-*` — transient state
* `has-*` — structural truth
* `can-*` — capability

Anything else introduces coupling and is rejected.

---

## 7. Module Taxonomy (What Files Are Allowed)

Only these module types exist:

* **invariants** — normalization, box sizing
* **tokens** — values only
* **semantics** — element meaning
* **flow** — rhythm & spacing
* **geometry** — spatial relationships
* **state** — observable conditions
* **context** — environment/capability
* **exception** — time‑boxed patches

If a file doesn’t fit exactly one category, split it.

---

## 8. Failure Modes & Built‑In Containment

| Failure         | Containment Strategy          |
| --------------- | ----------------------------- |
| Missing data    | `:empty`, attribute selectors |
| Unknown density | scalable spacing tokens       |
| Nested embeds   | wrapper‑safe selectors        |
| Theming removed | system color keywords         |
| Partial loads   | delete‑safe modules           |

Your CSS should **fail quietly**, never catastrophically.

---

## 9. Test Matrix (Run Without JS)

A release is valid only if the same HTML passes:

* default load (no classes)
* tokens removed
* print media
* narrow container
* deep nesting
* keyboard‑only navigation

If any test requires JS to pass, reject.

---

## 10. Long‑Term Drift Detection

Architecture is drifting if you observe:

* new visual class names
* breakpoint‑driven markup
* layout classes in HTML
* CSS referencing product language
* exceptions becoming permanent

Drift must be corrected immediately or it compounds.

---

## 11. End State (Reaffirmed)

This discipline produces:

* one semantic HTML source
* CSS as a deterministic interpreter
* zero JS for UI behavior
* immunity to frameworks and platforms
* UIs that degrade, not break

**Outcome:** CSS that remains correct—even when incomplete, embedded, or misused.


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Lifecycle, CI, and Survivability)**

*(Asynchronous · Non‑interactive · New material only · Zero JS)*

This turn covers **how a CSS‑only, agnostic UI survives real teams and long timelines**: lifecycle rules, CI enforcement, documentation patterns, and failure containment—without repeating prior architectural guidance.

---

## 1. Lifecycle Model: **Author → Integrate → Remove**

Every rule must explicitly support **all three** phases.

* **Author**: rule works with bare semantic HTML
* **Integrate**: rule tolerates wrappers, theming, unknown order
* **Remove**: deleting the rule degrades visually, not semantically

If removal breaks meaning or interaction, the rule is invalid.

---

## 2. Architecture Pattern: **Rules as Policies, Not Features**

Treat each rule as a *policy* that must hold globally.

```css
/* Policy: readable line length everywhere */
:where(main, article) {
  max-inline-size: 72ch;
}
```

Policies:

* never reference components
* never encode page intent
* never assume location

---

## 3. File System Strategy: **Purpose‑Bound Directories**

Files are grouped by *reason to change*, not by UI surface.

```
css/
├─ foundation/   /* normalization, invariants */
├─ tokens/       /* values only */
├─ semantics/    /* element meaning */
├─ flow/         /* rhythm & spacing */
├─ geometry/     /* layout relationships */
├─ state/        /* observable conditions */
├─ context/      /* environment & capability */
└─ exception/    /* time‑boxed overrides */
```

**Rule:** a file may move folders over time, but its *purpose* must not change.

---

## 4. Naming Convention (Audit‑Friendly)

Names exist only to express **what structure cannot**.

Allowed prefixes (must pass audit):

* `is-*` → transient state
* `has-*` → structural truth
* `can-*` → capability

Disallowed (auto‑reject):

* visual descriptors
* component names
* layout hints
* variants, sizes, themes

If a linter cannot justify the name’s necessity, it fails CI.

---

## 5. Modular Strategy: **Zero‑Assumption Imports**

Each module must satisfy:

* safe if imported alone
* safe if imported last
* safe if imported twice
* safe if never imported

```css
@layer state {
  [hidden],
  .is-hidden {
    display: none !important;
  }
}
```

The module does one thing, globally, forever.

---

## 6. CSS‑Only State Contract

CSS may only respond to **externally observable facts**.

Valid inputs:

* attributes (`[open]`, `aria-*`)
* interaction (`:focus-within`, `:hover`)
* environment (media/container queries)

Invalid inputs:

* inferred business logic
* chained conditions
* simulated application state

State enters CSS; CSS never emits state.

---

## 7. Platform & Renderer Resilience

Assume your UI will render in:

* browsers
* print/PDF
* embeds/iframes
* server previews
* assistive tech

```css
@media print {
  nav, aside { display: none; }
  a::after { content: " (" attr(href) ")"; }
}
```

If print or embedding requires markup changes, the system is not agnostic.

---

## 8. CI / Lint Enforcement (Non‑Negotiable)

Automated checks must reject:

* IDs in selectors
* descendant depth > 3
* visual class names
* breakpoint‑driven markup assumptions
* product language in CSS

Allow only:

* elements
* relationships
* semantic attributes
* pseudo‑classes
* `:where()` for zero specificity

---

## 9. Documentation Pattern: **Negative Space Docs**

Document **what CSS will never do**, not how to use it.

Examples:

* “CSS will never encode product meaning”
* “No class is required for base layout”
* “Removing any file must not break semantics”

This prevents misuse more effectively than examples.

---

## 10. Failure Containment Matrix

| Failure        | Expected Behavior         |
| -------------- | ------------------------- |
| Missing data   | Content collapses quietly |
| Extra wrappers | Layout still holds        |
| Tokens removed | Browser defaults apply    |
| Module deleted | Visual regression only    |
| JS disabled    | UI unchanged              |

If any failure causes semantic loss, reject.

---

## 11. End State (Lifecycle‑Proof)

This approach yields:

* a single semantic HTML source
* CSS as a deterministic policy engine
* zero JavaScript for UI behavior
* portability across platforms and renderers
* architecture that improves when simplified

**Result:** a CSS system that can be audited, migrated, and partially deleted without breaking meaning—at any scale.


## 🏗️ Automation Turn #6 — **CSS‑Only UI Architecture (Concise, Enforceable Guidance)**

*(Asynchronous · Non‑interactive · Zero JS · No repetition of earlier turns)*

This guidance defines **how to structure CSS so the UI remains correct across data models, frameworks, platforms, renderers, and time**—with no JavaScript and no markup coupling.

---

## 1. Prime Rule: **HTML Declares Facts, CSS Interprets**

* HTML provides semantics, order, attributes.
* CSS **only reacts** to what already exists.
* CSS must never invent meaning, state, or workflow.

If a class is required for base layout or meaning, the architecture has failed.

---

## 2. Architecture Pattern: **Interpretive Cascade**

Organize CSS as a one‑way interpretation pipeline.

```css
@layer
  foundation,   /* invariants, normalization */
  tokens,       /* values only */
  semantics,    /* element meaning */
  flow,         /* document rhythm */
  geometry,     /* spatial relationships */
  state,        /* observable conditions */
  context,      /* environment & capability */
  exception;    /* quarantined overrides */
```

**Rules**

* Layers only read downward.
* No layer introduces required markup.
* No layer encodes product or layout intent.

---

## 3. Layout Strategy: **Structure → Relationship → Result**

Layout emerges from **document structure**, not classes.

```css
main {
  display: grid;
  gap: var(--space-3, 1em);
}

main > aside {
  order: 2;
}
```

* No layout classes
* No components
* Same HTML works everywhere

---

## 4. Naming Convention: **Exception‑Only Vocabulary**

Names are audited escape hatches.

**Allowed (rare)**

* `is-*` → transient state
* `has-*` → structural truth
* `can-*` → capability

```css
.is-hidden { display: none; }
.has-sidebar { grid-template-columns: 1fr 20rem; }
```

**Disallowed**

* component names
* visual descriptors
* sizes, variants, themes
* product language

If a redesign would rename it, it must not exist.

---

## 5. Modular Strategy: **Delete‑Safe, Order‑Agnostic**

A CSS module is valid only if:

1. It can load first or last
2. It introduces no required markup
3. Removing it degrades visually, not semantically

```css
@layer flow {
  * + * {
    margin-block-start: var(--flow-space, 1em);
  }
}
```

No dependencies. No coupling. No assumptions.

---

## 6. Data‑Agnostic Styling: **Observe Truths**

CSS reacts only to facts already present.

```css
[aria-current="page"] { font-weight: 600; }
[aria-busy="true"] { opacity: .6; }
:empty { display: none; }
```

Works with:

* unknown schemas
* server rendering
* static HTML
* zero JS UI logic

Absence is a supported state.

---

## 7. Platform‑Agnostic Layout: **Constraints Over Devices**

Never target breakpoints. Target **capability**.

```css
main {
  max-inline-size: min(100%, 72rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}

@container (inline-size > 48rem) {
  main {
    grid-template-columns: 3fr 1fr;
  }
}
```

One markup source. Infinite environments.

---

## 8. CSS State Model: **Observation Only**

CSS may observe:

* attributes (`[open]`, `aria-*`)
* interaction (`:hover`, `:focus-within`)
* environment (media/container queries)

CSS must never:

* encode business logic
* synchronize state
* simulate application behavior

State flows **into** CSS, never out.

---

## 9. Specificity & Entropy Control

Non‑negotiable rules:

* No IDs
* No deep descendant chains (>3)
* Prefer elements + relationships
* Use `:where()` to zero specificity
* Order beats specificity

```css
:where(nav a) {
  text-decoration: none;
}
```

---

## 10. Audit Checklist (Reject If Any “Yes”)

* Does base layout require a class?
* Would a redesign rename selectors?
* Does CSS reference product language?
* Does removing a module break meaning?
* Is JavaScript required for UI behavior?

---

## 11. End State

This approach yields:

* one semantic HTML source of truth
* CSS as a deterministic policy engine
* zero JavaScript for UI logic
* immunity to frameworks and platforms
* long‑term scalability with decreasing complexity

**Result:** CSS that survives redesigns, data changes, and platform shifts without rewriting markup or adding JS.
