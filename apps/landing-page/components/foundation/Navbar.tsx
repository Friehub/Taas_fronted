"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";


/**
 * Navbar - Institutional Global Navigation.
 * Completely neutralized to a pure White & Charcoal institutional palette.
 */
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isBlog = pathname?.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Oracle", href: "/#oracle" },
    { name: "AI Oracle", href: "/#ai-oracle" },
    { name: "Blog", href: "/blog" },
    { name: "Docs", href: "https://docs.friehub.com", external: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? "bg-background/90 backdrop-blur-md border-surface-border py-4" : "bg-transparent border-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-display font-bold text-foreground tracking-tighter uppercase whitespace-nowrap">
              Friehub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Monochrome) */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all hover:text-foreground/70 ${
                (pathname === item.href || (item.name === "Blog" && isBlog)) 
                ? "text-foreground underline decoration-foreground/20 underline-offset-8" 
                : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Center & Mobile Toggle */}
        <div className="flex items-center space-x-5">
           <div className="hidden sm:flex items-center space-x-5 mr-2">
             <Link 
               href="https://x.com/friehub" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-foreground/40 hover:text-foreground transition-colors p-2"
             >
               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
               </svg>
             </Link>
             <Link 
               href="https://github.com/Friehub" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-foreground/40 hover:text-foreground transition-colors p-2"
             >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.63-.33 2.47-.33.84 0 1.68.11 2.47.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
               </svg>
             </Link>
           </div>

           <button 
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
             className="md:hidden flex flex-col items-end space-y-1.5 p-2 group"
           >
              <div className={`h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <div className={`h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <div className={`h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
           </button>
        </div>
      </div>

      {/* Mobile Drawer (Monochrome) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-surface-border overflow-hidden"
          >
            <div className="p-8 flex flex-col space-y-6">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-bold uppercase tracking-widest text-foreground hover:text-foreground/70 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
