# Data Directory

## Purpose

Contains static mock JSON data files that populate the D7460N CSS-first architecture interface.

## 🎯 **Data-Driven Architecture**

This project follows strict separation of concerns:

- **HTML**: Semantic structure only
- **CSS**: UI logic and state management (via hidden checkbox pattern)  
- **JavaScript**: Data layer only (fetch, inject, ARIA management)
- **JSON**: Content and configuration data

## 🔄 **Data Flow Pattern**

1. User interacts with UI (CSS-driven via checkbox states)
2. JavaScript detects state changes via form events (`oninput`, `onchange`)
3. JavaScript fetches appropriate JSON endpoint
4. JavaScript injects data into semantic HTML containers
5. CSS automatically styles and shows/hides content based on presence

**No JavaScript DOM manipulation for UI - CSS handles all visual logic!**

## 📁 **File Structure**

| File | Purpose |
|------|---------|
| `nav-content.json` | Navigation structure and page titles |
| `manage.json` | Main DHCP management records |
| `servers.json` | Server inventory data |
| `faqs.json` | FAQ content |
| `*.json` | Other endpoint mock data |
