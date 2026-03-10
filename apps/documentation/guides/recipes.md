# Natural Recipes (Templates)

One of the most powerful features of the TaaS ecosystem is the ability to define modular, reusable truth logic called **Natural Recipes**.

## The Problem: Redundant Coding

In legacy oracle systems, a developer might write custom code for every single sports match or financial asset they want to track. For a platform with thousands of markets like Polymarket, this is unscalable and error-prone.

## The TaaS Solution: Recipe Blueprints

A **Recipe Blueprint** is a "Natural Recipe" that defines a logic template once, which can then be instantiated thousands of times with different parameters.

### 1. Template Instantiation
Think of a Blueprint as a class and a specific match as an instance. 
- **Blueprint**: "Get the score for a specific Soccer Match ID."
- **Instance A**: "Chelsea vs Arsenal" (Match ID: 123).
- **Instance B**: "Real Madrid vs Barcelona" (Match ID: 456).

### 2. Cascading Discovery
Recipes in TaaS are "smart." They include a **Discovery Interface** that tells the UI how to fetch the inputs required for the template.
- The UI calls the Gateway Hive to get a list of "Upcoming Matches."
- The user picks a match from the dropdown.
- The Platform passes the Match ID to the `@friehub/taas-sdk`, which automatically instantiates the recipe for the network to resolve.

### 3. Modular Reusability
Natural Recipes can be shared and improved by the community. A high-quality "Financial Volatility" blueprint can be used by an options protocol, an insurance dApp, and a trading bot simultaneously—all benefitting from the same battle-tested logic.

---

## Summary of Benefits
- **Zero-Code Scaling**: Launch thousands of markets using a single template.
- **Dynamic UX**: Automate form generation via Cascading Discovery.
- **Professional SDK**: Use the TaaS SDK to compose templates with complex logic, multi-source validation, and custom resolution rules.

By moving from hardcoded values to **Natural Templates**, TaaS allows developers to build universal oracles that scale at the speed of the market.
