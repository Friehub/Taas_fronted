"use client";

import { motion } from 'framer-motion';
import {
    MixIcon,
    LinkBreak1Icon,
    ComponentInstanceIcon,
    LockClosedIcon,
    LightningBoltIcon
} from '@radix-ui/react-icons';

const STORY_STEPS = [
    {
        num: "01",
        icon: <MixIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "The Friction",
        subtitle: "The Oracle Bottleneck",
        description: "We needed real-world API data mapped on-chain autonomously. Existing networks required lobbying teams and weeks of whitelisting. We needed a permissionless standard.",
        colSpan: "md:col-span-2 lg:col-span-1"
    },
    {
        num: "02",
        icon: <ComponentInstanceIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Two-Process Isolation",
        subtitle: "Architectural Breakthrough",
        description: "To allow anyone to write a data plugin safely, we split the node. A hardened Rust 'Hot-Core' manages keys and P2P consensus, while an isolated Node.js sidecar safely executes untrusted TypeScript user code.",
        colSpan: "md:col-span-2 lg:col-span-2"
    },
    {
        num: "03",
        icon: <LinkBreak1Icon className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Bring Your Own Data",
        subtitle: "The Plugin SDK",
        description: "We standardized the 'SovereignAdapter'. A 40-line TypeScript file with strict Zod schema validation is all it takes to connect any REST, GraphQL, or WebSocket API to the gateway's Unified Capability Engine.",
        colSpan: "md:col-span-2 lg:col-span-2"
    },
    {
        num: "04",
        icon: <LockClosedIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Cryptographic Attestation",
        subtitle: "Accountability by Default",
        description: "Every piece of data fetched by a plugin is cryptographically pinned (RFC 8785) and signed with an EIP-712 structured payload using the operator's Ethereum identity inside the encrypted Vault.",
        colSpan: "md:col-span-2 lg:col-span-1"
    },
    {
        num: "05",
        icon: <LightningBoltIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
        title: "Sovereign to Mesh",
        subtitle: "The Unified Upgrade Path",
        description: "Start with a single 'Sovereign Node' for ultimate speed. When data demands decentralization, upgrade to a Byzantine Fault Tolerant Mesh network using BLS threshold signatures—with zero code changes.",
        colSpan: "md:col-span-2 lg:col-span-3"
    }
];

export function StoryTimeline() {
    return (
        <section id="story" className="py-32 md:py-40 bg-background relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 md:mb-24"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium mb-6 md:mb-8 text-foreground tracking-tighter leading-none">
                            Our <span className="text-primary italic underline decoration-primary/20">Evolution.</span>
                        </h2>
                        <p className="text-lg sm:text-xl md:text-3xl text-foreground/40 leading-tight max-w-2xl font-light">
                            How we solved the oracle bottleneck by standardizing verifiable data infrastructure.
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {STORY_STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative group overflow-hidden rounded-3xl bg-muted/20 border border-white/5 p-6 sm:p-8 md:p-10 hover:border-primary/30 hover:bg-muted/30 transition-all duration-500 flex flex-col justify-between ${step.colSpan}`}
                            >
                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8 sm:mb-12">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-background border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl sm:text-6xl font-display font-black text-foreground/5 group-hover:text-primary/10 transition-colors duration-500 select-none">
                                            {step.num}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-primary mb-3 opacity-60">
                                            {step.subtitle}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4 sm:mb-6 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base md:text-lg text-foreground/50 leading-relaxed font-light mt-auto">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
