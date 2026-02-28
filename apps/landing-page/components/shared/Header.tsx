"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    GitHubLogoIcon,
    TwitterLogoIcon,
    FileTextIcon,
    MoonIcon,
    SunIcon
} from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-primary rounded shadow-[0_0_15px_rgba(170,255,184,0.3)] flex items-center justify-center font-bold text-black transition-transform group-hover:rotate-6">
                        F
                    </div>
                    <span className="font-display text-xl font-bold tracking-tight text-foreground">Friehub</span>
                </Link>

                <nav className="flex items-center gap-6 md:gap-10">
                    <Link
                        href="/docs"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <FileTextIcon /> Docs
                    </Link>

                    <div className="h-4 w-px bg-white/5 hidden md:block" />

                    <div className="flex items-center gap-5">
                        <a
                            href="https://x.com/friehub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/40 hover:text-primary transition-all hover:scale-110"
                        >
                            <TwitterLogoIcon width={18} height={18} />
                        </a>
                        <a
                            href="https://github.com/friehub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/40 hover:text-primary transition-all hover:scale-110"
                        >
                            <GitHubLogoIcon width={18} height={18} />
                        </a>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-8 h-8 rounded border border-white/5 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/20 transition-all"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
