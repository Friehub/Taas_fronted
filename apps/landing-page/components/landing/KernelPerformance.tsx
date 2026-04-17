"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * KernelPerformance - Technical deep-dive into the TaaS Rust Kernel.
 * Uses the "No-Line" rule (tonal shifts) and high-fidelity technical specs.
 */
export const KernelPerformance: React.FC = () => {
  const specs = [
    { label: "Runtime", value: "Deno Isolate Pool", detail: "Zero-latency binary sandboxing" },
    { label: "Security", value: "eBPF Resource Guard", detail: "Kernel-enforced CPU throttling" },
    { label: "Veracity", value: "Aggregated Proofs", detail: "Signed by N/M verified operators" },
    { label: "Integrity", value: "Read-Only Core", detail: "Immutable execution environment" },
  ];

  return (
    <section id="technology" className="relative w-full py-24 px-8 overflow-hidden bg-surface-low/30">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Centered Technical Narrative */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            The Rust Kernel. <br />
            <span className="text-foreground opacity-40">Systemic Integrity.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-foreground/60 text-lg leading-relaxed">
            Every data request is orchestrated by a purpose-built Rust kernel. By leveraging a dedicated **Deno Isolate pool**, TaaS achieves industrial-grade data throughput while maintaining cryptographic sandboxing for every sovereign adapter.
          </p>
        </div>

        {/* Technical Specification Grid - Expanded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
          {specs.map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="surface-depth p-8 space-y-4 group hover:bg-white/[0.01] transition-all border border-foreground/[0.03]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">{spec.label}</span>
                <div className="h-1 w-1 rounded-full bg-foreground/10 group-hover:bg-primary/40 transition-colors" />
              </div>
              <div className="space-y-1">
                <div className="text-foreground font-bold font-display text-xl">{spec.value}</div>
                <div className="text-secondary/40 text-[10px] font-mono uppercase tracking-widest">{spec.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KernelPerformance;
