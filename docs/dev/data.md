# Developer Guide: Data

## Data Model

All data is sourced from static or dynamic JSON files. JavaScript is only used
to `fetch()` the data and inject it into semantic HTML custom elements. A small
helper `fetchJSON(endpoint)` centralizes the fetch-and-parse logic and
automatically prefixes the base API URL.

## JSON Format

- Keys must use kebab-case
- Use arrays for list views
- Use flat objects for detail views

### Example: List

```json
[
  {
    "id": "1",
    "ip-address": "192.168.1.10",
    "status": "active",
    "assigned-to": "Workstation A"
  }
]
```

### Example: Detail

```json
{
  "ip-address": "192.168.1.10",
  "subnet-mask": "255.255.255.0",
  "lease-duration": "1 day"
}
```

---

## Binding Strategy

The HTML is pre-structured with semantic custom tags:

```html
<ul>
  <li>
    <item-ip></item-ip>
    <item-status></item-status>
    <item-assigned-to></item-assigned-to>
  </li>
</ul>
```

JavaScript loads the JSON and injects values:

```js
item.querySelector('item-ip').textContent = row['ip-address'];
```

- No templating engine is used
- No DOM is constructed — just value injection
- Structure must already exist in HTML

---

## Detail Binding

Detail views use the same pattern:

```html
<aside>
  <section>
    <detail-ip></detail-ip>
    <detail-subnet-mask></detail-subnet-mask>
  </section>
</aside>
```

When populated, CSS `:has(section:has(div:not(:empty)))` toggles `<aside>` to
become visible.

---

## Related

- `/data/readme.md`
- `forms.md` - for editable form-to-data structure
- `components.md` - for tag naming and hierarchy
