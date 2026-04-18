"use client";

import React from "react";
import { motion } from "framer-motion";

const SECURITY_PILLARS = [
  {
    id: "01",
    title: "EigenLayer Restaking",
    technical: "TaaSServiceManager : ServiceManagerBase",
    body: "TaaS is registered as an EigenLayer Actively Validated Service. Operator stake is slashable on provable misbehaviour. Economic security scales with total restaked ETH, not a protocol token.",
    highlight: false,
  },
  {
    id: "02",
    title: "BLS Threshold Signatures",
    technical: "t-of-n BLS12-381 · 67% stake quorum",
    body: "No single node controls the result. A BLS aggregate signature is constructed from independent shares. A minority of malicious nodes cannot forge a valid aggregate.",
    highlight: false,
  },
  {
    id: "03",
    title: "Invariant Guard Layer",
    technical: "StalenessGuard · PriceJumpGuard · ViolationData",
    body: "Every consensus round runs staleness checks and deviation guards before aggregation. Guard violations are structured as ViolationData and fed into the on-chain reputation and slashing log.",
    highlight: true,
  },
  {
    id: "04",
    title: "V8 Isolate Sandboxing",
    technical: "Deno JsRuntime · max-old-space-size bounded",
    body: "Plugin code runs inside a memory-bounded V8 isolate. No filesystem access. No network access beyond the declared manifest endpoints. A rogue plugin cannot affect the host process.",
    highlight: false,
  },
  {
    id: "05",
    title: "Reputation-Weighted Consensus",
    technical: "ReputationEngine · stake + uptime + consistency",
    body: "Node power is derived from a composite of EigenLayer stake, historical uptime, and response consistency. Byzantine or inconsistent operators lose power before they lose stake.",
    highlight: false,
  },
  {
    id: "06",
    title: "TEE Hardware Attestation",
    technical: "Intel SGX · AWS Nitro Enclaves · TeeAttestation",
    body: "Nodes with compatible hardware generate hardware-signed attestation documents. The execution environment itself is provably authentic and tamper-free.",
    highlight: false,
  },
];

export const SecurityArchitecture: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            005 // Security Architecture
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-foreground leading-tight max-w-2xl">
            Trust is Layered,<br />Not Assumed.
          </h2>
          <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
            Security in TaaS is not a feature. It is the protocol architecture.
            Every layer independently constrains what a malicious participant can do.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border">
          {SECURITY_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`p-8 flex flex-col gap-4 border border-transparent neon-card ${
                pillar.highlight
                  ? "bg-primary/5 border-primary/15"
                  : "bg-background"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-foreground/25 uppercase tracking-widest">
                  Layer {pillar.id}
                </span>
                {pillar.highlight && (
                  <span className="font-mono text-[8px] uppercase tracking-widest text-primary/60 border border-primary/25 px-1.5 py-0.5">
                    Differentiator
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                {pillar.title}
              </h3>
              <code className="font-mono text-[10px] text-foreground/30 leading-relaxed break-words">
                {pillar.technical}
              </code>
              <p className="font-sans text-sm text-foreground/55 leading-relaxed flex-1">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityArchitecture;
