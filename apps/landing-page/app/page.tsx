"use client";

import React from "react";
import ScrollReveal from "../components/foundation/ScrollReveal";

// Marketing narrative sections - grounded in the actual codebase
import Hero from "../components/landing/Hero";
import ProblemStatement from "../components/landing/ProblemStatement";
import ProtocolPipeline from "../components/landing/ProtocolPipeline";
import CapabilityDomains from "../components/landing/CapabilityDomains";
import CompetitivePosition from "../components/landing/CompetitivePosition";
import SecurityArchitecture from "../components/landing/SecurityArchitecture";
import FederatedIntelligence from "../components/landing/FederatedIntelligence";

// Existing components (kept as-is)
import NetworkPersonas from "../components/landing/NetworkPersonas";
import ReadyToVerify from "../components/landing/ReadyToVerify";

/**
 * Marketing Landing Page - "What We Solved and How We Position"
 *
 * Narrative arc:
 * 1. MarketingHero       - The bold claim, grounded in specifics
 * 2. ProblemStatement    - What existing oracles get wrong
 * 3. ProtocolPipeline    - The 6-step TaaS lifecycle
 * 4. CapabilityDomains   - General oracle proof: any data domain
 * 5. CompetitivePosition - Honest comparison vs Chainlink / Pyth / UMA
 * 6. SecurityArchitecture - 6-layer trust model
 * 7. NetworkPersonas     - Who runs the network
 * 8. ReadyToVerify       - Waitlist CTA
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <div className="w-full relative z-10 flex flex-col items-center">

        <Hero />

        <div id="problem" className="w-full">
          <ScrollReveal>
            <ProblemStatement />
          </ScrollReveal>
        </div>

        <div id="protocol" className="w-full">
          <ScrollReveal>
            <ProtocolPipeline />
          </ScrollReveal>
        </div>

        <div id="capabilities" className="w-full">
          <ScrollReveal>
            <CapabilityDomains />
          </ScrollReveal>
        </div>

        <div id="competitive" className="w-full">
          <ScrollReveal>
            <CompetitivePosition />
          </ScrollReveal>
        </div>

        <div id="security" className="w-full">
          <ScrollReveal>
            <SecurityArchitecture />
          </ScrollReveal>
        </div>

        <div id="ai-oracle" className="w-full">
          <ScrollReveal>
            <FederatedIntelligence />
          </ScrollReveal>
        </div>

        <div id="network" className="w-full">
          <ScrollReveal>
            <NetworkPersonas />
          </ScrollReveal>
        </div>

        <div id="cta" className="w-full">
          <ScrollReveal>
            <ReadyToVerify />
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
