"use client";

import React from "react";
import { motion } from "framer-motion";

interface TelemetryStats {
  totalVolume: string;
  nodes: number;
  uptime: string;
}

const defaultStats: TelemetryStats = {
  totalVolume: "$1.24B+",
  nodes: 4182,
  uptime: "100%",
};

/**
 * ReadyToVerify - The flagship CTA section redesigned for high-contrast institutional visibility.
 * Replaces the "too much green" gradient with a refined dark-surface premium card.
 */
export const ReadyToVerify: React.FC<{ stats?: TelemetryStats }> = ({ 
  stats = defaultStats 
}) => {
  return (
    <section className="relative w-full py-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-surface-low border border-primary/20 p-12 md:p-20 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        >
          {/* Abstract background detail - Subtler mint glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[0.9] tracking-tight">
                Ready to verify <br /> 
                <span className="text-primary italic">the future?</span>
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
                Join the TaaS network today as a node operator or developer and start building truth-native decentralized applications.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-primary text-background font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(73,231,116,0.3)]">
                  Join the Network
                </button>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/10 text-foreground font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all">
                  Documentation
                </button>
              </div>
            </div>

            {/* Right Telemetry Panel (High-Contrast Glass) */}
            <div className="w-full lg:w-[450px]">
               <div className="bg-background-darker/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 shadow-2xl space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] font-bold">Live Network Relay</span>
                    <div className="flex space-x-1">
                       <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                       <div className="h-1 w-1 rounded-full bg-primary/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div>
                        <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest font-bold">Volume Aggregated</span>
                        <div className="text-5xl font-display font-bold text-foreground mt-1 tracking-tighter">
                          {stats.totalVolume}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                          <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest font-bold">Active Nodes</span>
                          <div className="text-2xl font-display font-bold text-foreground mt-1">{stats.nodes.toLocaleString()}</div>
                      </div>
                      <div>
                          <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest font-bold">Uptime</span>
                          <div className="text-2xl font-display font-bold text-primary mt-1">{stats.uptime}</div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToVerify;
