"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import {
    MixIcon,
    LinkBreak1Icon,
    ComponentInstanceIcon,
    LockClosedIcon,
    LightningBoltIcon
} from '@radix-ui/react-icons';
import { useRef } from 'react';

const STORY_STEPS = [
    {
        num: "01",
        icon: <MixIcon width={24} height={24} />,
        title: "The Friction",
        subtitle: "The Oracle Bottleneck",
        description: "We needed real-world API data mapped on-chain autonomously. Existing networks required lobbying teams and weeks of whitelisting just to add a single sports or weather feed. We needed a permissionless standard."
    },
    {
        num: "02",
        icon: <ComponentInstanceIcon width={24} height={24} />,
        title: "Two-Process Isolation",
        subtitle: "Architectural Breakthrough",
        description: "To allow anyone to write a data plugin safely, we split the node. A hardened Rust 'Hot-Core' manages keys and P2P consensus, while an isolated Node.js sidecar safely executes untrusted TypeScript user code."
    },
    {
        num: "03",
        icon: <LinkBreak1Icon width={24} height={24} />,
        title: "Bring Your Own Data",
        subtitle: "The Plugin SDK",
        description: "We standardized the 'SovereignAdapter'. A 40-line TypeScript file with strict Zod schema validation is all it takes to connect any REST, GraphQL, or WebSocket API to the gateway's Unified Capability Engine."
    },
    {
        num: "04",
        icon: <LockClosedIcon width={24} height={24} />,
        title: "Cryptographic Attestation",
        subtitle: "Accountability by Default",
        description: "Every piece of data fetched by a plugin is cryptographically pinned (RFC 8785) and signed with an EIP-712 structured payload using the operator's Ethereum identity inside the encrypted Vault."
    },
    {
        num: "05",
        icon: <LightningBoltIcon width={24} height={24} />,
        title: "Sovereign to Mesh",
        subtitle: "The Unified Upgrade Path",
        description: "We designed the protocol to scale with trust. Start with a single 'Sovereign Node' for ultimate speed. When the data demands decentralization, upgrade to a Byzantine Fault Tolerant Mesh network using BLS threshold signatures—with zero code changes."
    }
];

export function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="story" ref={containerRef} className="py-60 bg-background relative overflow-hidden text-left">
            {/* Background Narrative Markers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.02]">
                <div className="text-[400px] font-display font-black absolute top-0 -left-20 text-foreground">AUTH</div>
                <div className="text-[400px] font-display font-black absolute bottom-0 -right-20 text-foreground">TRUTH</div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-40"
                    >
                        <h2 className="text-5xl md:text-8xl font-display font-medium mb-10 text-foreground tracking-tighter leading-none">
                            Our <span className="text-primary italic underline decoration-primary/20">Evolution.</span>
                        </h2>
                        <p className="text-xl md:text-3xl text-foreground/30 leading-tight max-w-2xl font-light">
                            How we solved the oracle bottleneck by standardizing verifiable data infrastructure.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Animated Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute left-8 top-0 w-px bg-primary"
                        />

                        <div className="space-y-32 md:space-y-48">
                            {STORY_STEPS.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="relative flex gap-12 md:gap-20 items-start group"
                                >
                                    {/* The Node */}
                                    <div className="relative shrink-0 mt-4">
                                        <div className="w-16 h-16 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-500 z-10 relative">
                                            {step.icon}
                                        </div>
                                        {/* Large Background Number */}
                                        <div className="absolute -top-12 -left-12 text-8xl font-display font-black text-foreground/[0.04] select-none group-hover:text-primary/[0.08] transition-colors duration-700">
                                            {step.num}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 opacity-60">
                                            {step.subtitle}
                                        </div>
                                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-8 tracking-tighter">
                                            {step.title}
                                        </h3>
                                        <div className="p-10 rounded-xl relative group-hover:border-primary/30 transition-all duration-500 bg-muted/5 border border-border/50">
                                            <p className="text-lg md:text-xl text-foreground/40 leading-relaxed font-light">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
