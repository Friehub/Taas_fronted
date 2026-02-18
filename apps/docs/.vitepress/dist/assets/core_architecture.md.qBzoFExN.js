import{_ as a,o as e,c as i,ae as n}from"./chunks/framework.Dn7Y7LSn.js";const k=JSON.parse('{"title":"TaaS Ecosystem Map","description":"","frontmatter":{},"headers":[],"relativePath":"core/architecture.md","filePath":"core/architecture.md"}'),t={name:"core/architecture.md"};function l(r,s,p,h,o,E){return e(),i("div",null,[...s[0]||(s[0]=[n(`<h1 id="taas-ecosystem-map" tabindex="-1">TaaS Ecosystem Map <a class="header-anchor" href="#taas-ecosystem-map" aria-label="Permalink to &quot;TaaS Ecosystem Map&quot;">​</a></h1><p>This document visually explains how the entire FrieHub TaaS ecosystem works, from the end-user application down to the individual node processes.</p><h2 id="_1-the-high-level-flow-life-of-a-request" tabindex="-1">1. The High-Level Flow (Life of a Request) <a class="header-anchor" href="#_1-the-high-level-flow-life-of-a-request" aria-label="Permalink to &quot;1. The High-Level Flow (Life of a Request)&quot;">​</a></h2><p>This diagram shows how data flows from a consumer (Prediction Market) through the TaaS network and back.</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant App as &quot;Prediction Market (User)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant Contract as &quot;TruthOracle (Chain)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant FrieHub as &quot;FrieHub Provider (Super Node)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant Network as &quot;Light Client (User Node)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant API as &quot;External API (SportMonks)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over App,Contract: Creates a Market &quot;Who won?&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    App-&gt;&gt;Contract: 1. Request Truth (Recipe: NFL_Winner)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over FrieHub: Listens for Request</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Contract-&gt;&gt;FrieHub: Event: TruthRequested</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FrieHub-&gt;&gt;API: 2. Fetch Data (uses Private Key)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    API--&gt;&gt;FrieHub: Result: &quot;Chiefs&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FrieHub-&gt;&gt;FrieHub: 3. Sign Data (creates &quot;Signed Packet&quot;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over FrieHub,Network: Publishes Packet to Network</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FrieHub-&gt;&gt;Network: 4. Broadcast Packet</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over Network: User&#39;s Laptop / Extension</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Network-&gt;&gt;Network: 5. Verify Signature</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Network-&gt;&gt;Contract: 6. Submit Transaction (Earn Reward)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over Contract: Verifies &amp; Finalizes</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Contract--&gt;&gt;App: 7. Callback: &quot;Chiefs&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    App-&gt;&gt;App: 8. Pay Out Winners</span></span></code></pre></div><hr><h2 id="_2-the-physical-architecture-component-map" tabindex="-1">2. The Physical Architecture (Component Map) <a class="header-anchor" href="#_2-the-physical-architecture-component-map" aria-label="Permalink to &quot;2. The Physical Architecture (Component Map)&quot;">​</a></h2><p>How the code is structured across repositories and services.</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;Application Layer (Consumers)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        PM[Prediction Market App]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        DeFi[DeFi Protocol]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        RWA[Real World Asset]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;The TaaS Network (The Truth)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Oracle[Smart Contract: TruthOracleV2]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        subgraph &quot;Data Provider Layer&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Provider[FrieHub Super Node]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            API_Keys[API Keys (SportMonks, etc)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Provider --&gt; API_Keys</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        subgraph &quot;Verification Layer (DePIN)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Client1[Light Client (Chrome Ext)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Client2[Light Client (CLI Node)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Client3[Light Client (Desktop App)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PM --&gt;|Reads| Oracle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Provider --&gt;|Publishes Signed Data| Client1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Provider --&gt;|Publishes Signed Data| Client2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Client1 --&gt;|Submits TX| Oracle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Client2 --&gt;|Submits TX| Oracle</span></span></code></pre></div><hr><h2 id="_3-inside-the-truth-node-the-engine" tabindex="-1">3. Inside the <code>truth-node</code> (The Engine) <a class="header-anchor" href="#_3-inside-the-truth-node-the-engine" aria-label="Permalink to &quot;3. Inside the \`truth-node\` (The Engine)&quot;">​</a></h2><p>The <code>truth-node</code> (also called the Sentinel) is the software that drives the <strong>Data Provider Layer</strong>. It is the &quot;brain&quot; that knows how to fetch and process data.</p><h3 id="internal-structure" tabindex="-1">Internal Structure <a class="header-anchor" href="#internal-structure" aria-label="Permalink to &quot;Internal Structure&quot;">​</a></h3><p>The codebase in <code>taas-core/nodes/truth-node</code> is organized into a robust pipeline:</p><ol><li><p><strong><code>TruthRelayer</code> (The Ear)</strong>:</p><ul><li><strong>Role</strong>: Listens to the blockchain events (<code>TruthRequested</code>).</li><li><strong>Action</strong>: When it hears a request, it creates a &quot;Job&quot; and pushes it to a Queue.</li><li><strong>Analogy</strong>: The receptionist taking orders.</li></ul></li><li><p><strong><code>TruthQueue</code> (The Buffer)</strong>:</p><ul><li><strong>Role</strong>: Manages the workload. Ensuring we don&#39;t crash if 1000 requests come in at once.</li><li><strong>Tech</strong>: Redis (BullMQ) or Memory Queue (Lite Mode).</li><li><strong>Analogy</strong>: The ticket line in a kitchen.</li></ul></li><li><p><strong><code>WorkerEngine</code> (The Brain)</strong>:</p><ul><li><strong>Role</strong>: Picks up a job and <em>executes</em> the Recipe.</li><li><strong>Action</strong>: Calls <code>@friehub/execution-engine</code> logic -&gt; Fetches Data -&gt; Signs it.</li><li><strong>Analogy</strong>: The chef cooking the meal.</li></ul></li><li><p><strong><code>RecipeExecutor</code> (The Hands)</strong>:</p><ul><li><strong>Role</strong>: The specific script runner.</li><li><strong>Action</strong>: Knows how to talk to SportMonks, calculate averages, or parse JSON interactively.</li><li><strong>Internal Tool</strong>: Uses <code>data-feeds</code> adapters.</li></ul></li></ol><h3 id="diagram-inside-the-node" tabindex="-1">Diagram: Inside the Node <a class="header-anchor" href="#diagram-inside-the-node" aria-label="Permalink to &quot;Diagram: Inside the Node&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Blockchain(TruthOracle Contract)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;Truth Node (Sentinel)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Relayer[TruthRelayer Service]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Queue[Job Queue (Redis)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Worker[Worker Engine]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Executor[Recipe Executor]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Signer[EIP-712 Signer]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    APIs((External APIs))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Blockchain -- &quot;Event: Requested&quot; --&gt; Relayer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Relayer -- &quot;Add Job&quot; --&gt; Queue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Queue -- &quot;Process Job&quot; --&gt; Worker</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Worker -- &quot;Run Logic&quot; --&gt; Executor</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Executor -- &quot;Fetch&quot; --&gt; APIs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    APIs -- &quot;Data&quot; --&gt; Executor</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Executor -- &quot;Result&quot; --&gt; Worker</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Worker -- &quot;Sign Payload&quot; --&gt; Signer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Signer -- &quot;Signed Packet&quot; --&gt; Blockchain</span></span></code></pre></div><h2 id="_4-why-this-matters-for-us" tabindex="-1">4. Why this matters for us? <a class="header-anchor" href="#_4-why-this-matters-for-us" aria-label="Permalink to &quot;4. Why this matters for us?&quot;">​</a></h2><ul><li><strong>Modular</strong>: If we want to add a new API (e.g., Weather), we only update <code>data-feeds</code> and the <code>Recipe</code>. The core Node logic (<code>Relayer</code> -&gt; <code>Queue</code> -&gt; <code>Worker</code>) stays exactly the same.</li><li><strong>Scalable</strong>: The Queue system means one node can handle thousands of requests per minute without dropping them.</li><li><strong>Secure</strong>: The <code>Signer</code> acts as the final gatekeeper. Even if the data fetch logic has a bug, the signature creates accountability.</li></ul>`,19)])])}const d=a(t,[["render",l]]);export{k as __pageData,d as default};
