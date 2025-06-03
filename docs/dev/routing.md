# Developer Guide: Routing

## Goal

Navigation is handled using native HTML inputs (`<input type="radio">`) and CSS `:has()` logic. This enables view switching in a Single Page App without JavaScript or hash/URL routing.

`#`hash rounting is a native browser feature for "deep linking" or "within document linking".<br>
[HTML Deep Linking: A Comprehensive Guide](https://www.byteplus.com/en/topic/496693?title=html-deep-link-a-comprehensive-guide)

---

## Navigation Pattern

```html
<nav>
  <details open>
    <summary>Scope</summary>
    <label><input type="radio" name="nav" checked>Manage</label>
    <label><input type="radio" name="nav">FAQs</label>
  </details>
  <details open>
    <summary>Admin</summary>
    <label><input type="radio" name="nav" checked>API Registration</label>
    <label><input type="radio" name="nav">Audit</label>
  </details>
</nav>

<main>
  <article>...</article>
  <aside hidden>...</aside>
</main>
```

## Data Logic (JS Only)

Page init `oninput` fetches and dynamically generates `<label>`s for each key and injects them with radio `<input>`s and the `value` for each `<label>`.

Example:
```html
<label>   <-- JSON key
  Manage  <-- JSON value
  <input type="radio" name="nav" checked>
</label>
```


## Visibility Logic (CSS Only)

- CSS is presetup to watch for this HTML pattern and use the `<label>` `oninput` event to fectch page content.
- When certain elements are populated with content, their parent wrapper element is rendered.

```css
article {
  display: none;      <-- Hidden by default

  &:has(h1:not(:empty)) {
    display: grid;    <-- Show when not empty
  }
}
```

- The `:has()` selector observes which radio input is checked
- It then reveals the corresponding article in `<main>`
- No JavaScript is used to toggle views

## Loading State

- Allows for a natural `loading data` state between when the data is fetched (user initiated `oninput` event), and when the data arives in the targeted DOM element.
- CSS shows a loading indicator between two booleans states.

```css
       ___Loading element
      |
      v
loading-data {
  display: none;
}           ^
            |
            Hidden by default


 
 If this is true      AND...          this is true...
      |                |                |
      v                v                v
nav:has(input:checked) ~ loading-data:has(+ main article h1:empty) {
  display: block;               ^
}            ^                  |
             |                  |
      Then show...         ...this.
```

- This same hide/show pattern is used repeatedly for almost everything
- This model adhears to Single Page Application (SPA) tab behavior
- Works with screen readers
- No JS required

## Related
- `layout.md` - layout regions and structure
- `styles/readme.md` - `:has()` logic and visibility rules
