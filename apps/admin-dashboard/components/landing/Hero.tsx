"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Boxes, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden border-b border-white/5 bg-onyx">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-onyx via-transparent to-onyx"></div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-widest"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        V2.0 Public Beta
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
                    >
                        The Infrastructure of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                            Verifiable Truth.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
                    >
                        Friehub builds the deterministic layer for the decentralized web.
                        From <strong>Truth-as-a-Service (TaaS)</strong> oracles to our flagship <strong>Prediction Market</strong>.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link
                            href="https://docs.friehub.cloud"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-colors"
                        >
                            Start Building
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link
                            href="/overview"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                        >
                            Launch App
                        </Link>
                    </motion.div>
                </div>

                {/* Micro-Features */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 border-t border-white/5 pt-10"
                >
                    <Feature
                        icon={ShieldCheck}
                        title="Cryptographic Proofs"
                        desc="Every data point is signed, verified, and immutable on-chain."
                    />
                    <Feature
                        icon={Cpu}
                        title="Sentinel Network"
                        desc="Decentralized node operators verifying truth in real-time."
                    />
                    <Feature
                        icon={Boxes}
                        title="Modular Architecture"
                        desc="Plug-and-play SDKs for any data source or dApp integration."
                    />
                </motion.div>
            </div>
        </section>
    );
}

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex gap-4 items-start p-4 hover:bg-white/5 rounded-xl transition-colors">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Icon size={20} />
            </div>
            <div>
                <h3 className="text-white font-medium mb-1">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
