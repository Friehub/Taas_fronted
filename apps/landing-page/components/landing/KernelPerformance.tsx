"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * KernelPerformance - Technical deep-dive into the TaaS Rust Kernel.
 * Uses the "No-Line" rule (tonal shifts) and high-fidelity technical specs.
 */
export const KernelPerformance: React.FC = () => {
  const specs = [
    { label: "Runtime", value: "V8 Isolate Sandbox", detail: "Hardware-level memory isolation" },
    { label: "Security", value: "eBPF Resource Guard", detail: "Kernel-enforced CPU throttling" },
    { label: "Latency", value: "Sub-ms Dispatch", detail: "Zero IPC primary execution path" },
    { label: "Scaling", value: "N-Core Parallelism", detail: "Rust-native multi-thread orchestration" },
  ];

  return (
    <section className="relative w-full py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Technical Narrative */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            The Rust Kernel. <br />
            <span className="text-foreground opacity-40">Absolute Performance.</span>
          </h2>

          <p className="text-foreground/60 text-lg leading-relaxed">
            Every data request is orchestrated by a purpose-built Rust kernel. By unifying the Sidecar with a dedicated V8 Isolate pool, TaaS achieves industrial-grade data throughput while maintaining cryptographic sandboxing for every sovereign adapter.
          </p>

          {/* Persona Grid - The "No-Line" Rule in action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12">
            {specs.map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="surface-depth p-6 space-y-2 group hover:bg-primary/[0.02] transition-colors neon-card"
                style={{ border: 'none' }} // Enforcement of No-Line Rule
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">{spec.label}</span>
                  <div className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                </div>
                <div className="text-foreground font-bold font-display text-lg">{spec.value}</div>
                <div className="text-secondary/40 text-[10px] font-mono uppercase">{spec.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: The "Veracity Engine" Visual */}
        <div className="flex-1 relative">
          <div className="aspect-square w-full max-w-[500px] mx-auto relative surface-depth rounded-2xl overflow-hidden flex items-center justify-center">
            {/* Animated Technical Schematic Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="absolute inset-0 bg-grid-mint bg-[size:20px_20px]" />
            </div>

            <div className="relative z-10 w-[80%] h-[80%] border-primary/20 border-dashed border-[1px] flex items-center justify-center p-8 bg-background-darker rounded-xl">
               <div className="text-center space-y-4">
                  <div className="inline-block px-2 py-1 bg-primary/20 text-primary font-mono text-[9px] uppercase tracking-widest mb-2">Authenticated_Kernel_State</div>
                  <div className="text-4xl font-display font-bold text-primary">00.038<span className="text-xs uppercase ml-1 opacity-40">ms</span></div>
                  <div className="text-secondary/40 font-mono text-[10px] uppercase tracking-widest">Global_Dispatch_Latency</div>
               </div>
               
               {/* Scanning Line Animation */}
               <motion.div 
                  animate={{ y: [0, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_#49E774]"
               />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default KernelPerformance;
