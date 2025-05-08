# /css/README.md

## Purpose

This directory contains all global and scoped CSS styles used in the D7460N architecture. All styling enforces layout, visibility, interactivity, spacing, and heuristics **without using classes, IDs, or inline styles**.

**HTML** = Structure<br>

**CSS** = UI logic<br>

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

- Margins and padding are only applied to content-carrying elements like `<h1>`-`<h6>`, `<p>`, and custom tags like `<item-name>`
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

## Single Page Application (SPA)

`<header>` = sticks to the top of the viewport<br>
`<nav>` = page navigation<br>
`<article>` = main content area<br>
`<app-logo>` = logo<br>
`<user-name>` = user name<br>
`<app-version>` = app version<br>
`<powered-by>` = powered by D7460N<br>
`<app-container>` = root wrapper for the app<br>
`<app-item>` = custom element for item data binding<br>
`<item-name>` = custom element for item name binding<br>
`<form>` = form element for data entry<br>
`<fieldset>` = fieldset for grouping form elements<br>
`<label>` = label for form elements<br>
`<input>` = input element for data entry<br>
`<details>` = details element for expandable content<br>
`<summary>` = summary element for details<br>
`<h1>`-`<h6>` = headings for semantic structure<br>
`<p>` = paragraph for text content<br>
`<nav>` = navigation element for links<br>
`<main>` = Main relevant focussable content<br>
`<aside>` = details of whatever content is in `<main>`<br>
`<section>` = scrollable<br>
`<footer>` = sticks to the bottom of the viewport

### HOLY GRAIL LAYOUT

```txt

                                                                : <header>                                                : <viewport>
                                                             ___: - - - - -                                            ___: - - - - -
                                                            /   : Sticks to top of viewport                           /   : No scrollbar
                                                           /                                                         /
 _________________________________________________________/________________________________________________________ /
|                                                                                                                  |      : <aside>
| <app-logo>                                        <header>                                           <user-name> |   ___: - - - -
|__________________________________________________________________________________________________________________|  /   : Content
|           <nav>           |                        <main>                        |            <aside>            | /    : aware.
|  <h2></h2>                | ____________________________________________________ | <h2></h2>                     |/     : - - - -
|  <label><input></label>   ||                      <article>                     ||                               |      : Opens when
|  <label><input></label>   ||  <h1></h1>                                         || <form>                        |      : data is
|                           || __________________________________________________ || _____________________________ |      : present.
|  <h2></h2>                |||                     <section>                    ||||          <section>          ||
| _________________________ ||| <h2></h2>                                        ||||                             ||
||        <section>        ||||                                                  ||||  <fieldset>                 ||      : <section>
||                         |||| <p></p>                                          ||||    <label><input></label>   ||   ___: - - - -
|| <label><input></label>  ||||                                                  ||||  </fieldset>                ||  /   : Scrollable
|| <label><input></label>  ||||                                                  ||||                             || /
|| <label><input></label>  ||||                                                  ||||  <fieldset>                 ||/
|| <label><input></label>  ||||                                                  ||||    <label><input></label>   ||
|| <label><input></label>  ||||                                                  ||||                             ||
|| <label><input></label>  ||||                                                  ||||  <fieldset>                 ||
|| <label><input></label>  ||||                                                  ||||    <label><input></label>   ||
||                         ||||                                                  ||||  </fieldset>                ||
||                         ||||                                                  ||||                             ||
||                         ||||                Horizontal resize <aside> :____   ||||  <fieldset>                 ||
||                         ||||                                               \  ||||    <label><input></label>   ||
||                         ||||                                                \ ||||  </fieldset>                ||
||                         ||||_________________________________________________\||||_____________________________||
||_________________________|||____________________________________________________|| </form>                       |
|__ ________________________|______________________________________________________|_______________________________|
|                                                                                                                  |
| <powered-by>                                      <footer>                                         <app-version> |
|__________________________________________________________________________________________________________________|
                                                         \
                                                          \    : <footer>
                                                           \___: - - - -
                                                               : Sticks to bottom of view port


```
