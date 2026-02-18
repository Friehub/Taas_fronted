"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, ShieldCheck, Database, ArrowRight } from 'lucide-react';

const STEPS = [
    {
        id: 'request',
        cmd: 'taas request --source "ETH/USD" --min-reputation 0.9',
        output: 'Request initialized: 0x8f...3a2b',
        color: 'text-indigo-400',
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
        color: 'text-blue-400',
        icon: Database
    },
    {
        id: 'callback',
        cmd: 'Executing on-chain callback...',
        output: 'Tx Confirmed: 0x1d...9e4f (Block #184203)',
        color: 'text-purple-400',
        icon: CheckCircle2
    }
];

export function CodeShowcase() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % STEPS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Window Frame */}
            <div className="bg-onyx border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {/* Title Bar */}
                <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                        taas-cli — v2.4.0
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm h-[320px] bg-black/50 relative">
                    <div className="space-y-6">
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
                                className={`flex gap-4 ${index === currentStep ? 'bg-white/5 -mx-4 px-4 py-2 rounded-lg border-l-2 border-indigo-500' : ''}`}
                            >
                                <div className="mt-1">
                                    <step.icon size={16} className={index <= currentStep ? step.color : 'text-slate-700'} />
                                </div>
                                <div className="space-y-1 w-full">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <span className="text-slate-600">$</span>
                                        <span className={index === currentStep ? 'text-white' : ''}>{step.cmd}</span>
                                        {index === currentStep && (
                                            <motion.span
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="w-2 h-4 bg-indigo-500 inline-block ml-1 align-middle"
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
                    </div>

                    {/* Status Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                        <div className="flex gap-4">
                            <span>Network: <span className="text-emerald-500">Connected</span></span>
                            <span>Latency: <span className="text-slate-300">24ms</span></span>
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
                    className="w-1 h-1 bg-indigo-500 rounded-full"
                />
            ))}
        </span>
    );
}
