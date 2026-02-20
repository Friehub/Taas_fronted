'use client';

import { useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { Server as LucideServer, Activity, CheckCircle2, AlertTriangle, MapPin, Clock, Ban, Shield } from 'lucide-react';
import useSWR from 'swr';
import { cn } from '@/lib/utils';
import Link from 'next/link';
const fetcher = (url: string) => fetch(url).then(res => res.json());

// This will need to be updated with actual contract addresses
const NODE_REGISTRY_ADDRESS = (process.env.NEXT_PUBLIC_NODE_REGISTRY_ADDRESS || '0x4189C7f984B0a62e333bD0cF508e43881Bd59744') as `0x${string}`;
const INDEXER_API_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

export default function NetworkPage() {
    const { address } = useAccount();
    const [selectedNodeType, setSelectedNodeType] = useState<'SENTINEL' | 'CHALLENGER' | 'all'>('all');

    // 1. Fetch Node List from Indexer (Sovereign Backend)
    const { data: nodesData, isLoading: nodesLoading } = useSWR(`${INDEXER_API_URL}/nodes`, fetcher, { refreshInterval: 10000 });

    // 2. Fetch Network Stats
    const { data: statsData, isLoading: statsLoading } = useSWR(`${INDEXER_API_URL}/stats`, fetcher, { refreshInterval: 30000 });

    const nodes = nodesData?.data || [];
    const stats = statsData?.data || {};

    const filteredNodes = nodes.filter((n: any) =>
        selectedNodeType === 'all' || n.node_type === selectedNodeType
    );

    const totalSentinels = nodes.filter((n: any) => n.node_type === 'SENTINEL').length;
    const totalChallengers = nodes.filter((n: any) => n.node_type === 'CHALLENGER').length;
    const totalNodes = nodes.length;

    const totalStaked = stats.total_staked ? `${(parseFloat(stats.total_staked) / 1e18).toLocaleString()} T` : '-';

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-border p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Network Status</span>
                    </div>

                    <h1 className="text-4xl font-bold text-foreground mb-2">FTS Decentralized Network</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Real-time monitoring of {totalNodes} active nodes securing the Friehub Truth Service protocol
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <NetworkStatCard
                            label="Nodes Registered"
                            value={totalNodes}
                            icon={LucideServer}
                        />
                        <NetworkStatCard
                            label="Collective Rep"
                            value="99.9%"
                            icon={CheckCircle2}
                            trend="High Stability"
                            trendUp={true}
                        />
                        <NetworkStatCard
                            label="Global Liquidity"
                            value={totalStaked}
                            icon={Shield}
                            trend="Total Staked"
                            trendUp={true}
                        />
                    </div>
                </div>
            </div>

            {/* Node Type Filter */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSelectedNodeType('all')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'all'
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                >
                    All Nodes ({totalNodes})
                </button>
                <button
                    onClick={() => setSelectedNodeType('SENTINEL')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'SENTINEL'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                >
                    Sentinels ({totalSentinels})
                </button>
                <button
                    onClick={() => setSelectedNodeType('CHALLENGER')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'CHALLENGER'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                >
                    Challengers ({totalChallengers})
                </button>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {nodesLoading ? (
                    // Loading state
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-48 bg-card border border-border rounded-xl animate-pulse" />
                    ))
                ) : filteredNodes.length === 0 ? (
                    // Empty state
                    <div className="lg:col-span-2 p-12 text-center border border-border rounded-xl bg-card/50">
                        <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                            <LucideServer size={32} className="text-muted-foreground/20" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No Active Nodes</h3>
                        <p className="text-muted-foreground mb-6">Be the first to run an FTS node!</p>
                        <Link href="/register-node">
                            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition">
                                Run a Node
                            </button>
                        </Link>
                    </div>
                ) : (
                    // Render nodes
                    filteredNodes.map((node: any) => (
                        <NodeCard
                            key={node.node_id}
                            node={node}
                        />
                    ))
                )}
            </div>

            {/* Network Map (Placeholder) */}
            <div className="p-8 border border-border rounded-xl bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">Geographic Distribution</h2>
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={48} className="text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-muted-foreground">Interactive world map coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Network Stat Card Component
function NetworkStatCard({ label, value, icon: Icon, trend, trendUp }: any) {
    return (
        <div className="p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-3">
                <Icon size={24} className="text-muted-foreground/40" />
                {trend && (
                    <span className={`text-xs font-semibold ${trendUp ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    );
}

// Node Card Component
function NodeCard({ node }: { node: any }) {
    const isOnline = node.status === 'ACTIVE';
    const isJailed = node.status === 'JAILED';
    const type = node.node_type.toLowerCase();

    return (
        <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type === 'sentinel' ? 'bg-primary/10' : 'bg-accent/10'
                        }`}>
                        {type === 'sentinel' ? (
                            <LucideServer size={24} className="text-primary" />
                        ) : (
                            <Activity size={24} className="text-accent" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-foreground font-bold capitalize">{type} Node</h3>
                        <p className="text-xs text-muted-foreground font-mono">{node.operator_address.slice(0, 10)}...{node.operator_address.slice(-8)}</p>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isOnline
                    ? 'bg-green-500/10 text-green-500'
                    : isJailed ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground'
                    }`}>
                    {isJailed ? <Ban size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                    {node.status}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Stake Amount</span>
                    <span className="text-white font-medium">{(parseFloat(node.stake_amount) / 1e18).toLocaleString()} T</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Last Heartbeat</span>
                    <span className="text-white font-medium">
                        {node.last_heartbeat ? new Date(node.last_heartbeat).toLocaleTimeString() : 'Never'}
                    </span>
                </div>

                {isJailed && (
                    <div className="p-2 bg-red-500/5 border border-red-500/10 rounded text-[10px] text-red-400">
                        <strong>Jail Reason:</strong> {node.jail_reason || 'Inactivity'}
                    </div>
                )}

                <div className="pt-3 border-t border-border focus:outline-none">
                    <div className="text-[10px] text-muted-foreground/40 uppercase font-bold tracking-widest mb-1 leading-none">
                        Node Identifier
                    </div>
                    <div className="text-xs text-muted-foreground/60 font-mono break-all leading-tight">
                        {node.node_id}
                    </div>
                </div>
            </div>
        </div>
    );
}

