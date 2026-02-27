"use client";

import { motion } from 'framer-motion';
import { Shield, Globe, Award, Sparkles } from 'lucide-react';

export function InstitutionalContext() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <Shield size={12} /> Institutional Grade
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-display font-medium text-white leading-tight"
                        >
                            Powered by the <br />
                            <span className="text-primary italic">Friehub Ecosystem.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-white/60 leading-relaxed max-w-xl"
                        >
                            TaaS (Truth-as-a-Service) is not just an oracle; it's the core verification layer of the Friehub Protocol. Friehub provides the sovereign infrastructure that ensures decentralized data is handled with absolute integrity and institutional-grade security.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                            <InfoCard
                                icon={Globe}
                                title="Global Standards"
                                description="Built to comply with emerging data standards for the verifiable web."
                            />
                            <InfoCard
                                icon={Award}
                                title="Sovereign Tech"
                                description="A completely independent stack owned and operated by the Friehub Foundation."
                            />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                            <div className="relative glass-ultra rounded-[4rem] border border-white/10 p-12 h-full flex flex-col items-center justify-center text-center">
                                <Sparkles size={64} className="text-primary mb-8" />
                                <div className="text-4xl font-display font-bold text-white mb-4">Friehub</div>
                                <div className="text-sm text-primary/60 font-black uppercase tracking-[0.3em]">The Foundation of Truth</div>
                                <div className="mt-8 pt-8 border-t border-white/5 w-full text-white/40 text-xs leading-relaxed">
                                    Managing the TaaS network protocols and safeguarding the integrity of the decentralized truth market.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function InfoCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="space-y-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon size={20} />
            </div>
            <h4 className="text-white font-bold">{title}</h4>
            <p className="text-sm text-white/40 leading-relaxed">{description}</p>
        </div>
    );
}
