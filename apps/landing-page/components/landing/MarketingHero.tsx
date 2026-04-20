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
    <section className="relative w-full min-h-screen pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      <BlueprintGrid />

      {/* Premium Institutional Light Flare */}
      <div className="absolute top-0 right-0 lg:right-16 w-full max-w-[800px] h-[600px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen opacity-70 transform -translate-y-1/3 translate-x-1/4" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10 opacity-50 transform -translate-y-1/2 -translate-x-1/4" />

      {/* Grid Container for Side-by-Side Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Column: Main Headline, Copy, and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-start w-full text-left"
        >
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display font-thin tracking-tight text-foreground leading-[1] mb-8">
            Oracles Built on{" "}
            <span className="italic text-foreground/90">Proof,</span>
            <br />
            Not{" "}
            <span className="relative inline-block">
              <span className="italic">Promises.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary/40 origin-left"
              />
            </span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-foreground/55 font-sans leading-relaxed mb-12">
            TaaS is the first oracle network where every data response is{" "}
            <span className="text-foreground font-semibold">validated by invariant guards</span>,{" "}
            aggregated by a{" "}
            <span className="text-foreground font-semibold">manifest-driven strategy engine</span>, and
            finalized by{" "}
            <span className="text-foreground font-semibold">BLS threshold consensus</span> and then
            secured by EigenLayer restaking.
          </p>

          {/* Left-Aligned CTAs */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
            <button className="rounded-full px-10 py-4 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs border border-surface-border hover:bg-foreground/90 transition-colors">
              Get Started
            </button>

            <button className="rounded-full surface-depth px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all group border border-surface-border">
              Litepaper
              <span className="ml-2 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>
        </motion.div>
        
        {/* Right Column: Reserved for Image */}
        <div className="w-full flex items-center justify-center lg:justify-end">
             {/* Space reserved for future image */}
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-20 mx-auto w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 border border-surface-border divide-x divide-y md:divide-y-0 divide-surface-border"
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
