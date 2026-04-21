"use client";

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToNewsletter } from '@/app/actions';

export function Waitlist() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('idle');
        
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", email);
            const result = await subscribeToNewsletter(formData);
            
            if (result.success) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        });
    }

    return (
        <section id="waitlist" className="py-32 bg-background relative overflow-hidden border-none text-foreground">
            <div className="absolute inset-0 bg-blueprint opacity-[0.2] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-surface-low rounded-[2rem] p-12 md:p-20 overflow-hidden border border-surface-border"
                >
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-foreground/[0.02] skew-x-12 translate-x-1/2 pointer-events-none" />
                    <div className="absolute inset-0 bg-blueprint opacity-5 pointer-events-none transition-opacity duration-1000 group-hover:opacity-10" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-xl text-center lg:text-left space-y-8">
                            <h2 className="text-4xl md:text-6xl font-display font-thin text-foreground leading-[0.9] tracking-tight">
                                Ready to verify <br />
                                <span className="italic">the future?</span>
                            </h2>
                            <p className="text-foreground/60 text-lg font-medium leading-relaxed">
                                Join the TaaS network today and start delivering absolute 
                                integrity to your decentralized data pipelines.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 h-14 px-6 bg-background/50 border border-surface-border text-foreground font-mono text-sm placeholder:text-foreground/20 focus:outline-none focus:border-foreground/30 transition-all rounded-full"
                                />
                                <button
                                    type="submit"
                                    disabled={isPending || status === 'success'}
                                    className="h-14 px-10 bg-foreground text-background font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {isPending ? 'Connecting...' : status === 'success' ? 'Joined' : 'Join Waitlist'}
                                </button>
                            </form>
                            
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest"
                                    >
                                        Inbound relay established. Welcome to the swarm.
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[10px] font-mono text-destructive uppercase tracking-widest"
                                    >
                                        Relay failed. Please verify credentials.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Data Stat Block */}
                        <div className="w-full lg:w-auto shrink-0 bg-black/10 backdrop-blur-md rounded-sm p-10 border border-white/10">
                            <div className="text-[10px] font-mono text-primary-foreground/40 uppercase tracking-[0.3em] mb-6">Network Health</div>
                            <div className="flex flex-col gap-1 mb-10">
                                <span className="text-5xl font-display font-bold text-white tracking-tighter">$1.24B+</span>
                                <span className="text-[10px] text-primary-foreground/60 uppercase font-black tracking-widest">Total Value Secured</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl font-bold text-white">40+</span>
                                    <span className="text-[9px] text-primary-foreground/40 uppercase font-black tracking-widest">Active Chains</span>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <span className="text-xl font-bold text-white flex items-center justify-end gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        LIVE
                                    </span>
                                    <span className="text-[9px] text-primary-foreground/40 uppercase font-black tracking-widest">Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
