# Developer Guide: Layout

## Holy Grail Grid (Full-Bleed - Edge to Edge)

Starts with a single root wrapper:

```html
<app-container>

```

This container is styled with:

```css
display: grid;
grid-template-columns: auto 1fr auto;
height: 100dvh;
overflow: hidden;
```

### Region Structure

```html
<app-container>
  <header>
  <nav>
  <main>
    <article>
  <aside>
  <footer>
```

- **Header**: banner, branding, UI controls, account name
- **Nav**: radio-input-based navigation tabs
- **Main**: central scrollable content
- **Aside**: CSS-toggled detail panel
- **Footer**: version, copyright, social

## Scroll Containment

- Only the parent of the list scrolls: `<ul>` inside `<fieldset>`
- All ancestor containers must use `overflow: hidden`
- Scrollbar styling is scoped

## Minimally Nested DOM

- Performant
- Avoid semantically meaningless wrappers such as `<div>`s or `<spans>`
- Use semantic tags only
- Minimize conditionals with long paths to avoid brittleness. (e.g. for `:has()`)

## Intrinsic Layout

- Padding and margin are on data elements (e.g. `<label>`, `<p>`, `<h2>`) not on containers
- Layout resizes based on content; no fixed heights or widths (except `app-container`)
- Allow the browser to do all the work
- Scroll logic is never scripted
