"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../shared/ThemeToggle';
import React, { useRef } from 'react';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Mastery-Level Vibrant Infinite Horizon Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Base Layer - Deep Navy to Charcoal transition */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14] via-[#060b0e] to-background" />

                {/* Primary Ambient Glow - Emerald/Mint */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_70%)] blur-[40px]"
                />

                {/* Secondary Accent Glow - Indigo/Purple Shift */}
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] blur-[60px]"
                />

                {/* Dotted Grid - Premium Institutional Look */}
                <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20 mix-blend-overlay" />

                {/* Depth Ornaments */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <motion.div
                        animate={{ y: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30%] left-[20%] w-px h-32 bg-gradient-to-b from-transparent via-primary/60 to-transparent"
                    />
                    <motion.div
                        animate={{ y: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute bottom-[20%] right-[25%] w-px h-48 bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent"
                    />
                </div>

                {/* Global Grain Refinement */}
                <div className="absolute inset-0 pointer-events-none bg-noise-overlay mix-blend-soft-light opacity-[0.03]" />
            </div>

            {/* Top Bar - Elevated Navigation */}
            <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-primary/20">
                        F
                    </div>
                    <span className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">Friehub</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="flex items-center gap-8"
                >
                    <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
                        <Link href={process.env.NEXT_PUBLIC_MARKET_URL || "#"} className="hover:text-primary hover:tracking-[0.5em] transition-all duration-300">Markets</Link>
                        <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "#"} className="hover:text-primary hover:tracking-[0.5em] transition-all duration-300">Dashboard</Link>
                        <Link href={process.env.NEXT_PUBLIC_DOCS_URL || "#"} className="hover:text-primary hover:tracking-[0.5em] transition-all duration-300">Docs</Link>
                    </nav>
                    <div className="h-4 w-px bg-white/10 hidden lg:block" />
                    <ThemeToggle />
                </motion.div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container relative z-10 px-4 mx-auto pt-32"
            >
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.h1
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="text-7xl md:text-[8.5rem] font-display font-medium tracking-tighter text-white leading-[0.85] mb-12 select-none"
                    >
                        {["Permissionless.", "Rich.", "Absolute."].map((word, i) => (
                            <motion.span
                                key={i}
                                variants={{
                                    initial: { opacity: 0, filter: 'blur(12px)', y: 40 },
                                    animate: { opacity: 1, filter: 'blur(0px)', y: 0 }
                                }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                                className="block drop-shadow-2xl"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-16 font-light tracking-wide"
                    >
                        The high-fidelity decentralized oracle network for builders requiring absolute integrity and sub-second resolution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto"
                    >
                        <Link
                            href={process.env.NEXT_PUBLIC_DOCS_URL || "#"}
                            className="group relative w-full sm:w-auto px-12 py-6 bg-primary text-primary-foreground font-black rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-[1.05] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-[0.2em]">
                                Build Truth <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </Link>

                        <Link
                            href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "#"}
                            className="w-full sm:w-auto px-12 py-6 glass-ultra text-white font-black rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 text-lg uppercase tracking-[0.2em] border border-white/10 hover:border-white/20 flex items-center justify-center gap-3 group active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            Explore Network
                            <Sparkles size={18} className="text-primary group-hover:rotate-12 transition-transform duration-500" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
        </section>
    );
}

