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
            {/* Premium Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#09090b]" />
                <MeshGradient />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </div>

            {/* Top Bar - Elevated Navigation */}
            <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-primary/20">
                        F
                    </div>
                    <span className="font-display text-2xl font-bold tracking-tight text-foreground">Friehub</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-8"
                >
                    <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        <Link href="/registry" className="hover:text-primary transition-colors">Registry</Link>
                        <Link href="/activity" className="hover:text-primary transition-colors">Truths</Link>
                        <Link href="https://docs.friehub.cloud" className="hover:text-primary transition-colors">Docs</Link>
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
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ultra mb-12"
                    >
                        <Sparkles size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Infrastructure of Verifiable Truth</span>
                    </motion.div>

                    <motion.h1
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { staggerChildren: 0.12 } }
                        }}
                        className="text-7xl md:text-[8.5rem] font-display font-medium tracking-tighter text-foreground leading-[0.85] mb-8"
                    >
                        {["Secure.", "Scaled.", "Sovereign."].map((word, i) => (
                            <motion.span
                                key={i}
                                variants={{
                                    initial: { opacity: 0, filter: 'blur(20px)', y: 40 },
                                    animate: { opacity: 1, filter: 'blur(0px)', y: 0 }
                                }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-lg md:text-2xl text-muted-foreground/60 max-w-2xl leading-relaxed mb-16 font-light"
                    >
                        The high-fidelity decentralized oracle network for builders requiring absolute integrity and sub-second resolution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto"
                    >
                        <Link
                            href="https://docs.friehub.cloud"
                            className="group relative w-full sm:w-auto px-12 py-6 bg-primary text-primary-foreground font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                                Build Truth <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>

                        <Link
                            href="https://dashboard.friehub.cloud"
                            className="w-full sm:w-auto px-12 py-6 glass-ultra text-foreground font-bold rounded-2xl hover:bg-white/[0.08] transition-all text-lg uppercase tracking-widest border border-white/10"
                        >
                            Explore Network
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
        </section>
    );
}

function MeshGradient() {
    return (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3),transparent_70%)] blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)] blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)] blur-[120px]"
            />
        </div>
    );
}
