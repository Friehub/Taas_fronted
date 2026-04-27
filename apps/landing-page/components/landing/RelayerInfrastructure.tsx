"use client";

import React from "react";
import RelayerFlowDiagram from "./RelayerFlowDiagram";

export const RelayerInfrastructure: React.FC = () => {
  return (
    <section id="infrastructure" className="relative w-full py-28 px-6 bg-surface-low/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Narrative / Context */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
                006 // High-Fidelity Infrastructure
              </span>
              <h2 className="mt-4 text-4xl md:text-6xl font-display font-thin text-foreground leading-tight max-w-2xl">
                The Relayer Hub.<br />Global Settlement.
              </h2>
              <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
                Consensus is only the beginning. The <strong>Friehub Relayer Hub</strong> is the production-grade backbone that transforms verified truth into on-chain action. 
                Using a <strong>clustered push-architecture</strong>, it delivers millisecond latency and sovereign settlement across any network.
              </p>
            </div>

            {/* Obsessive Math Display - Clustered Nonce Mgmt */}
            <div className="neon-card border border-surface-border p-8 space-y-6 relative overflow-hidden bg-background">
               <div className="absolute top-4 right-4 text-[8px] font-mono opacity-10 uppercase tracking-widest">
                 NATS_GOSSIP_SYNC_v1.2
               </div>

               <div className="space-y-4">
                  <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
                    Cluster Distribution Ratio:
                  </div>
                  <div className="text-2xl font-mono text-foreground font-bold tracking-tighter">
                    Σ(Signatures) &gt; Quorum → T<span className="text-[10px] align-sub text-foreground/60">tx</span> &lt; 250ms
                  </div>
               </div>

               <div className="pt-4 border-t border-surface-border grid grid-cols-2 gap-4">
                  <div className="space-y-1" title="NATS Message Distribution">
                    <div className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest">Fan-Out Latency</div>
                    <div className="text-xs font-mono text-foreground/80">~15ms (Global)</div>
                  </div>
                  <div className="space-y-1" title="Clustered Nonce Management">
                    <div className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest">Atomic Nonces</div>
                    <div className="text-xs font-mono text-foreground/80">Synchronized Hash-Lock</div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">
                  <strong>Zero-Cost RPC Isolation:</strong> Decouples nodes from public infrastructure, eliminating hardware barriers.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">
                  <strong>Clustered High-Availability:</strong> Multi-region NATS topology ensures zero downtime for truth settlement.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3-Plane Architecture Diagram */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
             <RelayerFlowDiagram />
          </div>

        </div>
      </div>
    </section>
  );
};

export default RelayerInfrastructure;
