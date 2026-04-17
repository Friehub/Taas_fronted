"use client";

import React, { useEffect, useRef } from "react";

/**
 * BlueprintGrid - The "Obsessive" Background Layer.
 * 
 * Stability Update: Optimized to read window.scrollY directly inside the 
 * animation loop. This prevents hydration thrashing and eliminates 
 * unnecessary re-renders.
 */
export const BlueprintGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. SSR Guard
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // 2. Dynamic Metric Calculations
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const currentScroll = window.scrollY;
      
      // Only resize if needed (Performance)
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      // 3. Grid Logic (Technical Blueprint)
      const step = 100;
      const parallaxFactor = 0.2; 
      const offset = (currentScroll * parallaxFactor) % step;

      ctx.font = "italic 8px Menlo, monospace";
      ctx.fillStyle = "rgba(73, 231, 116, 0.15)"; 
      ctx.strokeStyle = "rgba(73, 231, 116, 0.05)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < width; x += step) {
        for (let y = -offset; y < height; y += step) {
          // Technical Label Example: [S_04_02]
          const sectorX = Math.floor(x / step).toString().padStart(2, '0');
          // We calculate the Y sector based on global scroll position
          const sectorY = Math.floor((y + currentScroll * parallaxFactor) / step).toString().padStart(2, '0');
          
          ctx.fillText(`[${sectorX}:${sectorY}]`, x + 4, y - 4);
          
          // Micro-Crosshair at intersection
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array = Stable Mounting

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20"
      style={{
        maskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
      }}
    >
      {/* 1. Static CSS Grid (Zero Memory Cost) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #49E774 1px, transparent 1px),
            linear-gradient(to bottom, #49E774 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* 2. Major Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #49E774 1px, transparent 1px),
            linear-gradient(to bottom, #49E774 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* 3. Dynamic Coordinate Canvas (State-Stable) */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full opacity-40"
      />
    </div>
  );
};

export default BlueprintGrid;
