# Copilot Instructions

## 🎯 Quick Context

**READ `docs/PROJECT-STATE.md` FIRST** for complete project understanding and current status.

This is a **zero-dependency DHCP management portal** using D7460N architecture - a sophisticated CSS-first system where UI logic lives entirely in CSS, not JavaScript.

## 🚨 Critical Architecture Warnings

**NEVER "FIX" THE CSS-FIRST PATTERN!** The sophisticated hidden checkbox state management using `<label role="button"><input type="checkbox"></label>` is **intentional**. This provides:
- Performance: CSS rendering 100-1000x faster than JavaScript DOM manipulation
- Security: Minimal JavaScript surface reduces XSS attack vectors
- Accessibility: Native keyboard navigation and ARIA compliance
- Progressive enhancement: Fully functional without JavaScript

## Core Architecture

**Strict separation of concerns:**

1. **HTML**: Semantic structure only, pre-delivered. No classes, IDs, or data-* attributes. Use `<label role="button"><input type="checkbox" /></label>` for interactive buttons.

2. **CSS**: ALL UI logic via `:has()`, `:checked`, container queries. State management through hidden checkboxes. CSS variables in `assets/css/themes.css`.

3. **JavaScript**: Data layer ONLY. Fetch from `API_URL` (MockAPI), inject into DOM, manage form state via `dataset.dirty`. Use `oninput`/`onchange`, never `addEventListener`.

## Key Patterns

### CSS-First State Machine
```html
<label role="button" aria-label="Save">Save<input type="checkbox" /></label>
```
```css
form:has([data-dirty="true"]):valid::after { content: '✓ Ready to submit'; }
```

### Modular JavaScript Structure
- `config.js`: API endpoints, feature flags, constants
- `forms.js`: Form CRUD operations, button state management
- `inject.js`: DOM injection utilities (`createInputFromKey`, `mirrorToSelectedRow`)
- `utils.js`: DOM utilities (`clearFieldset`, `isFormValid`, `snapshotForm`)
- `schema.js`: Data normalization between API and internal structure
- `fetch.js`: HTTP operations using native Fetch API

### Data Flow
1. User interacts → CSS state change via `:checked`
2. JavaScript detects via `form.oninput` → updates `form.dataset.dirty`
3. Fetch JSON from external API → normalize via `schema.js`
4. Inject into semantic HTML → CSS handles visibility/styling

## File Organization

**CSS Load Order** (critical for cascade):
`loading.css` → `themes.css` → `layout.css` → `forms.css` → `typography.css`

**Key Directories**:
- `assets/css/`: Modular CSS (layout, forms, themes, a11y)
- `assets/js/`: ES6 modules (no build step required)
- `data/`: Local JSON for development (not used in production)

## Development Workflow

**No build tools**: Run directly in browser via `file://` or local server. External API at `https://67d944ca00348dd3e2aa65f4.mockapi.io/`

**Form Button Pattern**: Use `aria-label` selectors (e.g., `form.querySelector('[aria-label="Save"]')`) not `name` attributes.

**Debugging**: Check `form.dataset.dirty`, `CONFIRM_FLAGS` state, and CSS `:has()` selector support.

## Output Format

- Separate fenced code blocks: ` ```css name=filename.css`
- No explanations unless requested
- Follow existing patterns in target files
- Extend `components/list.html` for new list variants

## References

- [Modern CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [WHATWG HTML](https://html.spec.whatwg.org/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
