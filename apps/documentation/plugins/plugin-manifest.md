# plugin.json Reference

Every plugin must ship a `plugin.json` manifest at its root directory. This file is the authoritative declaration of the plugin's identity and capabilities. The `hot-core plugin install` CLI command reads this manifest during installation and rejects the plugin if required fields are absent.

---

## Complete Schema

```json
{
  "id": "my-data-source-v1",
  "version": "1.0.0",
  "category": "crypto",
  "capability": {
    "methods": ["spotPrice"],
    "output_schema": {
      "price": "number",
      "symbol": "string",
      "timestamp": "number"
    }
  }
}
```

---

## Field Reference

### Top-Level Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier for this plugin. Used as the source ID in the UCM capability registry and in all log output. Use lowercase with hyphens (e.g., `coingecko`, `api-sports`). Must be stable — changing this is a breaking change. |
| `version` | `string` | Yes | Semantic version of the plugin (e.g., `1.0.0`). Used for change tracking and displayed in reload confirmations. |
| `category` | `string` | Yes | The `DataCategory` this plugin serves. Must be one of the defined enum values: `crypto`, `sports`, `forex`, `weather`, `economics`, `finance`, `onchain`, `social`, `prediction`, `news`, `ai`, `web`, `calendar`, `agent`, `random`, `custom`. |

### `capability` Object

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `methods` | `string[]` | Yes | Array of UCM method names this plugin supports (e.g., `["spotPrice", "orderBook"]`). Must exactly match the method keys defined in the UCM capability registry for this category. |
| `output_schema` | `Record<string, string>` | **Strictly required** | Declares the shape of the data returned by `fetchData`. Keys are field names; values are type names (`"number"`, `"string"`, `"boolean"`). The CLI rejects installation if this field is absent. |

---

## `output_schema` Enforcement

The `output_schema` declared in `plugin.json` is the contract between the plugin and the UCM Truth Engine. During installation, the schema is written to the UCM capability file at `core/data/capabilities/<category>.json`. At runtime, every response from the plugin's `fetchData` method is validated against this schema by the `assertSchemaCompliance` function before the data reaches the BLS signing pipeline.

If the plugin returns a field with the wrong type, or omits a required field, the UCM returns `ErrorCode.SCHEMA_VIOLATION` and the result is discarded. It is never signed.

---

## UCM Capability File Format

The `hot-core plugin install` command automatically updates the capability file for the plugin's category. You should not need to edit these files manually, but understanding their format helps when debugging:

```json
{
  "spotPrice": {
    "category": "crypto",
    "aggregation": "MEDIAN",
    "min_sources": 2,
    "schema": {
      "price": "number",
      "symbol": "string",
      "timestamp": "number"
    },
    "sources": [
      { "id": "binance", "weight": 1 },
      { "id": "coingecko", "weight": 1 },
      { "id": "my-data-source-v1", "weight": 1 }
    ]
  }
}
```

| Field | Description |
| :--- | :--- |
| `category` | Category string matching `DataCategory`. |
| `aggregation` | Aggregation strategy: `MEDIAN`, `MEAN`, `CONSENSUS`, `AVG`, `FIRST`, or `UNION`. |
| `min_sources` | Minimum number of sources required for a valid aggregation result. Setting this to `2` enforces that at least two independent sources agree. |
| `schema` | Mirror of `output_schema` from `plugin.json`. This is what `TruthEngine.validate()` checks against. |
| `sources` | Array of registered source objects. Updated by `plugin install`. |

---

## Startup Cross-Check

On sidecar startup, the `initRegistry` function cross-checks every plugin in `plugin-manifest.json` against the UCM capability files. If a plugin's `id` does not appear in any `sources` array, a `WARN` log is emitted:

```
[UCM] Plugin 'my-data-source-v1' is loaded but its source ID does not appear in any capability file.
Run 'hot-core plugin install' with the enriched plugin.json to auto-register it...
```

This is a non-fatal warning — the plugin is loaded and can be called, but it will never be selected as a source by the UCM consensus pipeline until it is registered in the capability file.
