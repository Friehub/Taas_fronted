"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowBottomRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRef } from 'react';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#020202]">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-dot-white opacity-[0.4] pointer-events-none" />

            {/* The Data-Flow Centerpiece */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] pointer-events-none select-none hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Concentric Circles */}
                    <motion.circle
                        cx="400" cy="400" r="350"
                        stroke="#AAFFB8" strokeOpacity="0.05" strokeWidth="1"
                    />
                    <motion.circle
                        cx="400" cy="400" r="250"
                        stroke="#AAFFB8" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="10 20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Central Processor Prism */}
                    <motion.rect
                        x="340" y="340" width="120" height="120" rx="4"
                        stroke="#AAFFB8" strokeWidth="2"
                        className="text-glow-mint"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Dynamic Data Lines */}
                    {[...Array(6)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M ${400 + Math.cos(i * 60) * 400} ${400 + Math.sin(i * 60) * 400} L 400 400`}
                            stroke="#AAFFB8"
                            strokeWidth="1"
                            strokeOpacity="0.2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 0] }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        />
                    ))}

                    {/* Orbiting Result Nodes */}
                    <motion.g
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "400px", originY: "400px" }}
                    >
                        <circle cx="650" cy="400" r="8" fill="#AAFFB8" className="text-glow-mint" />
                        <circle cx="150" cy="400" r="8" fill="#AAFFB8" className="text-glow-mint" />
                    </motion.g>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div style={{ y, opacity }} className="max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[140px] font-display font-medium leading-[0.85] tracking-tighter text-white mb-12"
                    >
                        Standardizing <br />
                        <span className="text-primary italic">Autonomous Truth.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-xl md:text-3xl text-white/40 max-w-2xl leading-tight mb-16 font-light"
                    >
                        Friehub bridges the Gap between off-chain signals and on-chain action.
                        Pure logic. Zero infrastructure. Programmable certainty.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-8"
                    >
                        <Link
                            href="#story"
                            className="h-16 px-10 bg-primary text-black font-black uppercase tracking-widest text-[12px] rounded-sm flex items-center gap-4 hover:bg-white transition-all shadow-[0_0_30px_rgba(170,255,184,0.1)]"
                        >
                            The Origin <ArrowBottomRightIcon width={20} height={20} />
                        </Link>
                        <Link
                            href="/docs"
                            className="h-16 px-10 border border-white/10 text-white font-black uppercase tracking-widest text-[12px] rounded-sm flex items-center gap-4 hover:border-primary/50 transition-all"
                        >
                            Developer SDK <DotFilledIcon className="text-primary" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-6 text-white/20 text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] font-black"
            >
                Scroll to Explore
            </motion.div>
        </section>
    );
}
