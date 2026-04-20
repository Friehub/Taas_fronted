"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Ecosystem - The "Powering the Next-Gen" section.
 * Featuring a grayscale logo wall with hover brightness transitions.
 */
export const Ecosystem: React.FC = () => {
  const partners = [
    { name: "POLYMARKET", icon: "📊" },
    { name: "DRIFT", icon: "⚡" },
    { name: "AVALON", icon: "🏰" },
    { name: "ETHER.FI", icon: "💎" },
    { name: "SWELL", icon: "🌊" },
    { name: "EIGEN", icon: "🧬" },
  ];

  return (
    <section className="relative w-full py-24 px-8 border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
           <h3 className="text-xl font-display font-thin text-foreground tracking-wide opacity-80 uppercase">
             Powering the Next-Gen Ecosystem
           </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-white/[0.05]">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="bg-background-darker h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center space-y-2 opacity-30 group-hover:opacity-100 transition-opacity">
                 <span className="text-2xl">{partner.icon}</span>
                 <span className="text-[10px] font-mono font-bold tracking-[0.2em]">{partner.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Ecosystem;
