"use client";

import { motion } from 'framer-motion';
import { ArrowBottomRightIcon, RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative pt-48 pb-32 overflow-hidden">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10"
                    >
                        <RocketIcon /> The Architect of Autonomy
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[120px] font-display font-medium leading-[0.9] tracking-tighter text-foreground mb-12"
                    >
                        Bridging the <br />
                        <span className="text-primary italic">Truth Gap.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-foreground/50 max-w-2xl leading-relaxed mb-16"
                    >
                        Friehub enables autonomous off-chain to on-chain automation.
                        No middleware nodes. No complex resolution layers.
                        Just verifiable truth as a service.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-6"
                    >
                        <Link
                            href="#story"
                            className="h-14 px-8 bg-primary text-black font-black uppercase tracking-widest text-[11px] rounded flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                        >
                            The Origin <ArrowBottomRightIcon />
                        </Link>
                        <Link
                            href="/docs"
                            className="h-14 px-8 border border-white/10 hover:border-primary/20 text-foreground/60 font-black uppercase tracking-widest text-[11px] rounded flex items-center gap-3 transition-all"
                        >
                            Read Docs
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stark Horizontal Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
