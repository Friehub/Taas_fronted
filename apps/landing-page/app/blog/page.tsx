"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * BlogHub - The Institutional Oracle Blog Index.
 * Reflects the first mockup with categorical filtering and a featured insight.
 */
export default function BlogHub() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Engineering", "Ecosystem", "Economics", "Security"];

  const posts = [
    {
      slug: "scaling-ethereum-security",
      category: "Engineering",
      date: "OCT 24, 2024",
      title: "Scaling Ethereum Security with BLS Signature Aggregation",
      excerpt: "A technical deep dive into the implementation of BLS signatures to reduce gas costs while maintaining sub-second finality...",
      readTime: "8 MIN READ",
    },
    {
      slug: "byzantine-fault-tolerance",
      category: "Security",
      date: "OCT 21, 2024",
      title: "Byzantine Fault Tolerance in the Modern Oracle",
      excerpt: "Understanding how Friehub maintains 33% fault tolerance under adversarial conditions using modified pBFT consensus mechanisms...",
      readTime: "15 MIN READ",
    },
    {
      slug: "friehub-x-eigenlayer",
      category: "Ecosystem",
      date: "OCT 18, 2024",
      title: "Friehub x EigenLayer: A New Frontier for Liquid Staking",
      excerpt: "Exploring the integration of restaking primitives to bolster the cryptoeconomic security of off-chain data computation and verification.",
      readTime: "6 MIN READ",
    },
    {
      slug: "latency-of-truth",
      category: "Economics",
      date: "OCT 15, 2024",
      title: "The Latency of Truth in Decentralized Finance",
      excerpt: "Quantifying the economic impact of oracle latency on liquidations and how next-gen architectures are minimizing staleness risk.",
      readTime: "10 MIN READ",
    },
    {
      slug: "universal-data-adapters",
      category: "Engineering",
      date: "OCT 12, 2024",
      title: "Universal Data Adapters: Breaking Silos",
      excerpt: "Building a bridge between legacy Web2 APIs and permissionless Web3 environments through standardized JSON-parsing oracle nodes.",
      readTime: "5 MIN READ",
    },
  ];

  const filteredPosts = filter === "All" ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 space-y-20">
        
        {/* Blog Logo/Identity */}
        <div className="flex justify-between items-end border-b border-surface-border pb-8">
           <div className="space-y-1">
              <span className="text-[10px] font-mono text-primary font-bold tracking-[0.3em] uppercase">Archive_10.v.3</span>
              <h1 className="text-4xl font-display font-bold text-foreground tracking-tighter">ORACLE.LOG</h1>
           </div>
           <div className="hidden md:block">
              <span className="text-[10px] font-mono text-foreground/20 italic">"Determinism is the only consensus."</span>
           </div>
        </div>

        {/* Featured Insight */}
        <section className="relative group">
           <Link href="/blog/oracle-incentives">
              <div className="surface-depth rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 group-hover:shadow-neon-mint transition-all duration-700">
                <div className="max-w-2xl space-y-8">
                   <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">Featured Insight</span>
                      <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest font-bold">12 MIN READ</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-[1.1]">
                     The Game Theory of Truth: <br />
                     <span className="text-primary italic">Oracle Incentives in Friehub</span>
                   </h2>
                   <p className="text-foreground/60 text-lg leading-relaxed max-w-lg">
                     Deep dive into the cryptoeconomic frameworks ensuring decentralized veracity. We analyze the slashes, the stakes, and the consensus thresholds that define the Friehub network.
                   </p>
                   <div className="flex items-center text-primary font-mono text-xs font-bold tracking-widest uppercase space-x-2">
                      <span>Read Full Analysis</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                   </div>
                </div>
                
                {/* Geometric Abstract Graphic */}
                <div className="relative w-full lg:w-[400px] aspect-square flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="absolute inset-0 border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
                   <div className="h-40 w-40 border-2 border-primary/30 rotate-45" />
                   <div className="absolute h-40 w-40 border-2 border-primary/20 -rotate-45" />
                   <div className="absolute h-4 w-4 bg-primary shadow-[0_0_20px_rgba(73,231,116,0.8)] rounded-full animate-pulse" />
                </div>
              </div>
           </Link>
        </section>

        {/* Categories & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-surface-border pb-8">
           <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                    filter === cat 
                    ? "bg-primary text-background" 
                    : "bg-surface-low text-foreground/40 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
           <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest font-bold">
              Showing {filteredPosts.length} of {posts.length} articles
           </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
           {filteredPosts.map((post, i) => (
             <motion.div
               key={post.slug}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group"
             >
                <Link href={`/blog/${post.slug}`}>
                   <div className="surface-depth h-full p-8 space-y-8 flex flex-col justify-between neon-card">
                      <div className="space-y-6">
                         <div className="relative h-48 bg-background-darker rounded-xl overflow-hidden mb-8 border border-white/[0.02] flex items-center justify-center">
                            <div className="text-primary/20 opacity-0 group-hover:opacity-100 transition-all">
                               <svg className="h-24 w-24 fill-current" viewBox="0 0 24 24"><path d="M13 13h-2v-2h2v2zm0-2h2V9h-2v2zm2 2h2v-2h-2v2zm0-2h-2v-2h2v2zm-4 4h2v-2h-2v2zm0-2h-2v-2h2v2zm-2 2h-2v-2h2v2zm0-2h2V9h-2v2zM6 18h12V6H6v12zm14-14v16H4V4h16z"/></svg>
                            </div>
                         </div>
                         <div className="flex items-center justify-between text-[10px] font-mono font-bold text-primary/40 uppercase tracking-widest">
                            <span>{post.category}</span>
                            <span>{post.date}</span>
                         </div>
                         <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                           {post.title}
                         </h3>
                         <p className="text-foreground/50 text-sm leading-relaxed line-clamp-3">
                           {post.excerpt}
                         </p>
                      </div>
                      <div className="flex items-center justify-between pt-8 border-t border-surface-border">
                         <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest font-bold">{post.readTime}</span>
                         <span className="text-primary text-xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">→</span>
                      </div>
                   </div>
                </Link>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
}
