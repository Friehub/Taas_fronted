"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * OracleInsights - The research-focused blog section for TaaS.
 * Features institutional cards for whitepapers and technical deep-dives.
 */
export const OracleInsights: React.FC = () => {
  const articles = [
    {
      title: "The Generalization of Truth",
      category: "Research",
      tag: "FTI_PAPER",
      date: "APR 2026",
      desc: "Architectural foundations for transitioning from stateless data relays to collaborative sovereign intelligence.",
    },
    {
      title: "Byzantine Convergence Analysis",
      category: "Mathematics",
      tag: "TW_FEDAVG",
      date: "MAR 2026",
      desc: "A rigorous proof of model convergence in reputation-weighted federated machine learning environments.",
    },
    {
      title: "Kernel-Level Resource Guarding",
      category: "Infrastructure",
      tag: "EBPF_SEC",
      date: "FEB 2026",
      desc: "Implementing cgroups and eBPF for hardware-enforced isolation of decentralized data adapters.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Research & <span className="text-foreground italic">Engineering.</span>
          </h2>
        </div>

        {/* Global Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="surface-depth p-8 flex flex-col justify-between neon-card group cursor-pointer h-[400px]"
              style={{ border: 'none' }}
            >
              <div className="space-y-6">
                 <div className="flex justify-between items-start">
                   <div className="flex flex-col">
                   </div>
                 </div>

                 <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                 </h3>
                 
                 <p className="text-secondary/60 text-sm leading-relaxed line-clamp-3">
                    {article.desc}
                 </p>
              </div>

              <div className="pt-8 border-t border-white/[0.03] flex justify-between items-center group-hover:border-primary/20 transition-colors">
                 <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Read Document</span>
                 <span className="group-hover:translate-x-1 transition-transform opacity-30 group-hover:opacity-100">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bottom */}
        <div className="flex justify-center pt-10">
           <button className="text-redline hover:text-primary transition-colors border-b border-primary/10 hover:border-primary pb-2">
             View Protocol Library [32 Documents]
           </button>
        </div>

      </div>
    </section>
  );
};

export default OracleInsights;
