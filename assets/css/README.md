# CSS Architecture

## Purpose

Controls all layout, visual state, responsiveness, and accessibility behavior —
no classes, no IDs, no inline styles.

## Strategy

CSS is organized using `@layer`:

- `reset` — Normalize browser defaults
- `layout` — Grid system and containers
- `typography` — Element styling (`h1`, `p`, etc.)
- `heuristics` — Visual logic (`:has()`, `:empty`)
- `diagnostics` — Optional dev overlays

## Visibility Logic

- `:has()` + `[hidden]` manage visibility
- `:empty` hides empty tags
- No class toggling or JS-controlled `style.display`

## Layout

- Holy Grail layout with scrollable `<section>`
- All parents have `overflow: hidden` to contain scroll
- Responsive by default (no media queries unless needed)

## Purpose

This directory contains all global and scoped CSS styles used in the D7460N
architecture. All styling enforces layout, visibility, interactivity, spacing,
and heuristics **without using classes, IDs, or inline styles**.

**HTML** = Structure<br>

**CSS** = UI logic<br>

**JS** = Data transmission, API, and fetch calls.

## Style Architecture

Styles are separated using
[@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer):

- `@layer reset` → Normalization and box-sizing
- `@layer layout` → Grid, Holy Grail, scroll containment
- `@layer typography` → Semantic element presentation
- `@layer heuristics` → UI feedback, state changes (`:has()`, `:checked`,
  `:empty`)
- `@layer diagnostics` → Optional CSS overlay for layout/accessibility testing

## Visibility & UI Heuristics

All UI states are handled using CSS selectors. Examples:

- `:has()` is used to show/hide panels based on checked radios or DOM content
- `[hidden]`, `:empty`, and `[aria-expanded]` are used to control visibility
- Forms rely on `:valid`, `:invalid`, and `form:has(:invalid)` for validation
  display logic

## Scroll Behavior

Only the `<section>` element may scroll, unless explicitly justified. All
ancestors must have `overflow: hidden;` to enforce clean containment and
responsive scroll performance.

## Spacing Rules

- Margins and padding are only applied to content-carrying elements like
  `<h1>`-`<h6>`, `<p>`, and custom tags like `<item-name>`
- Containers (e.g., `<article>`, `<section>`) do **not** carry spacing rules
- This supports layout flexibility and consistent inheritance

## Accessibility Styling

- Focus states must be clearly visible without relying on outline alone
- Contrast ratios are WCAG 2.1 AA compliant (see `/a11y/readme.md` if
  applicable)

## Related Docs

- `/layout/readme.md`: structural enforcement
- `/components/readme.md`: tag semantics
- `d7460n-dev-guide/forms.md`: validation logic

## Todo

- add item JS/data logic
- delete item JS/data logic
- edit item JS/data logic

## Static Layout Elements

> Order of appearance

| HTMLElement            | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| `<app-container>`      | Single root application wrapper pushes application to top and bottom of viewport |
| `<app-banner>`         | Multi-purpose                                                                    |
| `<header>`             | Stays at the top of the viewport                                                 |
| `<app-logo>`           | Application logo                                                                 |
| `<app-user>`           | User menu                                                                        |
| `<nav>`                | Page navigation                                                                  |
| `<main>`               | Main relevant focussable content                                                 |
| `<article>`            | main content area hidden by default until the `<h1>` has content in it           |
| `<h1>`-`<h6>`          | Headings for semantic structure                                                  |
| `<p>`                  | Paragraphs for text content hidden by default until content appear in it         |
| `<ul>`                 | Table header and table body                                                      |
| `<li>`                 | Table header and body columns                                                    |
| `<custom-elements>`    | Dynamically generated from each API endpoint key and value                       |
| `<aside>`              | Details of whatever content is in `<main>`                                       |
| `<form>`               | Wrapper for form button and input controls                                       |
| `<fieldset>`           | Wrapper for input controls that is scrollable                                    |
| `<custom-form-inputs>` | Dynamically generated from each API endpoint key and value                       |
| `<footer>`             | Stays at the bottom of the viewport                                              |
| `<powered-by>`         | Powered by Author                                                                |
| `<app-version>`        | Umm... errr... the app version                                                   |
| `<app-banner>`         | Multi-purpose                                                                    |

<br>

---

### HTML TEMPLATE

```html
<html lang="en-us">
  <head>
    <title>D7460N UI</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <app-container>
      <app-banner aria-live="polite" role="status">
        <p></p>
      </app-banner>

      <header>
        <app-logo title="Application logo"></app-logo>
        <app-user title="User menu"></app-user>
      </header>

      <nav aria-label="Main navigation">
        <details>
          <summary>
            <h2>Navigation Menu 1</h2>
          </summary>
          <section>
            <label>
              text of first navigation label
              <input type="checkbox" checked />
            </label>
          </section>
        </details>
        <details>
          <summary>
            <h2>Navigation Menu 2</h2>
          </summary>
          <section></section>
        </details>
      </nav>

      <main>
        <article aria-labelledby="page-title">
          <h1 id="page-title"></h1>
          <p></p>
          <button type="button">New</button>
          <hr />
          <search>
            <input type="search" placeholder="Search..." />
          </search>
          <ul role="list" aria-label="Data table"></ul>
        </article>
      </main>

      <aside aria-labelledby="details-title">
        <h2 id="details-title">Details</h2>
        <button type="button" title="Close details panel">✖</button>
        <form>
          <fieldset>
            <legend>Editable Fields</legend>
          </fieldset>
          <button type="reset">Reset</button>
          <button type="submit">Save</button>
        </form>
      </aside>

      <footer>
        <powered-by title="Powered by information"></powered-by>
        <app-version title="Application version"></app-version>
      </footer>

      <app-banner aria-live="polite" role="status">
        <p></p>
      </app-banner>
    </app-container>
  </body>
</html>
```

<br>

---

<br>

## HOLY GRAIL LAYOUT

- Minimally nested layout

```txt

                                                                    : <app-container>                                           : <viewport>
                                                                 ___: - - - - -                                              ___: - - - - -
                                                                /   : Pushes header and footer                              /   : Overflow hidden
                                                               /      to top and bottom of viewport                        /
 _____________________________________________________________/__________________________________________________________ /
|                                                    <app-containter>                                                    |
| ______________________________________________________________________________________________________________________ |
||                                                     <app-banner>                                                     ||
||______________________________________________________________________________________________________________________||
||                                                                                                                      ||      : <aside>
|| <app-logo>                                            <header>                                      [ / ] <app-user> ||   ___: - - - -
||______________________________________________________________________________________________________________________||  /   : Content
||             <nav>             |                        <main>                        |            <aside>      [ X ] || /    : aware.
|| _____________________________ | ____________________________________________________ | <h2></h2>                     ||/     : - - - -
|||          <details>          |||                      <article>                     || _____________________________ ||      : Opens when
|||                             |||  <h1></h1>                                <search> |||           <form>            |||      : data is
||| <summary></summary>      V  |||                               <button>new</button> ||| ___________________________ |||      : present.
|||                             |||  <h2></h2>                                         ||||        <fieldset>         ||||
||| <label><input></label>      |||                                                    ||||                           ||||
||| <label><input></label>      |||  <p></p>                                           |||| <h2></h2>                 ||||      : <fieldset>
|||_____________________________|||                                                    ||||                           ||||   ___: - - - -
|| _____________________________ || __________________________________________________ |||| <label><input></label>    ||||  /   : Scrollable
|||          <details>          |||| <ul>                                             ||||| <label><input></label>    |||| /
|||                             ||||   <li></li>                                      ||||| <label><input></label>    ||||/
||| <summary></summary>      V  ||||   <li></li>                                      ||||| <label><input></label>    ||||
||| ___________________________ ||||   <li></li>                                      ||||| <label><input></label>    ||||
||||         <section>         |||||   <li></li>                                      ||||| <label><input></label>    ||||
||||                           |||||   <li></li>               Scrollable <ul> :____  ||||| <label><input></label>    ||||
||||<label><input></label>     ||||| <ul>                                           \ ||||| <label><input></label>    ||||
||||<label><input></label>     |||||_________________________________________________\||||| <label><input></label>    ||||
||||<label><input></label>     ||||                                                    ||||                           ||||
||||<label><input></label>     ||||                   Resize horizontal <aside> :____  |||| <button></button>         ||||
||||<label><input></label>     ||||                                                  \ |||| <button></button>         ||||
||||___________________________||||___________________________________________________\||||___________________________||||
|||_____________________________|||____________________________________________________|||_____________________________|||
||_______________________________|______________________________________________________|_______________________________||
||                                                                                                                      ||
|| <powered-by>                                          <footer>                                         <app-version> ||
||______________________________________________________________________________________________________________________||
||                                                     <app-banner>                                                     ||
||______________________________________________________________________________________________________________________||
|                                                     <app-container>                                                    |
|________________________________________________________________________________________________________________________|
                                                             \
                                                              \    : <footer>
                                                               \___: - - - -
                                                                   : Sticks to bottom of view port


```

<br>

## SMALL SCREEN LAYOUT

```txt

 __________________________________________________
|                   <app-banner>                   |
|__________________________________________________|      : <nav>
|                                                  |   ___: - - - -
| <app-logo>                            <app-user> |  /   : Toggleable menu
|__________________________________________________| /
|                      <nav>                       |/
|__________________________________________________|
|                      <main>                      |      : <fieldset>
|                                                  |   ___: - - - -
|                                                  |  /   : Scrollable
|                                                  | /
|                                                  |/
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|                                                  |
|__________________________________________________|
|                    <footer>                      |
| <powered-by>                      <app-version>  |
|__________________________________________________|
|                   <app-banner>                   |
|__________________________________________________|
```
