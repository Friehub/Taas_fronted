"use client";

import { motion } from 'framer-motion';
import { Terminal, Code2, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';

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
    return (
        <section className="py-24 bg-background relative overflow-hidden border-b border-border">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        The Infrastructure of Truth
                    </h2>
                    <p className="text-muted-foreground">
                        From raw API data to verifiable on-chain outcomes.
                        TaaS handles the complexity of decentralized consensus automatically.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border z-0" />

                    {FLOW_STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                {step.description}
                            </p>

                            <div className="w-full p-4 rounded-xl bg-muted/50 border border-border font-mono text-[10px] text-left overflow-hidden">
                                <div className="text-primary/60 mb-2 uppercase tracking-tighter">Payload Data</div>
                                <pre className="text-foreground/80">
                                    {JSON.stringify(step.payload, null, 2)}
                                </pre>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
