# D7460N Architecture

D7460N is a browser-native, fully declarative architecture for quickly building scalable, maintainable front-end systems. It follows JAMstack principles, operates as a Single Page Application (SPA), and is implemented as a Progressive Web App (PWA).

OUT OF THE BOX:

- lightweight
- browser-native
- dependency-free
- standards-first
- fully declarative
- fully accessible
- fully responsive 

D7460N eliminates runtime dependencies and avoids complex JavaScript-driven UI logic by embracing modern standards: semantic HTML, CSS state management, and data-only JavaScript modules.

- Native HTML, CSS, JS (ES Modules)
- No build tools, no transpilers, no frameworks
- Responsive, accessible, and declarative by design

<br>

## ✨ Highlights

🔹 No dependencies: 100% browser-native<br>
🔹 Dynamic JSON data via `fetch()`<br>
🔹 Declarative single-page-application (SPA) navigation and layout via modern best-practices `<input type="radio">` + CSS `:has()` + `@property` + container queries<br>
🔹 Minimal nesting, no IDs, classes, or custom attributes in markup<br>
🔹 CSS visibility logic based on dynamic (`:empty`, `:has`, `[hidden]`)<br>
🔹 Clean separation of concerns, UI logic, and API services

<br>

## 🚀 To Run

1. Download and extract the project.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

DONE!

> _No build step<br>
> No compliation<br>
> No problem_

<br>

## 📂 Structure

| Directory              | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `/assets/js/`          | Modular JS by concern (`config`, `view`, `api`, `formController`, etc.) |
| `/assets/css/`         | CSS layers for layout, typography, heuristics                           |
| `/data/`               | Mock JSON APIs for each tab                                             |
| `/docs/`               | Dev guides, presentation decks, accessibility docs                      |
| `/assets/images/brand` | SVG brand and PWA PNG assets                                            |
| `/assets/images/app`   | GUI assets                                                              |

<br>

## 🛠️ Developer Tips

- Clear cache with `Ctrl+Shift+R` to avoid stale module loads
- Confirm service worker in DevTools → Application → Unregister if testing fresh state
- Ensure all scripts load in order: config → utils → refs → api → view → form → app

<br>

## 🙋 Need Help?

See the internal guide under `/docs/dev/` or open an issue in your team GitHub repo.
