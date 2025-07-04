# Rules Engine Plus Scheme Dictionary

| Approach                                                          | Safe?      | Scales?    | Requires Backend Support? |
| ----------------------------------------------------------------- | ---------- | ---------- | ------------------------- |
| Use schema (OpenAPI, JSON Schema)                                 | ✅         | ✅         | Yes                       |
| Use rules config (FIELD_RULES)                                    | ✅         | ✅         | No                        |
| Infer from sample + multiple values (with thresholds, heuristics) | ⚠️ Partial | ⚠️ Sort-of | No                        |
| Guess from a single value only                                    | ❌         | ❌         | No                        |
