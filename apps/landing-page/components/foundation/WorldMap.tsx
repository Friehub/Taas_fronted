"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * WorldMap - A minimalist Dot-Matrix geographic visualization.
 * Represents the Friehub decentralization network using technical dot points
 * and animated "veracity pings" at major network hubs.
 */
export const WorldMap: React.FC = () => {
  // Simplified dots for a technical world map (Low-res representation)
  // These are roughly mapped to geographic coordinates for a "Dot Matrix" look.
  const dots = [
    // NA
    { x: 15, y: 25 }, { x: 20, y: 22 }, { x: 25, y: 28 }, { x: 18, y: 35 }, { x: 22, y: 40 },
    // EU
    { x: 48, y: 22 }, { x: 52, y: 25 }, { x: 45, y: 28 }, { x: 50, y: 32 }, { x: 55, y: 30 },
    // ASIA
    { x: 75, y: 30 }, { x: 80, y: 35 }, { x: 70, y: 40 }, { x: 85, y: 45 }, { x: 78, y: 55 },
    // SA
    { x: 30, y: 65 }, { x: 35, y: 75 }, { x: 32, y: 80 },
    // AF
    { x: 50, y: 55 }, { x: 55, y: 65 }, { x: 48, y: 75 },
    // OC
    { x: 85, y: 75 }, { x: 88, y: 82 },
  ];

  // Active Hubs (Animated Pings)
  const hubs = [
    { x: 20, y: 30, label: "NA_EAST_1" },
    { x: 50, y: 25, label: "EU_WEST_2" },
    { x: 75, y: 45, label: "ASIA_SOUTH_1" },
    { x: 52, y: 60, label: "AF_SOUTH_1" },
  ];

  return (
    <div className="relative w-full h-full bg-background-darker/50 overflow-hidden flex items-center justify-center p-8">

      <div className="relative w-full max-w-4xl aspect-[2/1]">
        {/* The Matrix Dots */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-foreground/10">
          {dots.map((dot, i) => (
            <circle 
              key={i} 
              cx={dot.x} 
              cy={dot.y} 
              r="0.4" 
              className="fill-current opacity-40" 
            />
          ))}
          
          {/* Connecting technical lines (low opacity) */}
          <path 
            d="M20 30 L50 25 L75 45 L52 60 L20 30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.05" 
            strokeDasharray="1 1"
          />
        </svg>

        {/* The Hub Pings */}
        {hubs.map((hub, i) => (
          <div 
            key={i}
            className="absolute"
            style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
          >
            {/* Ping Animation */}
            <motion.div 
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="absolute h-4 w-4 -left-2 -top-2 rounded-full border border-primary/40"
            />
            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#49E774]" />
            
            {/* Hub Label */}
            <div className="absolute top-4 left-0 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-mono text-primary/60 tracking-widest">{hub.label}</span>
            </div>
          </div>
        ))}

        {/* Viewport Reticle Decor */}
        <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-primary/20" />
        <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-primary/20" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-primary/20" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-primary/20" />
      </div>

      {/* Map Legend/Metadata */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end space-y-1">
        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Active_Nodes: 4,182</span>
        <span className="text-[8px] font-mono text-secondary/40 uppercase tracking-widest">Veracity_Confidence: 99.999%</span>
      </div>
    </div>
  );
};

export default WorldMap;
