"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowBottomRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { TerminalStartup } from './TerminalStartup';

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
            {/* Background Texture */}
            <div className="absolute inset-0 bg-dot-white opacity-40 dark:opacity-40 pointer-events-none" />

            {/* The Terminal Startup Centerpiece */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] pointer-events-none hidden lg:block [perspective:1000px] z-20">
                <motion.div
                    style={{ x: parallaxX, y: parallaxY, rotateX, rotateY }}
                    className="w-full h-full"
                >
                    <TerminalStartup />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div style={{ y, opacity }} className="max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl lg:text-[140px] font-display font-medium leading-[0.85] tracking-tighter text-foreground mb-12"
                    >
                        The Verifiable <br />
                        <motion.span
                            animate={{ letterSpacing: ["-0.05em", "-0.02em", "-0.05em"] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="text-primary italic inline-block"
                        >
                            Data Bridge.
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-xl md:text-3xl text-foreground/40 max-w-2xl leading-tight mb-16 font-light"
                    >
                        Fetch any API via simple TypeScript plugins and deliver it on-chain with verifiable EIP-712 and BLS threshold signatures. No waiting for oracle nodes. Permissionless data provisioning.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-8"
                    >
                        <Link
                            href="#story"
                            ref={buttonRef}
                            className="h-16 px-10 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[12px] rounded-sm flex items-center gap-4 hover:opacity-90 transition-all relative group overflow-hidden"
                            onMouseMove={(e) => {
                                const { clientX, clientY } = e;
                                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                const x = clientX - (left + width / 2);
                                const y = clientY - (top + height / 2);
                                e.currentTarget.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = `translate(0px, 0px)`;
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                The Origin <ArrowBottomRightIcon width={20} height={20} />
                            </span>
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
