"use client";

import { motion } from 'framer-motion';
import { Header } from '../../components/shared/Header';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { Shield, Target, Users, Zap, Globe, Heart } from 'lucide-react';

const TEAM = [
    {
        name: "Founder Name",
        role: "Principal Architect",
        bio: "Visionary lead behind the Friehub Protocol and the TaaS verification layer.",
        image: "F"
    },
    {
        name: "Core Developer",
        role: "Protocol Engineer",
        bio: "Specializing in decentralized consensus and high-fidelity data resolution.",
        image: "D"
    },
    {
        name: "Ecosystem Lead",
        role: "Strategic Growth",
        bio: "Expanding the reach of verifiable truth across institutional markets.",
        image: "E"
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Header />

            {/* Hero Section */}
            <section className="pt-48 pb-32 relative overflow-hidden">
                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                    >
                        Our Mission
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-display font-medium tracking-tighter mb-8"
                    >
                        Building the <br />
                        <span className="text-primary italic">Foundation of Truth.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed"
                    >
                        The Friehub Foundation is a sovereign entity dedicated to solving the trust gap
                        in the digital era through decentralized, immutable verification.
                    </motion.p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
            </section>

            {/* Core Values */}
            <section className="py-24 border-y border-white/5">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <ValueCard
                            icon={Shield}
                            title="Sovereignty"
                            description="We operate as an independent foundation, ensuring the protocol remains a neutral public good."
                        />
                        <ValueCard
                            icon={Target}
                            title="Absolute Precision"
                            description="TaaS is built for accuracy. Our network doesn't settle for 'close enough'—only the verified truth."
                        />
                        <ValueCard
                            icon={Heart}
                            title="Public Integrity"
                            description="Transparency is our core. Every attestation is reproducible, verifiable, and permanent."
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-display font-medium mb-6 text-foreground">
                            The Engineers of <span className="text-muted-foreground/40 italic">Verifiability.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground/60 leading-relaxed">
                            A global collective of researchers and engineers working to bridge the gap between
                            real-world data and on-chain intelligence.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] glass-ultra border border-white/5 hover:border-primary/20 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                                    {member.image}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                                <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-6">{member.role}</div>
                                <p className="text-muted-foreground/60 leading-relaxed italic">"{member.bio}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
}

function ValueCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Icon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground/60 leading-relaxed">{description}</p>
        </div>
    );
}
