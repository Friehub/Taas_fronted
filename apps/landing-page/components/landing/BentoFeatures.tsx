"use client";

import { motion } from 'framer-motion';
import { 
    LockClosedIcon, 
    LightningBoltIcon, 
    Share1Icon 
} from '@radix-ui/react-icons';

const FEATURES = [
    {
        title: "API Staking",
        desc: "Secure high-throughput API endpoints via threshold consensus. Guarantee data veracity with economic security.",
        icon: <LockClosedIcon className="w-5 h-5 text-foreground/60" />,
        className: "bg-surface-low hover:bg-surface-high transition-all duration-500",
        visual: (
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute inset-0 bg-blueprint" />
            </div>
        )
    },
    {
        title: "BLS Management",
        desc: "Automated threshold signature aggregation for multi-chain proof generation and gas-efficient verification.",
        icon: <LightningBoltIcon className="w-5 h-5 text-foreground/60" />,
        className: "bg-surface-low hover:bg-surface-high transition-all duration-500",
        visual: (
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute inset-0 bg-blueprint" />
            </div>
        )
    },
    {
        title: "Data Agnostic",
        desc: "Seamlessly integrate any legacy data source or custom API into the decentralized oracle mesh.",
        icon: <Share1Icon className="w-5 h-5 text-foreground/60" />,
        className: "bg-surface-low hover:bg-surface-high transition-all duration-500",
        visual: (
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute inset-0 bg-blueprint" />
            </div>
        )
    }
];

export function BentoFeatures() {
    return (
        <section className="py-24 bg-background relative overflow-hidden border-t border-foreground/5">
            <div className="absolute inset-0 bg-blueprint opacity-[0.2] pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.2, 0, 0, 1] }}
                            className={`relative rounded-sm p-8 flex flex-col justify-start overflow-hidden group ${feature.className} border-none`}
                        >
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-sm bg-background border border-white/5 flex items-center justify-center mb-6 group-hover:border-primary/20 transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <div className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em] mb-2">Technical Engine 0{i+1}</div>
                                <h3 className="text-xl font-display font-thin text-foreground mb-4">{feature.title}</h3>
                                <p className="text-sm text-foreground/40 leading-relaxed max-w-[280px]">
                                    {feature.desc}
                                </p>
                            </div>
                            {feature.visual}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
