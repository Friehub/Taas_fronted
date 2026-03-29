"use client";

import { motion } from 'framer-motion';
import { ArrowRightIcon, GitHubLogoIcon, FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function Waitlist() {
    return (
        <section id="waitlist" className="py-24 md:py-48 border-t border-border bg-background overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-medium text-foreground mb-8"
                    >
                        Join the <span className="text-primary italic">Architecture.</span>
                    </motion.h2>
                    <p className="text-foreground/40 mb-16 leading-relaxed">
                        TaaS Gateway is open source and ready for builders. Star the repository, run a Sovereign Node, or contribute your own data plugin in 5 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="https://github.com/friehub/Taas"
                            className="h-[52px] px-10 bg-primary text-black font-black uppercase tracking-widest text-[11px] rounded-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all w-full sm:w-auto"
                        >
                            <GitHubLogoIcon width={16} height={16} /> Run a Node
                        </Link>
                        
                        <Link
                            href="https://github.com/friehub/Taas/tree/main/taas-plugins"
                            className="h-[52px] px-10 bg-transparent border border-primary/20 text-foreground font-black uppercase tracking-widest text-[11px] rounded-sm flex items-center justify-center gap-3 hover:border-primary/50 transition-all w-full sm:w-auto"
                        >
                            <FileIcon width={16} height={16} /> Build a Plugin <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
