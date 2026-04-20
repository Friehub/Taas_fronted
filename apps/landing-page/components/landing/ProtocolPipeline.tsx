"use client";

import React from "react";
import { motion } from "framer-motion";

const PIPELINE_STEPS = [
  {
    index: "01",
    title: "On-Chain Request",
    technical: "TruthRequested(chainId, sessionId, capability, params, strategy)",
    description:
      "A smart contract emits a TruthRequested event with a capability ID and JSON params. Any EVM chain is supported natively.",
    tag: "ChainSentinel · Multi-Chain Adapter",
  },
  {
    index: "02",
    title: "Plugin Execution",
    technical: "Deno Isolate → execute_node(FetchRequest) → raw JSON",
    description:
      "A sandboxed V8 isolate executes the registered plugin for the capability. Memory and CPU are strictly bounded. The plugin returns raw JSON.",
    tag: "Sovereign Runtime · V8 Sandbox",
  },
  {
    index: "03",
    title: "Data Quality Layer",
    technical: "UCM: JSONPath mapping → Schema validation → StalenessGuard → DeviationGuard",
    description:
      "Raw output is normalized against the capability ontology, checked for staleness and price deviation. Failing sources are logged as ViolationData for slashing evidence.",
    tag: "UCM · Invariant Guards",
  },
  {
    index: "04",
    title: "Strategy Aggregation",
    technical: "MEDIAN | MAJORITY | STAKE_WEIGHTED | SUM | LATEST",
    description:
      "The manifest-specified strategy aggregates all passing sources into a single TruthPoint with a confidence score and source count.",
    tag: "Unified Capability Model",
  },
  {
    index: "05",
    title: "BFT Consensus",
    technical: "Stake-weighted quorum → BLS share exchange → 67% threshold",
    description:
      "Nodes gossip ConsensusProposals. Stake-weighted power is accumulated. When 67% of active stake agrees, the round is finalized.",
    tag: "P2P Gossip · ConsensusManager",
  },
  {
    index: "06",
    title: "Threshold Signature & Relay",
    technical: "BLS Aggregate → respondWithSignature(sessionId, resultHash, sig)",
    description:
      "A single aggregated BLS signature is constructed from individual node shares and relayed on-chain by the elected leader. Disputes trigger the slashing window.",
    tag: "BLS · RelayerManager · EigenLayer",
  },
];

export const ProtocolPipeline: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6 bg-surface-low/20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            002 // The Protocol
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-thin text-foreground leading-tight max-w-2xl">
            Six Layers.
            <br />
            One Verified Truth.
          </h2>
          <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
            From the moment a contract emits a request to the moment the verified result
            is settled on-chain, every step is enforced - not trusted.
          </p>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] md:left-[43px] top-0 bottom-0 w-px bg-surface-border" />

          <div className="flex flex-col gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="relative flex gap-6 md:gap-10 pl-14 md:pl-24 py-8 border-b border-surface-border last:border-b-0 group"
              >
                {/* Step Number */}
                <div className="absolute left-0 top-8 flex items-center justify-center h-[54px] w-[54px] md:h-[86px] md:w-[86px] border border-surface-border bg-background group-hover:border-primary/30 transition-colors duration-500">
                  <span className="font-mono text-[10px] md:text-xs text-foreground/30 group-hover:text-primary/60 transition-colors duration-500">
                    {step.index}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-thin text-xl text-foreground">{step.title}</h3>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-primary/50 border border-primary/20 px-2 py-0.5 whitespace-nowrap">
                      {step.tag}
                    </span>
                  </div>
                  <code className="font-mono text-[11px] text-foreground/35 leading-relaxed break-all">
                    {step.technical}
                  </code>
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtocolPipeline;
