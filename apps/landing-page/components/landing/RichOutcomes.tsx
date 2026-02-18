"use client";

import { motion } from 'framer-motion';
import { Target, List, Percent, AlertCircle } from 'lucide-react';

const OUTCOME_TYPES = [
    {
        type: "Scalar",
        label: "Market Price / Weather",
        example: "ETH/USD: $3,450.25 (±0.01)",
        icon: Target,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20"
    },
    {
        type: "Categorical",
        label: "Sports / Elections",
        example: "Winner: Manchester City",
        icon: List,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        type: "Probabilistic",
        label: "AI Confidence / Risk",
        example: "Success Probability: 94.2%",
        icon: Percent,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20"
    },
    {
        type: "Invalid",
        label: "Subjective Questions",
        example: "Refused: Question Ambiguous",
        icon: AlertCircle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    }
];

export function RichOutcomes() {
    return (
        <section className="py-24 bg-card border-b border-border">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                            Truth is <span className="text-primary italic">Programmable.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Most oracles only return simple numbers. TaaS supports complex, structured outcome types
                            that power the next generation of predictive applications—from deep insurance
                            to AI content verification.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-foreground font-medium">Any REST API or On-chain Source</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-emerald-500/30 transition-all">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-foreground font-medium">Decentralized Multi-Step Pipelines</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                        {OUTCOME_TYPES.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 rounded-2xl bg-background border ${item.border} hover:shadow-xl transition-all group`}
                            >
                                <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                                    <item.icon size={20} />
                                </div>
                                <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">{item.type}</div>
                                <div className="text-lg font-bold text-foreground mb-2">{item.label}</div>
                                <div className="font-mono text-[10px] text-primary/80 bg-primary/5 p-2 rounded-md border border-primary/10">
                                    {item.example}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
