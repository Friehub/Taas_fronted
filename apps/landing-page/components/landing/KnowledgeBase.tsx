"use client";

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const ARTICLES = [
    {
        category: "Protocol / Engineering",
        date: "Apr 2026",
        title: "Guiding Veracity: eip-712 BLS Signature Aggregation",
        desc: "An in-depth look at how threshold signatures reduce on-chain verification costs by 95% while maintaining strict eip-712 compatibility.",
        href: "/blog/bls-aggregation",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    },
    {
        category: "Game Theory / Economics",
        date: "Mar 2026",
        title: "The Game Theory of Decentralized Oracle Networks",
        desc: "Analyzing the Nash equilibrium within multi-node quorums and the slashing mechanisms that guarantee honest data provision.",
        href: "/blog/game-theory",
        thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    },
    {
        category: "Use Case / Adoption",
        date: "Feb 2026",
        title: "Protocol Details: Lean Core Gateway for Digital Banking",
        desc: "How TaaS enables sub-second resolution for institutional financial applications across isolated network environments.",
        href: "/blog/institutional-banking",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bbbda536ad34?auto=format&fit=crop&q=80&w=800",
    }
];

export function KnowledgeBase() {
    return (
        <section className="py-32 bg-background relative overflow-hidden border-t border-foreground/5">
            {/* Background Blueprint Pattern */}
            <div className="absolute inset-0 bg-blueprint opacity-[0.1] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                            Library & Insights
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-light text-foreground tracking-[-0.04em]">
                            Knowledge <span className="text-primary italic">Base.</span>
                        </h2>
                    </div>
                    
                    <Link 
                        href="/blog" 
                        className="group flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-foreground/40 hover:text-primary transition-colors"
                    >
                        View All Publications 
                        <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ARTICLES.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group flex flex-col bg-surface-low rounded-sm overflow-hidden hover:translate-y-[-4px] transition-all duration-500"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src={article.thumbnail} 
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{article.category}</span>
                                    <span className="text-[10px] font-medium text-foreground/20">{article.date}</span>
                                </div>
                                <h3 className="text-xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-foreground/40 leading-relaxed max-w-sm mb-12 flex-1">
                                    {article.desc}
                                </p>
                                
                                <Link 
                                    href={article.href}
                                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground group-hover:gap-4 transition-all"
                                >
                                    Read Article <ArrowRightIcon className="text-primary" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
