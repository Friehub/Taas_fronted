# Friehub Frontend Ecosystem

This repository contains the user-facing applications for the Friehub/TaaS ecosystem.

## Repositories
- **Apps/App**: The main user dashboard and node management interface.
- **Apps/Admin**: Institutional management and protocol oversight.
- **Apps/Web**: Landing page and marketing assets.
- **Apps/Docs**: Developer and user documentation.

## Getting Started
1. Install dependencies: `pnpm install`
2. Run the dashboard: `pnpm dev:app`
3. Run the admin panel: `pnpm dev:admin`

## ABI Synchronization
Contract ABIs are automatically synced from the private `taas-core` protocol repository into `apps/app/lib/abi/`. Do not modify these files manually.
