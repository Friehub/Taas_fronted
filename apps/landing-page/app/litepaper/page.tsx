"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronRightIcon, 
  LayersIcon, 
  ShuffleIcon, 
  LockIcon, 
  ActivityIcon, 
  BookOpenIcon, 
  ArrowRightIcon, 
  FileTextIcon,
  ShieldCheckIcon,
  CpuIcon,
  TerminalIcon
} from "lucide-react";
import dynamic from "next/dynamic";

const Mermaid = dynamic(() => import("@/components/shared/Mermaid"), { ssr: false });

/**
 * LitepaperPage - High-fidelity protocol documentation.
 * Styled with an institutional, PURE MONOCHROME aesthetic.
 */
export default function LitepaperPage() {
  const [activeSection, setActiveSection] = useState("abstract");

  const sections = [
    { id: "abstract", title: "Abstract" },
    { id: "gap", title: "The Oracle Gap" },
    { id: "architecture", title: "3-Plane Architecture" },
    { id: "lifecycle", title: "Truth Lifecycle" },
    { id: "security", title: "Economic Integrity" },
    { id: "ecosystem", title: "Plugin Ecosystem" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const glossary = [
    { term: "AVS", definition: "Actively Validated Service - A protocol secured by EigenLayer's restaking framework." },
    { term: "BLS", definition: "Boneh-Lynn-Shacham - A cryptographic signature scheme that allows many signatures to be aggregated into one." },
    { term: "TEE", definition: "Trusted Execution Environment - Hardware-level isolation (e.g., Intel SGX) for secure computation." },
    { term: "eBPF", definition: "Extended Berkeley Packet Filter - A kernel technology used to monitor and restrict sandbox system calls." },
  ];

  const architectureChart = `
    graph TD
      subgraph Settlement["Settlement Plane (Solidity)"]
        SM[Service Manager]
        Reg[Registry]
      end

      subgraph Orchestration["Orchestration Plane (Rust)"]
        Kernel[Execution Kernel]
        P2P[Consensus Mesh]
      end

      subgraph Runtime["Runtime Plane (Sandbox)"]
        V8[V8 Isolate]
        Plugin[Deno Plugin]
      end
      
      Settlement <--> Orchestration
      Orchestration <--> Runtime

      style Settlement fill:#111,stroke:#333,color:#eee
      style Orchestration fill:#111,stroke:#333,color:#eee
      style Runtime fill:#111,stroke:#333,color:#eee
      style SM fill:#1A1C1F,stroke:#E2E2E6,color:#E2E2E6
      style Kernel fill:#1A1C1F,stroke:#E2E2E6,color:#E2E2E6
      style V8 fill:#1A1C1F,stroke:#E2E2E6,color:#E2E2E6
  `;

  const lifecycleChart = `
    sequenceDiagram
        autonumber
        participant SC as Smart Contract
        participant EVM as Settlement (AVS)
        participant KN as Rust Kernel
        participant RT as Runtime (Plugin)
        participant P2P as P2P Mesh

        Note over SC, EVM: 1. Request Phase
        SC->>EVM: createNewTask()
        EVM-->>KN: emit TruthRequested

        Note over KN, RT: 2. Execution Phase
        KN->>RT: execute_plugin()
        RT-->>KN: return Evidence

        Note over KN, P2P: 3. Consensus Phase
        KN->>P2P: Gossip Signature Share
        P2P-->>KN: Reached 67% Quorum

        Note over KN, SC: 4. Settlement Phase
        KN->>EVM: respondWithSignature()
        EVM-->>SC: emit TaskResponded
  `;

  // Intersection Observer for sticky TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Sidebar: Sticky Navigation */}
        <aside className="lg:w-[280px] space-y-12 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-foreground/40 text-[8px] uppercase tracking-[0.3em] font-bold">
              <FileTextIcon size={12} />
              <span>Protocol Specification</span>
            </div>
            <nav className="flex flex-col space-y-4">
              {sections.map((section, i) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className={`text-left text-xs font-mono uppercase tracking-widest transition-all hover:translate-x-1 ${
                    activeSection === section.id ? "text-foreground font-black border-l-2 border-foreground/80 pl-4" : "text-foreground/30 hover:text-foreground/60 pl-4"
                  }`}
                >
                  <span className="mr-3 opacity-30">0{i + 1}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Institutional Download */}
          <div className="p-6 surface-depth rounded-xl border border-surface-border space-y-4 group cursor-pointer hover:border-foreground/30 transition-all">
             <div className="text-[8px] text-foreground/40 uppercase tracking-widest">Available Formats</div>
             <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground/80 lowercase font-serif">lite_paper_v1.0.pdf</span>
                <ArrowRightIcon size={12} className="text-foreground/20 group-hover:text-foreground transition-all group-hover:translate-x-1" />
             </div>
          </div>

          {/* Glossary */}
          <div className="space-y-8 pt-8 border-t border-surface-border">
             <div className="text-foreground/30 text-[8px] tracking-[0.4em] uppercase font-bold">Key Definitions</div>
             <div className="space-y-6">
                 {glossary.map(item => (
                   <div key={item.term} className="space-y-2 group">
                      <span className="text-xs font-mono text-foreground/50 group-hover:text-foreground transition-colors font-bold tracking-widest uppercase">{item.term}</span>
                      <p className="text-sm text-foreground/40 leading-relaxed font-sans">{item.definition}</p>
                   </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 max-w-4xl space-y-20 order-1 lg:order-2">
           {/* Document Header */}
           <header className="space-y-8">
              <h1 className="text-5xl md:text-8xl font-display font-thin text-foreground leading-[0.95] tracking-tighter">
                Truth as a <br />
                <span className="text-foreground/80">Service.</span>
              </h1>

              <div className="flex flex-wrap gap-8 text-[10px] font-mono text-foreground/30 font-bold tracking-[0.2em] uppercase">
                 <div className="flex flex-col gap-1">
                    <span className="text-foreground/20">Authors</span>
                    <span className="text-foreground/60">Friehub</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-foreground/20">Category</span>
                    <span className="text-foreground/60">Light Paper</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-foreground/20">Security</span>
                    <span className="text-foreground/60">EigenLayer AVS</span>
                 </div>
              </div>
           </header>

           {/* Content Sections */}
           <article className="space-y-32">
              
              {/* 1. Abstract */}
              <section id="abstract" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                  <span className="h-px w-8 bg-foreground/30" />
                  <span>Abstract</span>
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-lg text-foreground/70 leading-relaxed font-sans">
                  <p>
                    TaaS (Truth as a Service) is a general-purpose decentralized oracle network implemented as an Actively Validated Service (AVS) on the EigenLayer restaking framework. It enables any smart contract on any EVM-compatible chain to request, receive, and cryptographically verify real-world data — secured by aggregated BLS threshold signatures and economic accountability enforced by restaked ETH.
                  </p>
                  <p>
                    TaaS separates the <strong>transport layer</strong> (how data is attested and settled) from the <strong>data layer</strong> (what data is fetched). The transport layer is a hardened Rust-native protocol, while the data layer is an open-contribution plugin ecosystem running in sandboxed environments.
                  </p>
                </div>
              </section>

              {/* 2. The Gap */}
              <section id="gap" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                  <span className="h-px w-8 bg-foreground/30" />
                  <span>The Oracle Resilience Gap</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Operational Complexity", desc: "High barriers to node operation reduce operator diversity and censorship resistance." },
                    { title: "Extension Friction", desc: "Adding new data sources requires permissioned integration with core teams." },
                    { title: "Opacity", desc: "The path from an API call to an on-chain transaction is often a black box." }
                  ].map((item, i) => (
                    <div key={i} className="surface-depth p-8 rounded-2xl border border-surface-border hover:border-foreground/20 transition-all group">
                      <div className="text-[10px] font-mono text-foreground/20 mb-4 tracking-widest uppercase">Issue_0{i+1}</div>
                      <h4 className="text-sm font-bold text-foreground/90 uppercase tracking-widest mb-3">{item.title}</h4>
                      <p className="text-[11px] text-foreground/50 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Architecture */}
              <section id="architecture" className="scroll-mt-32 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                    <span className="h-px w-8 bg-foreground/30" />
                    <span>The 3-Plane Model</span>
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed font-sans max-w-2xl">
                    TaaS achieves institutional-grade integrity by decoupling responsibilities into three logical planes, ensuring that even if one component is compromised, the integrity of the truth remains intact.
                  </p>
                </div>

                {/* Mermaid Architecture Visualization */}
                <div className="surface-depth rounded-[32px] p-8 border border-surface-border relative overflow-hidden group min-h-[400px] flex items-center justify-center">
                   <Mermaid chart={architectureChart} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                   <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40">
                         <ShieldCheckIcon size={20} />
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">Solidity Layer</h5>
                      <p className="text-[11px] text-foreground/50 leading-relaxed">Management of EigenLayer restaking, operator registry, and BLS quorum verification.</p>
                   </div>
                   <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40">
                         <CpuIcon size={20} />
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">Rust Kernel</h5>
                      <p className="text-[11px] text-foreground/50 leading-relaxed">High-concurrency orchestration for P2P gossip, identity, and consensus signing.</p>
                   </div>
                   <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40">
                         <TerminalIcon size={20} />
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">V8 Sandbox</h5>
                      <p className="text-[11px] text-foreground/50 leading-relaxed">Isolated execution environment for plugins with kernel-level eBPF monitoring.</p>
                   </div>
                </div>
              </section>

              {/* 4. Lifecycle */}
              <section id="lifecycle" className="scroll-mt-32 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                    <span className="h-px w-8 bg-foreground/30" />
                    <span>The Truth Lifecycle</span>
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed font-sans max-w-2xl">
                    TaaS eliminates centralized job distributors through <strong>Capability-Sharded P2P Routing</strong>. Nodes only receive and process requests for which they have installed plugins.
                  </p>
                </div>

                {/* Mermaid Lifecycle Visualization */}
                <div className="bg-surface-low border border-surface-border rounded-3xl p-8 overflow-hidden min-h-[500px] flex items-center justify-center">
                   <Mermaid chart={lifecycleChart} className="opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </section>

              {/* 5. Security */}
              <section id="security" className="scroll-mt-32 space-y-12">
                 <div className="space-y-6">
                  <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                    <span className="h-px w-8 bg-foreground/30" />
                    <span>Economic Integrity & Consensus</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8 p-12 bg-surface-low rounded-[32px] border border-surface-border">
                      <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] font-bold">Sybil Resistance</div>
                      <h4 className="text-xl font-bold text-foreground leading-snug">Log-Weighted Staking Power</h4>
                      <p className="text-sm text-foreground/50 leading-relaxed">
                        To prevent plutocratic capture, TaaS uses a logarithmic weighting for staking influence. This creates diminishing returns for capital concentration.
                      </p>
                      <div className="bg-background/80 p-8 rounded-2xl border border-surface-border font-mono text-center space-y-2">
                        <div className="text-xl text-foreground font-black">Power = Rep × log(Stake)</div>
                        <div className="text-[9px] text-foreground/30 uppercase tracking-widest leading-relaxed">
                           Institutional Sybil Resistance Baseline
                        </div>
                      </div>
                   </div>

                   <div className="space-y-8 p-12 bg-surface-low rounded-[32px] border border-surface-border">
                      <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] font-bold">Liveness Guard</div>
                      <h4 className="text-xl font-bold text-foreground leading-snug">Adaptive Quorum Thresholds</h4>
                      <p className="text-sm text-foreground/50 leading-relaxed">
                        The network maintains absolute safety with a 67% threshold, but adapts to current active power after safety windows to prevent deadlocks.
                      </p>
                      <div className="bg-background/80 p-8 rounded-2xl border border-surface-border font-mono text-center space-y-2">
                        <div className="text-xl text-foreground font-black">Σ Signers ≥ 0.67 × P_active</div>
                        <div className="text-[9px] text-foreground/30 uppercase tracking-widest leading-relaxed">
                           BFT Consensus at Industrial Scale
                        </div>
                      </div>
                   </div>
                </div>

                <div className="p-12 surface-depth rounded-[32px] border border-surface-border flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1 space-y-6">
                      <h4 className="text-2xl font-display font-thin text-foreground">The 3-Pillar Reputation Model</h4>
                      <p className="text-sm text-foreground/60 leading-relaxed italic">
                        "Truth requires proof of past performance, not just presence of capital."
                      </p>
                      <div className="space-y-4">
                         {[
                           { label: "Consistency", value: "50%", color: "bg-foreground/80" },
                           { label: "Availability", value: "30%", color: "bg-foreground/40" },
                           { label: "Performance", value: "20%", color: "bg-foreground/20" }
                         ].map(bar => (
                           <div key={bar.label} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                 <span className="text-foreground/40">{bar.label}</span>
                                 <span className="text-foreground/80">{bar.value}</span>
                              </div>
                              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                                 <div className={`h-full ${bar.color}`} style={{ width: bar.value }} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="flex-1 text-[11px] text-foreground/40 leading-relaxed space-y-6 border-l border-surface-border pl-12 font-sans">
                      <p>
                        Node influence is driven by historical performance. Consistency penalties are weighted 5x heavier than rewards to ensure long-term accountability.
                      </p>
                      <p>
                        Reputation decays toward a neutral baseline over a 24-hour window, forcing participants to remain actively engaged to retain their network influence.
                      </p>
                   </div>
                </div>
              </section>

              {/* 6. Ecosystem */}
              <section id="ecosystem" className="scroll-mt-32 space-y-12">
                 <div className="space-y-6">
                  <h2 className="text-3xl font-display font-thin text-foreground tracking-tight flex items-center space-x-4">
                    <span className="h-px w-8 bg-foreground/30" />
                    <span>Open Plugin Ecosystem</span>
                  </h2>
                </div>

                <div className="surface-depth overflow-hidden rounded-[32px] border border-surface-border flex flex-col items-center">
                   <div className="w-full bg-background/50 p-6 border-b border-surface-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                         <div className="flex space-x-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                         </div>
                         <span className="ml-4 text-[9px] font-mono text-foreground/30 uppercase tracking-[0.2em]">crypto_plugin_adapter.ts</span>
                      </div>
                      <div className="h-1 w-24 bg-foreground/10 rounded-full" />
                   </div>
                   <div className="w-full p-12 bg-background/20 font-mono text-xs text-foreground/60 leading-relaxed overflow-x-auto">
<pre>{`class PricePlugin extends GatewayAdapter {
  async fetchData(params) {
    const res = await this.http.get('https://api.domain.com/v1/price', {
      symbol: params.ticker,
    });
    return this.normalize(res.data);
  }
}`}</pre>
                   </div>
                   <div className="w-full p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-low border-t border-surface-border">
                      <div className="flex gap-4">
                         <BookOpenIcon className="text-foreground/40 shrink-0" size={24} />
                         <div className="space-y-2">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground">50ms Fast Execution</h5>
                            <p className="text-[11px] text-foreground/40 leading-relaxed">Isolate-based runtime provides sub-second latency for complex data logic.</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <ShuffleIcon className="text-foreground/40 shrink-0" size={24} />
                         <div className="space-y-2">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Hot-Reloader</h5>
                            <p className="text-[11px] text-foreground/40 leading-relaxed">Update plugin logic dynamically without requiring a node restart.</p>
                         </div>
                      </div>
                   </div>
                </div>
              </section>

              {/* 7. Conclusion */}
              <section id="conclusion" className="scroll-mt-32 space-y-12 pb-24 text-center">
                 <div className="h-px w-full bg-surface-border mb-24" />
                 <h2 className="text-5xl md:text-7xl font-display font-thin text-foreground tracking-tighter">
                   The Truth Layer for the <br />
                   <span className="text-foreground/80">Programmable Economy.</span>
                 </h2>
                 <p className="text-xl text-foreground/50 font-sans max-w-2xl mx-auto leading-relaxed">
                   Decoupling trust infrastructure from data sourcing.
                   Hardened by Rust, secured by EigenLayer.
                 </p>
                 <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/#oracle" className="rounded-full px-10 py-4 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs transition-colors hover:bg-foreground/90">
                       Back to Portal
                    </Link>
                    <button className="rounded-full surface-depth px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground border border-surface-border hover:bg-foreground/5 transition-all">
                       Developer FAQ
                    </button>
                 </div>
              </section>

           </article>
        </main>
      </div>
    </div>
  );
}
