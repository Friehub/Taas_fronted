'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    DashboardIcon,
    ComponentInstanceIcon,
    ActivityLogIcon,
    FileTextIcon,
    GearIcon,
    LightningBoltIcon,
    BoxIcon,
    HamburgerMenuIcon,
    Cross1Icon
} from '@radix-ui/react-icons';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './shared/ThemeToggle';

const NAV_ITEMS = [
    { label: 'Overview', href: '/', icon: DashboardIcon },
    { label: 'Faucet', href: '/faucet', icon: LightningBoltIcon },
    { label: 'Documentation', href: 'https://docs.friehub.cloud', icon: FileTextIcon, external: true },
];

import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useHealth, formatNumber } from '@/lib/api';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) {
    const pathname = usePathname();
    const { isConnected } = useAccount();
    const { health } = useHealth();

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
                "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-card/50 backdrop-blur-xl flex flex-col h-screen transition-all duration-300 transform lg:translate-x-0 lg:static lg:block",
                isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
            )}>
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="font-display font-black text-foreground tracking-tighter text-lg uppercase">
                            Friehub <span className="text-primary">TaaS</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <div className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] px-3 mb-4 mt-2">Core Infrastructure</div>

                    {filteredNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        const content = (
                            <div
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-transparent",
                                    isActive
                                        ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                                        : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn(
                                    "transition-transform duration-300",
                                    isActive ? "text-primary scale-110" : "text-muted-foreground/40 group-hover:text-primary group-hover:scale-110"
                                )} width={16} height={16} />
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
                <div className="p-4 border-t border-white/5">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BoxIcon width={40} height={40} />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                                health?.status === 'HEALTHY' ? "bg-emerald-500" : "bg-red-500"
                            )} />
                            <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Network Status</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.1em]">
                                <span className="text-foreground/30">Protocol</span>
                                <span className="text-primary font-mono border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded-md leading-none text-[10px]">Testnet</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.1em]">
                                <span className="text-foreground/30">Block Height</span>
                                <span className="text-foreground/60 font-mono tabular-nums tracking-tighter">
                                    #{health?.blockHeight ? health.blockHeight.toLocaleString() : '9,154,320'}
                                </span>
                            </div>
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
        <header className="h-16 border-b border-white/5 bg-card/30 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
            {/* Breadcrumbs / Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 -ml-2 lg:hidden text-muted-foreground hover:text-foreground transition-colors"
                >
                    <HamburgerMenuIcon width={18} height={18} />
                </button>
                <div className="flex items-center gap-3">
                    <span className="hidden md:block w-1 h-3 bg-primary/40 rounded-full" />
                    <h1 className="font-display font-bold text-foreground/60 tracking-[0.15em] text-[10px] uppercase whitespace-nowrap">Overview</h1>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                <ThemeToggle />

                <div className="hidden sm:block h-4 w-px bg-white/10" />

                {isConnected ? (
                    <div
                        onClick={handleDisconnect}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/20 transition-all group"
                    >
                        <BoxIcon width={14} height={14} className="text-primary group-hover:rotate-90 transition-transform duration-500" />
                        <span className="text-[10px] md:text-xs font-bold text-primary font-mono tracking-tighter">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    </div>
                ) : (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="px-4 md:px-6 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                    >
                        Connect
                    </button>
                )}
            </div>
        </header>
    );
}
