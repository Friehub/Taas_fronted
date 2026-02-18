# Friehub Frontend Monorepo

**Institutional Frontend Infrastructure for the FTS Protocol.**

This repository is a monorepo managed by pnpm workspaces, containing the various pillars of the Friehub Truth Service (TaaS) frontend ecosystem.

## Workspace Structure

The applications are localized within the `apps/` directory and act as independent, specialized services:

- **`apps/user-dashboard`**: The primary interface for node operators and protocol participants. Handles node registration, truth stream monitoring, and the protocol registry.
- **`apps/admin-dashboard`**: Internal governance tools for managing data recipes, source reputation, and protocol-level parameters.
- **`apps/landing-page`**: The high-performance landing page for external partners and the public.
- **`apps/documentation`**: Specialized developer documentation and integration guides.

## Development

### Monorepo Orchestration
The monorepo utilize `pnpm` for optimized dependency management and workspace orchestration.

```bash
# Install dependencies across all workspaces
pnpm install

# Build all applications
pnpm run build

# Run specific application in development
pnpm --filter @friehub/user-dashboard dev
```

### Standards
- **Styling**: Tailwind CSS with a standardized institutional design system.
- **Logic**: TypeScript with strict typing for all blockchain and API interactions.
- **Framework**: Next.js 15+ (App Router).

## Deployment

Each application within the `apps/` directory is designed for independent deployment via the Vercel platform.

---

Copyright (c) 2026 Friehub Protocol. All rights reserved.
Licensed under the MIT License.
