# .git/hooks/README.md

## Purpose

This directory contains Git hooks used to maintain documentation integrity within the D7460N architecture. These are local pre-commit scripts designed to notify developers when markdown (`.md`) or JSON (`.json`) files have been changed and require documentation review.

## Included Hooks

### `pre-commit-doc-check`

Blocks a commit if any relevant documentation files have changed, prompting a manual confirmation.

## Installation

1. Make sure the hook is executable:

```bash
chmod +x .git/hooks/pre-commit-doc-check
```

2. Copy the hook into your local Git hooks folder:

```bash
cp hooks/pre-commit-doc-check .git/hooks/pre-commit
```

> This will replace any existing pre-commit hook. If you already use one, you can chain them manually.

## Override

If the changes are intentional or documentation updates are deferred:

```bash
git commit --no-verify
```

Use this only when absolutely certain the documentation does not require edits.

## Related Policies

- Always validate that `/docs/`, `/data/`, and `/README.md` files reflect your recent changes.
- For more on how the architecture syncs code and documentation, see `d7460n-dev-guide/index.md`.
