'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, formatNumber, formatCurrency } from '@/lib/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
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
    ExternalLinkIcon,
    DownloadIcon,
    MixerVerticalIcon,
    BarChartIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { OutcomeDisplay } from '@/components/OutcomeDisplay';
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

    const handleExport = () => {
        if (!activity || activity.length === 0) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activity, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `friehub_truth_logs_${new Date().toISOString()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success('Activity logs exported successfully');
    };

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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out max-w-[1600px] mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <StatCard
                        key={i}
                        {...stat}
                        loading={statsLoading}
                    />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Live Truth Stream */}
                <div className="xl:col-span-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                                <div className="relative w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            </div>
                            <h2 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.3em]">Truth Stream</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleExport}
                                className="group flex items-center gap-2 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.2em] transition-all"
                            >
                                <DownloadIcon width={14} height={14} />
                                <span className="hidden sm:inline">Export Logs</span>
                                <span className="sm:hidden">Export</span>
                            </button>
                            <Link href="/activity" className="group flex items-center gap-2 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.2em] transition-all">
                                <span className="hidden sm:inline">Detailed Protocol History</span>
                                <span className="sm:hidden">Full Log</span>
                                <ExternalLinkIcon width={14} height={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activityLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-20 bg-card border border-border rounded-2xl animate-pulse" />
                            ))
                        ) : activity?.length ? (
                            activity.map((item: any) => (
                                <div key={item.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/20 rounded-[1.5rem] transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 w-1 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <div className="flex gap-6 items-center">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500 shrink-0">
                                            <ActivityLogIcon width={22} height={22} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-display font-bold text-foreground text-base group-hover:text-primary transition-colors tracking-tight truncate">
                                                {item.recipeName || 'Protocol Execution'}
                                            </h3>
                                            <div className="text-[10px] text-foreground/30 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono font-bold uppercase tracking-widest mt-1">
                                                <span className="flex items-center gap-1.5"><ClockIcon width={12} height={12} /> {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                                <span className="hidden sm:block w-1.5 h-1.5 bg-white/5 rounded-full" />
                                                <Link href={`https://testnet.helios.org/tx/${item.txHash}`} target="_blank" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                                    <MagnifyingGlassIcon width={12} height={12} /> {item.txHash?.slice(0, 10)}...{item.txHash?.slice(-6)}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex justify-end">
                                        <StatusBadge status="active" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-card/20">
                                <ActivityLogIcon width={32} height={32} className="mx-auto text-foreground/10 mb-4" />
                                <h3 className="text-foreground/40 text-sm font-black uppercase tracking-[0.2em] mb-2">Protocol Inactive</h3>
                                <p className="text-foreground/20 text-xs font-bold uppercase tracking-widest">Awaiting incoming verification stream</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="xl:col-span-4 space-y-8">


                    {isConnected && (
                        <div className="p-8 bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[12px] font-black text-foreground/40 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <BoxIcon width={16} height={16} className="text-primary" />
                                    Active Infrastructure
                                </h3>
                                <Link href="/network" className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-colors border-b border-primary/20 pb-0.5">
                                    Monitor All
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {nodesLoading ? (
                                    <div className="h-16 bg-white/5 animate-pulse rounded-2xl" />
                                ) : userNodes.length > 0 ? (
                                    userNodes.map((node: any) => (
                                        <div key={node.node_id} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all group/node">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 transition-colors group-hover/node:text-primary">
                                                    {node.node_type}
                                                </span>
                                                <span className="text-[10px] font-mono text-foreground/20 tabular-nums truncate">
                                                    {node.node_id}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    node.status === 'ACTIVE' ? "bg-primary animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500"
                                                )} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                                        <p className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.3em]">No Active Nodes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
