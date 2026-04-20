"use client";

import React from "react";
import { motion } from "framer-motion";
import BlueprintGrid from "../foundation/BlueprintGrid";
import { MagneticButton } from "../foundation/MagneticButton";

const STAT_ITEMS = [
  { value: "3+", label: "Aggregation Strategies", sub: "MEDIAN · MAJORITY · STAKE_WEIGHTED" },
  { value: "N-of-M", label: "BLS Threshold Signing", sub: "BFT Quorum at 67% Stake" },
  { value: "Any", label: "Data Domain", sub: "Finance · Sports · Weather · Compute" },
  { value: "EigenLayer", label: "Economic Security", sub: "AVS-Backed Slashing Conditions" },
];

export const MarketingHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <BlueprintGrid />



      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-5xl w-full text-center"
      >
        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight text-foreground leading-[0.9] mb-8">
          Oracles Built on{" "}
          <span className="italic text-foreground/90">Proof,</span>
          <br />
          Not{" "}
          <span className="relative">
            <span className="italic">Promises.</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary/40 origin-left"
            />
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/55 font-sans leading-relaxed mb-12">
          TaaS is the first oracle network where every data response is{" "}
          <span className="text-foreground font-semibold">validated by invariant guards</span>,{" "}
          aggregated by a{" "}
          <span className="text-foreground font-semibold">manifest-driven strategy engine</span>, and
          finalized by{" "}
          <span className="text-foreground font-semibold">BLS threshold consensus</span> and then
          secured by EigenLayer restaking.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-10 py-4 bg-foreground overflow-hidden border border-surface-border"
            >
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-background font-bold uppercase tracking-[0.2em] text-xs">
                Join the Operator Registry
              </span>
            </motion.button>
          </MagneticButton>

          <button className="surface-depth px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all group border border-surface-border">
            Read the Architecture
            <span className="ml-2 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 border border-surface-border divide-x divide-y md:divide-y-0 divide-surface-border"
      >
        {STAT_ITEMS.map((item) => (
          <div key={item.label} className="px-6 py-6 flex flex-col gap-1 bg-surface-low/30 backdrop-blur-sm">
            <span className="font-display font-bold text-2xl text-foreground">{item.value}</span>
            <span className="font-sans text-xs text-foreground/70 font-semibold">{item.label}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/30 mt-1">{item.sub}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default MarketingHero;
