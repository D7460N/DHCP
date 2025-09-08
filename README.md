# D7460N ARCHITECTURE 

**D7460N** is a browser-native, fully declarative **architecture** for _speed building_
scalable, maintainable, future proof, front-end systems. **D7460N Architecture** is loosely based JAMstack principles, operates as a Single Page Application (SPA), and is implemented as a Progressive Web App (PWA).

OUT OF THE BOX:

- lightweight
- browser-native
- dependency-free
- standards-first
- fully declarative
- fully 508 accessible
- fully responsive

D7460N eliminates runtime dependencies and avoids complex JavaScript-driven UI
logic by embracing **modern standards**: semantic HTML, CSS state management, and
data-only JavaScript modules.

- Native HTML, CSS, JS (ES Modules)
- No build tools, no transpilers, no frameworks
- Responsive, accessible, and declarative _**by design**_

<br>

## ✨ HIGHLIGHTS 

🔹 **CSS-First Architecture**: Advanced state management using hidden checkboxes + CSS `:checked`, `:has()` selectors<br> 
🔹 **Performance Optimized**: CSS rendering 100-1000x faster than JavaScript DOM manipulation equivalents<br>
🔹 **Security Hardened**: Minimal JavaScript surface reduces XSS attack vectors<br>
🔹 **Progressive Enhancement**: Fully functional with JavaScript disabled<br>
🔹 **Accessibility Native**: Uses semantic HTML + ARIA for 508/WCAG compliance<br>
🔹 No dependencies: 100% browser-native<br>
🔹 Dynamic JSON data via `fetch()`<br>
🔹 Declarative single-page-application (SPA) navigation via `<input type="radio">` + CSS `:has()` + container queries<br>
🔹 **Easily Overriden**: Minimal nesting, no IDs, classes, or custom attributes in markup, CSS Layers<br>
🔹 Component visibility logic (`:empty`, `:has`, `[hidden]`) based on data delivery **JavaScript CRUD**.<br>
🔹 Clean separation of concerns: UI boolean logic, and JavaScript/API services.

> **⚠️ Architecture Note**: This project uses an intentionally sophisticated
> CSS-first pattern with `<label role="button"><input type="checkbox"></label>`
> for state management. This is NOT a mistake - it's an advanced optimization
> technique. See `docs/PROJECT-STATE.md` for complete architectural analysis.

<br>

## SPEED BUILD CONTENT 

DEVs - **Don't over think it.**<br>
It is easier than you're used too with frameworks. Presentation layer and state logic (including all loading and error states) _is already done_. 

> No need to build pages anymore<br>
Just deliver your content via the given API and JavaScript modules (see examples) and the content renders in place, styled and ready to go - _like turning on the lights of a Christmas tree!_<br>
_That's it!_<br>
_You're done!_

<br>

## 🚀 TO RUN

1. Download and extract the project.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

DONE!

> _No build step<br> No compliation<br> No problem_

<br>

## 📂 STRUCTURE 

| Directory              | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `/assets/js/`          | Modular JS by concern (`config`, `view`, `api`, `formController`, etc.) |
| `/assets/css/`         | CSS layers for layout, typography, heuristics                           |
| `/data/`               | Mock JSON APIs for each tab                                             |
| `/docs/`               | Dev guides, presentation decks, accessibility docs                      |
| `/assets/images/brand` | SVG brand and PWA PNG assets                                            |
| `/assets/images/app`   | GUI assets                                                              |

<br>

## 🛠️ DEVELOPER TIPS 

- Clear cache with `Ctrl+Shift+R` to avoid stale module loads
- Confirm service worker in DevTools → Application → Unregister if testing fresh
  state
- Ensure all scripts load in order: config → utils → refs → api → view → form →
  app

<br>

## 🙋 NEED HELP?

See the internal guide under `/docs/dev/` or open an issue in your team GitHub
repo.
