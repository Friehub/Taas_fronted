'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, formatNumber, formatCurrency } from '@/lib/api';
import { StatCard, StatusBadge } from '../components/shared/StatCard';
import { Activity as ActivityIcon, Users, Server, Globe, ArrowUpRight, ArrowDownRight, Zap, Database, Clock } from 'lucide-react';
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
            icon: ActivityIcon,
            trend: 0
        },
        {
            label: 'My Active Nodes',
            value: isConnected ? userNodes.length : '-',
            icon: Server,
            trend: 0
        },
        {
            label: 'Total Proceeds',
            value: isConnected ? formatNumber(totalProceeds) : '-',
            icon: Database,
            trendLabel: 'Truths Verified'
        },
        {
            label: 'Amount Earned',
            value: isConnected ? `${(totalEarned / 1e18).toFixed(2)} T` : '-',
            icon: Zap,
            trendLabel: 'All-time Returns'
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
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Truth Stream</h2>
                        </div>
                        <Link href="/activity" className="text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
                            View Full Log
                        </Link>
                    </div>

                    <div className="space-y-2">
                        {activityLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-16 bg-card border border-border rounded-lg animate-pulse" />
                            ))
                        ) : activity?.length ? (
                            activity.map((item: any) => (
                                <div key={item.id} className="group flex items-center justify-between p-4 bg-card border border-border hover:border-primary/20 rounded-lg transition-all duration-200">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <ActivityIcon size={14} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                                {item.recipeName || 'Unknown Recipe'}
                                            </h3>
                                            <div className="text-[10px] text-muted-foreground flex items-center gap-2 font-mono">
                                                <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                                <span className="w-0.5 h-0.5 bg-border rounded-full" />
                                                <Link href={`https://testnet.helios.org/tx/${item.txHash}`} target="_blank" className="hover:text-primary transition-colors">
                                                    {item.txHash?.slice(0, 6)}...{item.txHash?.slice(-4)}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Simplified Outcome Display for List View */}
                                    <div className="text-right">
                                        <StatusBadge status="active" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center border border-dashed border-border rounded-xl bg-muted/50">
                                <ActivityIcon size={20} className="mx-auto text-muted-foreground mb-2" />
                                <h3 className="text-foreground text-sm font-medium mb-1">System Idle</h3>
                                <p className="text-muted-foreground text-xs">Waiting for verification events...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <ExtensionLink />

                    <div className="p-6 bg-card border border-border rounded-xl">
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <Server size={14} className="text-muted-foreground" />
                            Network Status
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
                                    <span className="text-slate-500">Consensus</span>
                                    <span className="text-emerald-500">99.9%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[99.9%]" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
                                    <span className="text-muted-foreground">Disputes</span>
                                    <span className="text-foreground">0.02%</span>
                                </div>
                                <div className="h-1 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[1%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isConnected ? (
                        <div className="space-y-4">
                            <div className="p-6 bg-card border border-border rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Server size={14} className="text-muted-foreground" />
                                        My Nodes
                                    </h3>
                                    <Link href="/network" className="text-[10px] font-bold text-primary hover:underline">
                                        Monitor All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {nodesLoading ? (
                                        <div className="h-10 bg-muted animate-pulse rounded" />
                                    ) : userNodes.length > 0 ? (
                                        userNodes.map((node: any) => (
                                            <div key={node.node_id} className="flex justify-between items-center p-2 rounded-lg bg-muted/30 border border-border/50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                                                        {node.node_type}
                                                    </span>
                                                    <span className="text-[9px] font-mono text-muted-foreground">
                                                        {node.node_id.slice(0, 10)}...
                                                    </span>
                                                </div>
                                                <span className={`text-[10px] font-bold ${node.status === 'ACTIVE' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {node.status}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-xs text-muted-foreground italic">
                                            No nodes registered.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-card border border-dashed border-border rounded-xl">
                                <h3 className="text-sm font-bold text-foreground mb-2">Developer Hub</h3>
                                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                    Manage subscriptions and generate API keys for the Truth Gateway.
                                </p>
                                <Link href="/developer">
                                    <button className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wide rounded-lg transition-colors shadow-lg shadow-primary/20">
                                        Manage API Keys
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-card border border-dashed border-border rounded-xl">
                            <h3 className="text-sm font-bold text-foreground mb-2">Node Management</h3>
                            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                Connect wallet to manage nodes and stake.
                            </p>
                            <Link href="/register-node">
                                <button className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wide rounded-lg transition-colors">
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
