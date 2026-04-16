"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowBottomRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { TerminalStartup } from './TerminalStartup';
import { LiveAttestationStream } from './LiveAttestationStream';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax & 3D Tilt values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

    const parallaxX = useTransform(smoothX, [-300, 300], [-15, 15]);
    const parallaxY = useTransform(smoothY, [-300, 300], [-10, 10]);
    const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
    const rotateY = useTransform(smoothX, [-300, 300], [-5, 5]);

    // Handle mouse move for parallax & magnetic physics
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set(clientX - centerX);
            mouseY.set(clientY - centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
            {/* Background Layer: Institutional Blueprint */}
            <div className="absolute inset-0 bg-blueprint opacity-[0.4] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

            {/* Architectural Annotations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none font-mono text-[8px] uppercase tracking-widest">
                <div className="absolute top-1/4 left-10 flex items-center gap-4">
                    <div className="w-[120px] h-[1px] bg-primary/40" />
                    <span>GATEWAY_COORD: 54.21 / 12.04</span>
                </div>
                <div className="absolute bottom-1/4 right-20 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                        <span>LATENCY_STABILITY: 1.2MS</span>
                        <div className="w-[80px] h-[1px] bg-primary/40" />
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-primary/5" />
            </div>

            {/* The Live Network Stream Centerpiece */}
            <div className="absolute top-1/2 right-0 md:right-12 -translate-y-1/2 w-[400px] pointer-events-none hidden lg:block z-20 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="opacity-20 lg:opacity-40 xl:opacity-60 transition-opacity duration-1000"
                >
                    <LiveAttestationStream />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div style={{ y, opacity }} className="max-w-4xl xl:max-w-5xl">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em]">Node Cluster: Mainnet-Beta-01</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-9xl lg:text-[160px] font-display font-bold leading-[0.8] tracking-[-0.05em] text-foreground mb-16"
                    >
                        Truth as a <br />
                        <motion.span
                            animate={{ opacity: [0.9, 1, 0.9] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent inline-block"
                        >
                            Service.
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-xl md:text-2xl text-foreground/50 max-w-3xl leading-snug mb-16 font-light"
                    >
                        An institution-grade oracle protocol delivering verifiable process-results. 
                        A hardened execution runtime for threshold consensus, BLS aggregation, 
                        and cryptographically-secured data pipelines.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="/dashboard"
                            className="h-14 px-12 bg-primary text-primary-foreground font-bold text-base rounded-sm flex items-center justify-center min-w-[220px] hover:translate-y-[-2px] transition-all shadow-[0_20px_40px_rgba(73,231,116,0.1)]"
                        >
                            Launch DApp
                        </Link>
                        <Link
                            href="/whitepaper"
                            className="h-14 px-12 bg-surface-high border border-white/5 text-foreground font-bold text-base rounded-sm flex items-center justify-center min-w-[220px] hover:bg-surface-bright transition-all"
                        >
                            Read Whitepaper
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Aesthetic Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-6 text-foreground/20 text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] font-black"
            >
                Scroll to Explore
            </motion.div>
        </section>
    );
}
