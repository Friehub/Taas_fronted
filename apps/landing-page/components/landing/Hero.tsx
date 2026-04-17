"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../foundation/MagneticButton";

import BlueprintGrid from "../foundation/BlueprintGrid";
import ScanLine from "../foundation/ScanLine";

/**
 * Hero - The "Sovereign Heart" of TaaS.
 * Featuring the "Mechanical Heartbeat" visual and institutional typography.
 * Uses physics-based motion for a high-performance industrial feel.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 px-8 overflow-hidden">
      {/* Localized Grid System */}
      <BlueprintGrid />
      <ScanLine />

      {/* High-Contrast Hero Background Overlay */}
      <div className="absolute inset-0 bg-radial-hero-dark z-0 pointer-events-none" />

      {/* 1. The Mechanical Heartbeat - Visual Foundation */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none opacity-40">
        <div className="relative h-[600px] w-[600px]">
          {/* Central Pulsing Core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]"
          />
          
          {/* The Technical Ring */}
          <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#49E774]" />
          </div>

          {/* Sectors and Technical Lines */}
          <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.05" />
            <path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" strokeWidth="0.05" />
          </svg>
        </div>
      </div>

      {/* 2. Headline & Content Architecture */}
      <div className="max-w-5xl w-full text-center space-y-10 animate-in relative z-10">

        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tight text-foreground leading-[0.85]">
          The Institutional <br /> 
          <span className="text-foreground relative italic">
            Oracle Network.
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-white/40"
            />
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-foreground/60 text-lg md:text-2xl font-sans leading-relaxed">
          Decentralized infrastructure for <span className="text-foreground font-semibold">Verifiable Data</span> and <span className="text-foreground font-semibold font-mono">[Sovereign Intelligence]</span>. Optimized for the programmable future.
        </p>

        {/* Action Center - Primary CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 pt-10">
          <MagneticButton>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white overflow-hidden transition-all border border-white/10"
            >
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-neutral-900 font-bold uppercase tracking-[0.2em] text-xs">
                Join Waitlist
              </span>
            </motion.button>
          </MagneticButton>
          
          <button className="surface-depth px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-white/5 transition-all group">
            Read the Vision 
            <span className="ml-2 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Bottom Metadata - The "Obsession" items */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col space-y-1">
        <span className="text-[9px] font-mono text-secondary/20">BLOCK_HEIGHT: 12,040,119</span>
        <div className="h-1 w-32 bg-primary/10 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: [-128, 128] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-20 bg-primary/40" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
