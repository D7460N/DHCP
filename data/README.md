# Data Directory

## Purpose

Holds static mock JSON data for each tab/page in the SPA interface.

## Usage

- All JSON files are fetched using `fetch()`
- Data must be triggered by tab change or user interaction (no polling)

## Format Rules

- Flat or shallow object structures only
- Use `kebab-case` for keys
- Collections = arrays of objects
- Single item views = object

## Sample File

```json
[
  {
    "id": "001",
    "item-name": "Subnet Mask",
    "item-type": "option",
    "item-author": "D7460N"
  }
]
