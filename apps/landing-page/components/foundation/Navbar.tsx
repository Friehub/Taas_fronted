"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-surface-border py-4" : "bg-gradient-to-b from-black/80 to-transparent py-8"
      }`}
      style={(!scrolled && pathname === '/') ? { "--foreground": "#ffffff" } as React.CSSProperties : {}}
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
        <div className="flex items-center space-x-6">
           <ThemeToggle />

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
