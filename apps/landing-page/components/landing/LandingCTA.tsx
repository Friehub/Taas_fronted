"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function LandingCTA() {
    return (
        <section className="py-48 bg-transparent relative overflow-hidden border-t border-white/[0.03]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)]"></div>

            <div className="container relative z-10 px-4 mx-auto text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-12 shadow-2xl shadow-primary/20 border border-primary/20"
                >
                    <Sparkles size={40} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-display font-medium text-foreground mb-8 tracking-tight"
                >
                    Build on <span className="text-primary italic">Truth.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground/60 mb-16 max-w-2xl mx-auto leading-relaxed"
                >
                    The infrastructure for the verifiable era is here.
                    Start building with TaaS today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/docs"
                        className="group relative inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-12 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-105 transition-all overflow-hidden"
                    >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <ArrowRight className="ml-3 h-4 w-4 relative z-10" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
