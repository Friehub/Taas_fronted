'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, formatNumber, formatCurrency } from '@/lib/api';
import { cn } from '@/lib/utils';
import { StatCard, StatusBadge } from '../components/shared/StatCard';
import {
    ActivityLogIcon,
    PersonIcon,
    BoxIcon,
    GlobeIcon,
    ArrowTopRightIcon,
    ArrowBottomRightIcon,
    LightningBoltIcon,
    ShadowIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    MagnifyingGlassIcon,
    ExternalLinkIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { OutcomeDisplay } from '@/components/OutcomeDisplay';
import { ExtensionLink } from '@/components/ExtensionLink';
import { formatDistanceToNow } from 'date-fns';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

export default function DashboardPage() {
    const { stats, isLoading: statsLoading } = useStats();
    const { activity, isLoading: activityLoading } = useActivity();
    const { address, isConnected } = useAccount();

    const { data: userNodesData, isLoading: nodesLoading } = useSWR(
        isConnected ? `${INDEXER_URL}/nodes?operator=${address}` : null,
        fetcher
    );

    const userNodes = userNodesData?.data || [];
    const totalEarned = userNodes.reduce((acc: number, node: any) => acc + parseFloat(node.total_earned || 0), 0);
    const totalProceeds = userNodes.reduce((acc: number, node: any) => acc + parseInt(node.total_proceeds || 0), 0);

    const statCards = [
        {
            label: 'Total Requests',
            value: stats ? formatNumber(stats.totalRequests || 0) : '-',
            icon: ActivityLogIcon,
            trend: 12
        },
        {
            label: 'Active Sentinels',
            value: stats ? formatNumber(stats.sentinelNodes || 0) : '-',
            icon: BoxIcon,
            trend: 2
        },
        {
            label: 'Total Proceeds',
            value: isConnected ? formatNumber(totalProceeds) : '-',
            icon: ShadowIcon,
            trendLabel: 'Truths Verified'
        },
        {
            label: 'Amount Earned',
            value: isConnected ? `${(totalEarned / 1e18).toFixed(2)} T` : '-',
            icon: LightningBoltIcon,
            trendLabel: 'Protocol Rewards'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <StatCard
                        key={i}
                        {...stat}
                        loading={statsLoading}
                    />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Truth Stream */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                                <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
                            </div>
                            <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Truth Stream</h2>
                        </div>
                        <Link href="/activity" className="group flex items-center gap-1.5 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.2em] transition-all">
                            Full Log <ExternalLinkIcon width={12} height={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-2">
                        {activityLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-16 bg-card border border-border rounded-lg animate-pulse" />
                            ))
                        ) : activity?.length ? (
                            activity.map((item: any) => (
                                <div key={item.id} className="group flex items-center justify-between p-4 bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/30 rounded-2xl transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute inset-y-0 left-0 w-1 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <div className="flex gap-5 items-center">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                                            <ActivityLogIcon width={18} height={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors tracking-tight">
                                                {item.recipeName || 'Unknown Recipe'}
                                            </h3>
                                            <div className="text-[10px] text-foreground/40 flex items-center gap-2 font-mono font-bold uppercase tracking-tighter mt-0.5">
                                                <span className="flex items-center gap-1"><ClockIcon width={10} height={10} /> {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                                <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                <Link href={`https://testnet.helios.org/tx/${item.txHash}`} target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">
                                                    <MagnifyingGlassIcon width={10} height={10} /> {item.txHash?.slice(0, 6)}...{item.txHash?.slice(-4)}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <StatusBadge status="active" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center border border-dashed border-border rounded-xl bg-muted/50">
                                <ActivityLogIcon width={20} height={20} className="mx-auto text-muted-foreground mb-2" />
                                <h3 className="text-foreground text-sm font-medium mb-1">System Idle</h3>
                                <p className="text-muted-foreground text-xs">Waiting for verification events...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <ExtensionLink />

                    <div className="p-6 bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <GlobeIcon width={80} height={80} />
                        </div>
                        <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <BoxIcon width={14} height={14} className="text-primary/60" />
                            Consensus Health
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span className="text-foreground/30">Protocol Uptime</span>
                                    <span className="text-emerald-500 tabular-nums">99.9%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-emerald-500 w-[99.9%] shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span className="text-foreground/30">Active Disputes</span>
                                    <span className="text-foreground/60 tabular-nums">0.02%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-primary w-[1%] shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isConnected ? (
                        <div className="space-y-4">
                            <div className="p-6 bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <BoxIcon width={14} height={14} className="text-primary/60" />
                                        Active Nodes
                                    </h3>
                                    <Link href="/network" className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-colors">
                                        Monitor
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {nodesLoading ? (
                                        <div className="h-10 bg-white/5 animate-pulse rounded-xl" />
                                    ) : userNodes.length > 0 ? (
                                        userNodes.map((node: any) => (
                                            <div key={node.node_id} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group/node">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/60 transition-colors group-hover/node:text-primary">
                                                        {node.node_type}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-foreground/30 tabular-nums">
                                                        {node.node_id.slice(0, 12)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1 h-1 rounded-full",
                                                        node.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" : "bg-rose-500"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase tracking-widest",
                                                        node.status === 'ACTIVE' ? "text-emerald-500" : "text-rose-500"
                                                    )}>
                                                        {node.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 border border-dashed border-white/10 rounded-2xl">
                                            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">No Nodes Active</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-card/40 backdrop-blur-md border border-dashed border-white/10 rounded-2xl relative group">
                                <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3">Developer Hub</h3>
                                <p className="text-[11px] text-foreground/40 mb-6 leading-relaxed font-medium">
                                    Manage protocol subscriptions and generate API access tokens.
                                </p>
                                <Link href="/developer">
                                    <button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                                        Manage API Access
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-card/40 backdrop-blur-md border border-dashed border-white/10 rounded-2xl group transition-all hover:border-primary/20">
                            <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                                <LightningBoltIcon width={14} height={14} className="text-primary/60" />
                                Protocol Onboarding
                            </h3>
                            <p className="text-[11px] text-foreground/40 mb-6 leading-relaxed font-medium">
                                Connect your wallet to register a new Sentinel node and start earning.
                            </p>
                            <Link href="/register-node">
                                <button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                                    Register Node
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
