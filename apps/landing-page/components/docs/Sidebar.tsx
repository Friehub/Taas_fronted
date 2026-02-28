"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChevronRightIcon,
    DoubleArrowRightIcon,
    HomeIcon,
    CodeIcon,
    LayersIcon,
    ShadowIcon,
    LightningBoltIcon
} from '@radix-ui/react-icons';
import { clsx } from 'clsx';

const DOCS_NAV = [
    {
        title: "The Vision",
        items: [
            { title: "Introduction", href: "/docs", icon: <HomeIcon /> },
            { title: "Friehub Mission", href: "/docs/mission", icon: <ShadowIcon /> },
        ]
    },
    {
        title: "Protocol Anatomy",
        items: [
            { title: "Standard Recipes", href: "/docs/recipes", icon: <CodeIcon /> },
            { title: "Truth Attestation", href: "/docs/attestation", icon: <LayersIcon /> },
            { title: "Data Gateway", href: "/docs/data-feeds", icon: <LightningBoltIcon /> },
        ]
    }
];

const RESOURCE_LINKS = [
    { title: "taas-sdk", href: "https://github.com/friehub/taas-sdk" },
    { title: "taas-interfaces", href: "https://github.com/friehub/taas-interfaces" },
    { title: "taas-nodes", href: "https://github.com/friehub/taas-nodes" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 h-[calc(100vh-80px)] sticky top-20 border-r border-border bg-background/30 backdrop-blur-xl overflow-y-auto hidden lg:block scrollbar-hide">
            <div className="py-12 px-8">
                {DOCS_NAV.map((group, i) => (
                    <div key={i} className="mb-12">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/30 mb-6 px-4">
                            {group.title}
                        </h4>
                        <div className="space-y-1">
                            {group.items.map((item, j) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={j}
                                        href={item.href}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all group border",
                                            isActive
                                                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_20px_rgba(170,255,184,0.05)]"
                                                : "text-foreground/50 border-transparent hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <span className={clsx(
                                            "shrink-0 transition-all group-hover:scale-110",
                                            isActive ? "text-primary" : "text-foreground/20"
                                        )}>
                                            {item.icon}
                                        </span>
                                        {item.title}
                                        {isActive && (
                                            <div className="ml-auto w-1 h-1 rounded-full bg-primary animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="mt-20 pt-8 border-t border-border/50">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/30 mb-6 px-4">
                        Developer Resources
                    </h4>
                    <div className="space-y-2">
                        {RESOURCE_LINKS.map((link, k) => (
                            <a
                                key={k}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-foreground/40 hover:text-primary transition-colors group"
                            >
                                <ChevronRightIcon className="w-3 h-3 text-foreground/10 group-hover:text-primary transition-colors" />
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export function MobileNav() {
    // Basic mobile dropdown for docs
    return (
        <div className="lg:hidden p-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-20 z-40">
            <select
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => window.location.href = e.target.value}
            >
                {DOCS_NAV.flatMap(g => g.items).map((item, i) => (
                    <option key={i} value={item.href}>{item.title}</option>
                ))}
            </select>
        </div>
    );
}
