'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, formatNumber } from '@/lib/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { StatCard, StatusBadge } from '../components/shared/StatCard';
import {
    ActivityLogIcon,
    BoxIcon,
    ShadowIcon,
    LightningBoltIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    DownloadIcon,
    PlusIcon,
    TrashIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

export default function DashboardPage() {
    const { stats, isLoading: statsLoading } = useStats();
    const { activity, isLoading: activityLoading } = useActivity();
    const { address, isConnected } = useAccount();

    const { data: userNodesData, isLoading: nodesLoading } = useSWR(
        isConnected ? `${INDEXER_URL}/nodes?owner=${address}` : null,
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Activity & Stream */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ActivityLogIcon width={20} height={20} className="text-primary" />
                                <h2 className="text-lg font-black tracking-tight uppercase">Live Truth Stream</h2>
                            </div>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                                <DownloadIcon width={14} height={14} />
                                Export
                            </button>
                        </div>

                        <div className="divide-y divide-border/50">
                            {activityLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="p-6 h-24 bg-muted/20 animate-pulse" />
                                ))
                            ) : activity?.length ? (
                                activity.map((item: any) => (
                                    <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-base tracking-tight truncate">
                                                {item.recipeName || 'Protocol Execution'}
                                            </h3>
                                            <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1 font-mono uppercase">
                                                <span className="flex items-center gap-1"><ClockIcon width={12} height={12} /> {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                                <Link href={`https://testnet.helios.org/tx/${item.txHash}`} target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">
                                                    <MagnifyingGlassIcon width={12} height={12} /> {item.txHash?.slice(0, 10)}...{item.txHash?.slice(-6)}
                                                </Link>
                                            </div>
                                        </div>
                                        <StatusBadge status="active" />
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    <ActivityLogIcon width={32} height={32} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Awaiting Verification Stream</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Infrastructure */}
                <div className="space-y-8">

                    {/* Infrastructure Widget */}
                    {isConnected && (
                        <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                                    <BoxIcon width={16} height={16} className="text-primary" /> Nodes
                                </h3>
                                <Link href="/network" className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider">
                                    Monitor All
                                </Link>
                            </div>
                            <div className="p-6 space-y-3">
                                {nodesLoading ? (
                                    <div className="h-12 bg-white/5 animate-pulse rounded-lg" />
                                ) : userNodes.length > 0 ? (
                                    userNodes.slice(0, 3).map((node: any) => (
                                        <div key={node.node_id} className="flex justify-between items-center p-4 rounded-xl bg-background border border-border">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-black uppercase tracking-widest text-foreground/80">
                                                    {node.node_type}
                                                </span>
                                                <span className="text-[10px] font-mono text-muted-foreground tabular-nums truncate max-w-[150px]">
                                                    {node.node_id}
                                                </span>
                                            </div>
                                            <div className={cn("w-2 h-2 rounded-full", node.status === 'ACTIVE' ? "bg-primary animate-[pulse_2s_infinite]" : "bg-destructive")} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 border-2 border-dashed border-border rounded-xl">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">No Active Nodes</p>
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
