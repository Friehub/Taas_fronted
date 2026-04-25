"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * ReadyToVerify - The flagship CTA section.
 * Refined for high-fidelity light mode contrast.
 */
export const ReadyToVerify: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-surface-low border border-surface-border p-12 md:p-20 overflow-hidden shadow-xl shadow-foreground/5 transition-all"
        >

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <h2 className="text-4xl md:text-6xl font-display font-thin text-foreground leading-[0.9] tracking-tight">
                Ready to verify <br /> 
                <span className="text-foreground italic">the future?</span>
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
                Join the TaaS network today as a node operator or developer and start building truth-native decentralized applications.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all rounded-full">
                  Join the Network
                </button>
                <Link 
                  href="https://docs.friehub.cloud" 
                  target="_blank"
                  className="w-full sm:w-auto px-10 py-5 border border-surface-border text-foreground font-bold uppercase tracking-[0.2em] text-xs hover:bg-foreground/5 transition-all rounded-full text-center"
                >
                  Documentation
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
