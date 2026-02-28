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
                    <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">Friehub</span>
                </Link>

                <nav className="flex items-center gap-6 md:gap-10">
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
