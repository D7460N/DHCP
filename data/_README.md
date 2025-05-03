# /data/README.md

## Purpose

This directory contains declarative JSON datasets used by the D7460N architecture. These include static API mocks, dynamic fetchable resources, and locally scoped development data for rendering lists, forms, and detail views. All content is structured to support declarative binding to semantic elements.

## Access Guidelines

- All data access is performed using `fetch()` or native file system reads (no bundlers)
- Polling, interval-based refreshes, or mutation watchers are prohibited
- Updates must be initiated by discrete user or system events

## Format Conventions

- Use flat or minimal nesting to support fast DOM parsing
- Keys should use kebab-case (e.g., `"mac-address"`, `"device-type"`)
- Array-of-objects for collections; single object for detail views
- Avoid dynamic property names or deeply nested trees

## Examples

### List

```json
[
  {
    "id": "a1",
    "ip-address": "10.0.0.1",
    "status": "active",
    "location": "Server Room"
  },
  {
    "id": "a2",
    "ip-address": "10.0.0.2",
    "status": "reserved",
    "location": "Desk 14"
  }
]
```

### Detail

```json
{
  "id": "a1",
  "ip-address": "10.0.0.1",
  "status": "active",
  "created": "2025-04-01T12:00:00Z",
  "updated": "2025-04-30T09:45:00Z",
  "assigned-to": "Nicole"
}
```

## File Naming

- Use lowercase with hyphens
- Always use `.json` extension
- Name by function or API target (e.g., `scopes.json`, `ip-lease-list.json`, `scope-detail.json`)

## Related Documentation

- `/components/readme.md`: for UI binding to semantic tags
- `/layout/readme.md`: scroll behavior and DOM placement
- `d7460n-dev-guide/data.md`: full data binding patterns and fetch lifecycle
