"use client";

import { Header } from "../components/shared/Header";
import { Hero } from "../components/landing/Hero";
import { SupportedChains } from "../components/landing/SupportedChains";
import { StoryTimeline } from "../components/landing/StoryTimeline";
import { Blueprint } from "../components/landing/Blueprint";
import { PluginPlayground } from "../components/landing/PluginPlayground";
import { CryptoEngine } from "../components/landing/CryptoEngine";
import { ProtocolFocus } from "../components/landing/ProtocolFocus";
import { DataCategories } from "../components/landing/DataCategories";
import { Waitlist } from "../components/landing/Waitlist";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased">
            <Header />

            {/* The Active Narrative Flow */}
            <div className="relative">
                <Hero />
                <SupportedChains />
                <StoryTimeline />
                <Blueprint />
                <PluginPlayground />
                <CryptoEngine />
                <ProtocolFocus />
                <DataCategories />
                <Waitlist />
            </div>

            <LandingFooter />
        </main>
    );
}
