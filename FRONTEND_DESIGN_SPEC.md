# TaaS Frontend: Design & Architecture Specification

## 1. Product Context
**TaaS (Truth as a Service)** is an Institutional Oracle AVS built on EigenLayer. The frontend must bridge the gap between complex cryptographic infrastructure and high-fidelity operational transparency. It serves three distinct personas:
1. **Consumers (Developers/Protocols)**: Need to understand the "Truth" and how to integrate it.
2. **Operators (Node Managers)**: Need "Mission Control" for health, stake, and rewards.
3. **Ecosystem (Analysts/Governance)**: Need proof of network integrity and decentralization.

---

## 2. Visual Identity: "The Oracle Aesthetic"
We move away from generic "AI" branding toward a **High-End Engineering Blueprint** aesthetic.

### Core Design Tokens
- **Theme**: Dark Primary (Charcoal/Mint), Light Secondary (Cloud/Forest).
- **Primary Color**: `#49E774` (Mint Green - representing "Success" and "Truth").
- **Surface Color**: `#111316` (Deep Charcoal - representing "Stability").
- **Typography**:
    - **Space Grotesk** (Display): For technical power and grit.
    - **Manrope** (Body): For geometric legibility.
- **The "No-Line" Rule**: Boundaries are defined by light/tonal shifts (`surface-low` to `surface`) rather than 1px borders.
- **Visual Texture**: Layered grain overlays and architectural "blueprint" grids.

---

## 3. Page Architecture

### A. Marketing Landing (Institutional Story)
*   **Narrative**: "Any Data. Any Chain. No Setup."
*   **Key Sections**: Hero (Blueprint), Supported Chains, Bento Capabilities, Logic-Proof, Institutional Footer.
*   **Goal**: Conversion and brand positioning.

### B. Network Explorer (The Live Source)
*   **The Pulse**: Real-time feed of `TruthRequests` and `Attestations`.
*   **Global Node Map**: 3D visualization of the P2P Gossip mesh.
*   **VEE Telemetry**: Per-capability latency, success rates, and volume metrics.
*   **Goal**: Transparency and proof of decentralization.

### C. Operator Dashboard (Mission Control)
*   **Gateway Manager**: Local node health, gRPC status, and hot-reload controls.
*   **Earnings & Stake**: Merkle proof reward claims and EigenLayer staking integration.
*   **Vault Management**: UI for managing encrypted secrets and keys.
*   **Goal**: Operational efficiency.

### D. Developer Sandbox (Plugin Playground)
*   **Live Code Editor**: Write TypeScript snippets and see the `PluginManifest` boundary in real-time.
*   **Simulation Environment**: Mock `TruthRequests` to verify plugin logic before deployment.
*   **Documentation Library**: Interactive API references and SDK guides.
*   **Goal**: Developer adoption.

---

## 4. Technical Implementation Strategy

### Tech Stack
| Tier | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Performance, SEO, and route-based state. |
| **Styling** | Tailwind CSS + Vanilla CSS | Atomic styling with custom "Blueprint" utilities. |
| **Motion** | Framer Motion | High-performance interaction design (Cubic Bezier curves). |
| **Icons** | Radix Icons / Lucide | Crisp, technical, and lightweight. |
| **State** | React Query + Redux | Real-time telemetry sync + complex dashboard state. |
| **Web3** | Viem / Wagmi | Low-level EIP-712 and EigenLayer interaction. |

### Component Design Pattern
We will use a **"Utility-First Component Architecture"**:
- **`Surface`**: A primitive for background layers that respects the No-Line rule.
- **`BlueprintGrid`**: A CSS/SVG overlay utility for architectural depth.
- **`GlassPremium`**: High-blur backdrop utility for overlays and navigation.

---

## 5. Development Roadmap
1. **Foundation**: Build the core Design System (Tailwind config, global CSS, shared primitives).
2. **Identity**: Overhaul the Landing Page to the institutional blueprint standard.
3. **Execution**: Implement the Explorer and Dashboard as high-fidelity internal apps.
4. **Polish**: Final motion-design audit and multi-chain awareness verification.
