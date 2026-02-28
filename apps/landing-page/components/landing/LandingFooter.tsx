"use client";

import { GitHubLogoIcon, TwitterLogoIcon, FileTextIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function LandingFooter() {
    return (
        <footer className="py-12 border-t border-border bg-muted/20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col gap-1">
                    <div className="font-display font-black text-xs uppercase tracking-widest text-foreground">
                        Friehub Protocol
                    </div>
                    <div className="text-[10px] text-white/20 uppercase tracking-widest">
                        © 2026. All rights reserved.
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <Link href="/docs" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-primary transition-colors flex items-center gap-2">
                        <FileTextIcon /> Docs
                    </Link>
                    <a href="https://x.com/friehub" className="text-white/20 hover:text-primary transition-all">
                        <TwitterLogoIcon />
                    </a>
                    <a href="https://github.com/friehub" className="text-white/20 hover:text-primary transition-all">
                        <GitHubLogoIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
}
