'use client';

import { NodeRegistrationWizard } from '@/components/NodeRegistrationWizard';
import {
    DoubleArrowLeftIcon,
    ComponentInstanceIcon,
    LockClosedIcon,
    BoxIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function RegisterNodePage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.2em] transition-all mb-12 group">
                    <DoubleArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" /> Dashboard Overview
                </Link>

                <div className="mb-16 text-center md:text-left relative">
                    <div className="absolute -left-4 top-0 w-1 h-20 bg-primary/20 rounded-full hidden md:block" />
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                        <ComponentInstanceIcon width={12} height={12} /> Protocol Integration
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter leading-none">Activate Node</h1>
                    <p className="text-xl text-foreground/40 font-medium leading-relaxed max-w-2xl">
                        Initialize your local operator identity and stake your bond to secure the decentralized truth layer.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <NodeRegistrationWizard />
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="p-8 bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <LockClosedIcon width={80} height={80} />
                            </div>
                            <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <LockClosedIcon width={16} height={16} className="text-primary" />
                                Onboarding Flow
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0 border border-primary/20">1</div>
                                    <p className="text-[11px] text-foreground/40 leading-relaxed font-medium">Select between <span className="text-foreground">Sentinel</span> or <span className="text-foreground">Challenger</span> roles.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0 border border-primary/20">2</div>
                                    <p className="text-[11px] text-foreground/40 leading-relaxed font-medium">Generate a <span className="text-foreground">Local Session ID</span> for secure truth proposals.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0 border border-primary/20">3</div>
                                    <p className="text-[11px] text-foreground/40 leading-relaxed font-medium">Stake <span className="text-foreground font-mono">1,000 $T</span> bond as network insurance.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl">
                            <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <LockClosedIcon width={16} height={16} className="text-primary/40" />
                                Safety Standards
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                                    <div className="text-[11px] leading-relaxed">
                                        <span className="font-black text-foreground uppercase tracking-widest block mb-1">Non-Custodial</span>
                                        <span className="text-foreground/40 font-medium">Operation keys are generated locally and never leave your secure session.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />
                                    <div className="text-[11px] leading-relaxed">
                                        <span className="font-black text-foreground uppercase tracking-widest block mb-1">Slashing Risk</span>
                                        <span className="text-foreground/40 font-medium">Intentional misinformation results in immediate bond forfeiture.</span>
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
