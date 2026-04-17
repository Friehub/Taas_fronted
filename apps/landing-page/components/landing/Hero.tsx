"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../foundation/MagneticButton";

import BlueprintGrid from "../foundation/BlueprintGrid";
import ScanLine from "../foundation/ScanLine";

/**
 * Hero - The "Monochrome Oracle Core" of Friehub.
 * Features a multi-layered, technical SVG masterpiece that adapts to Light/Dark modes.
 * Completely neutralized to a pure White & Charcoal institutional palette.
 */
export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 px-8 overflow-hidden">
      {/* Localized Grid System */}
      <BlueprintGrid />
      <ScanLine />

      {/* 1. The Institutional Oracle Core - Visual Masterpiece */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden text-foreground">
        <div className="relative h-[800px] w-[800px] flex items-center justify-center">
          
          {/* Subtle Dynamic Depth (Adaptive) */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.08, 0.03] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-foreground blur-[120px]"
          />

          {/* Outer Ring: Segmented Infrastructure */}
          <motion.svg 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute h-[600px] w-[600px] text-foreground/10" 
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
            <rect x="48" y="0" width="4" height="1" fill="currentColor" />
            <rect x="48" y="99" width="4" height="1" fill="currentColor" />
            <rect x="0" y="48" width="1" height="4" fill="currentColor" />
            <rect x="99" y="48" width="1" height="4" fill="currentColor" />
          </motion.svg>

          {/* Middle Ring: Proof Streams & Node Clusters */}
          <motion.svg 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute h-[400px] w-[400px] text-foreground/20" 
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
            
            {/* Pure Institutional Ring Accents */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.1" />

            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const x = (50 + 35 * Math.cos(angle * Math.PI / 180)).toFixed(2);
              const y = (50 + 35 * Math.sin(angle * Math.PI / 180)).toFixed(2);
              return (
                <motion.g 
                  key={angle}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: angle / 100 }}
                >
                  <circle 
                     cx={x} 
                     cy={y} 
                     r="1" 
                     fill="currentColor" 
                     fillOpacity={0.6}
                  />
                  <line 
                     x1="50" y1="50" 
                     x2={x} 
                     y2={y} 
                     stroke="currentColor" strokeWidth="0.1" 
                  />
                </motion.g>
              );
            })}
          </motion.svg>

          {/* Inner Core: The Pulsing Veracity Node */}
          <div className="relative h-32 w-32 flex items-center justify-center">
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute inset-0 border border-foreground/20 rounded-full"
             />
             <div className="h-3 w-3 bg-foreground/60 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] z-10" />
             <svg className="absolute h-full w-full text-foreground/40 animate-spin-slow" viewBox="0 0 100 100">
                <path d="M50 20 L50 30 M50 70 L50 80 M20 50 L30 50 M70 50 L80 50" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
             </svg>
          </div>

        </div>
      </div>

      {/* 2. Headline & Content Architecture */}
      <div className="max-w-5xl w-full text-center space-y-10 animate-in relative z-10">

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-display font-bold tracking-tight text-foreground leading-[0.85]"
        >
          The Institutional <br /> 
          <span className="text-foreground relative italic text-glow-institutional">
            Oracle Network.
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-foreground/10"
            />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-foreground/60 text-lg md:text-2xl font-sans leading-relaxed"
        >
          Decentralized infrastructure for <span className="text-foreground font-semibold">Verifiable Data</span> and <span className="text-foreground font-semibold font-mono">[Sovereign Intelligence]</span>. Optimized for the programmable future.
        </motion.p>

        {/* Action Center - Primary CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 pt-10">
          <MagneticButton>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-foreground overflow-hidden transition-all border border-surface-border"
            >
              <div className="absolute inset-0 bg-background/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-background font-bold uppercase tracking-[0.2em] text-xs">
                Join Waitlist
              </span>
            </motion.button>
          </MagneticButton>
          
          <button className="surface-depth px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all group border border-surface-border">
            Read the Vision 
            <span className="ml-2 opacity-30 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Bottom Metadata - The "Obsession" items */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col space-y-1">
        <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest font-bold">Protocol_v1.0 // Archive_10</span>
        <div className="h-1 w-32 bg-foreground/5 rounded-full overflow-hidden border border-surface-border">
          <motion.div 
            animate={{ x: [-128, 128] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-20 bg-foreground/10" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
