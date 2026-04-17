"use client";

import { motion } from 'framer-motion';
import { Header } from '../../components/shared/Header';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const CATEGORIES = ["All", "Engineering", "Ecosystem", "Economics", "Security"];

const ARTICLES = [
    {
        title: "Scaling Ethereum Security with BLS Signature Aggregation",
        desc: "A technical deep dive into the implementation of BLS signatures to reduce gas costs while maintaining sub-second finality.",
        category: "Engineering",
        date: "Oct 12, 2026",
        slug: "bls-signature-aggregation",
        id: "2340e467254c4699a7364d4019e29209"
    },
    {
        title: "Byzantine Fault Tolerance in the Modern Oracle",
        desc: "Understanding how Friehub maintains 33% fault tolerance under adversarial conditions using modified PBFT mechanisms.",
        category: "Security",
        date: "Oct 11, 2026",
        slug: "bft-oracle",
        id: "662a2e90de2b436ea506d7f6e440a909"
    },
    {
        title: "Friehub x EigenLayer: A New Frontier for Liquid Staking",
        desc: "Exploring the integration of restaking primitives to bolster the cryptoeconomic veracity of off-chain data computation.",
        category: "Ecosystem",
        date: "Oct 10, 2026",
        slug: "eigenlayer-integration",
        id: "c77fcacd91b54643b4e37d7875b7a485"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased">
            <Header />

            {/* Featured Post */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-secondary/10 border border-primary/10 rounded-[32px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest rounded-full">Featured Insight</span>
                                <span className="text-foreground/40 text-xs">12 MIN READ</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                                The Game Theory of Truth: <span className="text-primary italic">Oracle Incentives</span> in Friehub
                            </h1>
                            <p className="text-lg text-foreground/60 mb-8 max-w-xl">
                                Deep dive into the cryptoeconomic frameworks ensuring decentralized veracity. 
                                We analyze the slashes, the stakes, and the consensus thresholds that define the Friehub network.
                            </p>
                            <Link href="/blog/game-theory-truth" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                                Read Full Analysis <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="w-full md:w-[400px] aspect-square bg-onyx border border-white/5 rounded-2xl flex items-center justify-center p-12">
                            <div className="w-full h-full border border-primary/20 rounded-lg relative overflow-hidden backdrop-blur-3xl">
                                <div className="absolute inset-0 bg-grid-mint opacity-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 border border-primary/40 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters and Search */}
            <section className="py-8 border-y border-white/5 bg-onyx/50 backdrop-blur-sm sticky top-[72px] z-30">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button key={cat} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${cat === "All" ? "bg-primary text-primary-foreground" : "text-foreground/40 hover:text-foreground"}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                        <input type="text" placeholder="Search insights..." className="w-full bg-background border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-all" />
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 backdrop-blur-3xl">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ARTICLES.map((article, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/3] bg-onyx border border-white/10 rounded-2xl mb-6 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100 transition-opacity opacity-0" />
                                     <div className="absolute inset-0 bg-grid-mint opacity-5 group-hover:opacity-20 transition-opacity" />
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="w-16 h-16 border border-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-500" />
                                     </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60">{article.category}</span>
                                    <span className="text-[10px] text-foreground/40 uppercase">{article.date}</span>
                                </div>
                                <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                                <p className="text-foreground/40 text-sm leading-relaxed mb-6">{article.desc}</p>
                                <Link href={`/blog/${article.slug}`} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest group-hover:gap-3 transition-all">
                                    Read Article <ArrowRightIcon />
                                </Link>
                            </motion.div>
                        ))}

                        {/* Newsletter card */}
                        <div className="bg-primary border border-primary/20 rounded-2xl p-8 flex flex-col justify-between text-primary-foreground min-h-[340px]">
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest mb-4 block opacity-60">Newsletter</span>
                                <h3 className="text-2xl font-display font-bold leading-tight">Get Truth Delivered to Your Inbox.</h3>
                                <p className="text-primary-foreground/60 text-sm mt-4">Technical updates, governance proposals, and ecosystem insights delivered weekly.</p>
                            </div>
                            <div className="space-y-3">
                                <input type="email" placeholder="email@protocol.io" className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-sm placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-bold" />
                                <button className="w-full bg-primary-foreground text-primary font-bold py-3 rounded-lg text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
}
