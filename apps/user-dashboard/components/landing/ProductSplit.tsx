"use client";

import { motion } from 'framer-motion';
import { BarChartIcon, DesktopIcon, ArrowTopRightIcon, CodeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function ProductSplit() {
    return (
        <section className="py-24 bg-black border-b border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl font-display font-black tracking-tighter text-white mb-4 italic">THE FRIEHUB ECOSYSTEM</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                        Two powerful products. One shared infrastructure.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4">
                    {/* Product 1: FTS */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-onyx hover:border-indigo-500/50 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 relative z-10">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                                <DesktopIcon width={24} height={24} />
                            </div>

                            <h3 className="text-2xl font-display font-black tracking-tighter text-white mb-2">FTS ENGINE</h3>
                            <p className="text-slate-400 mb-8 h-12 text-sm leading-relaxed">
                                The decentralized oracle network for verifiable data fetching.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <ListItem>Any API to Smart Contract</ListItem>
                                <ListItem>Multi-Sig Validation</ListItem>
                                <ListItem>Instant Finality</ListItem>
                            </ul>

                            <Link
                                href="https://docs.friehub.cloud/taas"
                                className="inline-flex items-center text-sm font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Documentation <ArrowTopRightIcon width={16} height={16} className="ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Product 2: Prediction Market */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-onyx hover:border-emerald-500/50 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 relative z-10">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                                <BarChartIcon width={24} height={24} />
                            </div>

                            <h3 className="text-2xl font-display font-black tracking-tighter text-white mb-2 italic">PREDICTION MARKET</h3>
                            <p className="text-slate-400 mb-8 h-12 text-sm leading-relaxed">
                                Trade on future outcomes powered by FTS truth verification.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <ListItem>Crypto, Sports, & Politics</ListItem>
                                <ListItem>Permissionless Creation</ListItem>
                                <ListItem>Deep Liquidity</ListItem>
                            </ul>

                            <Link
                                href="/overview"
                                className="inline-flex items-center text-sm font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                Launch App <ArrowTopRightIcon width={16} height={16} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-2 text-slate-300 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            {children}
        </li>
    );
}
