"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import BlueprintGrid from "../foundation/BlueprintGrid";
import { ThresholdNode } from "../animation/ThresholdNode";

const STAT_ITEMS = [
  { value: "3+", label: "Aggregation Strategies", sub: "MEDIAN · MAJORITY · STAKE_WEIGHTED" },
  { value: "N-of-M", label: "BLS Threshold Signing", sub: "BFT Quorum at 67% Stake" },
  { value: "Any", label: "Data Domain", sub: "Finance · Sports · Weather · Compute" },
  { value: "EigenLayer", label: "Economic Security", sub: "AVS-Backed Slashing Conditions" },
];

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  return (
    <section className="relative w-full min-h-screen pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 max-w-full z-0 overflow-hidden">
        <BlueprintGrid />
      </motion.div>

      {/* Linear Glassmorphic Wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] rotate-[12deg] flex flex-col items-center justify-center"
        >
          {/* Main Mint/White Linear Beam - Increased opacity for light mode visibility */}
          <div className="w-full h-[400px] bg-gradient-to-b from-transparent via-primary/25 to-transparent blur-[80px]" />
          
          {/* Glassmorphic Layer */}
          <div className="absolute inset-0 backdrop-blur-[80px]" />
          
          {/* Subtle White Highlight */}
          <div className="w-full h-[200px] bg-white/10 blur-[60px] -mt-[300px]" />
        </div>
      </div>

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
            The first oracle network securing arbitrary data through{" "}
            <span className="text-foreground font-semibold">invariant-governed validation</span>,{" "}
            <span className="text-foreground font-semibold">BLS threshold consensus</span>, and{" "}
            <span className="text-foreground font-semibold">EigenLayer restaking</span>.
          </p>

          {/* Left-Aligned CTAs */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
            <button className="rounded-full px-10 py-4 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs border border-surface-border hover:bg-foreground/90 transition-colors">
              Get Started
            </button>

            <Link 
              href="/litepaper"
              className="rounded-full surface-depth px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all group border border-surface-border flex items-center"
            >
              Litepaper
              <span className="ml-2 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          </div>
        </motion.div>
        
        {/* Right Column: Interactive Cryptography Visual */}
        <div className="w-full flex items-center justify-center lg:justify-end">
             <ThresholdNode />
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

export default Hero;
