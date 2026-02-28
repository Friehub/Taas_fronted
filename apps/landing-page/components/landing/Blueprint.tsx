"use client";

import { motion } from 'framer-motion';
import {
    LayersIcon,
    CubeIcon,
    ComponentInstanceIcon,
    ArrowRightIcon
} from '@radix-ui/react-icons';

export function Blueprint() {
    return (
        <section className="py-60 bg-background relative overflow-hidden border-y border-border">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.03] dark:opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6"
                    >
                        Engineering Specification
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-display font-medium text-foreground tracking-tighter mb-10">
                        The <span className="text-primary italic">Blueprint.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/30 max-w-2xl mx-auto font-light leading-snug">
                        A standardized architecture for off-chain to on-chain truth.
                        No middleware, no friction.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                    <BlueprintCard
                        icon={<CubeIcon width={32} height={32} />}
                        title="Raw Signals"
                        desc="REST APIs, GraphQL, IoT Streams, and WebSocket data sources defined in declarative JSON Recipes."
                        i={0}
                    />
                    <BlueprintCard
                        icon={<ComponentInstanceIcon width={32} height={32} />}
                        title="Sentinel Network"
                        desc="Stateless verification nodes that execute Recipe logic and attest to the results with cryptographic finality."
                        i={1}
                        active
                    />
                    <BlueprintCard
                        icon={<LayersIcon width={32} height={32} />}
                        title="Truth Attestation"
                        desc="A standardized on-chain payload ready for autonomous consumption by any smart contract."
                        i={2}
                    />
                </div>

                {/* Technical Abstract Diagram */}
                <div className="mt-40 max-w-4xl mx-auto p-12 bg-muted/5 border border-border/50 rounded-3xl relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-20">
                        <div className="text-center md:text-left">
                            <div className="font-mono text-[10px] text-primary/40 mb-2 uppercase tracking-widest">Input Layer</div>
                            <div className="text-2xl font-display font-bold text-foreground">Off-Chain Reality</div>
                        </div>

                        {/* Static Path for AnimationReference */}
                        <div className="relative">
                            <ArrowRightIcon width={40} height={40} className="text-primary/20" />
                            {/* Data Packet 1 */}
                            <motion.div
                                animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-primary rounded-full -translate-y-1/2"
                            />
                        </div>

                        <div className="text-center relative z-20">
                            <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">TaaS Engine</div>
                            <div className="w-24 h-24 rounded-2xl border border-primary/20 flex items-center justify-center bg-primary/5 group-hover:scale-105 transition-transform duration-500">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="text-primary"
                                >
                                    <LayersIcon width={40} height={40} />
                                </motion.div>
                            </div>
                        </div>

                        <div className="relative">
                            <ArrowRightIcon width={40} height={40} className="text-primary/20" />
                            {/* Data Packet 2 */}
                            <motion.div
                                animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                                className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-primary rounded-full -translate-y-1/2"
                            />
                        </div>

                        <div className="text-center md:text-right">
                            <div className="font-mono text-[10px] text-primary/40 mb-2 uppercase tracking-widest">Output Layer</div>
                            <div className="text-2xl font-display font-bold text-foreground">On-Chain Attestation</div>
                        </div>
                    </div>

                    {/* Background Detail: Moving Particles */}
                    <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [Math.random() * 800, Math.random() * 800],
                                    y: [Math.random() * 300, Math.random() * 300],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[1px] h-[40px] bg-primary/30 rotate-45"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function BlueprintCard({ icon, title, desc, i, active }: { icon: any, title: string, desc: string, i: number, active?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-12 h-full flex flex-col items-start bg-background hover:bg-muted/5 transition-all duration-500 group ${active ? 'border-t border-primary/40' : ''}`}
        >
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50 text-foreground/40 group-hover:text-primary transition-all mb-8">
                {icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-foreground/40 leading-relaxed font-light">
                {desc}
            </p>
        </motion.div>
    );
}
