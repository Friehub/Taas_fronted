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
        title: "Introduction",
        items: [
            { title: "Getting Started", href: "/docs", icon: <HomeIcon /> },
            { title: "Mission", href: "/docs/mission", icon: <ShadowIcon /> },
        ]
    },
    {
        title: "Protocol Core",
        items: [
            { title: "Standard Recipes", href: "/docs/recipes", icon: <CodeIcon /> },
            { title: "Truth Attestation", href: "/docs/attestation", icon: <LayersIcon /> },
            { title: "Data Feeds", href: "/docs/data-feeds", icon: <LightningBoltIcon /> },
        ]
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 h-[calc(100vh-80px)] sticky top-20 border-r border-border bg-background/50 backdrop-blur-md overflow-y-auto hidden lg:block">
            <div className="py-12 px-8">
                {DOCS_NAV.map((group, i) => (
                    <div key={i} className="mb-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 opacity-60 px-4">
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
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                                            isActive
                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                : "text-foreground/40 hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <span className={clsx(
                                            "shrink-0 transition-transform group-hover:scale-110",
                                            isActive ? "text-primary" : "text-foreground/20"
                                        )}>
                                            {item.icon}
                                        </span>
                                        {item.title}
                                        {isActive && (
                                            <DoubleArrowRightIcon className="ml-auto w-3 h-3 animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
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
