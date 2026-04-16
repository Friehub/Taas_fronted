"use client";

import { Header } from "../components/shared/Header";
import { Hero } from "../components/landing/Hero";
import { SupportedChains } from "../components/landing/SupportedChains";
import { BentoFeatures } from "../components/landing/BentoFeatures";
import { PluginPlayground } from "../components/landing/PluginPlayground";
import { ArchitectureProof } from "../components/landing/ArchitectureProof";
import { KnowledgeBase } from "../components/landing/KnowledgeBase";
import { Waitlist } from "../components/landing/Waitlist";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased">
            <Header />

            <div className="relative">
                <Hero />
                <SupportedChains />
                <BentoFeatures />
                <PluginPlayground />
                <ArchitectureProof />
                <KnowledgeBase />
                <Waitlist />
            </div>

            <LandingFooter />
        </main>
    );
}
