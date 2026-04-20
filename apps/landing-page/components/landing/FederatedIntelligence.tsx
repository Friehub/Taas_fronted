"use client";

import React from "react";
import { motion } from "framer-motion";

export const FederatedIntelligence: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-6 bg-surface-low/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Narrative / Context */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
                006 // Federated Truth Intelligence
              </span>
              <h2 className="mt-4 text-4xl md:text-6xl font-display font-thin text-foreground leading-tight max-w-2xl">
                Beyond Stateful.<br />Institutional Memory.
              </h2>
              <p className="mt-6 max-w-xl text-foreground/55 text-base md:text-lg font-sans leading-relaxed">
                Standard oracles deliver point-in-time data. TaaS develops knowledge. 
                Through <strong>Federated Truth Intelligence (FTI)</strong>, the network generalizes from every resolution to build a permanent, cryptographically verifiable memory.
              </p>
            </div>

            {/* Obsessive Math Display - Re-styled for the Blueprint aesthetic */}
            <div className="neon-card border border-surface-border p-8 space-y-6 relative overflow-hidden bg-background">
               <div className="absolute top-4 right-4 text-[8px] font-mono opacity-10 uppercase tracking-widest">
                 FedAvg_Generalization_V3
               </div>

               <div className="space-y-4">
                  <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
                    Consensus Objective Function:
                  </div>
                  <div className="text-2xl font-mono text-foreground font-bold tracking-tighter">
                    W<span className="text-[10px] align-sub text-foreground/60">g</span> = Σ(R<span className="text-[10px] align-sub text-foreground/60">i</span> * W<span className="text-[10px] align-sub text-foreground/60">i</span>) / Σ(R<span className="text-[10px] align-sub text-foreground/60">i</span>)
                  </div>
               </div>

               <div className="pt-4 border-t border-surface-border grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest">Economic Weight</div>
                    <div className="text-xs font-mono text-foreground/80">Σ Staked Rep (R_i)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest">Objective Error</div>
                    <div className="text-xs font-mono text-foreground/80">Loss &lt; 0.0001%</div>
                  </div>
               </div>
            </div>

            <button className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors group">
              Explore the FTI Whitepaper <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block opacity-50 group-hover:opacity-100">→</span>
            </button>
          </div>

          {/* Right: Interactive/Animated Consensus Visualizer */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
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
                    className="absolute h-1 w-1 bg-primary/40 rounded-full"
                  />
                ))}

                {/* Central Truth Point */}
                <motion.div 
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10 h-32 w-32 bg-background flex items-center justify-center p-4 text-center group border border-surface-border shadow-[0_0_30px_rgba(73,231,116,0.1)]"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Generalization</div>
                    <div className="text-xl font-display font-bold text-foreground">Verified</div>
                  </div>
                </motion.div>

                {/* Theoretical Bound circles */}
                <div className="absolute inset-0 border border-surface-border rounded-full scale-100 opacity-30" />
                <div className="absolute inset-0 border border-surface-border rounded-full scale-150 opacity-10" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FederatedIntelligence;
