"use client";

import React from "react";
import { motion } from "framer-motion";

const PROBLEMS = [
  {
    problem: "Monolithic Data Schemas",
    reality: "Legacy oracle networks are typically constrained to fixed-point financial formats, limiting their utility for complex state resolution.",
    solved: "The TaaS Universal Consensus Module (UCM) supports arbitrary JSON schemas, allowing developers to define custom ontologies without protocol upgrades.",
  },
  {
    problem: "Execution Integrity",
    reality: "Raw data resolution often lacks sandboxed isolation, exposing nodes to non-deterministic logic and security vulnerabilities.",
    solved: "All resolution occurs in isolated V8 sandboxes. Every task execution produces a cryptographic proof carrying a verifiable chain of custody.",
  },
  {
    problem: "Security Model Fragmentation",
    reality: "Reputation-based networks rely on social consensus with minimal on-chain cryptoeconomic enforcement for misbehavior.",
    solved: "TaaS leverages EigenLayer restaking. All operator commitments are slashable at the Ethereum settlement layer, ensuring maximum economic integrity.",
  },
  {
    problem: "Rigid Consensus Logic",
    reality: "Single-strategy aggregation models fail to accurately resolve diverse data types like hashes, state results, or boolean facts.",
    solved: "Manifest-driven consensus allows per-task selection of MEDIAN, MAJORITY, or THRESHOLD_BLS strategies based on data topology.",
  },
];

export const ProblemStatement: React.FC = () => {
  return (
    <section id="avs" className="relative w-full py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            001 // Technical Constraints
          </span>
          <h2 className="mt-6 text-4xl md:text-7xl font-display font-thin text-foreground leading-[1.1] max-w-3xl">
            Modern Infrastructure <br />Requires <span className="italic font-bold text-primary-accent">Verifiable Compute.</span>
          </h2>
          <p className="mt-8 max-w-xl text-foreground font-sans leading-relaxed opacity-50">
            Legacy oracle designs were optimized for price feeds. Building the Agentic Era requires a new primitive designed for arbitrary computation and cryptoeconomic security.
          </p>
        </div>

        {/* Problem / Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-10 flex flex-col gap-8 group"
            >
              {/* Problem Identification */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/20">
                  Infrastructure Limitation
                </span>
                <h3 className="font-display font-bold text-xl text-foreground tracking-tight">
                  {item.problem}
                </h3>
                <p className="font-sans text-sm text-foreground/40 leading-relaxed max-w-sm">
                  {item.reality}
                </p>
              </div>

              {/* Functional Outcome */}
              <div className="flex flex-col gap-3 pt-6 border-t border-foreground/5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary-accent opacity-60">
                  AVS Resolution
                </span>
                <p className="font-sans text-sm text-foreground leading-relaxed font-medium">
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
