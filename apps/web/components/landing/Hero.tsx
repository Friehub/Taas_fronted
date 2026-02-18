"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Grid & Stream */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                <DataStream />
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground shadow-lg shadow-primary/20">F</div>
                    <span className="font-display text-xl font-bold tracking-tight">Friehub</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Operational Testnet</span>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            <div className="container relative z-10 px-4 mx-auto pt-20">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[7rem] font-display font-bold tracking-tight text-foreground leading-[0.9] lg:leading-[0.85]"
                    >
                        Infrastructure of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/90 to-primary/40">
                            Verifiable Truth.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-lg md:text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed font-medium"
                    >
                        Friehub provides the decentralized oracle network and modular SDKs for builders
                        who require absolute integrity and sub-second resolution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link
                            href="https://docs.friehub.cloud"
                            className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                        >
                            Get Started <ArrowRight size={20} />
                        </Link>

                        <Link
                            href="https://dashboard.friehub.cloud"
                            className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] border border-white/10 backdrop-blur-md text-foreground font-bold rounded-2xl hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2 text-lg"
                        >
                            Launch Explorer
                        </Link>
                    </motion.div>

                    {/* Micro-Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="pt-16 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 border-t border-white/5 w-full max-w-4xl justify-items-center mx-auto"
                    >
                        <StatItem label="Average Latency" value="240ms" />
                        <StatItem label="Finality" value="Immediate" />
                        <StatItem label="Validation" value="Optimistic" className="col-span-2 md:col-span-1" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StatItem({ label, value, className = "" }: { label: string, value: string, className?: string }) {
    return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-black">{label}</span>
            <span className="text-3xl font-display font-bold text-foreground font-mono">{value}</span>
        </div>
    );
}

function DataStream() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-[0.08]">
            <div className="mask-gradient absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-primary"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `-20%`,
                            width: `${30 + Math.random() * 40}%`,
                            opacity: 0.1 + Math.random() * 0.4
                        }}
                        animate={{
                            left: ['-20%', '120%'],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
