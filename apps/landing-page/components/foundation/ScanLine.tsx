"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * ScanLine - Global high-fidelity "Lidar Sweep" effect.
 * Performs a very subtle vertical scan across the background grid 
 * to simulate network active monitoring.
 */
export const ScanLine: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
      <motion.div 
        animate={{ 
          y: ["-100%", "100%"] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="h-[20vh] w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-primary/10 shadow-[0_0_50px_rgba(73,231,116,0.05)]"
      />
    </div>
  );
};

export default ScanLine;
