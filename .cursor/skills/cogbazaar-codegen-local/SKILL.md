---
name: cogbazaar-codegen-local
description: >-
  Cogbazaar local-only codegen tree: never commit .codegen; restore from
  zero-apps-codegen-scaffold; package scope @cogbazaar. Use when installing,
  cloning, running zero-codegen, or when .codegen is missing.
---

# Cogbazaar — local codegen only

## Hard rule

**`.codegen/` must never be committed or pushed to GitHub.**

It is listed in `.gitignore`. Agents must not `git add` it (including `-f`).

## Restore when missing

```bash
SRC=/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold
DEST="$(pwd)"
rsync -a --delete \
  --exclude '__pycache__/' \
  "$SRC/.codegen/" "$DEST/.codegen/"
pnpm codegen:paths
```

Then set `package_scope` to `@cogbazaar` in `.codegen/zero-codegen.json` and
`.codegen/.zero-codegen-merged.json` if the copy reset those values.

## Package scope

Product packages use **`@cogbazaar/*`** (not `@ddd`, `ai-`, or `zero-` prefixes).

## Related skills

- `ddd-platform`, `ddd-codegen`, `ddd-identity` (copied from the scaffold)
