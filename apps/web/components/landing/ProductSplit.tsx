"use client";

import { motion } from 'framer-motion';
import { LineChart, Server, ArrowUpRight, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import { getDashboardUrl, getDocsUrl } from '../../lib/shared/url-manager';

export function ProductSplit() {
    return (
        <section className="py-24 bg-background relative overflow-hidden border-b border-border">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">One Ecosystem. Unlimited Apps.</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Friehub provides the high-integrity infrastructure and the modular tools to build
                        the next generation of verifiable applications.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* The Infrastructure: TaaS */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 lg:p-12 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-all"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary border border-primary/20">
                                <Server size={28} />
                            </div>

                            <h3 className="text-3xl font-bold text-foreground mb-4">TaaS Engine</h3>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                The decentralized source-of-truth. Programmable recipes allow developers
                                to fetch, verify, and settle any real-world outcome on-chain in seconds.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={Zap} title="Sub-second Resolution" />
                                <FeatureItem icon={Shield} title="Optimistic Multi-Sig" />
                                <FeatureItem icon={Globe} title="Any REST API" />
                                <FeatureItem icon={Shield} title="EIP-712 Certified" />
                            </div>

                            <Link
                                href={getDocsUrl('/taas')}
                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                            >
                                Explorer Protocol <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* The Product: Prediction Market */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 lg:p-12 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-emerald-500/30 transition-all"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 border border-emerald-500/20">
                                <LineChart size={28} />
                            </div>

                            <h3 className="text-3xl font-bold text-foreground mb-4">Prediction Market</h3>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                The ultimate showcase of TaaS power. A high-liquidity,
                                permissionless market for everything from sports to AI benchmarks.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={Zap} title="Chronos Autonomy" />
                                <FeatureItem icon={Globe} title="Infinite Markets" />
                                <FeatureItem icon={Shield} title="LMSR Pricing" />
                                <FeatureItem icon={Zap} title="AI-Driven Discovery" />
                            </div>

                            <Link
                                href={getDashboardUrl('/overview')}
                                className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-3 transition-all"
                            >
                                Launch Product <ArrowUpRight size={20} />
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
        <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Icon size={14} className="text-primary/60" />
            <span>{title}</span>
        </div>
    );
}
