"use client";

import React from "react";
import ScrollReveal from "../components/foundation/ScrollReveal";

// Content Components (Sprints 2, 3 & 4)
import Hero from "../components/landing/Hero";
import KernelPerformance from "../components/landing/KernelPerformance";
import SovereignIntelligence from "../components/landing/SovereignIntelligence";
import NetworkPersonas from "../components/landing/NetworkPersonas";
import TruthRegistry from "../components/landing/TruthRegistry";
import OracleInsights from "../components/landing/OracleInsights";
import ReadyToVerify from "../components/landing/ReadyToVerify";

/**
 * Landing Page - Institutional "Technical Blueprint"
 * Final Implementation of the Friehub TaaS marketing narrative.
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      
      {/* 2. Main Narrative Sequence */}
      <div className="w-full relative z-10 flex flex-col items-center">
        
        <Hero />
        
        <div id="technology" className="w-full">
          <ScrollReveal>
             <KernelPerformance />
          </ScrollReveal>
        </div>

        <div id="oracle" className="w-full">
          <ScrollReveal>
            <TruthRegistry />
          </ScrollReveal>
        </div>

        <div id="network" className="w-full">
          <ScrollReveal>
            <NetworkPersonas />
          </ScrollReveal>
        </div>

        <div id="ai-oracle" className="w-full">
          <ScrollReveal delay={0.3}>
             <SovereignIntelligence />
          </ScrollReveal>
        </div>

        <div id="insights" className="w-full">
          <ScrollReveal>
            <OracleInsights />
          </ScrollReveal>
        </div>

        {/* Sprint 4 Flagship CTA */}
        <div id="cta" className="w-full">
          <ScrollReveal>
            <ReadyToVerify />
          </ScrollReveal>
        </div>

      </div>

    </div>
  );
}
