"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export const ThresholdNode: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for subtle 3D tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to center of container (-1 to 1)
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      smoothX.set(x);
      smoothY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothX, smoothY]);

  // Transform raw -1 to 1 values into subtle rotation degrees
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[500px] flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Outer Orbital Grid */}
        <motion.div 
          animate={{ rotateZ: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-foreground/10"
        />

        {/* Middle Synchronization Ring */}
        <motion.div 
          animate={{ rotateZ: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] rounded-full border border-surface-border flex items-center justify-center p-[2px]"
        >
          {/* Node Indicators (Mint Green) */}
          <div className="absolute top-0 w-2 h-2 bg-primary rounded-sm shadow-neon-mint" />
          <div className="absolute bottom-0 w-2 h-2 bg-primary/40 rounded-sm" />
          <div className="absolute left-0 w-2 h-2 bg-primary/20 rounded-sm" />
        </motion.div>

        {/* The Execution Core (Glassmorphic Vault) */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="relative w-[180px] h-[180px] bg-background/50 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-neon-mint/20 flex items-center justify-center overflow-hidden"
        >
          {/* Internal Scanner Line */}
          <motion.div
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[1px] bg-primary/60 shadow-[0_0_10px_rgba(73,231,116,0.5)] z-20"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent mix-blend-overlay" />
          
          {/* Pulsing Central Data Block */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotateZ: [0, 90, 180, 270, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 border-2 border-primary rounded-sm relative flex items-center justify-center shadow-neon-mint/10"
          >
             <div className="w-2 h-2 bg-primary" />
          </motion.div>
        </motion.div>
        
        {/* Deep Z-layer structural ring */}
        <motion.div 
          style={{ translateZ: -80 }}
          className="absolute w-[200px] h-[200px] rounded-full border-4 border-surface-border/50"
        />

      </motion.div>
    </div>
  );
};

export default ThresholdNode;
