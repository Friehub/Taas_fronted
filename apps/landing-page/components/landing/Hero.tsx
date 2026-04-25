"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import BlueprintGrid from "../foundation/BlueprintGrid";
import { ThresholdNode } from "../animation/ThresholdNode";

const STAT_ITEMS = [
  { value: "3+", label: "AVS Consensus Modes", sub: "MEDIAN · BLS · TEST_ATTESTATION" },
  { value: "N-of-M", label: "Pooled Security", sub: "BFT Integrity at 67% Stake" },
  { value: "Any", label: "Task Domain", sub: "Finance · Compute · Sports · Identity" },
  { value: "EigenLayer", label: "Protocol Integrity", sub: "Slashable Commitments on Ethereum" },
];

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  return (
    <section className="relative w-full min-h-screen pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-center overflow-hidden bg-background">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 max-w-full z-0 overflow-hidden">
        <BlueprintGrid />
      </motion.div>

      {/* Clinical Gradient Wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] rotate-[12deg] flex flex-col items-center justify-center opacity-40 dark:opacity-20"
        >
          {/* Subtle Mint Accents */}
          <div className="w-full h-[400px] bg-gradient-to-b from-transparent via-primary-accent/10 to-transparent blur-[120px]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
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
            Verifiable Cloud <br />
            for the <span className="italic font-bold">Agentic Era.</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-foreground font-sans leading-relaxed mb-12 opacity-50">
            A general-purpose Oracle AVS enabling 
            <span className="text-foreground font-semibold mx-1">verifiable off-chain compute</span> 
            and 
            <span className="text-foreground font-semibold mx-1">slashable data resolution</span> 
            secured by Pooled Restaked Security.
          </p>

          {/* Left-Aligned CTAs */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
            <Link 
              href="https://docs.friehub.cloud" 
              className="rounded-none px-12 py-5 bg-foreground text-background font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-foreground/90 transition-all"
            >
              Build on TaaS
            </Link>

            <Link 
              href="/networks/hoodi"
              className="rounded-none border border-foreground/10 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground hover:bg-foreground/5 transition-all group flex items-center"
            >
              Network Status
              <span className="ml-3 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          </div>
        </motion.div>
        
        {/* Right Column: Interactive Cryptography Visual */}
        <div className="w-full flex items-center justify-center lg:justify-end">
             <ThresholdNode />
        </div>
      </div>

      {/* Stats Row - Clinical Horizontal List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-20 mx-auto w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 border border-foreground/5 divide-x divide-y md:divide-y-0 divide-foreground/5"
      >
        {STAT_ITEMS.map((item) => (
          <div key={item.label} className="px-8 py-8 flex flex-col gap-1 hover:bg-foreground/[0.02] transition-colors">
            <span className="font-display font-bold text-2xl text-foreground tracking-tighter">{item.value}</span>
            <span className="font-sans text-[10px] text-foreground font-bold uppercase tracking-widest opacity-40">{item.label}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/20 mt-2">{item.sub}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
