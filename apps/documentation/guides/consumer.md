# Consumer Integration Guide

This guide explains how to integrate your smart contract with the TaaS Protocol to consume verifiable off-chain data.

## 1. The Integration Pattern
TaaS currently follows an **Asynchronous Proactive Fulfillment** pattern:
1.  **Request**: Your contract calls `createNewTask` on the `TaaSServiceManager`.
2.  **Off-chain Compute**: TaaS nodes process the request and submit the verified result back to the `ServiceManager`.
3.  **Fulfillment**: Once the task is marked as `completed` on-chain, your contract can receive the raw result and verify it against the `ServiceManager` state.

---

## 2. Example Consumer Contract
Below is a high-fidelity example of a consumer contract. It demonstrates how to request a fact and how to securely verify the response.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ITaaSServiceManager Minimal Interface
 */
interface ITaaSServiceManager {
    enum AggregationStrategy { BLS_QUORUM, MEDIAN, MAJORITY, UNION, LATEST, FIRST, MEAN }

    struct Task {
        address creator;
        bytes32 resultHash;
        AggregationStrategy strategy;
        uint32 minSources;
        uint32 quorumThreshold;
        uint64 deadline;
        uint32 referenceBlock;
        bool completed;
        bool challenged;
    }

    function createNewTask(
        string calldata capability,
        bytes calldata params,
        AggregationStrategy strategy,
        uint32 minSources,
        uint32 quorumThreshold,
        uint64 deadline
    ) external returns (bytes32 taskId);

    function tasks(bytes32 taskId) external view returns (
        address creator,
        bytes32 resultHash,
        AggregationStrategy strategy,
        uint32 minSources,
        uint32 quorumThreshold,
        uint64 deadline,
        uint32 referenceBlock,
        bool completed,
        bool challenged
    );
}

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "taas-contract/TaaSConsumer.sol";

/**
 * @title WeatherOracle
 * @dev Inheriting from TaaSConsumer simplifies secure data consumption.
 */
contract WeatherOracle is TaaSConsumer {
    mapping(string => uint256) public temperatures;

    constructor(address _sm) TaaSConsumer(_sm) {}

    function fetchWeather(string calldata city) external {
        _requestTask(
            "weather.temperature",
            abi.encode(city),
            ITaaSServiceManager.AggregationStrategy.MEDIAN,
            3,      // Wait for 3 nodes
            67,     // 67% consensus
            uint64(block.timestamp + 3600)
        );
    }

    /**
     * @notice The 'onlyTaaSSettled' modifier handles all security checks.
     */
    function fulfill(bytes32 taskId, string calldata city, uint256 temp) 
        external 
        onlyTaaSSettled(taskId, abi.encode(temp)) 
    {
        temperatures[city] = temp;
    }
}
```

```

---

## 3. Implementation Steps

### Step 1: Install the SDK
Add the TaaS contracts to your Foundry project:
```bash
forge install Friehub/taas-contract
```

### Step 2: Deploy your contract
Deploy your consumer contract with the `TaaSServiceManager` address for your specific network:
*   **Sepolia Proxy**: `0x886bbbb92e1c167e59ed63d6befbcb8f6da6f90c`
*   **Hoodi Proxy**: `0x6942881Bbf662549cBA6AeC14b885fA27d0eBBd6`

### Step 3: Inherit and Request
Use the `TaaSConsumer` base contract to simplify your integration. It handles the state verification and hash checking for you.

```solidity
import "taas-contract/TaaSConsumer.sol";

contract MyContract is TaaSConsumer {
    constructor(address _sm) TaaSConsumer(_sm) {}
    // ...
}
```

## 4. Key Security Features
*   **Hash Verification**: By checking `keccak256(result) == storedHash`, you ensure that the raw data you receive is exactly what the TaaS Network reached consensus on.
*   **AVS State Check**: Checking the `completed` flag ensures you only accept results that have passed the full BFT (Byzantine Fault Tolerance) consensus and signature verification on EigenLayer.
*   **Challenge Power**: Because the `resultHash` is stored on the `ServiceManager`, the data is subject to the TaaS challenge window, allowing for economic slashing if nodes are caught misbehaving.
