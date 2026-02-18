"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, ShieldCheck, Database, ArrowRight, Eye, Code2 } from 'lucide-react';

const STEPS = [
    {
        id: 'request',
        cmd: 'taas request --source "ETH/USD" --min-reputation 0.9',
        output: 'Request initialized: 0x8f...3a2b',
        color: 'text-primary',
        icon: Terminal
    },
    {
        id: 'validators',
        cmd: 'Searching for validators...',
        output: 'Selected: Sentinel_Alpha (Rep: 0.98), Sentinel_Beta (Rep: 0.95)',
        color: 'text-emerald-400',
        icon: ShieldCheck
    },
    {
        id: 'consensus',
        cmd: 'Verifying data integrity...',
        output: 'Consensus Reached: $3,450.25 (Signature Verified)',
        color: 'text-primary',
        icon: Database
    },
    {
        id: 'callback',
        cmd: 'Executing on-chain callback...',
        output: 'Tx Confirmed: 0x1d...9e4f (Block #184203)',
        color: 'text-emerald-400',
        icon: CheckCircle2,
        payload: {
            domain: "TruthOracleV2",
            attestation: "0x1b...f2e",
            signer: "0x3C...55A"
        }
    }
];

export function CodeShowcase() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPayload, setShowPayload] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % STEPS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Window Frame */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                {/* Title Bar */}
                <div className="px-4 py-3 bg-muted border-b border-border flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                        taas-cli — v2.4.0
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm h-[320px] bg-background/50 relative overflow-hidden group">
                    <AnimatePresence mode="wait">
                        {!showPayload ? (
                            <motion.div
                                key="terminal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {STEPS.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: index <= currentStep ? 1 : 0.3,
                                            x: 0,
                                            filter: index > currentStep ? 'blur(2px)' : 'none'
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex gap-4 ${index === currentStep ? 'bg-muted -mx-4 px-4 py-2 rounded-lg border-l-2 border-primary' : ''}`}
                                    >
                                        <div className="mt-1">
                                            <step.icon size={16} className={index <= currentStep ? step.color : 'text-muted-foreground/20'} />
                                        </div>
                                        <div className="space-y-1 w-full">
                                            <div className="flex items-center gap-2 text-foreground/80">
                                                <span className="text-muted-foreground/60">$</span>
                                                <span className={index === currentStep ? 'text-foreground' : ''}>{step.cmd}</span>
                                                {index === currentStep && (
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 0.8, repeat: Infinity }}
                                                        className="w-1.5 h-4 bg-primary inline-block ml-1 align-middle"
                                                    />
                                                )}
                                            </div>
                                            <AnimatePresence>
                                                {index <= currentStep && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className={`text-xs ${step.color}`}
                                                    >
                                                        {'>'} {step.output}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="payload"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col pt-2"
                            >
                                <div className="flex items-center gap-2 text-primary/60 text-[10px] uppercase tracking-widest mb-4">
                                    <Code2 size={12} />
                                    Security Attestation Packet (EIP-712)
                                </div>
                                <div className="flex-1 p-4 rounded-lg bg-muted/30 border border-primary/10 overflow-auto font-mono text-[10px] text-primary/90 leading-relaxed text-wrap">
                                    <pre>
                                        {JSON.stringify({
                                            domain: {
                                                name: "TaaS_Network",
                                                version: "2.1.0",
                                                chainId: 830,
                                                verifyingContract: "0x3C...55A"
                                            },
                                            message: {
                                                requestId: "0x8f...3a2b",
                                                outcome: "3450250000",
                                                timestamp: 1739812403,
                                                sentinel: "0xAD...e41"
                                            },
                                            primaryType: "TruthAttestation",
                                            signature: "0xbb47...ae12"
                                        }, null, 2)}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Meta Toggle */}
                    <button
                        onClick={() => setShowPayload(!showPayload)}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-card/80 border border-border backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:border-primary/50 text-muted-foreground hover:text-primary"
                    >
                        <Eye size={16} />
                    </button>

                    {/* Status Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-muted border-t border-border flex justify-between items-center text-[10px] text-muted-foreground">
                        <div className="flex gap-4">
                            <span>Network: <span className="text-emerald-500">Connected</span></span>
                            <span>Latency: <span className="text-foreground/60">24ms</span></span>
                        </div>
                        <div className="flex items-center gap-1">
                            Processing Data Stream <LoaderDots />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoaderDots() {
    return (
        <span className="inline-flex gap-0.5 ml-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-primary rounded-full"
                />
            ))}
        </span>
    );
}
