"use client";

import { Hero } from "../components/landing/Hero";
import { CodeShowcase } from "../components/landing/CodeShowcase";
import { ProductSplit } from "../components/landing/ProductSplit";
import { ProtocolFlow } from "../components/landing/ProtocolFlow";
import { RichOutcomes } from "../components/landing/RichOutcomes";
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Protocol Flow Visualization */}
            <ProtocolFlow />

            {/* 3. Technical Showcase (Terminal) */}
            <section className="py-24 bg-card border-b border-border">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Side */}
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-xs font-medium uppercase tracking-widest">
                                <Terminal size={12} />
                                Developer First
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                                Truth should be a <br />
                                <span className="text-primary italic">Primitive, not a Service.</span>
                            </h2>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                TaaS abstracts away the complexity of decentralized consensus.
                                Request data from any API, and our network specific guardians will verify
                                integrity before it ever touches your smart contract.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div>
                                    <div className="text-3xl font-bold text-foreground mb-1">240ms</div>
                                    <div className="text-sm text-muted-foreground font-mono uppercase tracking-tighter">Latency</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground mb-1">100%</div>
                                    <div className="text-sm text-muted-foreground font-mono uppercase tracking-tighter">Uptime</div>
                                </div>
                            </div>
                        </div>

                        {/* Code Side */}
                        <div className="flex-1 w-full">
                            <CodeShowcase />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Rich Outcomes Showcase */}
            <RichOutcomes />

            {/* 5. Product Ecosystem (The Synergy) */}
            <ProductSplit />

            {/* 6. Footer CTA */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

                <div className="container relative z-10 px-4 mx-auto text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Ready to build the verifiable web?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                        Join developers building the next generation of truth-powered dApps.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="https://docs.friehub.cloud"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-8 border-t border-border bg-card text-center text-sm text-muted-foreground/60">
                <div className="container">
                    <p>&copy; 2026 Friehub Inc. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
