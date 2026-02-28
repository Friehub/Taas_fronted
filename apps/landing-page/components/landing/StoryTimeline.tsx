"use client";

import { motion } from 'framer-motion';
import {
    ClockIcon,
    MixIcon,
    LightningBoltIcon,
    ArrowRightIcon,
    CodeIcon
} from '@radix-ui/react-icons';

const STORY_STEPS = [
    {
        icon: <MixIcon width={24} height={24} />,
        title: "The Friction",
        subtitle: "2025: Building Friehub Markets",
        description: "We started by building a prediction market. Liquidity was easy, but resolution was broken. Validating off-chain results autonomously was impossible without massive overhead."
    },
    {
        icon: <ClockIcon width={24} height={24} />,
        title: "The Truth Gap",
        subtitle: "The Oracle Problem",
        description: "Existing solutions required spinning up nodes (Chainlink) or complex optimistic resolution layers (UMA). We needed a standard way to bridge real-world data without the friction."
    },
    {
        icon: <LightningBoltIcon width={24} height={24} />,
        title: "The Solution",
        subtitle: "Birth of TaaS",
        description: "We extracted the core logic into TaaS. A standalone protocol for off-chain to on-chain automation. No nodes to manage. No complex resolution. Just verifiable, autonomous truth."
    }
];

export function StoryTimeline() {
    return (
        <section id="story" className="py-32 bg-transparent relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-24">
                        <h2 className="text-4xl md:text-6xl font-display font-medium mb-6 text-foreground">
                            Behind the <span className="text-primary italic">Architecture.</span>
                        </h2>
                        <p className="text-lg text-foreground/40 leading-relaxed max-w-xl">
                            How we moved from a simple application to the infrastructure for autonomous truth.
                        </p>
                    </div>

                    <div className="relative space-y-24">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5" />

                        {STORY_STEPS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative flex gap-12 group"
                            >
                                <div className="relative z-10 w-16 h-16 rounded bg-black border border-white/5 flex items-center justify-center text-primary group-hover:border-primary/20 transition-all font-bold">
                                    {step.icon}
                                </div>

                                <div className="flex-1 pt-2">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                                        {step.subtitle}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-foreground/40 leading-relaxed max-w-lg italic">
                                        {step.description}
                                    </p>
                                </div>

                                {i < STORY_STEPS.length - 1 && (
                                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 text-white/5">
                                        <ArrowRightIcon width={120} height={120} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
