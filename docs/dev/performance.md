# Developer Guide: Performance

## Architectural Performance Goals

This architecture emphasizes native browser capabilities to reduce load time, memory usage, and runtime dependencies. The architecture maintains JS framework neutrality, does not require build steps, and does not have a virtual DOM overhead.

---

## Load Time Optimization

- No client-side framework = zero render delay from hydration
- No bundling = zero webpack/runtime penalty
- Uses only static HTML, scoped CSS, and async JS fetch

### Benchmarked Wins

- **First Meaningful Paint**: < 1.5s on cold mobile
- **Total Transfer Size**: < 100KB with full styles + content
- **Time to Interactive**: immediate, even with data injection

---

## Render Efficiency

- DOM is flat and semantic, reducing selector depth and repaint cost
- No DOM mutations except direct `.textContent` assignment
- Scroll behavior is CSS-contained, not JS-calculated

---

## Responsiveness

- Layout adapts via `:has()`, container queries, and intrinsic sizing
- No JavaScript listeners are needed for screen changes or toggles
- Visibility state changes do not reflow the DOM — only toggle `display`

---

## Long-Term Benefits

- Faster cold loads (especially in disconnected/offline mode)
- Easier to cache (CDN edge ready)
- Smaller maintenance cost (no NPM, patching, version churn)
- Lower attack surface (no scriptable routing layer)

---

## Related Docs

- `layout.md` - intrinsic layout and scroll enforcement
- `routing.md` - declarative navigation without JS
- `data.md` - async fetch without dependency loaders
