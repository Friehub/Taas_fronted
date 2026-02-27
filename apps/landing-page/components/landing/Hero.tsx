"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Header } from '../shared/Header';

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
            {/* Optimized Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_85%,transparent)] translate-z-0">
                {/* Base Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#14142b] via-[#0c0c1a] to-background" />

                {/* Dynamic Prismatic Shards - Simplified for GPU */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 3, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] right-[10%] w-[400px] h-[400px] opacity-20 blur-[2px] will-change-transform"
                    >
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="shard-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                            <path d="M100 20 L180 80 L140 160 L40 140 Z" fill="url(#shard-grad)" />
                        </svg>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] opacity-15 blur-[4px] will-change-transform"
                    >
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <path d="M40 20 L160 40 L180 140 L60 180 Z" fill="url(#shard-grad)" />
                        </svg>
                    </motion.div>
                </div>

                {/* Orbital Energy Loops - Simplified Stroke */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <svg className="w-full h-full">
                        <motion.ellipse
                            cx="50%" cy="45%" rx="40%" ry="30%"
                            fill="none"
                            stroke="rgba(16,185,129,0.15)"
                            strokeWidth="1"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="origin-center"
                        />
                    </svg>
                </div>

                {/* Primary Ambient Glow - CSS Optimized */}
                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.1),transparent_70%)] opacity-50" />

                {/* Dotted Grid - Non-blended for CPU sanity */}
                <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20" />
            </div>

            {/* Top Bar - Elevated Navigation */}
            <Header />

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
                        className="text-5xl md:text-7xl lg:text-[8.5rem] font-display font-medium tracking-tighter text-white leading-[0.85] mb-12 select-none"
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

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
                    >
                        Powered by Friehub Protocol
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base sm:text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-16 font-light tracking-wide"
                    >
                        TaaS (Truth-as-a-Service) is the high-fidelity decentralized oracle network for builders requiring absolute integrity and sub-second resolution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto"
                    >
                        <Link
                            href="/docs"
                            className="group relative w-full sm:w-auto px-12 py-6 bg-primary text-primary-foreground font-black rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-[1.05] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-[0.2em]">
                                Get Started <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </Link>

                        <Link
                            href="#waitlist"
                            className="w-full sm:w-auto px-12 py-6 glass-ultra text-white font-black rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 text-lg uppercase tracking-[0.2em] border border-white/10 hover:border-white/20 flex items-center justify-center gap-3 group active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            Join Waitlist
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

