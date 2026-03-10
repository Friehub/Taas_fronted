'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, useApiKeys, formatNumber } from '@/lib/api';
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
    TrashIcon,
    CodeIcon,
    GlobeIcon,
    MixerVerticalIcon,
    LayersIcon
} from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

export default function DashboardPage() {
    const { stats, isLoading: statsLoading } = useStats();
    const { activity, isLoading: activityLoading } = useActivity();
    const { address, isConnected } = useAccount();
    const { apiKeys } = useApiKeys();

    const { data: userNodesData, isLoading: nodesLoading } = useSWR(
        isConnected ? `${INDEXER_URL}/nodes?owner=${address}` : null,
        fetcher
    );

    const userNodes = userNodesData?.data || [];
    const totalEarned = userNodes.reduce((acc: number, node: any) => acc + parseFloat(node.total_earned || 0), 0);
    const totalProceeds = userNodes.reduce((acc: number, node: any) => acc + parseInt(node.total_proceeds || 0), 0);
    const activeApiKey = apiKeys.find(k => k.status === 'ACTIVE')?.token_hash || 'sk_taas_••••••••••••••••';

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

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-foreground tracking-tight mb-2">
                        Command <span className="text-primary">Center</span>
                    </h1>
                    <p className="text-sm text-foreground/40 font-medium tracking-wide uppercase">
                        Real-time Protocol Infrastructure & Truth Stream
                    </p>
                </div>
                {isConnected && (
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-2 pr-4 backdrop-blur-md">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <CodeIcon width={20} height={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">Active SDK Token</span>
                            <div className="flex items-center gap-2">
                                <code className="text-[11px] font-mono text-primary font-bold">{activeApiKey.slice(0, 12)}...</code>
                                <button onClick={() => copyToClipboard(activeApiKey, 'SDK Token')} className="text-foreground/20 hover:text-primary transition-colors">
                                    <PlusIcon width={14} height={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* Stats Bento Block (Row 1) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Requests"
                        value={stats ? formatNumber(stats.totalRequests || 0) : '-'}
                        icon={ActivityLogIcon}
                        trend={12}
                        loading={statsLoading}
                        className="bento-card"
                    />
                    <StatCard
                        label="Nodes Online"
                        value={stats ? formatNumber(stats.totalNodes || 0) : '-'}
                        icon={GlobeIcon}
                        trend={2}
                        loading={statsLoading}
                        className="bento-card"
                    />
                    <StatCard
                        label="Truth Verified"
                        value={isConnected ? formatNumber(totalProceeds) : '-'}
                        icon={ShadowIcon}
                        loading={statsLoading}
                        className="bento-card"
                    />
                    <StatCard
                        label="Reward Yield"
                        value={isConnected ? `${(totalEarned / 1e18).toFixed(2)} T` : '-'}
                        icon={LightningBoltIcon}
                        loading={statsLoading}
                        className="bento-card"
                    />
                </div>

                {/* Network Overview Map / Visual (Mock) (Row 1) */}
                <div className="col-span-12 lg:col-span-4 bg-card/40 border border-white/5 rounded-[2.5rem] p-8 glass-ultra overflow-hidden relative group bento-card min-h-[220px]">
                    <div className="absolute inset-0 bg-grid-white opacity-20" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Network Reach</h3>
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-display font-black">14</div>
                                <div className="text-xs font-bold text-foreground/40 leading-tight">Global<br />Clusters</div>
                            </div>
                        </div>
                        <div className="h-20 w-full bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                            <GlobeIcon width={40} height={40} className="text-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Live Stream (Row 2) */}
                <div className="col-span-12 lg:col-span-7 bg-card/40 border border-white/5 rounded-[2.5rem] p-8 glass-ultra bento-card">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <MixerVerticalIcon width={18} height={18} />
                            </div>
                            <h2 className="text-xl font-display font-black tracking-tight uppercase">Truth Stream</h2>
                        </div>
                        <button onClick={handleExport} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                            <DownloadIcon width={18} height={18} className="text-foreground/40" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activityLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                            ))
                        ) : activity?.length ? (
                            activity.slice(0, 5).map((item: any) => (
                                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-white/5 font-mono text-[10px] text-primary font-bold">
                                            TP
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold tracking-tight">{item.recipeName || 'Verification'}</div>
                                            <div className="text-[10px] font-mono text-foreground/30 flex items-center gap-2">
                                                <ClockIcon width={10} height={10} />
                                                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                            </div>
                                        </div>
                                    </div>
                                    <StatusBadge status="active" />
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <LayersIcon width={40} height={40} className="mx-auto mb-4 opacity-10" />
                                <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">Synchronizing Truth Data...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Node Status Grid (Row 2) */}
                <div className="col-span-12 lg:col-span-5 bg-card/40 border border-white/5 rounded-[2.5rem] p-8 glass-ultra bento-card">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <LayersIcon width={18} height={18} />
                            </div>
                            <h2 className="text-xl font-display font-black tracking-tight uppercase">My Sentinel Fleet</h2>
                        </div>
                        <Link href="/register-node" className="p-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform">
                            <PlusIcon width={18} height={18} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {nodesLoading ? (
                            <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                        ) : userNodes.length > 0 ? (
                            userNodes.slice(0, 4).map((node: any) => (
                                <div key={node.node_id} className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            node.status === 'ACTIVE' ? "bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-destructive shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                        )} />
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-widest leading-none mb-1">{node.node_type}</div>
                                            <div className="text-[10px] font-mono text-foreground/30 truncate max-w-[140px]">{node.node_id}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                                            {node.status === 'ACTIVE' ? 'Online' : 'Offline'}
                                        </div>
                                        <div className="text-[9px] font-medium text-foreground/40">
                                            {node.last_heartbeat ? formatDistanceToNow(new Date(node.last_heartbeat), { addSuffix: true }) : 'Never'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center">
                                <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">No Infrastructure Deployed</p>
                                <Link href="/register-node" className="text-[10px] font-black text-primary uppercase tracking-widest mt-2 block hover:underline">
                                    Initialize Node →
                                </Link>
                            </div>
                        )}
                    </div>

                    {userNodes.length > 4 && (
                        <Link href="/network" className="mt-6 block text-center text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] hover:text-primary transition-colors">
                            View All Nodes ({userNodes.length})
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
}
