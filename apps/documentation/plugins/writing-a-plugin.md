# Writing a Plugin

This guide walks through the complete process of building a TaaS data plugin from scratch. By the end you will have a working adapter that can be installed on any gateway node.

---

## Prerequisites

- Node.js 22+ and pnpm 9+
- Access to a gateway node (for local testing)
- An API key for the data provider you are wrapping (if required)

---

## 1. Create the Plugin Directory

```bash
mkdir my-price-source
cd my-price-source
pnpm init
```

Install the plugin SDK:

```bash
pnpm add @taas/plugin-sdk
```

The SDK provides `SovereignAdapter` — the abstract base class that every plugin must extend. It handles the HTTP client, circuit breaker, SSRF protection, mock mode, and Zod schema validation so you do not have to.

---

## 2. Implement the Adapter

Create `src/index.ts`. The adapter must extend `SovereignAdapter` and implement two abstract methods: `fetchData` and `getMockData`.

```typescript
import { SovereignAdapter, AdapterConfig } from '@taas/plugin-sdk';
import { DataCategory } from '@taas/interfaces';
import { z } from 'zod';

// 1. Define the response schema using Zod.
//    This is used for runtime type validation of the API response.
const PriceSchema = z.object({
  price: z.number(),
  symbol: z.string(),
  timestamp: z.number(),
});

type PriceResult = z.infer<typeof PriceSchema>;

// 2. Define the parameters your adapter accepts.
interface PriceParams {
  symbol: string;
}

// 3. Extend SovereignAdapter with your data type and params type.
class MyPriceSource extends SovereignAdapter<PriceResult, PriceParams> {
  constructor() {
    const config: AdapterConfig = {
      id: 'my-price-source',
      name: 'My Price Source',
      category: DataCategory.CRYPTO,
      responseSchema: PriceSchema,

      // Circuit breaker: open after 5 consecutive failures,
      // attempt reset after 30 seconds.
      circuitFailureThreshold: 5,
      circuitResetTimeoutMs: 30_000,

      capabilities: {
        supportsRealtime: true,
        supportsHistorical: false,
        supportsBatch: false,
        methods: ['spotPrice'],
      },
    };
    super(config);
  }

  // 4. fetchData: called in production. Use this.client (Axios) for all HTTP
  //    requests. SSRF protection and timeout are applied automatically.
  protected async fetchData(params: PriceParams): Promise<PriceResult> {
    const { data } = await this.client.get(
      `https://api.example.com/v1/price?symbol=${params.symbol}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    return {
      price: data.last_price,
      symbol: params.symbol,
      timestamp: Date.now(),
    };
  }

  // 5. getMockData: called when useMocks=true (e.g., SDK simulation, CI).
  //    Must return structurally valid data without making real API calls.
  protected async getMockData(params: PriceParams): Promise<PriceResult> {
    return {
      price: 65000.00,
      symbol: params.symbol,
      timestamp: Date.now(),
    };
  }
}

export default new MyPriceSource();
```

---

## 3. Write the Manifest

Create `plugin.json` at the root of your plugin directory. The `capability.output_schema` field is **strictly required** — installation is rejected without it.

```json
{
  "id": "my-price-source",
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

The field names and types in `output_schema` must match the actual shape returned by `fetchData`. Any mismatch surfaces at runtime as `ErrorCode.SCHEMA_VIOLATION`.

---

## 4. Install the Plugin

From the gateway node, run:

```bash
hot-core plugin install ./my-price-source
```

The CLI performs the following steps:

1. Validates `plugin.json` — rejects if `capability.output_schema` is absent.
2. Writes an entry to `plugin-manifest.json`.
3. Issues a `ReloadPlugin` gRPC call to the running Sidecar.
4. Prints confirmation: `[Hot-Reload] Plugin 'my-price-source' live — no restart needed.`

If the Sidecar is not running, the manifest is written and the plugin is loaded automatically on the next start.

---

## 5. Built-in Resilience

`SovereignAdapter` provides the following safety mechanisms automatically. You do not need to implement them:

### Circuit Breaker

Each adapter instance maintains a per-source circuit breaker with three states:

| State | Behaviour |
| :--- | :--- |
| `CLOSED` | Normal operation. Requests are forwarded to the external API. |
| `OPEN` | Provider is considered degraded. Requests fail immediately with a backoff message rather than hitting the API. |
| `HALF_OPEN` | After the reset timeout, one probe request is allowed through. If it succeeds, the breaker closes. |

The gateway logs the state transition and includes the retry-in time in the error message. Errors from non-infrastructure causes (404, 403, "not found") do not increment the failure counter — only infrastructure failures (timeouts, 5xx, connection refused) do.

### SSRF Protection

`NetworkSafety.validateUrl()` is called on every outgoing HTTP request via an Axios interceptor installed in the constructor. Requests to private IP ranges, loopback, or link-local addresses are blocked before leaving the process.

### Abort Signal and Timeout

The `executePlugin` handler passes an `AbortSignal` to every fetch call. The signal fires after the configured timeout (default 15 seconds). Adapters that use `this.client` (Axios) receive the signal via the request config automatically.

---

## Plugin Rules

These rules are enforced at install time, at runtime, or by review policy:

- **Use `this.client`, not `fetch` or raw `axios`.** The built-in Axios instance has the SSRF interceptor and timeout configured. Using raw fetch bypasses both.
- **Do not hold mutable global state.** Each invocation of `fetchData` must behave as a stateless function. State shared across requests can cause non-deterministic results in a multi-node consensus round.
- **Declare a valid `output_schema`.** Installation is rejected without it. Fields not declared in the schema may be silently stripped before reaching the signing layer.
- **Implement `getMockData`.** This is used by the SDK simulation path and CI environments. It must return structurally valid data without making real API calls.

---

## Next Steps

- [plugin.json Reference](/plugins/plugin-manifest) — full manifest field documentation.
- [Unified Capability Model](/plugins/ucm) — how the Truth Engine validates and aggregates your plugin's output.
- [Hot-Reload System](/plugins/hot-reload) — how the `ReloadPlugin` RPC works under the hood.
