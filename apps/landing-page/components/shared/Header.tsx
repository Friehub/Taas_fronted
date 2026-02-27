"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-0"
            >
                <Link href="/" className="flex flex-col gap-0 group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-primary/20 transition-transform group-hover:scale-110">
                            F
                        </div>
                        <span className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">Friehub</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mt-1 ml-13">Foundation</span>
                </Link>
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
                    <Link href="/docs" className="hover:text-primary hover:tracking-[0.5em] transition-all duration-300">Docs</Link>
                    <Link href="/about" className="hover:text-primary hover:tracking-[0.5em] transition-all duration-300">About</Link>
                </nav>
                <div className="h-4 w-px bg-white/10 hidden lg:block" />
                <ThemeToggle />
            </motion.div>
        </div>
    );
}
