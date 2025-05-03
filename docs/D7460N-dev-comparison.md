# D7460N Developer Guide: Framework Comparison

This section provides direct, factual comparisons between common front-end framework implementations and equivalent D7460N patterns. The goal is to show functional parity using only browser-native features — no build tools, no abstractions.

---

## Routing (Tab Views)

### In React

```jsx
const [tab, setTab] = useState('view1');
return (
  <>
    <button onClick={() => setTab('view1')}>View 1</button>
    <button onClick={() => setTab('view2')}>View 2</button>
    {tab === 'view1' && <View1 />}
    {tab === 'view2' && <View2 />}
  </>
);
```

### In D7460N

```html
<nav>
  <label><input type="radio" name="nav" checked>View 1</label>
  <label><input type="radio" name="nav">View 2</label>
</nav>
<main>
  <article>...</article>
  <article hidden>...</article>
</main>

```

```css
nav:has(input:nth-of-type(1):checked) ~ main article:nth-of-type(1) {
  display: block;
}
```

---

## Form Validation

### In Vue

```html
<input v-model="email" :class="{ error: !validEmail }">
<p v-if="!validEmail">Invalid email</p>
```

### In D7460N

```html
<form>
  <label>Email:
    <input type="email" required>
  </label>
  <p aria-live="polite">Must be a valid email.</p>
</form>

```

```css
form:has(:invalid) p {
  display: block;
}
```

---

## Detail Toggle

### In Angular

```html
<div *ngIf="showDetail">...</div>
```

### In D7460N

```html
<aside hidden>
  <section><div></div></section>
</aside>
```

```css
aside:has(section:has(div:not(:empty))) {
  display: block;
}
```

---

## Summary

| Feature        | React/Vue/Angular            | D7460N                            |
|----------------|-------------------------------|----------------------------------|
| Routing        | useState, ngIf, router       | radio + `:has()`                |
| Validation     | JS state + watchers          | native HTML + `:has()`          |
| Visibility     | Conditional rendering        | DOM presence + `:empty`, `:has()` |
| Layout         | JSX templating, div nesting  | Semantic HTML, Holy Grail Grid  |
| Scroll control | JS scroll mgmt               | `overflow: auto/hidden` only    |

No build steps. No abstractions. Just the platform.

---

## Related Docs

- `routing.md`
- `forms.md`
- `layout.md`
- `performance.md`
