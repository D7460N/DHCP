# D7460N Developer Guide: Accessibility

## Design Assumptions

All interfaces must meet or exceed [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) and [Section 508](https://www.section508.gov/) without JavaScript. Accessibility is handled using semantic HTML and CSS only.

---

## Key Patterns

### 1. Native Form Validation

- Use `required`, `pattern`, and `type` attributes
- Submit buttons are enabled via CSS `form:has(:valid)`
- Error messaging tied with `aria-describedby`

### 2. Semantic Grouping

- Group fields using `<fieldset>` + `<legend>`
- Use proper heading levels (`<h1>` to `<h6>`) without skipping
- List content should use `<ul>`/`<li>`, not `<div>`s

### 3. Keyboard Navigation

- All elements must be tabbable
- Use radio inputs and native focus behavior
- Avoid tabindex unless correcting broken flow

### 4. ARIA Labeling (Only When Needed)

- Use `aria-label` for custom elements like `<app-user>`
- Use `role="navigation"`, `role="main"`, `role="complementary"` where applicable
- Avoid overuse — native semantics are preferred

---

## Color Contrast

- Text and interactive elements must meet AA minimums:
  - 4.5:1 for normal text
  - 3:1 for large text (18pt+ or bold 14pt+)
- Use modern CSS contrast-checking tools for theme variations

---

## Visibility State (No JS)

Use `:has()`, `[hidden]`, `:empty`, and `aria-expanded` to manage visibility:

```css
aside {
  display: none;
}
main:has(
    aside
      section:has(
        div:not(
            :empty
          )
      )
  )
  aside {
  display: block;
}
```

This allows screen readers to perceive the DOM state naturally without needing JavaScript-driven toggles.

---

## Related

- `forms.md` – native form accessibility
- `styles/readme.md` – contrast, focus, visibility
- `layout.md` – landmark regions and DOM structure
