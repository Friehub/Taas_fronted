"use client";

import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

export function Waitlist() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmitted(true);
                setEmail('');
            } else {
                const data = await response.json();
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Unable to join waitlist. Please check your connection.');
        }
    };

    return (
        <section id="waitlist" className="py-32 relative overflow-hidden bg-background">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="container px-4 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        Early Access
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-medium text-white">
                        Join the <span className="text-primary italic">Verifiable Revolution.</span>
                    </h2>

                    <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Become a Sentinel or integrate TaaS into your mission-critical systems.
                        Sign up for early access to the Friehub ecosystem.
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mt-12">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-white/20 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your work email"
                                    className="block w-full pl-14 pr-32 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    Join <ArrowRight size={14} />
                                </button>
                            </div>
                            <p className="mt-4 text-[10px] text-white/20 uppercase tracking-widest">
                                No spam. Just institutional-grade updates.
                            </p>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary/10 border border-primary/20 rounded-3xl p-12 mt-12 flex flex-col items-center gap-4"
                        >
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                            <p className="text-white/50 leading-relaxed max-w-xs">
                                Thank you for your interest in TaaS. We'll be in touch as we scale our network.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-primary text-[10px] uppercase tracking-widest font-black mt-4 hover:underline"
                            >
                                Use another email
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
