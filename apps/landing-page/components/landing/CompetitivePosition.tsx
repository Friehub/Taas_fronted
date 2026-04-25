"use client";

import React from "react";
import { motion } from "framer-motion";

const COMPARISON_ROWS = [
  {
    feature: "Security Model",
    taas: "Pooled Restaked Security (ETH)",
    standard: "Native Token Staking",
    optimistic: "Dispute Bonds (UMA/OO)",
  },
  {
    feature: "Execution Environment",
    taas: "Sandboxed V8 Isolates",
    standard: "External Adapters",
    optimistic: "Human/Bot Proposers",
  },
  {
    feature: "Consensus Finality",
    taas: "Threshold BLS (Immediate BFT)",
    standard: "Multi-sig Aggregation",
    optimistic: "Challenge Window (Delayed)",
  },
  {
    feature: "Data Complexity",
    taas: "Arbitrary (UCM Manifests)",
    standard: "Schema-restricted (Prices)",
    optimistic: "Arbitrary (Natural Language)",
  },
  {
    feature: "On-Chain Enforcement",
    taas: "AVS Slashable Commitments",
    standard: "Operator Reputation",
    optimistic: "Vote-based Resolution",
  },
];

export const CompetitivePosition: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            004 // Technical Archetypes
          </span>
          <h2 className="mt-6 text-4xl md:text-7xl font-display font-thin text-foreground leading-[1.1] max-w-3xl">
            Protocol <br /> <span className="italic font-bold">Differentiation.</span>
          </h2>
          <p className="mt-8 max-w-xl text-foreground font-sans leading-relaxed opacity-50">
            Comparing the architectural shifts from heritage reputational oracle models to the modern restaked AVS primitive.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-foreground/5">
                <th className="text-left py-6 pr-8 font-mono text-[9px] uppercase tracking-widest text-foreground/20 w-56">
                  Primitive
                </th>
                <th className="text-left py-6 px-4 font-display font-bold text-base text-foreground">
                  TaaS AVS
                </th>
                <th className="text-left py-6 px-4 font-display font-medium text-base text-foreground/30">
                  Standard Oracle
                </th>
                <th className="text-left py-6 px-4 font-display font-medium text-base text-foreground/30">
                  Optimistic Model
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-foreground/5 hover:bg-foreground/[0.01] transition-colors"
                >
                  <td className="py-6 pr-8 font-mono text-[10px] uppercase tracking-widest text-foreground/40 align-top">
                    {row.feature}
                  </td>
                  <td className="py-6 px-4 font-sans text-sm text-foreground font-bold align-top leading-relaxed">
                    {row.taas}
                  </td>
                  <td className="py-6 px-4 font-sans text-sm text-foreground/30 align-top leading-relaxed">
                    {row.standard}
                  </td>
                  <td className="py-6 px-4 font-sans text-sm text-foreground/30 align-top leading-relaxed">
                    {row.optimistic}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical Positioning Statement */}
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-16 p-10 border border-foreground/5 bg-foreground/[0.02] flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] uppercase tracking-widest text-primary-accent mb-4">Architectural Mandate</p>
            <p className="font-display font-medium text-2xl text-foreground leading-snug tracking-tight">
              TaaS bridges the gap between off-chain execution and on-chain settlement by anchoring arbitrary compute to the Ethereum restaking layer.
            </p>
          </div>
          <Link 
            href="https://docs.friehub.cloud" 
            className="whitespace-nowrap px-10 py-5 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-[10px]"
          >
            Review Specs
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitivePosition;
