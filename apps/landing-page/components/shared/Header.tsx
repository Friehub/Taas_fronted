"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    GitHubLogoIcon,
    TwitterLogoIcon,
    MoonIcon,
    SunIcon,
    ChevronDownIcon,
    CubeIcon,
    ComponentInstanceIcon,
    LinkBreak2Icon,
    MagnifyingGlassIcon,
    FileTextIcon,
    TokensIcon,
    LockClosedIcon,
    ActivityLogIcon,
    LightningBoltIcon,
    HamburgerMenuIcon,
    Cross1Icon
} from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const MENU_ITEMS = [
    {
        title: "Products",
        items: [
            { title: "Gateway Node", desc: "Run a Rust hot-core protocol node.", icon: <ComponentInstanceIcon />, href: "https://github.com/friehub/Taas" },
            { title: "Plugin SDK", desc: "Write 40-line Sovereign Adapters.", icon: <CubeIcon />, href: "https://github.com/friehub/Taas/tree/main/taas-plugins" },
            { title: "Mesh P2P", desc: "Decentralized Truth Quorums.", icon: <LinkBreak2Icon />, href: "https://github.com/friehub/Taas" },
            { title: "Explorer", desc: "Track eip-712 signatures live.", icon: <MagnifyingGlassIcon />, href: "#" },
        ]
    },
    {
        title: "Developers",
        items: [
            { title: "Documentation", desc: "API limits, setup guides & SDK.", icon: <FileTextIcon />, href: "https://docs.friehub.cloud" },
            { title: "Architecture", desc: "Read the Two-Process spec.", icon: <TokensIcon />, href: "https://github.com/friehub/Taas/blob/main/taas-gateway/docs/architecture.md" },
            { title: "GitHub", desc: "Star the repository, open a PR.", icon: <GitHubLogoIcon />, href: "https://github.com/friehub/Taas" },
            { title: "Security Audits", desc: "Verify our BLS aggregate logic.", icon: <LockClosedIcon />, href: "#" },
        ]
    },
    {
        title: "Network",
        items: [
            { title: "Run a Node", desc: "Join the threshold network.", icon: <LightningBoltIcon />, href: "https://github.com/friehub/Taas" },
            { title: "Request a Feed", desc: "Ask for a new data plugin.", icon: <GitHubLogoIcon />, href: "https://github.com/friehub/Taas/issues" },
            { title: "Live Status", desc: "99.98% Gateway Uptime.", icon: <ActivityLogIcon />, href: "#" },
        ]
    }
];

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    if (!mounted) return null;

    // We force a dark context (white text) and black gradient when over the space hero (!isScrolled).
    // Once scored, we revert to the default glassy header that respects the active light/dark theme.
    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${!isScrolled ? 'bg-gradient-to-b from-black/80 to-transparent border-transparent' : 'bg-background/80 backdrop-blur-3xl border-b border-foreground/5'}`}
            style={!isScrolled ? { "--foreground": "#ffffff" } as React.CSSProperties : {}}
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                
                <div className="flex items-center gap-16">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
                        <span className="font-display text-2xl font-black tracking-tighter text-foreground transition-all group-hover:text-primary">
                            TaaS
                        </span>
                        <div className="hidden md:block w-[1px] h-6 bg-foreground/10 mx-2" />
                        <span className="hidden md:block text-[10px] font-mono text-foreground/40 font-bold uppercase tracking-[0.3em]">Institutional Oracle</span>
                    </Link>

                    {/* Desktop Mega-Menu Navigation */}
                    <nav className="hidden lg:flex items-center gap-2 h-full">
                        {MENU_ITEMS.map((menu) => (
                            <div 
                                key={menu.title}
                                className="relative h-20 flex items-center px-4 cursor-pointer group"
                                onMouseEnter={() => setActiveMenu(menu.title)}
                            >
                                <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${activeMenu === menu.title ? 'text-primary' : 'text-foreground/40 group-hover:text-foreground'}`}>
                                    {menu.title}
                                    <ChevronDownIcon className={`transition-transform duration-300 w-3 h-3 ${activeMenu === menu.title ? 'rotate-180 text-primary' : ''}`} />
                                </span>

                                {/* Dropdown Panel */}
                                <AnimatePresence>
                                    {activeMenu === menu.title && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.99 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.99 }}
                                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-[80px] left-[-20px] w-[520px] p-6 glass-premium rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.4)] z-50 overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-4 relative">
                                                {/* Ambient glow inside dropdown */}
                                                <div className="absolute inset-0 bg-primary/5 blur-[80px] pointer-events-none -z-10" />
                                                
                                                {menu.items.map((item) => (
                                                    <a
                                                        key={item.title}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex flex-col gap-2 p-4 rounded-sm hover:bg-foreground/5 transition-all group/item"
                                                    >
                                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                                                            <div className="shrink-0 w-8 h-8 rounded-sm bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all">
                                                                {item.icon}
                                                            </div>
                                                            {item.title}
                                                        </div>
                                                        <p className="text-[11px] text-foreground/40 leading-relaxed font-light group-hover/item:text-foreground/60 pl-11">
                                                            {item.desc}
                                                        </p>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Right Global Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden lg:flex items-center gap-4">
                        <a href="https://x.com/friehub" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-all">
                            <TwitterLogoIcon />
                        </a>
                        <a href="https://github.com/friehub/Taas" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-all">
                            <GitHubLogoIcon />
                        </a>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="text-foreground/40 hover:text-foreground transition-all"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Primary CTA */}
                    <Link
                        href="https://github.com/friehub/Taas/tree/main/taas-plugins"
                        className="hidden sm:flex h-10 px-6 bg-primary text-primary-foreground font-bold text-[11px] rounded-sm hover:translate-y-[-2px] transition-all items-center justify-center tracking-wider uppercase"
                    >
                        Launch DApp
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden p-2 -mr-2 text-foreground/60 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <Cross1Icon width={20} height={20} /> : <HamburgerMenuIcon width={20} height={20} />}
                    </button>
                </div>
                
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-2xl border-t border-white/5 overflow-y-auto z-40"
                    >
                        <div className="container mx-auto px-6 py-6 pb-24 flex flex-col gap-6">
                            {MENU_ITEMS.map((menu) => (
                                <div key={menu.title} className="flex flex-col border-b border-border/50 pb-4">
                                    <button 
                                        className="flex items-center justify-between py-2 text-lg font-bold text-foreground"
                                        onClick={() => setMobileExpandedSection(mobileExpandedSection === menu.title ? null : menu.title)}
                                    >
                                        {menu.title}
                                        <ChevronDownIcon className={`transition-transform ${mobileExpandedSection === menu.title ? 'rotate-180 text-primary' : ''}`} />
                                    </button>
                                    
                                    <AnimatePresence>
                                        {mobileExpandedSection === menu.title && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden flex flex-col gap-4 mt-4"
                                            >
                                                {menu.items.map((item) => (
                                                    <a 
                                                        key={item.title}
                                                        href={item.href}
                                                        className="flex items-start gap-4 p-2"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <div className="mt-1 text-primary/60">{item.icon}</div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm font-bold text-foreground">{item.title}</span>
                                                            <span className="text-xs text-foreground/50">{item.desc}</span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="flex flex-col gap-6 mt-4 pt-4">
                                <Link
                                    href="https://github.com/friehub/Taas/tree/main/taas-plugins"
                                    className="h-12 w-full bg-primary text-primary-foreground font-black uppercase tracking-wider text-xs rounded hover:opacity-90 transition-all flex items-center justify-center"
                                >
                                    Build a Plugin
                                </Link>

                                <div className="flex items-center gap-6">
                                    <a href="https://x.com/friehub" className="text-foreground/40 hover:text-primary transition-colors">
                                        <TwitterLogoIcon width={24} height={24} />
                                    </a>
                                    <a href="https://github.com/friehub/Taas" className="text-foreground/40 hover:text-primary transition-colors">
                                        <GitHubLogoIcon width={24} height={24} />
                                    </a>
                                    <button
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        className="text-foreground/40 hover:text-primary transition-colors"
                                    >
                                        {theme === 'dark' ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}
