"use client";

import { motion } from 'framer-motion';
import { LineChart, Server, ArrowUpRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getDashboardUrl, getDocsUrl } from '../../lib/shared/url-manager';

export function ProductSplit() {
    return (
        <section className="py-32 bg-transparent relative overflow-hidden border-y border-white/[0.03]">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Dual-Engine Ecosystem
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground mb-6">
                        One Infrastructure. <br />
                        <span className="text-muted-foreground/40 italic">Unlimited Possibilities.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        Whether you're building a sovereign prediction market or a high-frequency trading bot,
                        Friehub provides the modular core for verifiable logic.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* The Infrastructure: TaaS */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[3rem] glass-ultra border border-white/5 relative overflow-hidden group cursor-default"
                    >
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
                                <Server size={32} />
                            </div>

                            <h3 className="text-3xl font-display font-bold text-foreground mb-4">Truth Infrastructure</h3>
                            <p className="text-muted-foreground/60 text-lg mb-10 leading-relaxed flex-1">
                                The decentralized source-of-truth for the verifiable web. Programmable recipes allow builders
                                to fetch, verify, and settle complex real-world outcomes with cryptographic finality.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <FeatureItem icon={Zap} title="Sub-second Resolution" />
                                <FeatureItem icon={Shield} title="Optimistic Multi-Sig" />
                                <FeatureItem icon={Globe} title="Unified API Bridge" />
                                <FeatureItem icon={Sparkles} title="ZK-Truth Proofs" />
                            </div>

                            <Link
                                href={getDocsUrl('/taas')}
                                className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm hover:gap-5 transition-all w-fit"
                            >
                                Explore Protocol <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* The Product: Prediction Market */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[3rem] glass-ultra border border-white/5 relative overflow-hidden group cursor-default"
                    >
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-10 text-emerald-400 border border-emerald-500/20 transition-transform group-hover:scale-110">
                                <LineChart size={32} />
                            </div>

                            <h3 className="text-3xl font-display font-bold text-foreground mb-4">Core Application</h3>
                            <p className="text-muted-foreground/60 text-lg mb-10 leading-relaxed flex-1">
                                High-performance access to decentralized prediction markets. A powerful
                                environment for global participants to engage with verifiable intelligence.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-12 text-emerald-100/60">
                                <FeatureItem icon={Zap} title="Chronos Autonomy" />
                                <FeatureItem icon={Globe} title="Infinite Markets" />
                                <FeatureItem icon={Shield} title="LMSR Pricing" />
                                <FeatureItem icon={LineChart} title="Deep Liquidity" />
                            </div>

                            <Link
                                href={getDashboardUrl('/overview')}
                                className="inline-flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-widest text-sm hover:gap-5 transition-all w-fit"
                            >
                                Launch Platform <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ icon: Icon, title }: { icon: any, title: string }) {
    return (
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/40 group/item">
            <Icon size={14} className="text-primary group-hover/item:scale-110 transition-transform" />
            <span>{title}</span>
        </div>
    );
}
