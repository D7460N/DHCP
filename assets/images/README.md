# /assets/images — Visual Assets

## Purpose

Contains all static image assets used in the UI or documentation.

## Guidelines

| Type    | Usage                                         |
| ------- | --------------------------------------------- |
| `.svg`  | Preferred for UI icons and logos              |
| `.png`  | Used only when transparency or bitmaps needed |
| `.jpg`  | Avoid unless photo content is required        |
| `.webp` | Acceptable if performance is critical         |

## Naming

- All filenames must use lowercase with hyphens (`e.g. brand-logo.svg`)
- No spaces, no uppercase
- Group icons by prefix if needed (e.g., `icon-`, `badge-`, `button-`)

## Optimization

- All SVGs should be minified
- Avoid unnecessary width/height in SVGs — use viewBox

- light-weight
- branding color, formatting, and layout control
- preserve resizability and responsiveness
- maintain vulnerability scans
