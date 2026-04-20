"use client";

import { motion } from 'framer-motion';
import { ArrowRightIcon, GitHubLogoIcon, FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function Waitlist() {
    return (
        <section id="waitlist" className="py-32 bg-background relative overflow-hidden border-t border-foreground/5">
            <div className="absolute inset-0 bg-blueprint opacity-[0.2] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-primary rounded-sm p-12 md:p-20 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
                >
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 skew-x-12 translate-x-1/2 pointer-events-none" />
                    <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-xl text-center lg:text-left">
                            <h2 className="text-4xl md:text-6xl font-display font-thin text-primary-foreground mb-8 leading-[0.9] tracking-[-0.04em]">
                                Ready to verify <br />
                                the future?
                            </h2>
                            <p className="text-primary-foreground/80 text-lg font-medium leading-relaxed mb-12">
                                Join the Friehub network today and start delivering absolute 
                                integrity to your smart contract applications.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/dashboard"
                                    className="h-14 px-10 bg-white text-primary font-bold text-sm rounded-sm flex items-center justify-center min-w-[180px] hover:translate-y-[-2px] transition-all shadow-xl shadow-black/10"
                                >
                                    Launch DApp
                                </Link>
                                <Link
                                    href="/docs"
                                    className="h-14 px-10 bg-primary-container border border-white/10 text-white font-bold text-sm rounded-sm flex items-center justify-center min-w-[180px] hover:bg-primary-container/80 transition-all"
                                >
                                    Read Documentation
                                </Link>
                            </div>
                        </div>

                        {/* Data Stat Block */}
                        <div className="w-full lg:w-auto shrink-0 bg-black/10 backdrop-blur-md rounded-sm p-10 border border-white/10">
                            <div className="text-[10px] font-mono text-primary-foreground/40 uppercase tracking-[0.3em] mb-6">Network Health</div>
                            <div className="flex flex-col gap-1 mb-10">
                                <span className="text-5xl font-display font-bold text-white tracking-tighter">$1.24B+</span>
                                <span className="text-[10px] text-primary-foreground/60 uppercase font-black tracking-widest">Total Value Secured</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl font-bold text-white">40+</span>
                                    <span className="text-[9px] text-primary-foreground/40 uppercase font-black tracking-widest">Active Chains</span>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <span className="text-xl font-bold text-white flex items-center justify-end gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        LIVE
                                    </span>
                                    <span className="text-[9px] text-primary-foreground/40 uppercase font-black tracking-widest">Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
