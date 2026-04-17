"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { subscribeToNewsletter } from "../../app/actions";

/**
 * Footer - High-Fidelity Multi-Column Design.
 * Rebuilt to match the provided mockup.
 */
export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData();
    formData.append("email", email);
    
    const result = await subscribeToNewsletter(formData);
    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <footer className="w-full bg-background border-t border-surface-border/50 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
        
        {/* Column 1: Brand & Identity */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-foreground">Friehub</span>
          </div>
          <p className="text-foreground/40 text-sm leading-relaxed max-w-xs">
            The high-integrity truth network built for the future of decentralized resource markets and prediction veracity.
          </p>
          <div className="flex items-center space-x-6">
             <Link href="https://x.com/friehub" className="text-foreground/30 hover:text-foreground transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             </Link>
             <Link href="https://github.com/Friehub" className="text-foreground/30 hover:text-foreground transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.63-.33 2.47-.33.84 0 1.68.11 2.47.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
             </Link>
          </div>
        </div>

        {/* Column 2: Protocol */}
        <div className="space-y-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/50">Protocol</h4>
          <ul className="space-y-4">
            {["Ecosystem", "Governance", "Tokenomics", "Security"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Developers */}
        <div className="space-y-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/50">Developers</h4>
          <ul className="space-y-4">
            {["Documentation", "Whitepaper", "GitHub", "Bug Bounty"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/50">Stay Updated</h4>
          <form onSubmit={handleSubscribe} className="space-y-4">
             <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-background border border-surface-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-all placeholder:text-foreground/20"
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-foreground text-background font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "→"}
                </button>
             </div>
             {status === "success" && <p className="text-[10px] text-foreground font-mono lowercase tracking-tighter">verified_email_added_to_registry</p>}
             {status === "error" && <p className="text-[10px] text-red-500 font-mono lowercase">registry_connection_error</p>}
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-surface-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">
          © 2026 FRIEHUB NETWORK. ALL RIGHTS RESERVED.
        </span>
        <div className="flex items-center space-x-8">
           <Link href="#" className="text-[10px] font-mono text-foreground/20 hover:text-foreground transition-colors uppercase tracking-widest">Privacy Policy</Link>
           <Link href="#" className="text-[10px] font-mono text-foreground/20 hover:text-foreground transition-colors uppercase tracking-widest">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
