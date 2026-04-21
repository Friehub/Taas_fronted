"use client";

import React from "react";
import { motion } from "framer-motion";

const PROBLEMS = [
  {
    problem: "Monolithic data schemas",
    reality: "Chainlink and Pyth lock you into their format. Price feeds only. No custom data types.",
    solved: "The UCM accepts any JSON schema. Define your ontology in a manifest file. No code changes.",
  },
  {
    problem: "No data quality layer",
    reality: "Raw plugin output goes straight to consensus. Stale, spiked, and spoofed values are treated equally.",
    solved: "Every response passes through StalenessGuard and DeviationGuard before reaching aggregation. Violating nodes are flagged for slashing.",
  },
  {
    problem: "Trust the data provider",
    reality: "Most networks rely on operator reputation with no on-chain enforcement mechanism.",
    solved: "ViolationData from every consensus round feeds directly into on-chain reputation. Operators are slashed proportionally via EigenLayer.",
  },
  {
    problem: "Single aggregation strategy",
    reality: "Median works for prices. It is wrong for sports scores, state hashes, and compute results.",
    solved: "MEDIAN, MAJORITY, STAKE_WEIGHTED, SUM, and LATEST are all first-class strategies. Each capability manifest selects its own.",
  },
];

export const ProblemStatement: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            001 // The Unsolved Problem
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-thin text-foreground leading-tight max-w-2xl">
            The Oracle Industry Has Not Solved General Data.
          </h2>
          <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
            Every major oracle network today is a price feed with extra steps.
            The infrastructure underneath was never designed for arbitrary data at
            institutional quality.
          </p>
        </div>

        {/* Problem / Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-border">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 32, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8 flex flex-col gap-5 neon-card border border-transparent"
              style={{ transformOrigin: "top center", perspective: "1000px" }}
            >
              {/* Problem */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/25">
                  Industry Default
                </span>
                <h3 className="font-display font-thin text-lg text-foreground/80 line-through decoration-foreground/20">
                  {item.problem}
                </h3>
                <p className="font-sans text-sm text-foreground/40 leading-relaxed">
                  {item.reality}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-surface-border w-full" />

              {/* Solution */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/60">
                  TaaS Resolution
                </span>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed font-medium">
                  {item.solved}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
