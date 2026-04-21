"use client";

import React from "react";
import { WorldMap } from "../foundation/WorldMap";

/**
 * TruthRegistry - The "Federated Registry" section.
 * Showcase for the data categories TaaS can resolve today.
 */
export const TruthRegistry: React.FC = () => {
  const problems = [
    { 
      title: "Complex to run", 
      desc: "Most platforms require a deep understanding of decentralized networking and custom hardware.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      title: "Complex to extend", 
      desc: "Adding a new data feed requires integrating with a monolithic, bureaucratic system.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: "Opaque Pipeline", 
      desc: "The path from an API call to an on-chain transaction is often undocumented and non-transparent.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="oracle" className="relative w-full py-24 px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header: The Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-thin text-foreground leading-tight">
              TaaS: Vision & <br /> <span className="text-foreground italic">Strategic Direction.</span>
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed max-w-xl">
              TaaS (Trusted-as-a-Service) is on a mission to make any real-world data accessible to any smart contract, simply, and without trust assumptions.
            </p>
          </div>
          
          <div className="surface-depth p-8 space-y-6 border-l-2 border-foreground/20">
            <div className="text-xs font-mono text-foreground/40 uppercase tracking-[0.3em]">The Vision Statement</div>
            <p className="text-2xl font-display font-medium text-foreground leading-snug">
              &quot;Any authoritative data, from any source, delivered on-chain with a cryptographic proof in minutes, not months.&quot;
            </p>
          </div>
        </div>

        {/* The Problem Space */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-thin text-foreground">The Problem</h3>
            <p className="max-w-3xl text-foreground/60 leading-relaxed">
              Blockchains are deterministic environments that cannot reach the outside world. To solve this, TaaS separates the <span className="text-foreground font-semibold">Transport Layer</span> (validation) from the <span className="text-foreground font-semibold">Data Layer</span> (fetching).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((item, i) => (
              <div key={i} className="surface-depth p-8 space-y-6 group hover:bg-white/[0.01] transition-all">
                 <div className="text-foreground/20 group-hover:text-foreground/40 transition-colors">
                   {item.icon}
                 </div>
                 <div className="space-y-3">
                   <h4 className="text-lg font-display font-thin text-foreground">{item.title}</h4>
                   <p className="text-xs text-foreground/40 leading-relaxed font-sans">{item.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TruthRegistry;
