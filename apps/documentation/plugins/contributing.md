# Contributing a Plugin

This guide covers how to contribute a new data adapter to the TaaS plugin ecosystem. Plugin contributions are the primary way to expand TaaS data coverage. A complete plugin is typically 25 to 50 lines of TypeScript.

Before writing code, read [Writing a Plugin](/plugins/writing-a-plugin) to understand the adapter structure, `SovereignAdapter`, and the `plugin.json` manifest format.

---

## Plugin Repository

Plugins live in the `taas-plugins` repository, separate from the gateway core. This separation keeps the plugin contribution process lightweight — contributors do not need to understand or touch the gateway internals.

```
taas-plugins/
├── crypto/
│   ├── binance/
│   │   ├── src/index.ts
│   │   ├── plugin.json
│   │   └── package.json
│   └── coingecko/
├── sports/
│   ├── api-sports/
│   └── sportmonks/
└── ...
```

Each plugin occupies its own directory under the relevant category. The directory name typically matches the plugin `id` in `plugin.json`.

---

## Contribution Workflow

### Step 1 — Fork and Clone

Fork the `taas-plugins` repository and clone your fork:

```bash
git clone https://github.com/<your-username>/taas-plugins.git
cd taas-plugins
```

### Step 2 — Create Your Plugin Directory

Create a directory under the appropriate category:

```bash
mkdir -p crypto/my-exchange
cd crypto/my-exchange
pnpm init
pnpm add @taas/plugin-sdk @taas/interfaces zod
```

### Step 3 — Implement the Adapter

Follow the [Writing a Plugin](/plugins/writing-a-plugin) guide. At minimum your directory must contain:

| File | Required | Description |
| :--- | :--- | :--- |
| `src/index.ts` | Yes | Default export of your `SovereignAdapter` subclass instance. |
| `plugin.json` | Yes | Manifest declaring `id`, `version`, `category`, and `capability.output_schema`. |
| `package.json` | Yes | Package config with a `build` script producing `dist/index.js`. |
| `README.md` | Yes | API key requirements, data provider link, supported methods, and example params. |
| `src/index.test.ts` | Yes | Unit tests covering `getMockData()` and at least one `fetchData()` path. |

### Step 4 — Test Locally

Install the plugin on a local development node and verify it works end-to-end:

```bash
# Build the plugin
pnpm build

# From the gateway directory, install and test
just install-plugin ../taas-plugins/crypto/my-exchange my-exchange

# Run a test fetch
curl -X POST http://localhost:3000/fetch \
  -H "Content-Type: application/json" \
  -d '{"category": "crypto", "method": "spotPrice", "params": {"symbol": "BTCUSDT"}}'
```

Confirm:
- The response has a valid `truthPoint` with the expected shape.
- `participatingSources` contains your plugin's `id`.
- `getMockData()` returns structurally identical data to `fetchData()`.
- All unit tests pass: `pnpm test`.

### Step 5 — Open a Pull Request

Push your branch and open a PR against `main` in the `taas-plugins` repository. Fill out the PR template completely. Incomplete PRs will not be reviewed.

---

## PR Requirements

Every plugin PR must satisfy all of the following before it is reviewed:

| Requirement | Detail |
| :--- | :--- |
| `plugin.json` is complete | Must include `id`, `version`, `category`, and `capability.output_schema`. |
| No secrets in source | API keys must never appear in source code or `plugin.json`. They must be documented as Vault secrets in the README. |
| `getMockData()` is implemented | Must return structurally valid data without making real HTTP calls. |
| Tests pass with `getMockData` | Tests run against the mock path in CI — no live API keys are available. |
| `output_schema` matches actual output | The fields and types in `output_schema` must exactly match what `fetchData` returns. Mismatches surface as `SCHEMA_VIOLATION` at runtime. |
| Uses `this.client` for HTTP | No raw `fetch`, `axios`, or `node:http` imports. All HTTP goes through the `SovereignAdapter` Axios client. |
| No global mutable state | Each `fetchData` call must behave statelessly. |
| README documents the data provider | Include a link to the provider's API documentation and any sign-up requirements. |

---

## Code Style

Plugin code is subject to the same ESLint and Prettier configuration as the gateway core. Pre-commit hooks run automatically after installing dependencies:

```bash
pnpm install
# Husky hooks are configured automatically
```

---

## What Happens After Merge

Once a plugin PR is merged into `taas-plugins`:

1. A Changeset is published and the plugin receives a semantic version.
2. The plugin appears in the official plugin registry.
3. Any gateway node operator can install it with:
   ```bash
   hot-core plugin install <registry-url>/crypto/my-exchange my-exchange
   ```

The gateway handles all P2P consensus, BLS/TSS signing, and on-chain delivery automatically. Plugin authors are responsible only for fetching data correctly.

---

## Adding a New Category

If your plugin introduces a category that does not yet exist in the repository:

1. Create the category directory under `taas-plugins/`.
2. Add the category value to `DataCategory` in `@taas/interfaces` (this requires a PR to the gateway interfaces package — coordinate with the maintainers).
3. Create the UCM capability registry file at `resources/data/capabilities/<category>.json` in the gateway repository with the method schema and aggregation strategy.

Reach out via a GitHub issue before starting this work to confirm the new category is in scope.
