"use client";

import { motion } from 'framer-motion';
import { 
    CubeIcon, 
    ArrowRightIcon, 
    LinkBreak2Icon, 
    LockClosedIcon 
} from '@radix-ui/react-icons';

export function ArchitectureProof() {
    return (
        <section className="py-32 bg-surface-low relative overflow-hidden">
            {/* Background Blueprint Pattern */}
            <div className="absolute inset-0 bg-blueprint opacity-[0.2] pointer-events-none" />
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    
                    {/* Visual Schematic Column */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-square max-w-[500px] mx-auto relative bg-surface-high rounded-sm p-12 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                            {/* SVG Schematic Diagram */}
                            <svg viewBox="0 0 400 400" className="w-full h-full text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Nodes */}
                                <motion.rect 
                                    x="40" y="40" width="100" height="100" rx="4" 
                                    stroke="currentColor" strokeWidth="1.5" 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                />
                                <text x="55" y="95" className="fill-foreground/40 font-mono text-[9px] font-bold tracking-widest uppercase">HOT-CORE</text>
                                
                                <motion.rect 
                                    x="260" y="40" width="100" height="100" rx="4" 
                                    stroke="currentColor" strokeWidth="1.5"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                />
                                <text x="275" y="95" className="fill-foreground/40 font-mono text-[9px] font-bold tracking-widest uppercase">SOVEREIGN</text>

                                <motion.rect 
                                    x="150" y="260" width="100" height="100" rx="4" 
                                    stroke="currentColor" strokeWidth="1.5"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1 }}
                                />
                                <text x="165" y="315" className="fill-foreground/40 font-mono text-[9px] font-bold tracking-widest uppercase">AGGREGATE</text>

                                {/* Connections */}
                                <motion.line 
                                    x1="140" y1="90" x2="260" y2="90" 
                                    stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" opacity="0.4"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                />
                                <motion.path 
                                    d="M90 140 Q 90 260 150 260" 
                                    stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" opacity="0.4"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                />
                                <motion.path 
                                    d="M310 140 Q 310 260 250 260" 
                                    stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" opacity="0.4"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.2 }}
                                />

                                {/* Moving Data Particles */}
                                <motion.circle 
                                    r="2.5" fill="currentColor" opacity="0.8"
                                    animate={{ 
                                        cx: [90, 90, 150],
                                        cy: [140, 260, 260]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            </svg>
                            
                            {/* Floating Labels */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-6 py-3 rounded-sm border border-white/5 shadow-2xl text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                                VERIFIED ATTESTATION
                            </div>
                        </div>

                        {/* Visual Glow Behind */}
                        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                            <LockClosedIcon className="w-3 h-3" /> Technical Veracity Logic
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-thin text-foreground mb-12 leading-[0.9] tracking-[-0.04em]">
                            The Two-Process <br />
                            <span className="text-primary italic">Sovereign Proof Model.</span>
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-6 group">
                                <div className="shrink-0 w-12 h-12 rounded-sm bg-surface-high border border-white/5 flex items-center justify-center text-primary group-hover:border-primary/20 transition-all">
                                    <CubeIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-thin text-xl mb-3 font-display">Isolated Runtime</h3>
                                    <p className="text-foreground/40 text-sm leading-relaxed max-w-sm">
                                        Sovereign Adapters run in a sandboxed process, preventing side-channel attacks and ensuring deterministic execution of API plugins.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="shrink-0 w-12 h-12 rounded-sm bg-surface-high border border-white/5 flex items-center justify-center text-primary group-hover:border-primary/20 transition-all">
                                    <LinkBreak2Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-thin text-xl mb-3 font-display">Threshold Aggregation</h3>
                                    <p className="text-foreground/40 text-sm leading-relaxed max-w-sm">
                                        Multi-node signatures are collapsed into a single constant-size proof, drastically reducing gas costs for on-chain verification.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 pt-12 border-t border-white/5 flex items-center gap-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-display font-bold text-foreground">99.8%</span>
                                <span className="text-[10px] text-primary/40 uppercase font-black tracking-[0.2em]">Uptime</span>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10" />
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-display font-bold text-foreground">1.2ms</span>
                                <span className="text-[10px] text-primary/40 uppercase font-black tracking-[0.2em]">Latency</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
