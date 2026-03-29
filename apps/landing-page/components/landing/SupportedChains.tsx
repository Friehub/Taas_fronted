"use client";

import { motion } from 'framer-motion';

const CHAINS = [
    { name: "Ethereum Mainnet", type: "L1" },
    { name: "Arbitrum One", type: "L2" },
    { name: "Base", type: "L2" },
    { name: "Optimism", type: "L2" },
    { name: "Polygon", type: "L2" },
    { name: "Local Anvil", type: "Dev" }
];

export function SupportedChains() {
    return (
        <section className="py-12 border-y border-border/50 bg-muted/5 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="shrink-0 text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em]">
                    Verifiable Execution On:
                </div>
                
                {/* Simple scrolling/wrapping flex block for chains */}
                <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-4">
                    {CHAINS.map((chain, i) => (
                        <motion.div 
                            key={chain.name}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                            <span className="font-display font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                                {chain.name}
                            </span>
                            <span className="text-[10px] font-black uppercase text-primary/30 border border-primary/20 px-1.5 rounded-sm">
                                {chain.type}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
