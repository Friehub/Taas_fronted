"use client";

import React from "react";
import OracleUniverse from "../animation/OracleUniverse";

export const MarketingHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      
      {/* Cinematic 3D Oracle Animation Overlaying the entire view */}
      <div className="absolute inset-0 z-0">
        <OracleUniverse />
      </div>

      {/* Narrative Reveal points will be managed inside OracleUniverse */}
    </section>
  );
};

export default MarketingHero;
