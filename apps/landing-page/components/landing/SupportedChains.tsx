"use client";

import { motion } from 'framer-motion';

const CHAINS = [
    { name: "Ethereum Mainnet", type: "L1", status: "Active" },
    { name: "Arbitrum One", type: "L2", status: "Active" },
    { name: "Base", type: "L2", status: "Active" },
    { name: "Optimism", type: "L2", status: "Active" },
    { name: "Polygon", type: "L2", status: "Active" },
    { name: "EigenLayer AVS", type: "Security", status: "Sepolia", highlight: true },
    { name: "Local Anvil", type: "Dev", status: "Ready" }
];

export function SupportedChains() {
    return (
        <section className="py-12 border-y border-primary/10 bg-secondary/10 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="shrink-0 text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em]">
                    Verifiable Execution On:
                </div>
                
                {/* Advanced connectivity hub */}
                <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
                    {CHAINS.map((chain, i) => (
                        <motion.div 
                            key={chain.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${chain.highlight ? 'bg-primary/5 border-primary/20 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${chain.highlight ? 'bg-primary animate-pulse' : 'bg-foreground/20'}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                                        {chain.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[9px] font-medium text-foreground/40">{chain.type}</span>
                                    <span className={`text-[9px] font-bold ${chain.highlight ? 'text-foreground' : 'text-foreground/20'}`}>{chain.status}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
