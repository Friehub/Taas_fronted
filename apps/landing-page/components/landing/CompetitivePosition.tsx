"use client";

import React from "react";
import { motion } from "framer-motion";

const COMPARISON_ROWS = [
  {
    feature: "Data Domains",
    taas: "Any - defined by manifest",
    chainlink: "Price feeds, VRF, Automation",
    pyth: "Financial prices only",
    uma: "Arbitrary (optimistic)",
  },
  {
    feature: "Aggregation Strategy",
    taas: "MEDIAN · MAJORITY · STAKE_WEIGHTED · SUM · LATEST",
    chainlink: "Median only",
    pyth: "Weighted median",
    uma: "None (dispute-based)",
  },
  {
    feature: "Data Quality Guards",
    taas: "Staleness + Deviation (per-manifest)",
    chainlink: "Circuit breakers (manual)",
    pyth: "Confidence interval",
    uma: "Disputer must challenge",
  },
  {
    feature: "Plugin / Adapter Model",
    taas: "TypeScript plugins in V8 isolates",
    chainlink: "External adapters (any language)",
    pyth: "Whitelisted publishers only",
    uma: "Any proposer (no execution)",
  },
  {
    feature: "Consensus Mechanism",
    taas: "Stake-weighted BFT + BLS threshold",
    chainlink: "Stake-weighted aggregation",
    pyth: "Publisher-weighted",
    uma: "Optimistic + dispute window",
  },
  {
    feature: "Economic Security",
    taas: "EigenLayer AVS restaking",
    chainlink: "Native LINK staking",
    pyth: "Publisher reputation",
    uma: "OO bond / UMA staking",
  },
  {
    feature: "TEE Hardware Attestation",
    taas: "Intel SGX + AWS Nitro (native)",
    chainlink: "DECO (research only)",
    pyth: "None",
    uma: "None",
  },
  {
    feature: "On-Chain Value Encoding",
    taas: "ABI-encoded uint256 (in progress)",
    chainlink: "int256 (standardised)",
    pyth: "Price struct (fixed-point)",
    uma: "bytes (arbitrary)",
  },
];

const COL_HEADER = [
  { key: "taas", label: "TaaS", highlight: true },
  { key: "chainlink", label: "Chainlink", highlight: false },
  { key: "pyth", label: "Pyth", highlight: false },
  { key: "uma", label: "UMA", highlight: false },
];

export const CompetitivePosition: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6 bg-surface-low/10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            004 // Competitive Position
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-light text-foreground leading-tight max-w-2xl">
            Where TaaS Fits in the Oracle Landscape.
          </h2>
          <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
            We are not a Chainlink fork. We are not another price feed service.
            TaaS is the first oracle designed from the ground up for general data
            with institutional quality enforcement at every layer.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left py-4 pr-6 font-mono text-[9px] uppercase tracking-widest text-foreground/30 w-48">
                  Feature
                </th>
                {COL_HEADER.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left py-4 px-4 font-display font-bold text-sm ${
                      col.highlight
                        ? "text-foreground border-b-2 border-primary"
                        : "text-foreground/40"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-surface-border group hover:bg-surface-low/30 transition-colors duration-200"
                >
                  <td className="py-4 pr-6 font-mono text-[10px] uppercase tracking-widest text-foreground/40 align-top">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-foreground font-semibold align-top leading-relaxed">
                    {row.taas}
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-foreground/40 align-top leading-relaxed">
                    {row.chainlink}
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-foreground/40 align-top leading-relaxed">
                    {row.pyth}
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-foreground/40 align-top leading-relaxed">
                    {row.uma}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 border border-surface-border bg-surface-low/30 backdrop-blur-sm"
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/40 mb-3">
            Strategic Position
          </p>
          <p className="font-display font-semibold text-xl text-foreground leading-snug max-w-3xl">
            TaaS targets the gap that Chainlink Functions identified but did not solve:
            general computation with verifiable results, institutional data quality enforcement,
            and multi-chain settlement natively, without a LINK tax.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitivePosition;
