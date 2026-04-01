"use client";

import { motion } from 'framer-motion';

const STATS = [
    { label: "Total Signatures", value: "1,402,192", suffix: "+" },
    { label: "Network Uptime", value: "99.99", suffix: "%" },
    { label: "Avg Resolution", value: "410", suffix: "ms" },
    { label: "Active Quorum", value: "12/16", suffix: " Nodes" }
];

export function NetworkTelemetry() {
    return (
        <section className="border-y border-border/50 bg-background overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white opacity-[0.02] dark:opacity-[0.01] pointer-events-none" />
            
            <div className="container mx-auto px-6 py-6 md:py-8 flex flex-col items-center md:items-end justify-end gap-8 relative z-10">
                
                <div className="flex-1 grid grid-cols-2 md:flex md:flex-row md:justify-end gap-x-12 gap-y-6 w-full md:w-auto">
                    {STATS.map((stat, i) => (
                        <motion.div 
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-start md:items-end group"
                        >
                            <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1 group-hover:text-primary/50 transition-colors">
                                {stat.label}
                            </div>
                            <div className="font-mono text-xl md:text-2xl text-foreground font-medium flex items-baseline gap-1">
                                {stat.value}
                                <span className="text-primary/70 text-sm font-bold">{stat.suffix}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
