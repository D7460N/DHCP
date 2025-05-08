# D7460N Developer Guide: Layout

## Holy Grail Grid (Full-Bleed)

All D7460N apps begin with a single root wrapper:

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
      <section>
    </article>
  <aside>
  <footer>
```

- **Header**: branding, account switcher
- **Nav**: radio-based navigation tabs
- **Main**: the central scrollable content
- **Aside**: CSS-toggled detail panel
- **Footer**: version, copyright

## Scroll Containment Rules

- Only one element scrolls: `<section>` inside `<article>`
- All parent containers must use `overflow: hidden`
- Scrollbar styling is optional but scoped

## Flat DOM Required

- Avoid wrapper `<div>`s
- Use semantic tags only
- Minimize depth to ensure clean selector logic (e.g. for `:has()`)

## Intrinsic Layout Enforcement

- Padding and margin go on the data element (e.g. `<p>`, `<h2>`) not on containers
- Layout resizes based on content; no fixed heights (except `app-container`)
- Scroll logic is never scripted

## Related

- `/layout/README.md`
- `styles/readme.md`
- `forms.md` - how forms fit into layout
