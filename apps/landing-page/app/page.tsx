"use client";

import { Header } from "../components/shared/Header";
import { Hero } from "../components/landing/Hero";
import { StoryTimeline } from "../components/landing/StoryTimeline";
import { Blueprint } from "../components/landing/Blueprint";
import { ProtocolFocus } from "../components/landing/ProtocolFocus";
import { Waitlist } from "../components/landing/Waitlist";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased">
            <Header />

            {/* The Active Narrative Flow */}
            <div className="relative">
                <Hero />
                <StoryTimeline />
                <Blueprint />
                <ProtocolFocus />
                <Waitlist />
            </div>

            <LandingFooter />
        </main>
    );
}
