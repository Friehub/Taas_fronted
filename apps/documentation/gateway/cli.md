# CLI Reference

The `hot-core` binary is the command-line interface to the TaaS Gateway. It manages the node lifecycle, identity, secrets, and plugins.

**Global flags** (valid for all commands):

| Flag | Description |
| :--- | :--- |
| `--config <path>` | Path to the `config.toml` file. Defaults to `config.toml` in the current directory. |
| `--master-password <pwd>` | Vault decryption password. Overrides `GATEWAY_MASTER_PASSWORD` environment variable. |
| `--master-password-file <path>` | Path to a file containing the Vault password. Takes precedence over `--master-password`. |
| `--external-sidecar` | Do not spawn the Sidecar. Assumes it is already running externally. |
| `--json` | Output command results as JSON (where supported). |

---

## `hot-core init`

Initializes a new node identity and generates a `config.toml`. This is the first command to run on a new node.

```bash
hot-core init
```

**What it does:**

1. Prompts for a Master Password to encrypt the Vault.
2. Generates or imports an Ethereum private key.
3. Generates a BLS12-381 signing key for TSS.
4. Generates a secure random admin token.
5. Writes encrypted keys to `resources/keys/`.
6. Writes `config.toml` to the current directory.

After `init`, the plaintext private key is discarded. All future starts decrypt it from the Vault using the Master Password.

---

## `hot-core start`

Starts the gateway node using the loaded configuration.

```bash
hot-core --config config.toml start
```

The Master Password is required to decrypt the Vault. It is read from (in order of priority):

1. `--master-password <pwd>`
2. `--master-password-file <path>`
3. `GATEWAY_MASTER_PASSWORD` environment variable
4. Interactive prompt (if none of the above are set)

The process remains in the foreground. Use a process supervisor (`systemd`, `supervisord`) for production deployments.

---

## `hot-core status`

Prints the current status of a running gateway node.

```bash
hot-core --config config.toml status
hot-core --config config.toml status --json
```

Output includes the node's Ethereum address, deployment mode (Sovereign/Mesh), active plugin count, and current health.

---

## `hot-core doctor`

Runs a pre-flight diagnostic and reports any configuration or runtime issues.

```bash
hot-core --config config.toml doctor
```

Checks performed:

- Vault integrity (can the encrypted keys be decrypted?)
- Config file validity (are all required fields present?)
- Sidecar reachability (is the gRPC endpoint responding?)
- Plugin manifest validity (do all entries point to loadable modules?)
- On-chain registry connection (is `registry_address` reachable at `rpc_url`?)

Each check is reported as `PASS`, `WARN`, or `FAIL` with a description. Use this before starting a node for the first time or after configuration changes.

---

## `hot-core plugin`

Manages installed plugins. All `plugin` subcommands interact with the `plugin-manifest.json` file and, when the Sidecar is running, issue a `ReloadPlugin` gRPC call to activate the change live.

### `plugin install`

```bash
hot-core --config config.toml plugin install <plugin-dir> <plugin-id> [--local]
```

| Argument/Flag | Description |
| :--- | :--- |
| `<plugin-dir>` | Path to the plugin directory containing `plugin.json` and the built adapter. |
| `<plugin-id>` | The plugin's unique ID (must match the `id` field in `plugin.json`). |
| `--local` | Treat `<plugin-dir>` as an absolute local path (not a remote registry URL). |

The CLI validates the `plugin.json` manifest, writes the entry to `plugin-manifest.json`, and issues a hot-reload. If the Sidecar is not running, the manifest is updated and the plugin will be loaded on next start.

For building and installing in one step, use the `just` recipe:

```bash
just install-plugin ./path/to/my-plugin my-plugin-id
```

### `plugin list`

```bash
hot-core --config config.toml plugin list
```

Lists all plugins registered in `plugin-manifest.json` and their current load status.

### `plugin remove`

```bash
hot-core --config config.toml plugin remove <plugin-id>
```

Removes the plugin entry from the manifest and triggers a live unregister on the Sidecar (if running).

---

## `hot-core secrets`

Manages secrets stored in the Vault. Secrets stored here are injected into plugins at request time and never appear in logs.

### `secrets set`

```bash
hot-core --config config.toml secrets set <key> <value>
```

Stores a secret in the Vault. `<key>` should follow the convention of the plugin's expected environment variable name (e.g., `BINANCE_API_KEY`, `SPORTMONKS_API_KEY`).

### `secrets get`

```bash
hot-core --config config.toml secrets get <key>
```

Prints the decrypted value of a secret. Output is suppressed in non-TTY environments.

### `secrets list`

```bash
hot-core --config config.toml secrets list
```

Lists the keys of all secrets stored in the Vault. Values are never printed.

### `secrets delete`

```bash
hot-core --config config.toml secrets delete <key>
```

Removes a secret from the Vault.

---

## `hot-core identity`

Manages the node's cryptographic identity.

### `identity show`

```bash
hot-core --config config.toml identity show
hot-core --config config.toml identity show --json
```

Prints the node's Ethereum address (derived from the encrypted private key) and BLS public key. The private key is never printed.

### `identity rotate`

```bash
hot-core --config config.toml identity rotate
```

Generates a new Ethereum and BLS key pair, encrypts them to the Vault, and updates the config. The old identity remains registered on-chain until you call `identity deregister`.

---

## `hot-core config`

Reads or writes a single field in the active `config.toml`.

```bash
# Read a field
hot-core --config config.toml config p2p.enabled

# Write a field
hot-core --config config.toml config p2p.enabled true
```

This is a convenience utility. It edits the TOML file in-place. A gateway restart is required for changes to take effect unless the changed field is handled by a live-reload path.

---

## `hot-core debug`

Prints extended internal state for debugging. Output includes active gRPC connections, Vault status, P2P peer table (if enabled), and TSS session state.

```bash
hot-core --config config.toml debug
hot-core --config config.toml debug --json
```

---

## `just` Recipes

The `justfile` in the repository root provides higher-level commands that combine multiple steps. Run `just` with no arguments to list all available recipes.

| Recipe | Description |
| :--- | :--- |
| `just build` | Build the Rust core and TypeScript sidecar. |
| `just start` | Start the gateway with development defaults. |
| `just debug` | Start with `RUST_LOG=debug`. |
| `just init` | Initialize the Vault interactively. |
| `just reset-vault` | Destroy existing keys and generate a fresh identity. |
| `just install-plugin <dir> <id>` | Build a plugin in-place and register it with the gateway. |
| `just restart-sidecar` | Kill and restart only the Sidecar process (for plugin updates). |
| `just test` | Run all Rust and TypeScript tests. |
| `just audit` | Run dependency security audits for both Rust and Node.js. |
| `just lint` | Run Rust format checks, Clippy, and TypeScript compiler checks. |
| `just audit-start` | Start Tetragon eBPF kernel auditing (Docker required). |
| `just audit-logs` | Stream live eBPF audit events. |
| `just release` | Build production bundles, run all audits, and verify distribution integrity. |
