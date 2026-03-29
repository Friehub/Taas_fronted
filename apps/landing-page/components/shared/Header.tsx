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
    LightningBoltIcon
} from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const MENU_ITEMS = [
    {
        title: "Products",
        items: [
            { title: "Gateway Node", desc: "Run a Rust hot-core protocol node.", icon: <ComponentInstanceIcon />, href: "https://github.com/friehub/Taas" },
            { title: "Plugin SDK", desc: "Write 40-line Sovereign Adapters.", icon: <CubeIcon />, href: "https://github.com/friehub/Taas/tree/main/taas-plugins" },
            { title: "Sentinel P2P", desc: "Decentralized Truth Quorums.", icon: <LinkBreak2Icon />, href: "https://github.com/friehub/Taas" },
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

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <header 
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5"
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                
                <div className="flex items-center gap-12">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            Friehub // TaaS
                        </span>
                    </Link>

                    {/* Desktop Mega-Menu Navigation */}
                    <nav className="hidden md:flex items-center gap-1 h-full">
                        {MENU_ITEMS.map((menu) => (
                            <div 
                                key={menu.title}
                                className="relative h-16 flex items-center px-4 cursor-pointer group"
                                onMouseEnter={() => setActiveMenu(menu.title)}
                            >
                                <span className={`text-sm font-medium transition-colors flex items-center gap-1 ${activeMenu === menu.title ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground'}`}>
                                    {menu.title}
                                    <ChevronDownIcon className={`transition-transform duration-300 ${activeMenu === menu.title ? 'rotate-180 text-primary' : ''}`} />
                                </span>

                                {/* Dropdown Panel */}
                                <AnimatePresence>
                                    {activeMenu === menu.title && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute top-16 left-0 w-[400px] p-2 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl z-50"
                                        >
                                            <div className="grid grid-cols-2 gap-1 relative">
                                                {/* Ambient glow inside dropdown */}
                                                <div className="absolute inset-0 bg-primary/5 blur-2xl pointer-events-none -z-10" />
                                                
                                                {menu.items.map((item) => (
                                                    <a
                                                        key={item.title}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                                    >
                                                        <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                                                            <div className="text-primary/60 group-hover/item:text-primary">
                                                                {item.icon}
                                                            </div>
                                                            {item.title}
                                                        </div>
                                                        <p className="text-[11px] text-foreground/40 leading-relaxed group-hover/item:text-foreground/60">
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
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4">
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
                        className="h-9 px-4 bg-primary text-primary-foreground font-black uppercase tracking-wider text-[10px] rounded hover:opacity-90 transition-all flex items-center justify-center -skew-x-6"
                    >
                        <span className="skew-x-6">Build a Plugin</span>
                    </Link>
                </div>
                
            </div>
        </header>
    );
}
