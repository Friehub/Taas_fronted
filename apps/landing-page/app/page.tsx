"use client";

import { Header } from "../components/shared/Header";
import { Hero } from "../components/landing/Hero";
import { StoryTimeline } from "../components/landing/StoryTimeline";
import { ProtocolFocus } from "../components/landing/ProtocolFocus";
import { Waitlist } from "../components/landing/Waitlist";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
            <Header />

            {/* Sequential Flow */}
            <div className="relative">
                <Hero />
                <StoryTimeline />
                <ProtocolFocus />
                <Waitlist />
            </div>

            <LandingFooter />
        </main>
    );
}
