'use client';

import Link from 'next/link';
import { ArrowRight, Activity, Shield, Code, Globe } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
            {/* Navigation */}
            <nav className="border-b border-white/5 py-6">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <span className="text-black font-black text-sm">F</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter">FRIE<span className="text-yellow-500">HUB</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                        <Link href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</Link>
                        <Link href="https://github.com/0xademola/taas-core" className="hover:text-white transition-colors">Developers</Link>
                        <Link href="https://app.friehub.cloud" className="px-5 py-2.5 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all">Launch App</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-40 px-6 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-yellow-500 mb-8 uppercase tracking-widest">
                        <Activity size={14} /> Truth as a Service (TaaS)
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                        The Infrastructure of <br />
                        <span className="bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent italic">Decentralized Truth</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-white/40 mb-12">
                        Friehub provides the verifiable data layer for prediction markets, DeFi, and RWA. Build on a network of high-integrity truth nodes.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="https://dashboard.friehub.cloud" className="w-full md:w-auto px-8 py-4 bg-yellow-500 text-black rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_40px_rgba(234,179,8,0.3)]">
                            Explore Network <ArrowRight size={20} />
                        </Link>
                        <Link href="https://app.friehub.cloud" className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-extrabold text-lg hover:bg-white/10 transition-all">
                            Prediction Market
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats/Proof Section */}
            <section id="ecosystem" className="py-24 px-6 border-t border-white/5 bg-[#050505]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-yellow-500/30 transition-all">
                            <Shield className="text-yellow-500 mb-4" size={32} />
                            <h3 className="text-2xl font-bold mb-3 italic">Truth Nodes</h3>
                            <p className="text-white/40 leading-relaxed">
                                A decentralized network of nodes verifying off-chain data and resolving markets using optimistic consensus.
                            </p>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-yellow-500/30 transition-all">
                            <Code className="text-blue-500 mb-4" size={32} />
                            <h3 className="text-2xl font-bold mb-3 italic">Standardized SDKs</h3>
                            <p className="text-white/40 leading-relaxed">
                                Connect your smart contracts to real-world events in minutes with our open-source protocol and SDKs.
                            </p>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-yellow-500/30 transition-all">
                            <Globe className="text-purple-500 mb-4" size={32} />
                            <h3 className="text-2xl font-bold mb-3 italic">Global Economy</h3>
                            <p className="text-white/40 leading-relaxed">
                                Powering the next generation of predictive financial products, from insurance to synthetic assets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                                <span className="text-black font-black text-[10px]">F</span>
                            </div>
                            <span className="text-lg font-black tracking-tighter">FRIE<span className="text-yellow-500">HUB</span></span>
                        </div>
                        <p className="text-xs text-white/20">© 2026 Friehub Collective. Secure data, decentralized truth.</p>
                    </div>
                    <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-white/40">
                        <Link href="https://github.com/0xademola/taas-core" className="hover:text-white transition-colors">Github</Link>
                        <Link href="#" className="hover:text-white transition-colors">Docs</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
