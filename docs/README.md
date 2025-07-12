# Slide Deck Outline

(For Presentation Export)

This scaffold outlines a modular presentation deck suitable for clients,
customers, or internal briefings. Each section below maps to 1-2 slides.

---

## Slide 1: Title & Context

- **Title**: Native Architecture for Web Interfaces
- **Subtitle**: Accessibility-first, framework-free, high performance
- **Presented by**: [Your Name / Team / Role]

---

- Declarative web architecture
- No JavaScript frameworks or build systems
- Built using HTML, CSS, and modern browser features
- WCAG 2.1 AA and Section 508 compliant by default

---

## Slide 3: Why It Matters

| Value Area    | Outcome                              |
| ------------- | ------------------------------------ |
| Speed         | <`0.12s` paint, no hydration delays  |
| Security      | Minimal JS, low surface              |
| Accessibility | No dependencies, screen-reader ready |
| Flexibility   | Works with any backend/API           |
| Cost Control  | Zero licenses, easier to maintain    |

---

## Slide 4: How It Works

- **Layout**: Full-bleed Holy Grail grid
- **Routing**: Radio inputs + CSS `:has()`
- **Forms**: Native validation + CSS visibility logic
- **Data**: JSON-only + semantic tag binding

---

## Slide 5: Standards-Based Compliance

- Built with:
  - W3C-compliant semantic HTML
  - WCAG 2.1 AA principles
  - Section 508 compatibility
- Uses only browser-supported features (no polyfills)

---

## Slide 6: Current Status

| Area        | Status         |
| ----------- | -------------- |
| Layout      | ✅ Complete    |
| Forms       | ✅ Complete    |
| Routing     | ✅ Complete    |
| Integration | ⬜ In Progress |
| Reporting   | ⬜ Next Phase  |

---

## Slide 7: Reuse Potential

- Clone-ready for dashboards, portals, or internal tools
- No framework required, just browser and content
- Compatible with static or API-based deployments

---

## Slide 8: Linked Docs (Call to Action)

- Developer Guide
- Customer Brief
- Accessibility Summary
- ADD (Architecture Decision Document)
- GitHub repo or staging link (if applicable)

---

> Export this outline to Google Slides, PowerPoint, or Pitch to present
> architecture highlights without requiring live walkthroughs.

---

# Documentation Directory

## 📚 Purpose

This directory contains comprehensive documentation for the D7460N CSS-first
architecture project.

## 🎯 **START HERE: Key Documents**

### **For Developers**

- **📋 [PROJECT-STATE.md](PROJECT-STATE.md)** - Complete project analysis,
  current status, and architectural insights
- **🛠️ [dev/README.md](dev/README.md)** - Development guides and technical
  details

### **For AI Assistants**

- **🤖 [../AGENT.md](../AGENT.md)** - Quick reference for AI coding assistants
- **🤖 [../AGENTS.md](../AGENTS.md)** - Detailed instructions for AI agents
- **📋 [PROJECT-STATE.md](PROJECT-STATE.md)** - Critical architectural
  understanding

## 🎨 **Understanding the Architecture**

This project uses an **advanced CSS-first architecture** with hidden checkbox
state management:

```html
<label role="button" name="submit" aria-label="Save">
  Save
  <input type="checkbox" />
  <!-- CSS state hook -->
</label>
```

**Key Benefits:**

- 🚀 **Performance**: CSS 100-1000x faster than JavaScript
- 🔒 **Security**: Minimal JavaScript attack surface
- ♿ **Accessibility**: Native keyboard navigation
- 📱 **Progressive**: Works without JavaScript
- 🎯 **Standards**: Uses semantic HTML + ARIA

## 📁 Directory Structure

| Directory   | Purpose                      |
| ----------- | ---------------------------- |
| `dev/`      | Technical development guides |
| `client/`   | Client-facing documentation  |
| `customer/` | Customer overview materials  |

## ⚠️ **Critical Note for Contributors**

The hidden checkbox pattern is **intentionally sophisticated** - not a mistake
to "fix". It represents advanced web standards knowledge and should be preserved
exactly as implemented.

**Read [PROJECT-STATE.md](PROJECT-STATE.md) for complete architectural
understanding before making any changes.**
