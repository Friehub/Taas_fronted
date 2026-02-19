'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Database,
    Activity,
    FileText,
    Settings,
    Zap,
    Hexagon,
    Menu,
    X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './shared/ThemeToggle';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Registry', href: '/registry', icon: Database },
    { label: 'Live Truths', href: '/activity', icon: Activity },
    { label: 'Documentation', href: 'https://docs.friehub.cloud', icon: FileText, external: true },
    // { label: 'Settings', href: '/settings', icon: Settings },
];

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) {
    const pathname = usePathname();
    const { isConnected } = useAccount();

    const filteredNavItems = NAV_ITEMS.filter(item => {
        if (item.href === '/registry') return isConnected;
        return true;
    });

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card flex flex-col h-screen transition-transform duration-300 transform lg:translate-x-0 lg:static lg:block",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-black text-lg">
                            F
                        </div>
                        <div>
                            <div className="font-bold text-foreground tracking-tight">Friehub Console</div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">FTS + Markets</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3 mt-2">Platform</div>

                    {filteredNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        const content = (
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <Icon size={16} className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                                {item.label}
                            </div>
                        );

                        if ((item as any).external) {
                            return (
                                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                            >
                                {content}
                            </Link>
                        );
                    })}
                </nav>

                {/* Status Card */}
                <div className="p-4 border-t border-border">
                    <div className="p-3 bg-muted rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">System Online</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-muted-foreground">Network</span>
                            <span className="text-foreground font-mono">Testnet</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] mt-1">
                            <span className="text-muted-foreground">Block</span>
                            <span className="text-primary font-mono">#9,154,320</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}


export function Header({ setIsOpen }: { setIsOpen: (o: boolean) => void }) {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const router = useRouter();

    const handleDisconnect = () => {
        disconnect();
        localStorage.removeItem('friehub_auth_token');
        localStorage.removeItem('friehub_user');
        router.push('/login');
    };

    return (
        <header className="h-16 border-b border-border bg-card sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
            {/* Breadcrumbs / Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 -ml-2 lg:hidden text-muted-foreground hover:text-foreground"
                >
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <span className="hidden md:block w-1 h-4 bg-primary rounded-full" />
                    <h1 className="font-bold text-foreground tracking-wide text-xs md:text-sm uppercase whitespace-nowrap">Overview</h1>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                <ThemeToggle />

                {isConnected && (
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-lg">
                        <Zap size={12} />
                        Quick Actions
                    </button>
                )}

                <div className="hidden sm:block h-4 w-px bg-white/10" />

                {isConnected ? (
                    <div
                        onClick={handleDisconnect}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/20 transition-all"
                    >
                        <Hexagon size={14} className="text-primary" />
                        <span className="text-[10px] md:text-xs font-bold text-primary font-mono">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    </div>
                ) : (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="px-3 md:px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                    >
                        Connect
                    </button>
                )}
            </div>
        </header>
    );
}
