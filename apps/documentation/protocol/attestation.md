# Attestation Engine

The Attestation Engine is TaaS's mechanism for converting raw fetched data into a final, on-chain-ready truth value. It is built into the TaaS protocol and runs inside every truth resolution cycle.

As a developer, you do not interact with the Attestation Engine directly. You configure it through the `logic.attestation` block of your Recipe JSON — and the network handles the rest.

---

## What is an Attestation?

An **Attestation** is the final, signed truth output produced after a Recipe's data pipeline completes. It contains:

- The **truth value** (numeric, boolean, array, etc.)
- The **attestation status** (e.g., `ATTESTED`, `PENDING_TIME`, `INSUFFICIENT_DATA`)
- A **Universal Truth Proof** — a portable, verifiable cryptographic record

Attestations are submitted to `TruthOracleV2` on Helios and go through an **optimistic dispute window** before becoming finalized on-chain.

---

## How You Configure Attestation (In Your Recipe)

The `attestation` block is the last part of a Recipe definition. It tells the protocol how to evaluate the data your pipeline collected and what truth value to return.

### Supported Attestation Types

#### `comparison` — Binary Threshold Check

Returns `1` (YES) or `0` (NO) based on a comparison between a data variable and a target.

```json
{
  "type": "comparison",
  "config": {
    "valueVar": "btcPrice",
    "operator": ">",
    "targetValue": 100000
  }
}
```

Supported operators: `>`, `<`, `>=`, `<=`, `==`, `!=`, `includes`

**Use case**: Did BTC close above $100,000? Did rainfall exceed 50mm? Did a team score more than 30 points?

---

#### `scalar` — Numeric Return

Returns the raw numeric value of a data variable, with optional decimal precision and range validation.

```json
{
  "type": "scalar",
  "config": {
    "valueVar": "finalTemperature",
    "decimals": 1,
    "min": -100,
    "max": 100
  }
}
```

**Use case**: What was the BTC price? What was the rainfall total in mm? What was the final score?

---

#### `categorical` — Named Option Mapping

Maps a string value to a predefined index from a set of allowed options.

```json
{
  "type": "categorical",
  "config": {
    "valueVar": "matchWinner",
    "categoryMapping": {
      "Chiefs": 0,
      "Eagles": 1,
      "Draw": 2
    }
  }
}
```

**Use case**: Which team won? What is the current market sentiment? Which candidate won the election?

---

#### `range` — Value Bucketing

Classifies a numeric value into one of several predefined buckets ("pools") and returns the pool index.

```json
{
  "type": "range",
  "config": {
    "valueVar": "temperature",
    "pools": [
      { "min": null, "max": 0 },
      { "min": 0, "max": 15 },
      { "min": 15, "max": 30 },
      { "min": 30, "max": null }
    ]
  }
}
```

**Use case**: Was the temperature "freezing", "cold", "mild", or "hot"? Which price bracket did ETH land in?

---

#### `time-based` — Time-Gated Attestation

Defers resolution until a specified timestamp. Returns `PENDING_TIME` before the deadline, then evaluates a nested attestation type.

```json
{
  "type": "time-based",
  "config": {
    "resolveAt": "2025-12-31T23:59:00Z",
    "condition": {
      "type": "comparison",
      "config": {
        "valueVar": "finalPrice",
        "operator": ">",
        "targetValue": 50000
      }
    }
  }
}
```

**Use case**: Did the stock close above $500 by end of Q4? Did the metric exceed the threshold by the deadline?

---

#### `multi-select` — Multiple Selection Outcome

Returns an array of selected option indices. Used for MULTI_SELECT market types.

```json
{
  "type": "multi-select",
  "config": {
    "valueVar": "qualifiedTeams",
    "resultMapping": ["TeamA", "TeamB", "TeamC", "TeamD"],
    "minSelections": 1,
    "maxSelections": 4
  }
}
```

**Use case**: Which teams qualified for the playoff? Which tokens are listed on the exchange?

---

## Attestation Status Reference

When a truth request resolves, the attestation status indicates the quality of the result:

| Status | Meaning |
| :--- | :--- |
| `ATTESTED` | Truth successfully computed — result is valid |
| `VOID` | No matching logic path — result is null |
| `INSUFFICIENT_DATA` | A required variable was missing or could not be parsed |
| `OUT_OF_RANGE` | Scalar result fell outside the configured `min`/`max` bounds |
| `PENDING_TIME` | Time-based attestation — the target timestamp has not been reached |
| `AMBIGUOUS` | Multiple data sources disagreed beyond the consensus threshold |
| `INVALID_DATA` | The data pipeline returned a structurally invalid value |

---

## The Universal Truth Proof

Every attested result is packaged into a **Universal Truth Proof** — a portable, version-tagged cryptographic record that contains:

- The **truth value** and **attestation timestamp**
- A **SHA-256 hash of the Recipe** (ensures the recipe wasn't tampered with)
- A **cryptographic signature** from the Sovereign Gateway (EIP-712 standard)
- An **execution trace** (step-by-step audit of what data was fetched and transformed)

The proof can be independently verified on-chain or off-chain by any party. It is the on-chain anchor for the entire truth lifecycle.

```
UniversalTruthProof {
  version: "4.0.0",
  standard: "EIP-712",
  truth: <resolved value>,
  attestedAt: <unix timestamp>,
  recipeId: <recipe identifier>,
  recipeHash: <sha256 of recipe>,
  sources: [ <node-by-node audit> ],
  attestation: {
    oracleAddress: <TruthOracleV2 address>,
    signature: <EIP-712 sig>,
    domain: { name, version, chainId }
  }
}
```
