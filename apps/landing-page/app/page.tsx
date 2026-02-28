"use client";

import { Hero } from "../components/landing/Hero";
import { CodeShowcase } from "../components/landing/CodeShowcase";
import { ProductSplit } from "../components/landing/ProductSplit";
import { ProtocolFlow } from "../components/landing/ProtocolFlow";
import { RichOutcomes } from "../components/landing/RichOutcomes";
import { LandingCTA } from "../components/landing/LandingCTA";
import { LandingFooter } from "../components/landing/LandingFooter";
import { InstitutionalContext } from "../components/landing/InstitutionalContext";
import { Waitlist } from "../components/landing/Waitlist";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* 1. Hero Section */}
            <Hero />

            {/* Friehub Branding & Context */}
            <InstitutionalContext />

            {/* 2. Protocol Flow Visualization */}
            <ProtocolFlow />

            {/* 3. Technical Showcase (IDE) */}
            <CodeShowcase />

            {/* 4. Rich Outcomes Showcase */}
            <RichOutcomes />

            {/* 6. Product Ecosystem (The Synergy) */}
            <ProductSplit />

            {/* 7. Waitlist Section */}
            <Waitlist />

            {/* 8. Institutional Footer CTA */}
            <LandingCTA />

            {/* Premium Minimized Footer */}
            <LandingFooter />
        </main>
    );
}
