"use client";

import { motion } from 'framer-motion';
import { LineChart, Server, ArrowUpRight, Code2 } from 'lucide-react';
import Link from 'next/link';

export function ProductSplit() {
    return (
        <section className="py-24 bg-black border-b border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">The Friehub Ecosystem</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Two powerful products. One shared infrastructure.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product 1: TaaS */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-onyx hover:border-indigo-500/50 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 relative z-10">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                                <Server size={24} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">TaaS Engine</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                The decentralized oracle network for verifiable data fetching.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <ListItem>Any API to Smart Contract</ListItem>
                                <ListItem>Multi-Sig Validation</ListItem>
                                <ListItem>Instant Finality</ListItem>
                            </ul>

                            <Link
                                href="https://docs.friehub.cloud/taas"
                                className="inline-flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300"
                            >
                                Read Documentation <ArrowUpRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Product 2: Prediction Market */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-onyx hover:border-emerald-500/50 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 relative z-10">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                                <LineChart size={24} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Prediction Market</h3>
                            <p className="text-slate-400 mb-8 h-12">
                                Trade on future outcomes powered by TaaS truth verification.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <ListItem>Crypto, Sports, & Politics</ListItem>
                                <ListItem>Permissionless Creation</ListItem>
                                <ListItem>Deep Liquidity</ListItem>
                            </ul>

                            <Link
                                href="/overview"
                                className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300"
                            >
                                Launch App <ArrowUpRight size={16} className="ml-1" />
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
