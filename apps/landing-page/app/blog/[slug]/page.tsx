"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

/**
 * ArticleLayout - The high-fidelity 3-column long-form technical article.
 * Reflects the second mockup with dual sidebars for TOC and Metrics.
 */
export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock post metadata for visualization
  const post = {
    title: "Scaling Ethereum Security with BLS Signature Aggregation",
    category: "ARCHITECTURE ANALYSIS",
    author: "DR. ARI THORN",
    date: "OCT 24, 2024",
    readTime: "12 MIN READ",
    toc: ["Introduction", "Architecture", "Node Operators", "Security Audit", "Conclusion"],
    metrics: [
      { label: "Data Reduction", value: "99.7%" },
      { label: "CPU Saved", value: "450ms/block" },
      { label: "Max Validators", value: "2^15" },
    ],
    glossary: [
      { term: "Pairing", definition: "A bilinear map from two abelian groups to a third group." },
      { term: "G1 & G2", definition: "Specific subgroups defined for elliptic curve pairings." },
      { term: "Serialization", definition: "The process of converting complex mathematical objects to bits." },
    ]
  };

  return (
    <div className="pt-32 pb-24 bg-background transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Sidebar: TOC (Fixed position on LG) */}
        <aside className="lg:w-[280px] space-y-12 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
          <div className="space-y-6">
            <div className="text-redline text-[8px] border-b border-surface-border pb-2">TECHNICAL DEEP DIVE</div>
            <nav className="flex flex-col space-y-4">
              {post.toc.map((item, i) => (
                <button 
                  key={item} 
                  className={`text-left text-xs font-mono uppercase tracking-widest transition-all ${
                    i === 0 ? "text-primary font-bold" : "text-foreground/40 hover:text-primary/60"
                  }`}
                >
                  {i < 9 ? `0${i+1}` : i+1}. {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-12 border-t border-surface-border space-y-6">
             <button className="w-full py-4 surface-depth text-[10px] font-mono font-bold uppercase tracking-widest text-primary hover:neon-card transition-all">
               Subscribe to Updates
             </button>
             <div className="flex flex-col space-y-4">
                <Link href="#" className="text-[10px] font-mono text-foreground/20 hover:text-primary transition-colors uppercase tracking-widest">Documentation</Link>
                <Link href="#" className="text-[10px] font-mono text-foreground/20 hover:text-primary transition-colors uppercase tracking-widest">GitHub</Link>
             </div>
          </div>
        </aside>

        {/* Central Column: Article Content */}
        <main className="flex-1 max-w-4xl space-y-16 order-1 lg:order-2">
           {/* Header */}
           <header className="space-y-8">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono font-bold tracking-widest uppercase rounded-sm border border-primary/20">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tighter">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-[10px] font-mono text-foreground/40 font-bold tracking-widest uppercase">
                 <span className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-primary/20 rounded-full" />
                    <span>{post.author}</span>
                 </span>
                 <span>•</span>
                 <span>{post.date}</span>
                 <span>•</span>
                 <span>{post.readTime}</span>
              </div>
           </header>

           {/* Hero Technical Graphic */}
           <div className="surface-depth aspect-video rounded-3xl p-12 overflow-hidden flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              <svg className="w-full max-w-lg text-primary opacity-60" viewBox="0 0 400 200" fill="none">
                 <circle cx="100" cy="50" r="4" fill="currentColor" />
                 <circle cx="100" cy="100" r="4" fill="currentColor" />
                 <circle cx="100" cy="150" r="4" fill="currentColor" />
                 <rect x="250" y="80" width="40" height="40" fill="currentColor" />
                 <path d="M104 50 L250 100 M104 100 L250 100 M104 150 L250 100" stroke="currentColor" strokeDasharray="4 4" />
                 <path d="M290 100 H350" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-[scanline_2s_linear_infinite]" />
                 <circle cx="355" cy="100" r="8" stroke="currentColor" strokeWidth="2" />
                 <path d="M351 100 L354 103 L359 97" stroke="currentColor" strokeWidth="2" />
              </svg>
           </div>

           {/* Body Copy */}
           <article className="prose prose-invert max-w-none space-y-12 text-lg text-foreground/80 leading-relaxed font-sans">
              <section className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground tracking-tight">The Bottleneck of Verification</h2>
                <p>
                  As decentralized networks grow, the cost of verifying individual signatures becomes a linear burden on every validator. In Ethereum's Proof of Stake consensus, having tens of thousands of validators sign every block would traditionally require an unfeasible amount of data and computation.
                </p>
                <p>
                  Enter <strong>Boneh-Lynn-Shacham (BLS)</strong> signatures. Unlike traditional ECDSA used in Ethereum's transaction layer, BLS allows for 
                  <span className="text-primary italic"> mathematical aggregation</span>. This means 32k signatures can be compressed into a single constant-size signature that proves all 32k participants signed the message.
                </p>
              </section>

              <section className="space-y-8 bg-surface-low p-10 rounded-2xl border-l-4 border-primary">
                 <div className="text-redline text-[8px] text-primary">CORE FUNCTIONALITY</div>
                 <div className="text-2xl font-mono text-foreground tracking-tight">
                    S_agg = Σ S_i (i=1 to n)
                 </div>
                 <p className="text-sm font-mono opacity-50 italic">
                    Verification signatures via a pairing-friendly elliptic curve where e(S_agg, P) = Π e(S_i, P_i) mod n
                 </p>
              </section>

              <section className="space-y-6">
                 <h2 className="text-3xl font-display font-bold text-foreground tracking-tight">Security Considerations</h2>
                 <p>
                    Signature aggregation introduces the "Rogue Public Key" attack. A malicious actor could provide a public key such that it cancels out other keys in the aggregate. To prevent this, the TaaS design implements <strong>Proof of Possession (PoP)</strong> during validator onboarding.
                 </p>
                 <ul className="space-y-4 list-none p-0">
                    {[
                      "Key Augmentation: Each key is shifted by a hash of itself.",
                      "On-chain Registration: Validators must prove ownership of the private key.",
                      "Aggregator Slashing: Any node failing to aggregate correctly is penalized."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-4">
                        <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                           <div className="h-1.5 w-1.5 bg-primary rounded-full shadow-[0_0_10px_#49E774]" />
                        </span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                 </ul>
              </section>
           </article>
        </main>

        {/* Right Sidebar: Stats & Metrics */}
        <aside className="lg:w-[320px] space-y-12 lg:sticky lg:top-32 h-fit order-3">
           {/* Efficiency Metrics */}
           <div className="surface-depth rounded-2xl p-8 space-y-8">
              <div className="text-redline">EFFICIENCY METRICS</div>
              <div className="space-y-6">
                 {post.metrics.map(metric => (
                   <div key={metric.label}>
                      <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest font-bold">{metric.label}</span>
                      <div className="text-2xl font-display font-bold text-primary">{metric.value}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Glossary */}
           <div className="space-y-8">
              <div className="text-redline">GLOSSARY</div>
              <div className="space-y-6">
                 {post.glossary.map(item => (
                   <div key={item.term} className="space-y-2">
                      <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">{item.term}</span>
                      <p className="text-xs text-foreground/50 leading-relaxed font-sans">{item.definition}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Hardware Focus Card */}
           <div className="surface-depth rounded-2xl p-8 bg-background-darker border-l-2 border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="h-24 w-24 bg-surface-elevated rounded-full flex items-center justify-center animate-pulse">
                    <svg className="h-12 w-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                 </div>
                 <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Hardware Focus</span>
                 <p className="text-[10px] text-foreground/40 uppercase tracking-widest italic">Optimizing Node Performance for BLS</p>
              </div>
           </div>
        </aside>

      </div>

      {/* Keep Reading Section */}
      <section className="max-w-7xl mx-auto px-8 mt-32 space-y-12">
         <div className="flex justify-between items-center border-b border-surface-border pb-6">
            <h4 className="text-xs font-mono font-bold text-foreground/50 tracking-widest uppercase">Keep Reading</h4>
            <Link href="/blog" className="text-xs font-mono text-primary hover:underline uppercase tracking-widest">All Articles</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="surface-depth p-6 space-y-4 neon-card group cursor-pointer">
                 <div className="h-32 bg-background-darker rounded-lg" />
                 <span className="text-[10px] font-mono text-primary/40 uppercase font-bold">Category_v{i}</span>
                 <h5 className="text-foreground font-bold leading-tight group-hover:text-primary transition-colors">Theoretical Bounds of Verifiability in AVS</h5>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
