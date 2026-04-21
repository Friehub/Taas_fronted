"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * NetworkPersonas - Section 5 of the Landing Page.
 * Defines the roles within the Friehub TaaS ecosystem with "No-Line" cards.
 */
export const NetworkPersonas: React.FC = () => {
  const personas = [
    {
      title: "Standard Sentinel",
      desc: "Provide the world's most accurate truth. Respond to decentralized data requests for high-integrity settlement.",
      icon: "TRUTH",
    },
    {
      title: "Automation Keeper",
      desc: "Trigger the future with on-chain condition monitoring. Autonomous task execution for the programmable world.",
      icon: "AUTO",
    },
    {
      title: "Attestation Node",
      desc: "Institutional-grade TEE-backed proofs. Secure enclave execution via Intel SGX or AWS Nitro hardware.",
      icon: "TEE",
    },
  ];

  return (
    <section className="relative w-full py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-thin text-foreground">
            Permissionless Mastery. <br />
            <span className="text-white italic opacity-40">Dedicated Runtimes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="surface-depth p-10 space-y-8 neon-card group"
              style={{ border: 'none' }}
            >
              {/* Technical Indicator */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.2em]">{p.icon}_PROTO</span>
                <div className="h-1 w-8 bg-white/5 group-hover:bg-white/10 transition-colors" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-display font-thin text-foreground transition-colors">
                  {p.title}
                </h3>
                <p className="text-secondary/60 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-6">
                <button className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn Registry Role →
                </button>
              </div>
              
              {/* Background Glow Detail */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/[0.02] blur-[60px] rounded-full group-hover:bg-white/[0.04] transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkPersonas;
