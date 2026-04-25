"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * ReadyToVerify - Tactical developer CTA.
 * Aligned with clinical infrastructure standards and Light Mode.
 */
export const ReadyToVerify: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-8 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-foreground/5 bg-foreground/[0.02] p-12 md:p-24 overflow-hidden group"
        >
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            
            {/* Left Content */}
            <div className="max-w-2xl space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-7xl font-display font-thin text-foreground leading-[1] tracking-tight">
                Build with <br /> 
                <span className="italic font-bold">Verifiable Proofs.</span>
              </h2>
              <p className="text-foreground font-sans text-lg md:text-xl leading-relaxed opacity-50">
                Join the TaaS ecosystem as a node operator or developer. Leverage restaked security and sandboxed off-chain compute to settle data with cryptographic certainty.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <Link 
                  href="https://docs.friehub.cloud" 
                  className="w-full sm:w-auto px-12 py-5 bg-foreground text-background font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-foreground/90 transition-all text-center"
                >
                  Build on TaaS
                </Link>
                <Link 
                  href="/networks/hoodi" 
                  className="w-full sm:w-auto px-12 py-5 border border-foreground/10 text-foreground font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-foreground/5 transition-all text-center"
                >
                  Network Status
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToVerify;
