"use client";

import React from "react";
import { motion } from "framer-motion";

const RelayerFlowDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl aspect-[1.5/1] font-sans scale-90 lg:scale-100 origin-center">
      {/* SVG Background Connections (Animated Path) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Listen Paths (Top Down) */}
        <motion.path
          d="M 150 80 L 150 120 M 450 80 L 450 120"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Central Sync Path */}
        <motion.path
          d="M 220 270 L 380 270"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="5 5"
          fill="none"
        />

        {/* Settlement Paths (Bottom) */}
        <motion.path
          d="M 150 320 L 150 340 M 450 320 L 450 340"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Animated Particles flowing through paths */}
        <motion.circle r="2" fill="currentColor" fillOpacity="0.5">
          <animateMotion 
            path="M 150 80 L 150 130" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </motion.circle>
        <motion.circle r="2" fill="currentColor" fillOpacity="0.5">
          <animateMotion 
            path="M 450 80 L 450 130" 
            dur="3s" 
            repeatCount="indefinite" 
            begin="1.5s" 
          />
        </motion.circle>
      </svg>

      {/* Grid Layout of Components */}
      <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] gap-8 p-4">
        
        {/* Row 1: Spoke Chains */}
        <div className="flex justify-between px-10">
          <SpokeCard name="Optimism" />
          <SpokeCard name="BSC" />
        </div>

        {/* Row 2: Relayer Core */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Main Core */}
          <div className="w-[80%] surface-depth border border-surface-border p-6 relative group overflow-hidden bg-background/50 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 flex items-center justify-center border border-surface-border rounded-lg bg-surface-low">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                   <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                 </svg>
               </div>
               <div>
                  <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest font-bold">Rust Relayer Core</div>
                  <div className="text-sm font-display font-medium text-foreground">High-Performance Orchestrator</div>
                  <div className="mt-3 flex gap-4 text-[8px] font-mono text-foreground/30 uppercase tracking-widest leading-none">
                    <span>① Capture</span>
                    <span>② Compute</span>
                    <span>③ Aggregate</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Sync Components */}
          <div className="flex items-center justify-center gap-12 w-full">
            <div className="flex-1 max-w-[140px] p-3 border border-surface-border bg-surface-low/20 text-center">
              <div className="text-[8px] font-mono text-foreground/40 uppercase mb-1">Holesky Hub</div>
              <div className="text-[10px] font-bold text-foreground/80">Authorized Op List</div>
            </div>
            
            <div className="text-[8px] font-mono text-foreground/20 uppercase tracking-[0.2em]">SYNC</div>

            <div className="flex-1 max-w-[140px] p-3 border border-surface-border bg-surface-low/20 text-center">
              <div className="text-[8px] font-mono text-foreground/40 uppercase mb-1">TaaS Nodes</div>
              <div className="text-[10px] font-bold text-foreground/80">Verifiable V8</div>
            </div>
          </div>
        </div>

        {/* Row 3: Settlement Managers */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-[90%] h-10 border border-surface-border bg-background flex items-center justify-center overflow-hidden relative">
             <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest z-10">Submit &quot;Truth Bundle&quot;</div>
             <motion.div 
               animate={{ x: [-400, 400] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent" 
             />
          </div>
          <div className="flex justify-between w-full px-8">
            <SettlementCard />
            <SettlementCard />
          </div>
        </div>

      </div>
    </div>
  );
};

const SpokeCard = ({ name }: { name: string }) => (
  <div className="w-40 border border-surface-border bg-background p-3 text-center space-y-1 group">
    <div className="text-[8px] font-mono text-foreground/40 uppercase tracking-widest">Spoke Chain: {name}</div>
    <div className="text-xs font-display font-medium text-foreground">Consumer Contract</div>
    <div className="text-[9px] font-mono text-foreground/30">(TruthRequested)</div>
  </div>
);

const SettlementCard = () => (
  <div className="w-44 border border-surface-border bg-surface-low/30 p-3 flex items-center gap-3">
    <div className="w-6 h-6 flex items-center justify-center border border-surface-border rounded-full bg-background flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="space-y-0.5">
      <div className="text-[9px] font-display font-bold text-foreground">TaaSSpokeManager</div>
      <div className="text-[7px] font-mono text-foreground/40 uppercase tracking-wider">ECDSA Verification</div>
    </div>
  </div>
);

export default RelayerFlowDiagram;
