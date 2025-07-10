# D7460N Architecture

D7460N is a browser-native, lightweight, dependency-free, standards-first, fully declarative, fully accessible, fully responsive UI resrouce for quickly building scalable, maintainable front-end systems. 

It eliminates runtime dependencies and avoids complex JavaScript-driven UI logic by embracing modern standards: semantic HTML, CSS state management, and data-only JavaScript modules.

- Native HTML, CSS, JS (ES Modules)
- No build tools, no transpilers, no frameworks
- Responsive, accessible, and declarative by design

## ✨ Highlights

- 🔹 No dependencies: 100% browser-native
- 🔹 Dynamic JSON data via `fetch()`
- 🔹 Declarative single-page-application (SPA) navigation and layout via modern best-practices `<input type="radio">` + CSS `:has()`
- 🔹 No IDs, classes, or custom attributes in markup
- 🔹 Custom CSS visibility logic (`:empty`, `:has`, `[hidden]`)
- 🔹 Clean separation of config, UI logic, and API services

## 🚀 To Run

1. Download and extract the project.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

DONE!

> _No build step<br>
> No compliation<br>
> No problem_

## 📂 Structure

| Directory              | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `/assets/js/`          | Modular JS by concern (`config`, `view`, `api`, `formController`, etc.) |
| `/assets/css/`         | CSS layers for layout, typography, heuristics                           |
| `/data/`               | Mock JSON APIs for each tab                                             |
| `/docs/`               | Dev guides, presentation decks, accessibility docs                      |
| `/assets/images/brand` | SVG brand and PWA PNG assets                                            |
| `/assets/images/app`   | GUI assets                                                              |

## 🛠️ Developer Tips

- Clear cache with `Ctrl+Shift+R` to avoid stale module loads
- Confirm service worker in DevTools → Application → Unregister if testing fresh state
- Ensure all scripts load in order: config → utils → refs → api → view → form → app

## 🙋 Need Help?

See the internal guide under `/docs/dev/` or open an issue in your team GitHub repo.
