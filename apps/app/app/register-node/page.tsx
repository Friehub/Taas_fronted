'use client';

import { NodeRegistrationWizard } from '@/components/NodeRegistrationWizard';
import { ArrowLeft, Shield, Key, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegisterNodePage() {
    return (
        <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors mb-8">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Shield size={12} /> Secure Onboarding
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Activate Node</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        Register your node to secure the truth layer.
                        Choose your role, stake your bond, and join the decentralized consensus network.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <NodeRegistrationWizard />
                    </div>

                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="p-6 bg-card border border-border rounded-2xl glass-premium">
                            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                                <Key size={16} className="text-primary" />
                                How it works
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">Select between Sentinel (proposer) or Challenger (auditor) roles based on your compute.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">Generate a local operator identity. This key securely signs your truth proposals.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">Stake 1,000 $T tokens as a security bond. These tokens ensure network honesty.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-muted/30 border border-border rounded-2xl">
                            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lock size={16} className="text-slate-500" />
                                Safety Standards
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <div className="text-[11px] leading-relaxed">
                                        <span className="font-bold text-foreground block mb-0.5">Non-Custodial</span>
                                        <span className="text-muted-foreground">Operation keys are generated locally and never leave your session.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <div className="text-[11px] leading-relaxed">
                                        <span className="font-bold text-foreground block mb-0.5">Slashing Risk</span>
                                        <span className="text-muted-foreground">Intentional false reporting may result in bond forfeiture.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
