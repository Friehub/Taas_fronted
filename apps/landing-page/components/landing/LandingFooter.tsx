"use client";

import Link from 'next/link';

export function LandingFooter() {
    return (
        <footer className="py-12 bg-[#09090b] text-center border-t border-white/5">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs">F</div>
                        <span className="text-sm font-display font-bold tracking-tight text-white/90">Friehub Protocol</span>
                    </div>

                    <div className="flex gap-8 text-[10px] uppercase tracking-widest font-black text-white/30">
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link href="https://x.com/friehub" target="_blank" className="hover:text-primary transition-colors">X</Link>
                        <Link href="https://github.com/Friehub" target="_blank" className="hover:text-primary transition-colors">Github</Link>
                        <Link href={process.env.NEXT_PUBLIC_DOCS_URL || "/docs"} className="hover:text-primary transition-colors">Documentation</Link>
                    </div>

                    <p className="text-[10px] uppercase tracking-widest font-black text-white/20">
                        &copy; 2026 Friehub Protocol. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
