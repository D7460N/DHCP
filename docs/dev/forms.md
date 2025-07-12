# Developer Guide: Forms

## Form Structure

All forms live inside a `<section>` element, scoped within `<article>` under
`<main>`.

```html
<main>
  <article>
    <section>
      <form>
        <fieldset>
          <legend></legend>
          <label>
            <input />
          </label>
        </fieldset>
      </form>
    </section>
  </article>
</main>
```

## Validation Behavior (CSS Only)

- Native browser validation is required (`required`, `pattern`, etc.)
- No JavaScript used to control or override validation logic
- Feedback states controlled using:

```css
form:has(:invalid) button[type='submit'] {
  opacity: 0.5;
  pointer-events: none;
}
form:has(:valid) button[type='submit'] {
  opacity: 1;
  pointer-events: auto;
}
```

## Accessibility Checklist

- Each input **must** be labeled
- Inputs in groups must use `<fieldset>` and `<legend>`
- Help text should be linked via `aria-describedby`
- Use input `type` attributes for constraint enforcement (e.g., `type="email"`,
  `type="number"`)

## Feedback Strategy

- Success and error messages are toggled using `:has()` and DOM state only
- Error messages should live next to inputs with `[aria-live="polite"]`
- Do not inject or toggle messages via script

## Example

```html
<form>
  <fieldset>
    <legend>Assign IP</legend>
    <label>
      IP Address:
      <input type="text" required pattern="\d+\.\d+\.\d+\.\d+" />
    </label>
    <p id="ipHelp" aria-live="polite">Must be a valid IPv4 address.</p>
  </fieldset>
  <button type="submit">Assign</button>
</form>
```

## Related

- `/forms/readme.md`
- `styles/readme.md` - validation and focus styling
- `layout.md` - how forms fit in the visual hierarchy
