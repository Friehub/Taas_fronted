"use client";

import { motion } from 'framer-motion';
import { Header } from '../../../components/shared/Header';
import { LandingFooter } from '../../../components/landing/LandingFooter';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased overflow-x-hidden">
            <Header />

            <section className="pt-32 pb-24 relative">
                 {/* Decorative background element */}
                 <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-primary/5 via-transparent to-transparent pointer-events-none" />
                 
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                        {/* Sidebar / Table of Contents */}
                        <aside className="w-full lg:w-64 order-2 lg:order-1">
                            <div className="sticky top-32 space-y-12">
                                <div>
                                    <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 mb-6">Article Contents</h4>
                                    <nav className="flex flex-col gap-4 text-sm font-bold border-l border-white/5 pl-4">
                                        <a href="#introduction" className="text-primary hover:text-primary/80 transition-colors">Introduction</a>
                                        <a href="#architecture" className="text-foreground/40 hover:text-foreground transition-colors">Architecture</a>
                                        <a href="#bottlenecks" className="text-foreground/40 hover:text-foreground transition-colors">Verification Bottlenecks</a>
                                        <a href="#foundation" className="text-foreground/40 hover:text-foreground transition-colors">Mathematical Foundation</a>
                                        <a href="#security" className="text-foreground/40 hover:text-foreground transition-colors">Security Considerations</a>
                                    </nav>
                                </div>
                                
                                <div>
                                    <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 mb-6">Subsystem Status</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-onyx border border-white/5 rounded-xl">
                                             <div className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Documentation</div>
                                             <div className="text-sm font-bold">V1.4.2</div>
                                        </div>
                                         <div className="p-4 bg-onyx border border-white/5 rounded-xl">
                                             <div className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Github</div>
                                             <div className="text-sm font-bold">Active</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 order-1 lg:order-2">
                             <Link href="/blog" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-12 hover:gap-3 transition-all">
                                <ArrowLeftIcon /> Back to Blog
                             </Link>

                             <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest rounded-full mb-8 block w-max">Engineering / Cryptography</span>
                             
                             <h1 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] mb-12 max-w-4xl">
                                Scaling Ethereum Security with <br />
                                <span className="text-primary italic">BLS Signature Aggregation</span>
                             </h1>

                             <div className="flex items-center gap-6 mb-16 pb-8 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-onyx border border-white/10" />
                                    <div>
                                        <div className="text-xs font-bold text-foreground">Dr. Aris Thorne</div>
                                        <div className="text-[10px] text-foreground/40 uppercase">Lead Cryptographer</div>
                                    </div>
                                </div>
                                <div className="text-[10px] text-foreground/40 uppercase tracking-widest">Oct 12, 2026</div>
                                <div className="text-[10px] text-foreground/40 uppercase tracking-widest">12 MIN READ</div>
                             </div>

                             <div className="prose prose-invert prose-primary max-w-none">
                                <div className="aspect-video bg-onyx border border-white/10 rounded-[32px] mb-16 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-grid-mint opacity-5" />
                                    {/* Abstract Schematic */}
                                    <div className="relative w-full h-full p-12 flex items-center justify-center">
                                         <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                                         <div className="absolute w-24 h-24 border border-primary/20 rounded-lg animate-pulse" />
                                         <div className="absolute right-1/4 w-32 h-32 border border-primary/10 rounded-full" />
                                         <div className="text-[120px] font-black italic text-white/5 select-none absolute">BLS</div>
                                    </div>
                                </div>

                                <section id="introduction" className="mb-16">
                                    <h2 className="text-3xl font-display font-bold mb-6">The Bottleneck of Verification</h2>
                                    <p className="text-lg text-foreground/60 leading-relaxed mb-6">
                                        As decentralized networks grow, the cost of verifying individual signatures becomes a heavy burden on every validator. In Ethereum's Proof-of-Stake consensus, having tens of thousands of validators sign every block would traditionally require an unfeasible amount of data and computation.
                                    </p>
                                    <p className="text-lg text-foreground/60 leading-relaxed">
                                        Enter **"Boneh–Lynn–Shacham (BLS)"** signatures. Unlike traditional ECDSA, BLS signatures allow for mathematical aggregation. This means a single BLS signature can be computed from a large number of signatures to prove that the individual participants signed the same message.
                                    </p>
                                </section>

                                <section id="foundation" className="mb-16">
                                     <div className="p-8 bg-secondary/10 border border-primary/10 rounded-2xl mb-12">
                                          <div className="text-[10px] uppercase font-bold tracking-widest text-primary mb-4">Core Functionality</div>
                                          <div className="text-3xl font-mono font-bold text-primary mb-2">S_agg = Σ S_i (mod n)</div>
                                          <div className="text-sm text-foreground/40">Verifiable aggregate signature computed from i=1 to n elements where E(S_agg) = Π e(P_i, H(m)).</div>
                                     </div>

                                    <h2 className="text-3xl font-display font-bold mb-6">Mathematical Foundation</h2>
                                    <p className="text-lg text-foreground/60 leading-relaxed">
                                        The efficiency gains in BLS signatures come from pairing-based cryptography. Instead of sending 512,000 bits for 10,000 signatures, the network only propagates one single 384-bit aggregate signature.
                                    </p>
                                </section>

                                <section id="security" className="mb-16">
                                     <h2 className="text-3xl font-display font-bold mb-6">Security Considerations</h2>
                                     <ul className="space-y-6 list-none p-0">
                                        <li className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">1</div>
                                            <p className="text-lg text-foreground/60 tracking-tight leading-relaxed">
                                                **Rogue Public Key Protection**: Preventing attackers from providing public keys that cancel out others.
                                            </p>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">2</div>
                                            <p className="text-lg text-foreground/60 tracking-tight leading-relaxed">
                                                **Proof-of-Possession (PoP)**: Ensuring each registrant truly owns the private key for the public key they register.
                                            </p>
                                        </li>
                                     </ul>
                                </section>

                                {/* Related articles footer */}
                                <div className="mt-24 pt-16 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-12">
                                        <h3 className="text-2xl font-display font-bold">Keep Reading</h3>
                                        <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-primary">All Articles</Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <div className="aspect-video bg-onyx border border-white/10 rounded-2xl mb-4" />
                                            <span className="text-[10px] uppercase font-bold text-primary/60">Cryptography</span>
                                            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Post-Quantum Cryptography in Oracles</h4>
                                        </div>
                                         <div className="group">
                                            <div className="aspect-video bg-onyx border border-white/10 rounded-2xl mb-4" />
                                            <span className="text-[10px] uppercase font-bold text-primary/60">Ecosystem</span>
                                            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">MEV Protection Strategies for Validators</h4>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
}
