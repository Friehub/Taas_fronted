# On-Chain Integration

After your recipe is live on the gateway, you can call it from any smart contract.

## 1. Requesting Truth
Call the `requestTruth` function on the `TruthOracle` contract.

```solidity
import "./ITruthOracle.sol";

contract MyBettingApp {
    ITruthOracle oracle;

    function checkResult(string memory recipeId, string memory inputs) external {
        // inputs is a JSON string of parameters
        oracle.requestTruth(recipeId, inputs);
    }
}
```

## 2. Handling the Outcome
The oracle will resolve the request and store the result. You can fetch it using the `requestId`.

```solidity
function finalize(bytes32 requestId) external {
    // Decoding a binary result (bool)
    bool isTrue = oracle.decodeBinary(requestId) == 1;
    
    if (isTrue) {
        // Execute your business logic
    }
}
```

## 3. Best Practices
- **Minimum Bond**: Ensure your contract sends enough $T or $ETH to cover the node resolution bond.
- **Verification**: In high-value scenarios, always check the `attestationCount` to ensure multiple nodes reached a consensus.
