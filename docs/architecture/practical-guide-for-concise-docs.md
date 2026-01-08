# Practical Guide For-Concise Docs

Below is **practical, field-tested guidance** for writing technical documentation that is **concise, accurate, and useful** for both **developers** and **end users**.

---

## 1. Start With Audience & Intent (Before Writing)

Always answer these **first**, then write backward:

* **Who** is reading? (developer, admin, end user, mixed)
* **Why** are they here? (learn, implement, troubleshoot, reference)
* **What decision or action** must they complete next?

> One document = one primary intent. Split if needed.

---

## 2. Recommended Structure (Scan-First)

Use a predictable structure so readers can skim.

### Minimal Effective Template

```
Title (Action-oriented)
Short summary (1–2 sentences)

Prerequisites (if any)
Core task or concept
Examples
Edge cases / pitfalls
Reference (optional)
```

### For APIs / Dev Docs

```
Overview
Quick start
Configuration
Usage
Examples
Errors / troubleshooting
Reference
```

### For End Users

```
What this does
When to use it
Steps
What success looks like
Common problems
```

---

## 3. Be Concise Without Losing Meaning

**Rules that work:**

* One idea per paragraph
* One action per sentence
* Prefer **verbs over adjectives**
* Remove filler words (`simply`, `basically`, `just`)

**Bad**

> This component is basically used in order to allow users to…

**Good**

> This component allows users to…

---

## 4. Tone: Neutral, Direct, Confident

* Professional, calm, and factual
* Avoid hype and marketing language
* Avoid apology language (`unfortunately`, `sorry`)
* Avoid ambiguity (`should`, `might`) unless intentional

**Preferred**

* “Use X when…”
* “This fails if…”
* “Do not…”

---

## 5. Formatting for Fast Reading

Use formatting to **reduce cognitive load**, not decorate.

### Headings

* Use **task-based headings**

  * ❌ “Background”
  * ✅ “How authentication works”

### Lists

* Use bullets for conditions, steps, options
* Keep items parallel in grammar

### Code

* Always explain **why**, not just **what**
* Keep examples minimal and correct
* One example per concept

---

## 6. Clarity Best Practices

### Define Terms Once

* Introduce terminology early
* Use the same term consistently
* Avoid synonyms for the same concept

### Be Explicit

* State defaults
* State constraints
* State failure modes

**Example**

> Default timeout is 30 seconds. Requests exceeding this value fail with a timeout error.

---

## 7. Separate Concepts From Instructions

Do not mix explanation and steps.

**Pattern**

1. Explain concept (brief)
2. Show how to use it
3. Show an example
4. Warn about pitfalls

---

## 8. Examples Are Mandatory (But Minimal)

* Examples should be:

  * Realistic
  * Copy-pasteable
  * Small
* One good example beats three vague ones

---

## 9. Common Pitfalls to Avoid

* Long prose blocks
* Hidden assumptions
* Missing prerequisites
* “Magic” behavior without explanation
* Docs that explain *what exists* but not *how to use it*

---

## 10. Final Quality Checklist (Before Publishing)

* Can a reader **complete a task** without outside help?
* Can they **scan and find answers** in under 30 seconds?
* Are errors and limitations clearly stated?
* Is terminology consistent end-to-end?
* Does every section justify its existence?

---

### Bottom Line

Good documentation:

* Respects the reader’s time
* Optimizes for scanning
* Explains intent, not just mechanics
* Anticipates failure and confusion
* Is written from the **reader’s next action backward**

If you want, this guidance can be converted into:

* A reusable doc template
* A lint-style checklist
* A style guide for teams
* Examples rewritten from existing docs


Below is a **concise, non-overlapping playbook** for producing technical documentation that works for **both developers and end users**, optimized for scanability and task completion.

---

## 1. Document Architecture (Think in Layers)

Design docs so readers can stop when their need is met.

**Layered flow**

1. **Outcome** – what the reader will achieve
2. **Context** – when/why to use this
3. **Action** – how to do it
4. **Verification** – what success looks like
5. **Exceptions** – errors, limits, edge cases

Each section must stand alone.

---

## 2. Structure That Reduces Reading

Prefer **short, predictable sections** over long narratives.

**Effective patterns**

* Task-based pages (one task per page)
* Progressive disclosure (simple → advanced)
* Separate **how** from **why**

**Avoid**

* “Overview-only” docs
* Deep nesting
* Mixed instructions and theory

---

## 3. Tone Rules That Scale

Write as if the reader is capable but busy.

**Use**

* Active voice
* Declarative statements
* Explicit constraints

**Avoid**

* Marketing language
* Apologies or hedging
* Implied behavior

**Example**

> ❌ “This may cause issues in some cases”
> ✅ “This fails when X is disabled”

---

## 4. Formatting for Cognitive Ease

Formatting is functional, not aesthetic.

**Best practices**

* Headings describe actions or decisions
* Lists for conditions, steps, options
* Tables for comparisons or defaults
* Code blocks only when necessary

**Golden rule**

> If it can be scanned, it should be formatted.

---

## 5. Clarity Through Precision

Clarity comes from removing ambiguity, not adding detail.

**Always state**

* Defaults
* Preconditions
* Side effects
* Failure modes

**Use consistent language**

* One term per concept
* No synonyms for technical entities
* Define once, reuse everywhere

---

## 6. Examples That Teach (Not Impress)

Examples should answer: *“Can I use this safely?”*

**Good examples**

* Minimal
* Realistic
* Copy‑pasteable
* Aligned with the text

**Bad examples**

* Abstract
* Overloaded
* “Hello world” without context

---

## 7. Separate Audiences Without Duplication

When serving both developers and end users:

* Share **concepts**
* Split **instructions**
* Cross-link instead of repeating

---

## 8. Maintenance & Trust

Outdated docs are worse than no docs.

**Practices**

* Version documentation with the product
* Date behavior changes
* Remove deprecated paths promptly

---

## 9. Final Pre‑Publish Check

* Can the task be completed without guessing?
* Are constraints and errors visible before usage?
* Can a reader find the answer in <30 seconds?
* Does every section justify its existence?

---

### Core Principle

**Documentation is a user interface.**
Optimize it for speed, clarity, and correctness—not completeness.

This guidance is suitable for internal standards, team style guides, or automated doc reviews.


### Technical Documentation Playbook (Concise + Informative)

---

## 1) Structure: Design for Tasks, Not Pages

**Goal:** Let readers complete a task fast and stop reading.

**Recommended layouts**

* **Task doc:** *Goal → When to use → Steps → Verify → Errors*
* **Concept doc:** *What → Why → How it works → Limits*
* **API doc:** *Overview → Quick start → Usage → Examples → Errors → Reference*

**Rules**

* One primary intent per page.
* Separate **concepts** from **instructions**.
* Put prerequisites and defaults **before** steps.

---

## 2) Tone: Neutral, Direct, Predictable

**Use**

* Active voice; imperative verbs.
* Precise statements with clear constraints.
* Confident, factual language.

**Avoid**

* Marketing, hype, apologies.
* Hedging (“might”, “generally”) unless uncertainty is real.
* Anthropomorphism (“the system tries to…”).

**Example**

* ❌ “This may cause issues sometimes.”
* ✅ “This fails when X is disabled.”

---

## 3) Formatting: Optimize for Scanning

**Headings**

* Action-based (“Configure authentication”), not vague (“Background”).

**Lists**

* Bullets for options/conditions.
* Numbered steps for procedures.
* Keep parallel grammar.

**Tables**

* Defaults, limits, comparisons, parameters.

**Code**

* Minimal, correct, copy‑pasteable.
* Explain *why* in surrounding text, not comments.

---

## 4) Clarity: Remove Ambiguity

**Always state**

* Defaults and units.
* Preconditions and permissions.
* Side effects and failure modes.

**Terminology**

* Define once, reuse consistently.
* One term per concept; no synonyms.

**Specificity beats brevity**

* “Timeout defaults to **30s**; requests exceeding this **fail**.”

---

## 5) Examples: Teach Safely

**Good examples**

* Realistic inputs/outputs.
* Small scope (one idea).
* Show success *and* a common failure.

**Bad examples**

* Abstract placeholders without context.
* Overloaded demos that hide the core idea.

---

## 6) Serve Developers and End Users Together

* Share **concepts**.
* Split **instructions** by audience.
* Cross‑link instead of duplicating content.

---

## 7) Maintenance & Trust

* Version docs with releases.
* Date behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer, current pages over many stale ones.

---

## 8) Pre‑Publish Checklist

* Can the task be completed without guessing?
* Are defaults, limits, and errors visible **before** usage?
* Can answers be found in <30 seconds by scanning?
* Does every section earn its place?

---

**Core principle:** Documentation is a user interface. Optimize for speed, clarity, and correctness—not completeness.


### Writing Technical Documentation That Is Concise *and* Informative

*(Automation-safe, non-redundant guidance)*

---

## 1. Structure: Optimize for Fast Task Completion

Design documents so readers can **enter, act, and exit quickly**.

**Recommended structures**

* **Task-focused**: Purpose → Preconditions → Steps → Result → Errors
* **Concept-focused**: What it is → When to use → How it works → Limits
* **Reference**: Parameter → Type → Default → Description → Notes

**Key rules**

* One primary goal per document
* Put prerequisites and defaults **before** instructions
* Separate explanation from execution

---

## 2. Tone: Professional, Direct, Unambiguous

Assume the reader is capable but time‑constrained.

**Use**

* Active voice
* Clear imperatives (“Configure”, “Do not”)
* Definitive language for known behavior

**Avoid**

* Marketing language
* Apologies or hedging
* Vague qualifiers unless uncertainty is real

> Prefer: “Fails when X is disabled”
> Avoid: “May sometimes fail”

---

## 3. Formatting: Enable Scanning

Formatting is a usability feature.

**Headings**

* Action‑oriented (“Set authentication timeout”)

**Lists**

* Numbered lists for steps
* Bullets for options, conditions, outcomes
* Parallel grammar across items

**Tables**

* Defaults, limits, comparisons, parameters

**Code blocks**

* Minimal and correct
* One concept per example
* Surround with explanation, not commentary inside code

---

## 4. Clarity: Eliminate Guesswork

Clarity comes from precision, not verbosity.

**Always state explicitly**

* Defaults and units
* Required permissions or states
* Side effects
* Failure modes and error meanings

**Terminology discipline**

* Define once, reuse consistently
* One term per concept—no synonyms

---

## 5. Examples: Teach Safe Usage

Examples should reduce risk, not showcase features.

**Good examples**

* Realistic
* Copy‑pasteable
* Small scope
* Show both success and a common failure

**Avoid**

* Abstract placeholders
* Overloaded “demo” examples
* Examples that contradict defaults

---

## 6. Serving Developers *and* End Users

* Share conceptual explanations
* Split procedural steps by audience
* Cross‑link instead of duplicating content

---

## 7. Maintenance: Preserve Trust

* Version docs with releases
* Timestamp behavior changes
* Remove deprecated paths promptly
* Fewer accurate docs > many outdated ones

---

## 8. Pre‑Publish Validation Checklist

* Can the task be completed without external help?
* Are constraints visible *before* usage?
* Can key info be found in under 30 seconds?
* Does every section justify its presence?

---

### Core Principle

**Documentation is a user interface.**
Design it for speed, clarity, and correctness—then remove everything that doesn’t support the reader’s next action.


## Technical Documentation Guidance (Automation‑Ready, Non‑Redundant)

This version focuses on **decision rules and operational heuristics** you can apply consistently across teams and doc types.

---

## 1. Structure: Make Navigation Obvious Before Reading

**Design rule:** A reader should know *where to look* without reading full sentences.

**Apply these structural constraints**

* One **user goal** per document
* Sections ordered by **time-to-need**, not importance
* Headings answer *questions* the reader is asking

**Effective section order**

1. **Outcome** – what this enables
2. **Applicability** – when to use / not use
3. **Requirements** – inputs, permissions, environment
4. **Procedure / Usage**
5. **Validation** – how to confirm success
6. **Failures & Limits**

If a section doesn’t support task completion, remove it.

---

## 2. Tone: Deterministic, Not Conversational

**Tone rule:** Documentation describes **behavior**, not opinions.

* State facts, constraints, and guarantees
* Use imperative verbs for actions
* Avoid narrative explanations unless teaching a concept

**Write like a spec, not a blog post**

* Prefer: “Returns 403 if unauthenticated”
* Avoid: “You may encounter an error if…”

---

## 3. Formatting: Encode Meaning Visually

Formatting should signal **how information is used**.

**Standard meanings**

* **Paragraphs** → concepts
* **Lists** → choices, conditions, steps
* **Tables** → parameters, defaults, comparisons
* **Code blocks** → executable truth

**Enforcement rules**

* No paragraph longer than 4 lines
* No list item longer than 2 lines
* No code without surrounding explanation

---

## 4. Clarity: Replace Implicit Knowledge With Explicit Rules

Assume *zero* shared context.

**Always make explicit**

* Default values (with units)
* Required order of operations
* Side effects
* Error conditions and triggers

**Language discipline**

* One term = one meaning
* No synonyms for technical concepts
* Avoid pronouns (“it”, “this”) when referencing systems

---

## 5. Examples: Reduce Risk, Not Just Explain

Examples should function as **safe starting points**.

**Example criteria**

* Matches documented defaults
* Uses realistic values
* Demonstrates exactly one behavior
* Can fail in a predictable way

If an example can mislead, delete it.

---

## 6. Serving Multiple Audiences Without Duplication

**Rule:** Concepts are shared; actions are not.

* Centralize conceptual explanations
* Split instructions by role (developer, user, admin)
* Cross‑link rather than restate

---

## 7. Maintenance Discipline

Outdated documentation creates operational debt.

**Operational practices**

* Version docs with releases
* Mark behavior changes clearly
* Remove deprecated content aggressively
* Prefer fewer, accurate docs over broad coverage

---

## 8. Final Validation Heuristics

Before publishing, confirm:

* A reader can act without assumptions
* Errors are described *before* they occur
* Information can be found by scanning only
* Every section supports the reader’s next decision

---

### Guiding Principle

**Documentation is a control surface.**
Design it to minimize uncertainty, prevent misuse, and accelerate correct action.


### Technical Documentation Guidance (Automation Run #6 — Fresh Synthesis)

This iteration focuses on **operational rules and decision heuristics** that prevent bloat while preserving usefulness for both **developers** and **end users**.

---

## 1. Structure: Align to User Decisions

**Design principle:** Every section should answer a concrete decision or enable an action.

**Canonical order**

1. **Purpose** – what problem this solves
2. **Applicability** – when to use / not use
3. **Requirements** – prerequisites, inputs, assumptions
4. **Procedure / Usage** – steps or invocation
5. **Validation** – how to confirm success
6. **Failures & Limits** – known errors, constraints, side effects

**Rules**

* One goal per document.
* No mixed concepts and steps.
* If a section doesn’t change behavior or decisions, remove it.

---

## 2. Tone: Deterministic and Factual

**Write like a contract, not a conversation.**

* Use active voice and imperative verbs.
* State guarantees, constraints, and outcomes explicitly.
* Use uncertainty only when behavior is genuinely nondeterministic.

**Prefer**

* “Returns 401 when unauthenticated.”
  **Avoid**
* “May cause issues if not logged in.”

---

## 3. Formatting: Encode Meaning Visually

Formatting should indicate *how* information is used.

* **Headings** → actions or questions (“Configure logging”)
* **Paragraphs** → concepts only
* **Lists** → steps, options, conditions
* **Tables** → parameters, defaults, limits
* **Code blocks** → executable truth (minimal, correct)

**Enforcement**

* Short paragraphs (≤4 lines)
* Parallel list grammar
* No code without surrounding explanation

---

## 4. Clarity: Make the Implicit Explicit

Assume zero shared context.

Always state:

* Defaults (with units)
* Order of operations
* Required permissions or state
* Side effects
* Exact failure conditions

**Terminology discipline**

* One term = one meaning
* Define once, reuse verbatim
* Avoid pronouns for system components

---

## 5. Examples: Minimize Risk

Examples exist to prevent misuse.

**Include only examples that**

* Match documented defaults
* Demonstrate one behavior
* Are copy‑pasteable
* Show a predictable failure when relevant

If an example can mislead, delete it.

---

## 6. Serving Multiple Audiences

**Rule:** Concepts are shared; instructions are role‑specific.

* Centralize explanations.
* Split procedures by audience (developer, user, admin).
* Cross‑link instead of duplicating content.

---

## 7. Maintenance as a First‑Class Concern

Outdated docs erode trust.

* Version docs with releases.
* Mark behavior changes clearly.
* Remove deprecated paths aggressively.
* Prefer fewer accurate docs over broad coverage.

---

## 8. Pre‑Publish Validation

Confirm that:

* A reader can act without assumptions.
* Errors and limits appear *before* usage.
* Key info is findable by scanning only.
* Every section supports the reader’s next action.

---

### Core Principle

**Documentation is a control surface.**
Its job is to reduce uncertainty, prevent misuse, and accelerate correct action—with the fewest possible words.


### Writing Technical Documentation That Is Concise *and* Informative

*(Automation turn #6 – new synthesis, no repetition of prior runs)*

---

## 1. Structure: Design for Completion, Not Reading

Documentation exists to help someone **do something**, not to be read end‑to‑end.

**Core rule**

> A reader should reach a correct action with the least possible context.

**Effective structural patterns**

* **Task docs**: Goal → Preconditions → Steps → Expected result → Errors
* **Concept docs**: What it is → When to use → How it behaves → Constraints
* **Reference docs**: Name → Purpose → Inputs → Defaults → Output → Notes

**Hard constraints**

* One primary task or decision per document
* Put prerequisites and defaults *before* instructions
* Never mix conceptual explanation with step‑by‑step actions

---

## 2. Tone: Precise, Neutral, and Deterministic

Tone should communicate **certainty and limits**, not personality.

**Preferred**

* Active voice
* Imperative verbs
* Explicit outcomes

**Avoid**

* Marketing or motivational language
* Apologies or softening phrases
* Ambiguous qualifiers unless uncertainty is real

**Example**

* ❌ “This can sometimes cause problems”
* ✅ “This fails when X is not configured”

---

## 3. Formatting: Make Meaning Visible

Formatting is not decoration; it encodes how information is used.

**Conventions**

* **Headings** → actions or decisions (“Configure access control”)
* **Paragraphs** → concepts only
* **Lists** → steps, options, conditions
* **Tables** → parameters, defaults, limits
* **Code blocks** → executable truth

**Discipline**

* Short paragraphs (≤4 lines)
* Parallel grammar in lists
* No code without surrounding explanation

---

## 4. Clarity: Eliminate Hidden Assumptions

Assume no shared context—even for experts.

**Always state explicitly**

* Default values and units
* Required order of operations
* Permissions or environment requirements
* Side effects
* Exact failure conditions

**Terminology rules**

* Define a term once
* Use it consistently everywhere
* One term per concept—no synonyms
* Avoid pronouns for system components

---

## 5. Examples: Reduce Risk, Not Just Explain

Examples exist to prevent misuse.

**Good examples**

* Minimal and realistic
* Copy‑pasteable
* Demonstrate one behavior
* Match documented defaults

**Include failures when**

* The error is common
* The recovery is non‑obvious

If an example could mislead, remove it.

---

## 6. Serving Developers and End Users Together

Shared audience does not mean shared instructions.

**Approach**

* Centralize conceptual explanations
* Split procedural steps by role
* Cross‑link instead of duplicating content

---

## 7. Maintenance: Accuracy Is a Feature

Stale documentation actively causes damage.

**Operational practices**

* Version docs with releases
* Clearly mark behavior changes
* Remove deprecated paths promptly
* Prefer fewer accurate docs over broad coverage

---

## 8. Final Validation Checklist

Before publishing, confirm:

* The task can be completed without guessing
* Defaults and limits are visible *before* usage
* Key information is findable by scanning alone
* Every section directly supports a user decision

---

### Guiding Principle

**Documentation is a user interface.**
Optimize it for speed, correctness, and predictability—then remove everything that does not serve the reader’s next action.


## Concise, Informative Technical Documentation — Practical Guidance

This guidance emphasizes **decision-first writing** and **operational precision**, suitable for both developers and end users without duplicating content across audiences.

---

## 1) Structure: Lead With Decisions, Not Descriptions

**Objective:** Help readers decide and act quickly.

**Recommended patterns**

* **Task docs:** Objective → Preconditions → Steps → Expected result → Errors
* **Concept docs:** Definition → When to use → How it behaves → Constraints
* **Reference docs:** Item → Purpose → Type → Default → Notes

**Rules**

* One intent per page.
* Place prerequisites, defaults, and limits *before* steps.
* Separate explanation from execution.

---

## 2) Tone: Factual and Predictable

**Write behavior, not narrative.**

**Use**

* Active voice and imperatives.
* Explicit outcomes and constraints.
* Consistent terminology.

**Avoid**

* Marketing language or persuasion.
* Apologies, hedging, or vague qualifiers.
* Anthropomorphic phrasing.

*Example:*

* Prefer: “Returns 403 when permission is missing.”
* Avoid: “May fail if permissions aren’t set.”

---

## 3) Formatting: Encode How Information Is Used

Formatting should signal intent at a glance.

| Element     | Use it for                    |
| ----------- | ----------------------------- |
| Headings    | Actions or questions          |
| Paragraphs  | Concepts only                 |
| Lists       | Steps, options, conditions    |
| Tables      | Defaults, limits, comparisons |
| Code blocks | Executable truth              |

**Discipline**

* Short paragraphs (≤4 lines).
* Parallel grammar in lists.
* One idea per code example.

---

## 4) Clarity: Make the Implicit Explicit

Assume no shared context.

**Always specify**

* Defaults (with units).
* Required state, permissions, and order.
* Side effects.
* Exact failure conditions and meanings.

**Terminology**

* Define once, reuse verbatim.
* One term per concept; no synonyms.
* Avoid pronouns for system components.

---

## 5) Examples: Reduce Risk

Examples exist to prevent misuse.

**Include examples that**

* Match documented defaults.
* Demonstrate a single behavior.
* Are realistic and copy‑pasteable.
* Show a common failure when recovery isn’t obvious.

Remove examples that can mislead.

---

## 6) Serving Developers and End Users Together

* Share **concepts** centrally.
* Split **procedures** by role.
* Cross‑link instead of duplicating text.

---

## 7) Maintenance: Accuracy Is a Feature

* Version docs with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate pages over broad coverage.

---

## 8) Pre‑Publish Check

* Can a reader act without guessing?
* Are constraints visible before usage?
* Can answers be found by scanning in <30 seconds?
* Does every section enable a decision or action?

---

**Principle:** Documentation is a user interface. Optimize for speed, correctness, and predictability—then remove everything that doesn’t help the reader act.


## Writing Technical Documentation That Is Concise *and* Informative

This guidance focuses on **practical rules** that help documentation stay short while remaining complete and trustworthy for both developers and end users.

---

## 1. Structure: Organize Around User Actions

**Principle:** Readers come to documentation to *decide* or *do*, not to read prose.

**Recommended patterns**

* **How‑to / Task**
  *Goal → Prerequisites → Steps → Expected result → Errors*
* **Concept**
  *What it is → When to use → How it works → Limits*
* **Reference**
  *Name → Purpose → Inputs → Defaults → Output → Notes*

**Best practices**

* One clear purpose per document.
* Put prerequisites, defaults, and constraints **before** instructions.
* Do not mix conceptual explanation with procedural steps.

---

## 2. Tone: Clear, Neutral, and Deterministic

**Principle:** Documentation describes system behavior, not opinions.

**Use**

* Active voice and imperative verbs.
* Precise, testable statements.
* Consistent terminology.

**Avoid**

* Marketing language or enthusiasm.
* Apologies and filler.
* Vague qualifiers unless uncertainty is real.

*Example:*

* Prefer: “Returns an error if authentication is missing.”
* Avoid: “This might cause issues if you’re not logged in.”

---

## 3. Formatting: Make Information Scannable

Formatting should signal *how* information is meant to be used.

**Conventions**

* **Headings:** actions or decisions (“Configure access”)
* **Paragraphs:** concepts only
* **Lists:** steps, options, conditions
* **Tables:** parameters, defaults, limits, comparisons
* **Code blocks:** minimal, correct, copy‑pasteable examples

**Discipline**

* Short paragraphs (≤4 lines).
* Parallel structure in lists.
* One idea per code example.

---

## 4. Clarity: Remove Assumptions

Assume no shared context, even for experienced users.

**Always state explicitly**

* Default values and units.
* Required order of operations.
* Permissions or environment requirements.
* Side effects.
* Exact failure conditions.

**Terminology rules**

* Define a term once.
* Use it consistently everywhere.
* One term per concept; avoid synonyms.
* Avoid ambiguous pronouns for system components.

---

## 5. Examples: Prevent Misuse

Examples exist to reduce risk.

**Good examples**

* Match documented defaults.
* Demonstrate a single behavior.
* Use realistic values.
* Show a common failure when recovery is non‑obvious.

If an example can be misunderstood, remove it.

---

## 6. Serving Developers and End Users Together

* Share conceptual explanations.
* Separate procedures by role.
* Cross‑link instead of duplicating content.

---

## 7. Maintain Accuracy

Concise documentation loses value quickly if it’s outdated.

* Version docs with releases.
* Clearly note behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate pages over many stale ones.

---

### Core Principle

**Documentation is a user interface.**
Design it to minimize uncertainty and enable correct action with the fewest necessary words.


## Technical Documentation: Concise *and* Informative

The goal is to **enable correct action quickly** while preserving accuracy and completeness for both developers and end users.

---

## 1. Structure: Optimize for Action

**Rule:** Organize by *what the reader needs to do next*.

**Use clear patterns**

* **Task docs:** Outcome → Prerequisites → Steps → Result → Errors
* **Concept docs:** Definition → When to use → How it behaves → Constraints
* **Reference docs:** Item → Purpose → Type → Default → Notes

**Best practices**

* One objective per document.
* Put prerequisites, defaults, and limits *before* instructions.
* Keep concepts and procedures in separate sections.

---

## 2. Tone: Precise and Neutral

**Rule:** Describe system behavior, not opinions.

**Do**

* Use active voice and imperatives.
* State outcomes and constraints explicitly.
* Be consistent with terminology.

**Avoid**

* Marketing language or storytelling.
* Apologies, filler, or vague qualifiers.
* Anthropomorphic phrasing (“the system tries to…”).

---

## 3. Formatting: Make Scanning Effective

Formatting should signal *how information is used*.

* **Headings:** actions or decisions (“Configure access control”)
* **Paragraphs:** short conceptual explanations
* **Lists:** steps, options, conditions
* **Tables:** parameters, defaults, limits, comparisons
* **Code blocks:** minimal, correct, copy‑pasteable examples

**Discipline**

* Short paragraphs (≤4 lines).
* Parallel grammar in lists.
* One idea per example.

---

## 4. Clarity: Remove Assumptions

Assume no shared context.

Always make explicit:

* Defaults (with units).
* Required order of operations.
* Permissions, environment, or state.
* Side effects.
* Exact failure conditions and meanings.

**Terminology**

* Define once; reuse verbatim.
* One term per concept.
* Avoid ambiguous pronouns for components.

---

## 5. Examples: Prevent Misuse

Examples exist to reduce risk.

**Good examples**

* Match documented defaults.
* Demonstrate a single behavior.
* Use realistic values.
* Include common failures when recovery isn’t obvious.

Remove examples that can mislead or overload.

---

## 6. Multiple Audiences, One Source of Truth

* Share conceptual explanations.
* Split procedures by role (developer, user, admin).
* Cross‑link instead of duplicating content.

---

## 7. Maintenance: Accuracy First

* Version docs with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate pages over broad coverage.

---

### Guiding Principle

**Documentation is a user interface.**
Design it to minimize uncertainty and enable correct action with the fewest necessary words.


## Writing Technical Documentation That Is Concise and Informative

*(Automation turn #6 — distilled, non‑repetitive guidance)*

This guidance focuses on **precision, scannability, and actionability** for mixed audiences (developers and end users) while minimizing cognitive load.

---

## 1. Structure: Optimize for Fast Action

**Goal:** Enable correct action with minimal reading.

**Design rules**

* One primary purpose per document.
* Order sections by *when the reader needs them*, not by importance.
* Separate **what something is** from **how to use it**.

**Effective layouts**

* **Task:** Outcome → Preconditions → Steps → Result → Errors
* **Concept:** Definition → Use cases → Behavior → Constraints
* **Reference:** Name → Purpose → Inputs → Defaults → Output → Notes

Place prerequisites, defaults, and limits *before* instructions.

---

## 2. Tone: Precise and Unemotional

**Principle:** Documentation describes system behavior, not intent or opinion.

* Use active voice and imperative verbs.
* State outcomes and constraints explicitly.
* Be consistent and literal with terminology.

**Avoid**

* Marketing language, reassurance, or storytelling
* Hedging (“might”, “could”) unless uncertainty is real
* Anthropomorphic phrasing

---

## 3. Formatting: Encode Meaning Visually

Formatting should communicate *how information is used* at a glance.

* **Headings:** actions or decisions
* **Paragraphs:** short concept explanations only
* **Lists:** steps, options, conditions
* **Tables:** parameters, defaults, limits, comparisons
* **Code blocks:** minimal, correct, copy‑pasteable examples

**Discipline**

* Short paragraphs (≤4 lines)
* Parallel grammar in lists
* One idea per example

---

## 4. Clarity: Eliminate Assumptions

Assume no shared context.

Always make explicit:

* Default values (with units)
* Required order of operations
* Permissions, environment, and state
* Side effects
* Exact failure conditions and meanings

Show errors *before* they occur, not after.

---

## 5. Examples: Reduce Risk

Examples exist to prevent misuse.

**Good examples**

* Match documented defaults
* Demonstrate one behavior only
* Use realistic values
* Include a common failure when recovery is non‑obvious

If an example can be misunderstood, remove it.

---

## 6. Serving Multiple Audiences Without Duplication

* Share conceptual explanations.
* Split procedural steps by role.
* Cross‑link instead of repeating content.

---

## 7. Maintenance: Accuracy Over Coverage

* Version documentation with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate documents over many stale ones.

---

### Core Principle

**Documentation is a control surface.**
Design it to minimize uncertainty, prevent misuse, and enable correct action with the fewest necessary words.


## Writing Technical Documentation That Is Concise and Informative

This guidance is optimized for **fast comprehension, low ambiguity, and correct execution** by both developers and end users.

---

## 1. Structure: Organize for Action

**Principle:** Documentation should answer *what to do next*.

**Use clear patterns**

* **Task / How‑to:** Outcome → Prerequisites → Steps → Result → Errors
* **Concept:** Definition → When to use → Behavior → Constraints
* **Reference:** Item → Purpose → Inputs → Defaults → Output → Notes

**Rules**

* One primary purpose per document.
* Put prerequisites, defaults, and limits **before** instructions.
* Do not mix explanation and step‑by‑step actions.

---

## 2. Tone: Precise and Neutral

**Principle:** Describe system behavior, not intent or opinion.

**Do**

* Use active voice and imperative verbs.
* State outcomes and constraints explicitly.
* Use consistent, literal terminology.

**Avoid**

* Marketing language or reassurance.
* Vague qualifiers unless uncertainty is real.
* Anthropomorphic phrasing.

---

## 3. Formatting: Make Scanning Effective

Formatting should communicate *how information is used*.

* **Headings:** actions or decisions
* **Paragraphs:** short conceptual explanations
* **Lists:** steps, options, conditions
* **Tables:** parameters, defaults, limits, comparisons
* **Code blocks:** minimal, correct, copy‑pasteable examples

**Discipline**

* Short paragraphs (≤4 lines).
* Parallel grammar in lists.
* One idea per example.

---

## 4. Clarity: Remove Assumptions

Assume no shared context.

Always make explicit:

* Default values (with units).
* Required order of operations.
* Permissions, environment, or state.
* Side effects.
* Exact failure conditions and meanings.

Define terms once and reuse them verbatim. Avoid pronouns for system components.

---

## 5. Examples: Prevent Misuse

Examples exist to reduce risk.

**Good examples**

* Match documented defaults.
* Demonstrate a single behavior.
* Use realistic values.
* Include a common failure when recovery is non‑obvious.

Remove examples that can be misunderstood.

---

## 6. Multiple Audiences, One Source of Truth

* Share conceptual explanations.
* Split procedural steps by role when needed.
* Cross‑link instead of duplicating content.

---

## 7. Maintenance: Accuracy First

* Version documentation with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate documents over many stale ones.

---

### Core Principle

**Documentation is a user interface.**
Optimize it for speed, predictability, and correctness—and remove anything that does not help the reader act.


## Writing Technical Documentation That Is Concise *and* Informative

This guidance emphasizes **speed to understanding**, **low ambiguity**, and **safe execution** for both developers and end users—without verbosity.

---

## 1. Structure: Organize by User Intent

**Design for the next action, not for reading order.**

**Use predictable document types**

* **Task / How‑to:** Goal → Preconditions → Steps → Result → Errors
* **Concept:** Definition → When to use → Behavior → Limits
* **Reference:** Name → Purpose → Inputs → Defaults → Output → Notes

**Structural rules**

* One purpose per page.
* Show prerequisites and defaults *before* steps.
* Keep explanations and procedures in separate sections.

---

## 2. Tone: Exact and Neutral

**Document behavior, not opinion.**

**Preferred**

* Active voice, imperative verbs.
* Literal, testable statements.
* Consistent terminology.

**Avoid**

* Marketing language or reassurance.
* Hedging unless uncertainty is real.
* Anthropomorphic phrasing (“the system tries…”).

---

## 3. Formatting: Make Scanning Sufficient

Formatting should communicate *how information is used*.

* **Headings:** actions or decisions.
* **Paragraphs:** short conceptual explanations only.
* **Lists:** steps, options, conditions.
* **Tables:** defaults, limits, comparisons.
* **Code blocks:** minimal, correct, copy‑pasteable examples.

**Formatting discipline**

* Short paragraphs (≤4 lines).
* Parallel grammar in lists.
* One idea per example.

---

## 4. Clarity: Remove Hidden Assumptions

Assume no shared context.

Always make explicit:

* Defaults (with units).
* Required order of operations.
* Permissions, environment, and state.
* Side effects.
* Exact failure conditions and meanings.

**Terminology**

* Define once; reuse verbatim.
* One term per concept.
* Avoid pronouns for system components.

---

## 5. Examples: Reduce Risk

Examples exist to prevent misuse.

**Effective examples**

* Match documented defaults.
* Demonstrate a single behavior.
* Use realistic values.
* Include a common failure when recovery is non‑obvious.

If an example could mislead, remove it.

---

## 6. Mixed Audiences, Single Source of Truth

* Share conceptual explanations.
* Split procedural steps by role when needed.
* Cross‑link instead of duplicating content.

---

## 7. Maintenance: Accuracy Over Coverage

* Version docs with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate pages over many stale ones.

---

### Core Principle

**Documentation is a user interface.**
Optimize it for speed, predictability, and correctness—and remove anything that does not help the reader act.


## Concise, Informative Technical Documentation — Practical Guidance

Designed for **fast comprehension, low ambiguity, and correct execution** by both developers and end users.

---

### 1) Structure: Make the Next Action Obvious

**Organize by intent, not narrative.**

* **Task / How‑to:** Goal → Preconditions → Steps → Result → Errors
* **Concept:** Definition → When to use → Behavior → Constraints
* **Reference:** Item → Purpose → Inputs → Defaults → Output → Notes

**Rules**

* One purpose per document.
* Put prerequisites, defaults, and limits *before* steps.
* Separate explanation from execution.

---

### 2) Tone: Deterministic and Neutral

**Describe behavior, not opinion.**

* Use active voice and imperatives.
* State outcomes and constraints precisely.
* Keep terminology literal and consistent.

**Avoid**

* Marketing language or reassurance.
* Hedging unless uncertainty is real.
* Anthropomorphism (“the system tries…”).

---

### 3) Formatting: Encode Meaning Visually

Formatting should tell readers *how to use* the content.

* **Headings:** actions or decisions.
* **Paragraphs:** short concept blocks only.
* **Lists:** steps, options, conditions.
* **Tables:** parameters, defaults, limits, comparisons.
* **Code blocks:** minimal, correct, copy‑pasteable.

**Discipline**

* Short paragraphs (≤4 lines).
* Parallel grammar in lists.
* One idea per example.

---

### 4) Clarity: Eliminate Assumptions

Assume no shared context.

Always make explicit:

* Defaults (with units).
* Required order of operations.
* Permissions, environment, and state.
* Side effects.
* Exact failure conditions and meanings.

Define terms once; reuse verbatim. Avoid pronouns for system components.

---

### 5) Examples: Reduce Risk

Examples exist to prevent misuse.

* Match documented defaults.
* Demonstrate a single behavior.
* Use realistic values.
* Show a common failure when recovery isn’t obvious.

Remove examples that could mislead.

---

### 6) Multiple Audiences, One Source of Truth

* Share concepts centrally.
* Split procedures by role.
* Cross‑link instead of duplicating text.

---

### 7) Maintenance: Accuracy Over Coverage

* Version with releases.
* Clearly mark behavior changes.
* Remove deprecated paths promptly.
* Prefer fewer accurate pages to many stale ones.

---

**Principle:** Documentation is a user interface. Optimize for speed, predictability, and correctness—then remove anything that doesn’t help the reader act.
