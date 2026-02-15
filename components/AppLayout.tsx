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
    Hexagon
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/overview', icon: LayoutDashboard },
    { label: 'Registry', href: '/registry', icon: Database },
    { label: 'Live Truths', href: '/activity', icon: Activity },
    { label: 'Documentation', href: '/docs', icon: FileText },
    // { label: 'Settings', href: '/settings', icon: Settings },
];

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function Sidebar() {
    const pathname = usePathname();
    const { isConnected } = useAccount();

    const filteredNavItems = NAV_ITEMS.filter(item => {
        if (item.href === '/registry') return isConnected;
        return true;
    });

    return (
        <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                        H
                    </div>
                    <div>
                        <div className="font-bold text-white tracking-tight">TAAS Portal</div>
                        <div className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest">Version 4.0</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                <div className="text-xs font-semibold text-white/20 uppercase tracking-wider px-3 mb-3 mt-2">Platform</div>

                {filteredNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.05)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon size={18} className={isActive ? "text-yellow-500" : "text-white/40"} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Status Card */}
            <div className="p-4 border-t border-white/5">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wide">System Online</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-white/30">Network</span>
                        <span className="text-blue-400 font-mono">Helios Testnet</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                        <span className="text-white/30">Block Height</span>
                        <span className="text-yellow-500 font-mono">#9,154,320</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export function Header() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <header className="h-16 border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl sticky top-0 z-10 px-8 flex items-center justify-between">
            {/* Breadcrumbs / Title */}
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
                <h1 className="font-bold text-white tracking-wide">Overview</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {isConnected && (
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white/40 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-full">
                        <Zap size={14} />
                        Quick Actions
                    </button>
                )}

                <div className="h-6 w-px bg-white/10" />

                {isConnected ? (
                    <div
                        onClick={() => disconnect()}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full cursor-pointer hover:bg-blue-500/20 transition-all"
                    >
                        <Hexagon size={14} className="text-blue-400" />
                        <span className="text-xs font-bold text-blue-400 font-mono">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    </div>
                ) : (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="px-5 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </header>
    );
}
