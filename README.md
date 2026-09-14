# Cogbazaar

OpenAPI-first DDD monorepo for **Cogbazaar** — decentralized marketplace for datasets, AI kernels, and GPU compute settled by proof-of-cognitive-work (PoCW).

Package scope: **`@cogbazaar/*`**

Product docs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → generated clients + Cogbazaar shell UI
```

## Quick start

```bash
# If .codegen/ is missing (it is never committed — see below):
#   rsync -a /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
#   then ensure package_scope is @cogbazaar and run pnpm codegen:paths

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
PORT=4000 pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: cogbazaar_demo_local_dev_key

# If port 4000 is busy: PORT=4001 pnpm --filter @cogbazaar/api-server start
# and set vite proxy / VITE_API_BASE_URL accordingly.

pnpm dev:web   # http://localhost:5173
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=cogbazaar-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## `.codegen` is local-only

**Never commit or push `.codegen/` to GitHub.** It is gitignored.

Restore from `zero-apps-codegen-scaffold`, then:

```bash
pnpm codegen:paths
```

See `.cursor/skills/cogbazaar-codegen-local/` and `.cursor/rules/codegen-not-committed.mdc`.

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Domains

| Domain | OpenAPI |
|--------|---------|
| identity | `packages/openapi-core/src/identity.yaml` |
| listings | `listings.yaml` |
| jobs | `jobs.yaml` |
| pocw-attestations | `pocw-attestations.yaml` |
| royalty-shares | `royalty-shares.yaml` |
| grant-pools | `grant-pools.yaml` |
| policy-rules | `policy-rules.yaml` |
