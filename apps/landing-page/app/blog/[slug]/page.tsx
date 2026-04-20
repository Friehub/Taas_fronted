"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

/**
 * ArticleLayout - The high-fidelity 2-column long-form technical article.
 * Neutralized for professional institutional readability.
 */
export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock post metadata for visualization
  const post = {
    title: "Scaling Ethereum Security with BLS Signature Aggregation",
    author: "DR. ARI THORN",
    date: "OCT 24, 2024",
    readTime: "12 MIN READ",
    toc: ["Introduction", "Architecture", "Node Operators", "Security Audit", "Conclusion"],
    glossary: [
      { term: "Pairing", definition: "A bilinear map from two abelian groups to a third group." },
      { term: "G1 & G2", definition: "Specific subgroups defined for elliptic curve pairings." },
      { term: "Serialization", definition: "The process of converting complex mathematical objects to bits." },
    ]
  };

  return (
    <div className="pt-32 pb-24 bg-background transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-20 relative">
        
        {/* Sidebar: Navigation & Technical Metadata */}
        <aside className="lg:w-[320px] space-y-16 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
          {/* Table of Contents */}
          <div className="space-y-6">
            <div className="text-redline text-[8px] border-b border-surface-border pb-2 uppercase tracking-widest">TECHNICAL DEEP DIVE</div>
            <nav className="flex flex-col space-y-4">
              {post.toc.map((item, i) => (
                <button 
                  key={item} 
                  className={`text-left text-xs font-mono uppercase tracking-widest transition-all ${
                    i === 0 ? "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-4" : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  {i < 9 ? `0${i+1}` : i+1}. {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Glossary (Centralized) */}
          <div className="space-y-8 pt-8 border-t border-surface-border">
             <div className="text-redline text-[8px] tracking-[0.3em] uppercase">GLOSSARY</div>
             <div className="space-y-6">
                 {post.glossary.map(item => (
                   <div key={item.term} className="space-y-2">
                      <span className="text-[10px] font-mono text-foreground/70 font-bold tracking-widest uppercase">{item.term}</span>
                     <p className="text-xs text-foreground/50 leading-relaxed font-sans">{item.definition}</p>
                  </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 max-w-5xl space-y-16 order-1 lg:order-2 pb-24">
           {/* Header */}
           <header className="space-y-8">
              <h1 className="text-4xl md:text-7xl font-display font-thin text-foreground leading-[1.0] tracking-tighter">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-[10px] font-mono text-foreground/40 font-bold tracking-widest uppercase">
                 <span className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-foreground/10 rounded-full" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              <svg className="w-full max-w-lg text-foreground/20 group-hover:text-primary/60 transition-colors" viewBox="0 0 400 200" fill="none">
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
           <article className="prose prose-neutral dark:prose-invert max-w-none space-y-12 text-lg text-foreground/80 leading-relaxed font-sans">
              <section className="space-y-6">
                <h2 className="text-3xl font-display font-thin text-foreground tracking-tight">The Bottleneck of Verification</h2>
                <p>
                  As decentralized networks grow, the cost of verifying individual signatures becomes a linear burden on every validator. In Ethereum's Proof of Stake consensus, having tens of thousands of validators sign every block would traditionally require an unfeasible amount of data and computation.
                </p>
                <p>
                  Enter <strong>Boneh-Lynn-Shacham (BLS)</strong> signatures. Unlike traditional ECDSA used in Ethereum's transaction layer, BLS allows for 
                  <span className="italic"> mathematical aggregation</span>. This means 32k signatures can be compressed into a single constant-size signature that proves all 32k participants signed the message.
                </p>
              </section>

              <section className="space-y-8 bg-surface-low p-10 rounded-2xl border-l-4 border-surface-border transition-all hover:border-primary/40 group/callout">
                 <div className="text-redline text-[8px] text-foreground/40 group-hover/callout:text-primary/60 transition-colors uppercase tracking-[0.2em]">CORE FUNCTIONALITY</div>
                 <div className="text-2xl font-mono text-foreground tracking-tight">
                    S_agg = Σ S_i (i=1 to n)
                 </div>
                 <p className="text-sm font-mono opacity-50 italic">
                    Verification signatures via a pairing-friendly elliptic curve where e(S_agg, P) = Π e(S_i, P_i) mod n
                 </p>
              </section>

              <section className="space-y-6">
                 <h2 className="text-3xl font-display font-thin text-foreground tracking-tight">Security Considerations</h2>
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
                         <span className="h-4 w-4 rounded-full bg-surface-border/50 flex items-center justify-center mt-1 border border-surface-border">
                            <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full" />
                         </span>
                         <span className="text-sm">{item}</span>
                      </li>
                    ))}
                 </ul>
              </section>
            </article>
         </main>
      </div>

      {/* Keep Reading Section */}
      <section className="max-w-7xl mx-auto px-8 mt-32 space-y-12">
         <div className="flex justify-between items-center border-b border-surface-border pb-6">
            <h4 className="text-xs font-mono font-bold text-foreground/50 tracking-widest uppercase">Keep Reading</h4>
            <Link href="/blog" className="text-xs font-mono text-foreground/40 hover:text-primary transition-colors uppercase tracking-widest">All Articles</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="surface-depth p-6 space-y-4 neon-card group cursor-pointer">
                 <div className="h-32 bg-background-darker rounded-lg" />
                 <span className="text-[10px] font-mono text-foreground/20 uppercase font-bold tracking-widest">Category_v{i}</span>
                 <h5 className="text-foreground font-thin leading-tight group-hover:text-primary transition-colors">Theoretical Bounds of Verifiability in AVS</h5>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
