"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Navbar - AVS Protocol Navigation.
 * Aligned with clinical infrastructure standards.
 */
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "AVS Protocol", href: "/#avs" },
    { name: "Verifiable Compute", href: "/#compute" },
    { name: "Status", href: "/networks/hoodi" },
    { name: "Docs", href: "https://docs.friehub.cloud", external: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? "bg-background/90 backdrop-blur-md border-foreground/5 py-4" : "bg-transparent border-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="text-xl font-display font-bold text-foreground tracking-tighter uppercase whitespace-nowrap">
            TAAS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all hover:text-foreground/70 ${
                pathname === item.href 
                ? "text-foreground underline decoration-foreground/20 underline-offset-8" 
                : "text-foreground/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Center & Mobile Toggle */}
        <div className="flex items-center space-x-6">
            <ThemeToggle />
            
            <Link 
              href="https://github.com/Friehub/taas-gateway" 
              target="_blank" 
              className="hidden lg:block rounded-none border border-foreground/10 px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground/5 transition-all"
            >
               Build on TaaS
            </Link>

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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-foreground/5 overflow-hidden"
          >
            <div className="p-8 flex flex-col space-y-6">
              <div className="flex flex-col space-y-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground hover:text-foreground/70 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
