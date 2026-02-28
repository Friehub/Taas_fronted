"use client";

import { motion } from 'framer-motion';
import { EnvelopeClosedIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { MembershipBadge } from './MembershipBadge';

export function Waitlist() {
    const [email, setEmail] = useState('');
    const [confirmedEmail, setConfirmedEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                setConfirmedEmail(email);
                setSubmitted(true);
                setEmail('');
            } else {
                setError(result.error || 'Failed to join. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="waitlist" className="py-24 md:py-48 border-t border-border bg-background overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-xl mx-auto">
                    {!submitted && (
                        <>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-display font-medium text-foreground mb-8"
                            >
                                Join the <span className="text-primary italic">Standard.</span>
                            </motion.h2>
                            <p className="text-foreground/40 mb-16 leading-relaxed">
                                Secure your spot for early protocol access. No marketing spam.
                                Just core updates on the TaaS network.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-12">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-4 flex items-center text-foreground/20">
                                        <EnvelopeClosedIcon />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-muted/30 border border-border rounded px-12 py-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all placeholder:text-foreground/20"
                                    />
                                    {error && (
                                        <div className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-bold uppercase tracking-widest">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="h-[52px] px-10 bg-primary text-black font-black uppercase tracking-widest text-[11px] rounded-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Attesting...' : 'Secure Access'} <ArrowRightIcon />
                                </button>
                            </form>
                        </>
                    )}

                    {submitted && (
                        <div className="py-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-display font-medium text-foreground mb-4">You are <span className="text-primary italic">In.</span></h2>
                                <p className="text-foreground/40 text-sm">Your attestation has been recorded on the Sentinel Network.</p>
                            </motion.div>
                            <MembershipBadge email={confirmedEmail} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
