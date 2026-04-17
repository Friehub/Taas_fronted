"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * FriehubLogo - A "Precision-Engineered" text-based logo.
 * Designed to be easily swappable for a vector asset while maintaining
 * the "Stated/Obsessive" technical look.
 */
export const FriehubLogo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-baseline space-x-1.5 font-display transition-all duration-300 ${className}`}>
      {/* Primary Brand - The "Text-Mark" */}
      <span className={`tracking-[-0.03em] font-bold text-foreground ${sizeMap[size]}`}>
        Friehub<span className="text-primary">.</span>
      </span>
      
      {/* Product Identifier - Technical Metadata */}
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary/40 pt-1 border-l border-primary/20 pl-2 ml-2">
        Oracle Stack
      </span>
    </div>
  );
};

export default FriehubLogo;
