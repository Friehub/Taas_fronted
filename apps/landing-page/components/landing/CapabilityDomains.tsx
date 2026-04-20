"use client";

import React from "react";
import { motion } from "framer-motion";

const DOMAINS = [
  {
    category: "DeFi & Finance",
    capability: "crypto.price",
    strategy: "MEDIAN",
    guards: ["staleness: 300s", "deviation: ±10%"],
    sources: 3,
    description: "Multi-source price aggregation with outlier rejection. Byzantine resistant by design.",
  },
  {
    category: "Sports & Prediction Markets",
    capability: "sports.football.score",
    strategy: "MAJORITY",
    guards: ["staleness: 3600s"],
    sources: 3,
    description: "Categorical consensus for match results. Structured event data with score bounds validation.",
  },
  {
    category: "Real-World & Climate",
    capability: "taas.v2.weather.current",
    strategy: "MEAN",
    guards: ["staleness: 600s", "deviation: ±50%"],
    sources: 2,
    description: "JSONPath field mapping from heterogeneous provider formats to a unified schema.",
  },
  {
    category: "On-Chain Balances",
    capability: "crypto.balance",
    strategy: "SUM",
    guards: [],
    sources: 1,
    description: "Deterministic on-chain reads. Single source, no aggregation ambiguity.",
  },
  {
    category: "Custom Compute",
    capability: "custom.*",
    strategy: "STAKE_WEIGHTED",
    guards: ["custom invariants"],
    sources: "N",
    description: "Any JSON schema. Define your ontology, guards, and strategy in a manifest file. Ship a plugin.",
  },
  {
    category: "TEE Attestation",
    capability: "*.attestation",
    strategy: "MAJORITY",
    guards: ["hardware-bound"],
    sources: 1,
    description: "Intel SGX and AWS Nitro hardware attestation. Cryptographic proof of execution environment.",
  },
];

export const CapabilityDomains: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            003 // Capability Domains
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-thin text-foreground leading-tight max-w-3xl">
            Any Data Category.
            <br />
            One Protocol.
          </h2>
          <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
            The Unified Capability Model (UCM) treats each data domain as a manifest.
            Each manifest declares its own schema, guards, and aggregation strategy.
            The protocol enforces them all the same way.
          </p>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border">
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.capability}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-background p-7 flex flex-col gap-4 neon-card border border-transparent group"
            >
              {/* Domain label */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">
                  {domain.category}
                </span>
                <span className="font-mono text-[9px] text-primary/50 border border-primary/20 px-2 py-0.5">
                  {domain.strategy}
                </span>
              </div>

              {/* Capability ID */}
              <code className="font-mono text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                {domain.capability}
              </code>

              {/* Description */}
              <p className="font-sans text-xs text-foreground/50 leading-relaxed flex-1">
                {domain.description}
              </p>

              {/* Footer meta */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/25">
                  min_sources: {domain.sources}
                </span>
                {domain.guards.map((g) => (
                  <span
                    key={g}
                    className="font-mono text-[9px] uppercase tracking-widest text-foreground/20 bg-surface-low px-2 py-0.5"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 border border-surface-border bg-surface-low/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="font-display font-semibold text-foreground text-base">
              Missing a domain?
            </p>
            <p className="font-sans text-sm text-foreground/50 mt-1">
              Write a plugin in TypeScript and a manifest in JSON. That is the entire integration surface.
            </p>
          </div>
          <button className="whitespace-nowrap surface-depth px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all border border-surface-border">
            Read Plugin SDK →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilityDomains;
