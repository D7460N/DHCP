# Copilot Instructions

## 🎯 Quick Context

**READ `docs/PROJECT-STATE.md` FIRST** for complete project understanding and
current status.

This is a **zero-dependency DHCP management portal** using D7460N architecture -
a sophisticated, JAMStack, declarative, CSS-first system where UI logic lives **entirely in modern CSS**, _not
JavaScript_.

## 🚨 Critical Architecture Warnings

**NEVER "FIX" THE JAMSTACK DECLARATIVE CSS-FIRST PATTERN!**<br>
The sophisticated hidden checkbox state management using `<label role="button"><input type="checkbox"></label>` is **by design** and is
**intentional**. 

This provides:

- **Performance**: CSS rendering 100-1000x faster than JavaScript DOM manipulation
- **Security**: Minimal JavaScript surface reduces XSS attack vectors
- **Accessibility**: Native keyboard navigation, ARIA, and Section 508 compliance - templated and out of the box
- **Strict Separation of Concerns**:  GUI logic (modern CSS only) and data delivery (JS) allows for new, more efficient possibilities, fewer dependencies, and more defined development swim-lanes
- **Progressive enhancement**: Fully functional without JavaScript

## Core Architecture

**STRICT SEPARATION OF CONCERNS:**

1. **HTML**: Semantic structure only, pre-delivered. No classes, IDs, or data-\*
   attributes (except `form.dataset.dirty` for state). Use `<label role="button"><input type="checkbox" /></label>` for
   interactive buttons.

2. **CSS**: Each CSS file is purposely writtin generically as seperate and independent drop-in plug-n-play CSS modules. Thus do not use nor depend on classes, ID's or `data-*` attributes for selectors. They depend solely on standard 508 compliant semantic mark-up anchors and or combinations with other available user-agent and OS conditions and variables. Nothing else, EVER! This allows the CSS to work independent of data source and or framework or CMS being used.
  - There is NEVER any inline CSS.
  - All CSS is vanilla ONLY (zero dependencies).
  - ALL UI logic via `:has()`, `:checked`, `:empty`, container/style queries.
  - State management (including data loading, success, and error states) is through a combination of user initiated interactions with hidden checkboxes, conditional element visibility is through a combination of CSS conditionals and CSS variables in `assets/css/layout.css`, `assets/css/themes.css` and others CSS files and system environmental factors.
  - JavaScript is reserved for and restrict to data delivery for CRUD operations **ONLY**!

3. **JavaScript**: Just like the CSS, each JavaScript file is purposely written generically as seperate and independent drop-in plung-n-play modules.
  - There is NEVER any JavaScript inline.
  - All JavaScript is vanilla ONLY (zero dependencies),
  - Data layer ONLY.
  - Fetch from `API_URL` (MockAPI), inject into DOM.
  - User initiated data change states in forms are managed and maintain  via `dataset.dirty`.
  - Fetching and or calling data is done strictly via `oninput` and / or `onchange`. _**NEVER use**_ **`onclick`!** This allows data to be initially loaded into the app without requireing user interaction.

THIS IS A VERY IMPORTANT NUANCE TO COMMIT TO MEMORY!
  - Clicking on a button (the button is really a hidden checkbox label with the role of button) does nothing!
  - **The action and trigger is the `oninput` and / or `onchange` that comes after the user clicks the button that calls the data.**

> _**NEVER use `addEventListener` or `eventListener` of any kind at any time for any reason!
> Doing so reduces performance and increases maintenance of the overall page.**_


## Key Patterns

### CSS-FIRST STATE MACHINE

```html
<label role="button" aria-label="Save">Save<input type="checkbox" /></label>
```

```css
/*
TODO: Needs changing to conform to JAMStack declarative pattern
- JS is needed only for `undo` and clean state restoration. 
- The rest can be done with hiding/showing pure CSS conditionals.
*/
form:has([data-dirty='true']):valid::after {
  content: '✓ Ready to submit';
}
```

### Modular JavaScript Structure

- `config.js`: API endpoints, feature flags, constants
- `forms.js`: Form CRUD operations, button state management
- `inject.js`: DOM injection utilities (`createInputFromKey`,
  `mirrorToSelectedRow`)
- `utils.js`: DOM utilities (`clearFieldset`, `isFormValid`, `snapshotForm`)
- `schema.js`: Data normalization between API and internal structure
- `fetch.js`: HTTP operations using native Fetch API

### Data Flow

1. User interacts → CSS state change via `:checked`
2. JavaScript detects via `form.oninput` → updates `form.dataset.dirty`
3. Fetch JSON from external API → normalize via `schema.js`
4. Inject into semantic HTML → CSS handles visibility/styling

## File Organization

**CSS Load Order** (critical for cascade): `loading.css` → `themes.css` →
`layout.css` → `forms.css` → `typography.css`

**Key Directories**:

- `assets/css/`: Modular CSS (layout, forms, themes, a11y)
- `assets/js/`: ES6 modules (no build step required)
- `data/`: Local JSON for development (not used in production)

## Development Workflow

**No build tools**: Run directly in browser via `file://` or local server.
External API at `https://67d944ca00348dd3e2aa65f4.mockapi.io/`

**Form Button Pattern**: Use `aria-label` selectors (e.g.,
`form.querySelector('[aria-label="Save"]')`) not `name` attributes.

**Debugging**: Check `form.dataset.dirty`, `CONFIRM_FLAGS` state, and CSS
`:has()` selector support.

## Output Format

- Separate fenced code blocks: ` ```css name=filename.css`
- No explanations unless requested
- Follow existing patterns in target files
- Extend `components/list.html` for new list variants

## References

- [Modern CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [WHATWG HTML](https://html.spec.whatwg.org/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
