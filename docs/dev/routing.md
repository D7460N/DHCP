# D7460N Developer Guide: Routing

## Goal

Navigation in D7460N is handled using native HTML inputs (`<input type="radio">`) and CSS `:has()` logic. This enables view switching in a Single Page App without JavaScript or hash/URL routing.

---

## Pattern

```html
<nav>
  <details open>
    <summary>Tabs</summary>
    <label><input type="radio" name="nav" checked>Manage</label>
    <label><input type="radio" name="nav">FAQs</label>
  </details>
</nav>

<main>
  <article>...</article>
  <article hidden>...</article>
</main>
```

## Visibility Logic (CSS Only)

```css
main article {
  display: none;
}
nav:has(input:nth-of-type(1):checked) ~ main article:nth-of-type(1) {
  display: block;
}
nav:has(input:nth-of-type(2):checked) ~ main article:nth-of-type(2) {
  display: block;
}
```

- The `:has()` selector observes which radio input is checked
- It then reveals the corresponding article in `<main>`
- No JavaScript is used to toggle views

## Notes

- Articles must match the order of radio inputs
- This model supports true SPA tab behavior
- Works with screen readers (no JS required)

## Related
- `layout.md` - layout regions and structure
- `styles/readme.md` - `:has()` logic and visibility rules
