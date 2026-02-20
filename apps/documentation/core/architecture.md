# TaaS Ecosystem Map

This document visually explains how the entire FrieHub TaaS ecosystem works, from the end-user application down to the individual node processes.

## 1. The High-Level Flow (Life of a Request)

This diagram shows how data flows from a consumer (Prediction Market) through the TaaS network and back.

```mermaid
sequenceDiagram
    participant App as "Prediction Market (User)"
    participant Contract as "TruthOracle (Chain)"
    participant Gateway as "Sovereign Gateway (Backend)"
    participant Network as "Light Client (User Node)"
    participant Engine as "Execution Engine (Private)"

    Note over App,Contract: Creates a Market "Who won?"
    App->>Contract: 1. Request Truth (Recipe: NFL_Winner)
    
    Note over Network: Listens for Request
    Contract->>Network: Event: TruthRequested
    
    Network->>Gateway: 2. Request Verification (/proxy/verify)
    Note over Gateway: Centralized Truth Resolver
    
    Gateway->>Engine: 3. Execute Recipe (uses Private IP)
    Engine-->>Gateway: Result: "Chiefs"
    
    Gateway-->>Network: 4. Signed Certificate
    
    Note over Network: User's Laptop / Extension
    Network->>Contract: 5. Submit Transaction (Earn Reward)
    
    Note over Contract: Verifies & Finalizes
    Contract-->>App: 6. Callback: "Chiefs"
```

---

## 2. The Physical Architecture (Component Map)

How the code is structured across repositories and services.

```mermaid
graph TD
    subgraph "Application Layer (Consumers)"
        PM[Prediction Market App]
        DeFi[DeFi Protocol]
    end

    subgraph "Sovereign Backend (Private)"
        Gateway[Sovereign Gateway API]
        Engine[@friehub/execution-engine]
        Feeds[@friehub/data-feeds]
        Gateway --> Engine
        Engine --> Feeds
    end

    subgraph "The Public Network (Thin Clients)"
        Oracle[Smart Contract: TruthOracleV2]
        Node1[Truth Node]
        Node2[Challenger Lite]
        Ext[Chrome Extension]
    end

    PM -->|Reads| Oracle
    Node1 -->|Verify Request| Gateway
    Node2 -->|Audit Request| Gateway
    Gateway -->|Signed Payload| Node1
    Node1 -->|Submit TX| Oracle
```

---

## 3. Inside the `truth-node` (The Thin Client)

The `truth-node` is a lightweight process that manages the interaction between the blockchain and the Sovereign Gateway. It carries **no private logic and no secret API keys**.

### Internal Structure

1.  **`TruthRelayer` (The Listener)**:
    *   **Role**: Listens to the blockchain events (`TruthRequested`).
    *   **Action**: Passes the request ID and recipe template to the worker.

2.  **`TruthWorker` (The Coordinator)**:
    *   **Role**: Coordinates the verification flow.
    *   **Action**: Calls the **Sovereign Gateway**'s `/proxy/verify` endpoint.

3.  **`GatewayClient` (The Connector)**:
    *   **Role**: Standardized SDK component for backend communication.
    *   **Action**: Handles circuit breaking and retries for gateway calls.

### Diagram: The Keyless Flow

```mermaid
flowchart LR
    Blockchain(TruthOracle Contract)
    
    subgraph "Truth Node (Public)"
        Relayer[TruthRelayer Service]
        Worker[TruthWorker]
    end

    subgraph "Sovereign Backend (Private)"
        Gateway[Gateway API]
        Engine[Execution Engine]
    end

    Blockchain -- "Event: Requested" --> Relayer
    Relayer -- "Start Verification" --> Worker
    Worker -- "Delegated Execution" --> Gateway
    Gateway -- "Run Private Logic" --> Engine
    Engine -- "Result" --> Gateway
    Gateway -- "Signed Certificate" --> Worker
    Worker -- "Submit Result" --> Blockchain
```

## 4. Why this matters for us?

*   **Modular**: If we want to add a new API (e.g., Weather), we only update `data-feeds` and the `Recipe`. The core Node logic (`Relayer` -> `Queue` -> `Worker`) stays exactly the same.
*   **Scalable**: The Queue system means one node can handle thousands of requests per minute without dropping them.
*   **Secure**: The `Signer` acts as the final gatekeeper. Even if the data fetch logic has a bug, the signature creates accountability.
