"use client";

import { motion } from 'framer-motion';
import { Terminal, Code2, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

const FLOW_STEPS = [
    {
        title: "Truth Request",
        description: "Dev defines a TaaS Recipe via SDK. Multi-step logic specifies exactly how truth should be fetched and computed.",
        icon: Terminal,
        payload: {
            source: "NBA_API_V3",
            logic: "HomeScore > AwayScore",
            disputeWindow: "24h"
        }
    },
    {
        title: "Recipe Execution",
        description: "Nodes execute the sandboxed JS/Math logic. Data is fetched from multiple sources and aggregated off-chain.",
        icon: Code2,
        payload: {
            steps: ["fetch", "math", "aggregate"],
            strategy: "median"
        }
    },
    {
        title: "Network Consensus",
        description: "Sentinel nodes verify the execution trace and sign an EIP-712 attestation. Multi-sig security ensures integrity.",
        icon: ShieldCheck,
        payload: {
            sentinels: 5,
            threshold: 3,
            status: "signed"
        }
    },
    {
        title: "On-Chain Settlement",
        description: "Verified truth is pushed to the Helios blockchain. The Prediction Market or Dapp resolves with absolute finality.",
        icon: Database,
        payload: {
            contract: "TruthOracleV2",
            method: "proposeRichOutcome",
            tx: "0x8f...3a2b"
        }
    }
];

export function ProtocolFlow() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-transparent relative overflow-hidden border-y border-white/[0.03]">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Lifecycle
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-medium text-foreground mb-6"
                    >
                        From Raw API to <span className="text-primary italic">Absolute Truth.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        TaaS handles the complexity of decentralized consensus automatically,
                        providing a seamless bridge between data sources and on-chain intelligence.
                    </motion.p>
                </div>

                {/* Horizontal Flow (Desktop) */}
                <div className="hidden lg:grid grid-cols-4 gap-12 relative">
                    {/* SVG Energy Flow - Mastery Path */}
                    <div className="absolute top-12 left-8 right-8 h-20 z-0 pointer-events-none">
                        <svg className="w-full h-full overflow-visible">
                            {/* Static Track */}
                            <path
                                d="M 0 10 L 100% 10"
                                className="stroke-white/[0.03]"
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                            {/* Pulsing Base */}
                            <motion.path
                                d="M 0 10 L 100% 10"
                                className="stroke-primary/10"
                                strokeWidth="2"
                                strokeDasharray="10 15"
                                vectorEffect="non-scaling-stroke"
                                animate={{ strokeDashoffset: [-100, 0] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            {/* High-Contrast Energy Pulse */}
                            <motion.path
                                d="M 0 10 L 100% 10"
                                className="stroke-primary/40"
                                strokeWidth="2"
                                strokeDasharray="1 50"
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                animate={{ strokeDashoffset: [-500, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                    </div>

                    {FLOW_STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.8 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="relative z-10 flex flex-col items-center group cursor-default"
                        >
                            <div className={`w-24 h-24 rounded-[2rem] glass-ultra flex items-center justify-center mb-8 transition-all duration-500 scale-100 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] ${activeIndex === index ? 'border-primary/40 ring-4 ring-primary/5' : ''}`}>
                                <step.icon className={`w-10 h-10 transition-colors duration-500 ${activeIndex === index ? 'text-primary' : 'text-muted-foreground/40'}`} />
                            </div>

                            <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-8">
                                {step.description}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: activeIndex === index ? 1 : 0.4,
                                    height: 'auto',
                                    scale: activeIndex === index ? 1 : 0.95
                                }}
                                className={`w-full p-6 p-4 rounded-2xl glass-ultra font-mono text-[10px] text-left overflow-hidden border border-white/5 transition-all duration-500 ${activeIndex === index ? 'bg-primary/5 border-primary/20' : ''}`}
                            >
                                <div className="text-primary/40 mb-3 uppercase tracking-widest font-black">Attestation Payload</div>
                                <pre className="text-foreground/70 leading-relaxed">
                                    {JSON.stringify(step.payload, null, 2)}
                                </pre>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Vertical Timeline (Mobile) */}
                <div className="lg:hidden space-y-16 relative">
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5" />

                    {FLOW_STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-8 relative z-10"
                        >
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl glass-ultra flex items-center justify-center border border-primary/20 bg-primary/5">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex-1 space-y-4 pt-1">
                                <h3 className="text-2xl font-display font-bold text-foreground">{step.title}</h3>
                                <p className="text-base text-muted-foreground/60 leading-relaxed">
                                    {step.description}
                                </p>
                                <div className="p-6 rounded-2xl glass-ultra font-mono text-[11px] bg-black/40 border border-white/5">
                                    <pre className="text-primary/60 truncate">
                                        {JSON.stringify(step.payload)}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
