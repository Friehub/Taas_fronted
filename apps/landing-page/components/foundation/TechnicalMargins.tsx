"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * TechnicalMargins - The "Institutional Gutter" Components.
 * Adds vertical gauges and protocol metadata labels that appear on large screens.
 * This signals high-end engineering focus and "Expert Architecture."
 */
export const TechnicalMargins: React.FC = () => {
  return (
    <>
      {/* Left Margin - Protocol Gauges */}
      <div className="hidden xl:fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-12 items-center">
        <div className="flex flex-col items-center space-y-12 pointer-events-auto">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-32 w-[1px] bg-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scanline" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-1 pointer-events-none">
          <span className="text-[8px] font-mono text-primary/40">NET_ID</span>
          <span className="text-[10px] font-mono font-bold text-primary">TaaS_V2_PROD</span>
        </div>
      </div>

      {/* Right Margin - Data Coordinates / Metadata */}
      <div className="hidden xl:fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col space-y-12 items-center pointer-events-none">
        <div className="flex flex-col items-center space-y-1 rotate-90">
          <span className="text-redline whitespace-nowrap">Latency: 0.003ms</span>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="w-8 h-[1px] bg-primary/30" />
          <div className="w-4 h-[1px] bg-primary/30 ml-auto" />
          <div className="w-8 h-[1px] bg-primary/30" />
        </div>

        <div className="flex flex-col items-center space-y-2 opacity-30">
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse duration-700" />
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse duration-1000" />
        </div>
      </div>
    </>
  );
};

export default TechnicalMargins;
