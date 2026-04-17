"use client";

import React from "react";
import { WorldMap } from "../foundation/WorldMap";

/**
 * TruthRegistry - The "Federated Registry" section.
 * Showcase for the data categories TaaS can resolve today.
 */
export const TruthRegistry: React.FC = () => {
  const categories = [
    { id: "crypto.price", status: "Active" },
    { id: "forex.rate", status: "Active" },
    { id: "sports.score", status: "Active" },
    { id: "weather.data", status: "Alpha" },
    { id: "ai.inference", status: "Beta" },
    { id: "onchain.attest", status: "Active" },
    { id: "economics.fred", status: "Active" },
    { id: "social.graph", status: "Alpha" },
    { id: "dev.github", status: "Active" },
    { id: "web.capture", status: "Beta" },
  ];

  return (
    <section id="oracle" className="relative w-full py-24 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              TaaS Oracle Protocol. <br /> <span className="text-foreground italic">The Decentralized Registry.</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              The high-integrity foundation for decentralized data markets. TaaS nodes are hardware-optimized to resolve thousands of unique data points with cryptographic veracity.
            </p>
          </div>
          <button className="text-xs font-mono font-bold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">
            Browse full registry_v2.0
          </button>
        </div>

        {/* Global Network Map */}
        <div className="w-full h-[600px] border border-primary/10 relative overflow-hidden group">
          <WorldMap />
        </div>

      </div>
    </section>
  );
};

export default TruthRegistry;
