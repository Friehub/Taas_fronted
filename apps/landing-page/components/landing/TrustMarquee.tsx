"use client";

import { motion } from 'framer-motion';

const LOGOS = [
    { name: "Helios", symbol: "H" },
    { name: "Hyperion", symbol: "Ω" },
    { name: "Chronos", symbol: "Θ" },
    { name: "Atlas", symbol: "A" },
    { name: "Vesta", symbol: "V" },
    { name: "Solara", symbol: "S" },
    { name: "Aether", symbol: "Æ" },
    { name: "Flux", symbol: "F" }
];

export function TrustMarquee() {
    return (
        <div className="py-12 bg-transparent border-y border-white/[0.03] relative overflow-hidden group">
            <div className="container px-4 mx-auto mb-8">
                <div className="text-[10px] text-center font-black uppercase tracking-[0.4em] text-white/20">
                    Trusted by Institutional Protocols & Builders
                </div>
            </div>

            <div className="flex overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1920] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-12 whitespace-nowrap px-12"
                >
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group/logo cursor-default"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white/40 group-hover/logo:text-primary group-hover/logo:border-primary/40 group-hover/logo:bg-primary/5 transition-all">
                                {logo.symbol}
                            </div>
                            <span className="text-xl font-display font-medium text-white/40 group-hover/logo:text-white transition-colors">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
