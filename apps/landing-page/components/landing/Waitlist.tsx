"use client";

import { motion } from 'framer-motion';
import { EnvelopeClosedIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

export function Waitlist() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmitted(true);
                setEmail('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="waitlist" className="py-48 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-medium text-foreground mb-8"
                    >
                        Join the <span className="text-primary italic">Standard.</span>
                    </h2>
                    <p className="text-foreground/40 mb-16 leading-relaxed">
                        Secure your spot for early protocol access. No marketing spam.
                        Just core updates on the TaaS network.
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20">
                                    <EnvelopeClosedIcon />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-black/40 border border-white/10 rounded px-12 py-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="h-[52px] px-8 bg-primary text-black font-black uppercase tracking-widest text-[11px] rounded flex items-center justify-center gap-3 hover:scale-102 active:scale-98 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Joining...' : 'Secure Access'} <ArrowRightIcon />
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-[52px] flex items-center justify-center gap-3 text-primary font-black uppercase tracking-widest text-[11px]"
                        >
                            <CheckIcon width={20} height={20} /> You're on the list
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
