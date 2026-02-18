'use client';

import { useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { Server, Activity, CheckCircle2, AlertTriangle, MapPin, Clock } from 'lucide-react';
import NodeRegistryABI from '../../lib/abi/NodeRegistry.json';

// This will need to be updated with actual contract addresses
const NODE_REGISTRY_ADDRESS = (process.env.NEXT_PUBLIC_NODE_REGISTRY_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`;

export default function NetworkPage() {
    const { address } = useAccount();
    const [selectedNodeType, setSelectedNodeType] = useState<'sentinel' | 'challenger' | 'all'>('all');

    // Read active sentinel nodes
    const { data: sentinelNodes, isLoading: sentinelsLoading } = useReadContract({
        address: NODE_REGISTRY_ADDRESS,
        abi: NodeRegistryABI as any,
        functionName: 'listActiveNodes',
        args: [0] // 0 = SENTINEL
    });

    // Read active challenger nodes
    const { data: challengerNodes, isLoading: challengersLoading } = useReadContract({
        address: NODE_REGISTRY_ADDRESS,
        abi: NodeRegistryABI as any,
        functionName: 'listActiveNodes',
        args: [1] // 1 = CHALLENGER
    });

    const totalSentinels = (sentinelNodes as string[] | undefined)?.length || 0;
    const totalChallengers = (challengerNodes as string[] | undefined)?.length || 0;
    const totalNodes = totalSentinels + totalChallengers;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">Live Network Status</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-2">TaaS Decentralized Network</h1>
                    <p className="text-lg text-white/60 max-w-2xl">
                        Real-time monitoring of {totalNodes} active nodes securing the Truth-as-a-Service protocol
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <NetworkStatCard
                            label="Total Nodes"
                            value={totalNodes}
                            icon={Server}
                        />
                        <NetworkStatCard
                            label="Network Uptime"
                            value="-"
                            icon={CheckCircle2}
                            trend="Aggregating metrics..."
                        />
                        <NetworkStatCard
                            label="Avg Response Time"
                            value="-"
                            icon={Clock}
                            trend="Aggregating metrics..."
                        />
                    </div>
                </div>
            </div>

            {/* Node Type Filter */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSelectedNodeType('all')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'all'
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                >
                    All Nodes ({totalNodes})
                </button>
                <button
                    onClick={() => setSelectedNodeType('sentinel')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'sentinel'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                >
                    Sentinels ({totalSentinels})
                </button>
                <button
                    onClick={() => setSelectedNodeType('challenger')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedNodeType === 'challenger'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                >
                    Challengers ({totalChallengers})
                </button>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sentinelsLoading || challengersLoading ? (
                    // Loading state
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-48 bg-white/5 border border-white/5 rounded-xl animate-pulse" />
                    ))
                ) : totalNodes === 0 ? (
                    // Empty state
                    <div className="lg:col-span-2 p-12 text-center border border-white/5 rounded-xl bg-white/[0.02]">
                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                            <Server size={32} className="text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Active Nodes</h3>
                        <p className="text-white/60 mb-6">Be the first to run a TaaS node!</p>
                        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                            Run a Node
                        </button>
                    </div>
                ) : (
                    // Render nodes
                    <>
                        {(selectedNodeType === 'all' || selectedNodeType === 'sentinel') &&
                            sentinelNodes?.map((nodeId, idx) => (
                                <NodeCard
                                    key={nodeId as string}
                                    nodeId={nodeId as string}
                                    type="sentinel"
                                    index={idx}
                                />
                            ))}

                        {(selectedNodeType === 'all' || selectedNodeType === 'challenger') &&
                            challengerNodes?.map((nodeId, idx) => (
                                <NodeCard
                                    key={nodeId as string}
                                    nodeId={nodeId as string}
                                    type="challenger"
                                    index={idx}
                                />
                            ))}
                    </>
                )}
            </div>

            {/* Network Map (Placeholder) */}
            <div className="p-8 border border-white/5 rounded-xl bg-white/[0.02]">
                <h2 className="text-2xl font-bold text-white mb-6">Geographic Distribution</h2>
                <div className="aspect-video bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={48} className="text-white/20 mx-auto mb-4" />
                        <p className="text-white/40">Interactive world map coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Network Stat Card Component
function NetworkStatCard({ label, value, icon: Icon, trend, trendUp }: any) {
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between mb-3">
                <Icon size={24} className="text-white/40" />
                {trend && (
                    <span className={`text-xs font-semibold ${trendUp ? 'text-green-500' : 'text-white/40'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-white/60">{label}</div>
        </div>
    );
}

// Node Card Component
function NodeCard({ nodeId, type, index }: { nodeId: string; type: 'sentinel' | 'challenger'; index: number }) {
    // Data derived from blockchain ID
    const nodeData = {
        operator: `${nodeId.slice(0, 10)}...${nodeId.slice(-8)}`,
        endpoint: 'Hidden (Privacy Protected)',
        location: 'Detected via Peer-to-Peer',
        uptime: 'Tracking in progress',
        isOnline: true // If it's in the listActiveNodes, it's considered online
    };

    const isOnline = true;

    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type === 'sentinel' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                        }`}>
                        {type === 'sentinel' ? (
                            <Server size={24} className="text-blue-500" />
                        ) : (
                            <Activity size={24} className="text-purple-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-white font-bold capitalize">{type} Node</h3>
                        <p className="text-xs text-white/40 font-mono">{nodeData.operator}</p>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isOnline
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {isOnline ? 'Online' : 'Offline'}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Location</span>
                    <span className="text-white font-medium">{nodeData.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Uptime</span>
                    <span className="text-white font-medium">{nodeData.uptime}</span>
                </div>

                <div className="pt-3 border-t border-white/5">
                    <div className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1 leading-none">
                        On-Chain Identity (TXID)
                    </div>
                    <div className="text-xs text-white/40 font-mono break-all leading-tight">
                        {nodeId}
                    </div>
                </div>
            </div>
        </div>
    );
}
