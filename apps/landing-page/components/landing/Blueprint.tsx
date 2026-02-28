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
        <section className="py-60 bg-[#000000] relative overflow-hidden border-y border-white/5">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6"
                    >
                        Engineering Specification
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-display font-medium text-white tracking-tighter mb-10">
                        The <span className="text-primary italic">Blueprint.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/30 max-w-2xl mx-auto font-light leading-snug">
                        A standardized architecture for off-chain to on-chain truth.
                        No middleware, no friction.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-1 px-1 bg-white/5 rounded-2xl overflow-hidden border border-white/5">
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
                <div className="mt-40 max-w-4xl mx-auto p-12 glass-mint border border-primary/10 rounded-3xl relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                        <div className="text-center md:text-left">
                            <div className="font-mono text-[10px] text-primary/40 mb-2 uppercase tracking-widest">Input Layer</div>
                            <div className="text-2xl font-display font-bold text-white">Off-Chain Reality</div>
                        </div>
                        <motion.div
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-primary"
                        >
                            <ArrowRightIcon width={40} height={40} />
                        </motion.div>
                        <div className="text-center">
                            <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">TaaS Engine</div>
                            <div className="w-24 h-24 rounded-2xl border-2 border-primary/30 flex items-center justify-center bg-primary/5 shadow-[0_0_40px_rgba(170,255,184,0.1)] group-hover:scale-110 transition-transform duration-500">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="text-primary"
                                >
                                    <LayersIcon width={40} height={40} />
                                </motion.div>
                            </div>
                        </div>
                        <motion.div
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            className="text-primary"
                        >
                            <ArrowRightIcon width={40} height={40} />
                        </motion.div>
                        <div className="text-center md:text-right">
                            <div className="font-mono text-[10px] text-primary/40 mb-2 uppercase tracking-widest">Output Layer</div>
                            <div className="text-2xl font-display font-bold text-white">On-Chain Attestation</div>
                        </div>
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
            className={`p-12 h-full flex flex-col items-start bg-black hover:bg-white/[0.02] transition-all duration-500 group ${active ? 'border-t-2 border-primary' : ''}`}
        >
            <div className="p-4 rounded-lg bg-white/5 text-white/40 group-hover:text-primary group-hover:bg-primary/5 transition-all mb-8">
                {icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-white/30 leading-relaxed font-light">
                {desc}
            </p>
        </motion.div>
    );
}
