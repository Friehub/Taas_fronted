"use client";

import { motion } from 'framer-motion';
import {
    CodeIcon,
    LockClosedIcon,
    GlobeIcon,
    MagicWandIcon,
    ExitIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

export function ProtocolFocus() {
    return (
        <section className="py-32 border-y border-border bg-muted/10">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary mb-10 border border-primary/20">
                            <CodeIcon width={24} height={24} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 text-foreground tracking-tighter">
                            Autonomous <br />
                            <span className="text-primary italic">Verification.</span>
                        </h2>
                        <p className="text-lg text-foreground/50 leading-relaxed mb-12 max-w-xl">
                            TaaS serves as the standardized protocol for off-chain to on-chain automation.
                            We remove the need to manage infrastructure, providing builders with a clean,
                            programmable API for unverifiable data.
                        </p>

                        <div className="space-y-8 mb-12">
                            <FeatureRow
                                icon={<MagicWandIcon />}
                                title="No Spin-up Required"
                                description="Unlike Chainlink or UMA, TaaS doesn't require complex node management or manual resolution."
                            />
                            <FeatureRow
                                icon={<LockClosedIcon />}
                                title="Cryptographic Finality"
                                description="Every attestation is signed and verified across the Sentinel network."
                            />
                            <FeatureRow
                                icon={<ExitIcon />}
                                title="Modular Integration"
                                description="Plug TaaS into your prediction market, insurance protocol, or AI agent via simple Recipes."
                            />
                        </div>

                        <Link
                            href="https://github.com/friehub"
                            className="text-primary text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 hover:gap-5 transition-all"
                        >
                            Open Source Infrastructure <GlobeIcon />
                        </Link>
                    </div>

                    <div className="relative">
                        {/* Simplistic Technical Illustration/SVG */}
                        <div className="p-12 rounded-2xl bg-muted/5 border border-border relative group">
                            <div className="aspect-square flex items-center justify-center">
                                <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="70" y="70" width="60" height="60" rx="4" stroke="#AAFFB8" strokeWidth="2" />
                                    <path d="M100 0V60M100 140V200M0 100H60M140 100H200" stroke="#AAFFB8" strokeWidth="1" strokeDasharray="4 4" />
                                    <circle cx="100" cy="100" r="80" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                                    <motion.path
                                        d="M60 40L100 70L140 40"
                                        stroke="#AAFFB8"
                                        strokeWidth="2"
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                </svg>
                            </div>

                            {/* Technical Labels */}
                            <div className="absolute top-8 left-8 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
                                Raw Data Input
                            </div>
                            <div className="absolute bottom-8 right-8 text-[9px] font-mono text-primary uppercase tracking-[0.3em]">
                                Verifiable Truth Output
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureRow({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="mt-1 text-primary">{icon}</div>
            <div>
                <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">{title}</h4>
                <p className="text-sm text-foreground/40 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
