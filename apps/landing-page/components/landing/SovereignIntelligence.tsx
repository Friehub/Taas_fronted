"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * SovereignIntelligence - The FTI (Federated Truth Intelligence) Deep-Dive.
 * Features the "Consensus Visualizer" and obsessive technical math.
 */
export const SovereignIntelligence: React.FC = () => {
  return (
    <section id="ai-oracle" className="relative w-full py-24 px-8 bg-surface-low/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive/Animated Consensus Visualizer */}
          <div className="order-2 lg:order-1 flex items-center justify-center">
             <div className="relative h-[400px] w-[400px] flex items-center justify-center">
                {/* Consensus Convergence Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                       x: [Math.cos(i * 45 * Math.PI / 180) * 180, 0],
                       y: [Math.sin(i * 45 * Math.PI / 180) * 180, 0],
                       opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.4,
                      ease: "circIn"
                    }}
                    className="absolute h-1 w-1 bg-white/40 rounded-full"
                  />
                ))}

                {/* Central Truth Point */}
                <motion.div 
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-32 w-32 surface-depth flex items-center justify-center p-4 text-center group border border-white/5"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Generalization</div>
                    <div className="text-xl font-display font-bold text-foreground">Verified</div>
                  </div>
                </motion.div>

                {/* Theoretical Bound circles */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-100" />
                <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
             </div>
          </div>

          {/* Right: Narrative & Obsessive Math */}
          <div className="order-1 lg:order-2 space-y-8">

            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-[1.1]">
              AI Sovereign Oracle. <br />
              <span className="text-foreground italic">Federated Intelligence.</span>
            </h2>

            <p className="text-foreground/60 text-lg leading-relaxed">
              Standard oracles deliver data, but TaaS develops knowledge. Through **Federated Truth Intelligence (FTI)**, our network generalizes from every resolution to build a permanent, cryptographically verifiable memory.
            </p>

            {/* Obsessive Math Display */}
            <div className="surface-depth p-8 space-y-6 relative overflow-hidden">
               {/* Background schematic text decor */}
               <div className="absolute top-4 right-4 text-[8px] font-mono opacity-10 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                 FedAvg_Generalization_V3
               </div>

               <div className="space-y-4">
                  <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Consensus Objective Function:</div>
                  <div className="text-2xl font-mono text-foreground font-bold tracking-tighter">
                    W<span className="text-xs align-sub">g</span> = Σ(R<span className="text-xs align-sub">i</span> * W<span className="text-xs align-sub">i</span>) / Σ(R<span className="text-xs align-sub">i</span>)
                  </div>
               </div>

               <div className="pt-4 border-t border-white/[0.05] grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-secondary/40 uppercase">Economic Weight</div>
                    <div className="text-xs font-mono text-foreground">Σ Staked Rep (R_i)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-secondary/40 uppercase">Objective Error</div>
                    <div className="text-xs font-mono text-foreground">Loss &lt; 0.0001%</div>
                  </div>
               </div>
            </div>

            <button className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-colors group">
              Explore the FTI Whitepaper <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SovereignIntelligence;
