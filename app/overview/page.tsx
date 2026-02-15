'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStats, useActivity, formatNumber, formatCurrency } from '@/lib/api';
import { StatCard, StatusBadge } from '@/components/Stats';
import { Activity as ActivityIcon, Server, Database, TrendingUp, Clock } from 'lucide-react';
import { OutcomeDisplay } from '@/components/OutcomeDisplay';
import { ExtensionLink } from '@/components/ExtensionLink';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
    const { stats, isLoading: statsLoading } = useStats();
    const { activity, isLoading: activityLoading } = useActivity();
    const { isConnected } = useAccount();

    const statCards = [
        {
            label: 'Total Requests',
            value: stats ? formatNumber(stats.totalRequests || 0) : '-',
            icon: ActivityIcon,
            trend: 0
        },
        {
            label: 'Active Feeds',
            value: stats ? stats.activeFeeds || 0 : '-',
            icon: Database,
            trend: 0
        },
        {
            label: 'Total Staked',
            value: stats ? formatCurrency(stats.totalStaked || 0) : '-',
            icon: Server,
            trendLabel: 'All Nodes'
        },
        {
            label: 'Avg Latency',
            value: stats ? `${stats.avgLatency || 0}s` : '-',
            icon: Clock,
            trend: 0,
            trendLabel: 'Real-time'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <h2 className="text-xl font-bold text-white tracking-tight">Live Truth Stream</h2>
                        </div>
                        <Link href="/activity" className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {activityLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-24 bg-[#0A0A0A] border border-white/5 rounded-xl animate-pulse" />
                            ))
                        ) : activity?.length ? (
                            activity.map((item: any) => (
                                <div key={item.id} className="group p-4 bg-[#0A0A0A] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/40 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                                                <ActivityIcon size={18} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                                                    {item.recipeName || 'Unknown Recipe'}
                                                </h3>
                                                <div className="text-xs text-white/30 flex items-center gap-2">
                                                    <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                                    <span className="font-mono text-white/20">{item.txHash?.slice(0, 6)}...{item.txHash?.slice(-4)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <StatusBadge status="active" />
                                    </div>
                                    <div className="pl-14">
                                        <OutcomeDisplay outcome={item.outcome} compact={true} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center border border-white/5 rounded-xl bg-white/[0.02]">
                                <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                                    <ActivityIcon size={24} className="text-white/20" />
                                </div>
                                <h3 className="text-white font-bold mb-1">No Recent Activity</h3>
                                <p className="text-white/40 text-sm">Real-time verification events will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <ExtensionLink />

                    <div className="p-6 bg-gradient-to-br from-[#0A0A0A] to-[#111] border border-white/5 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4">Network Health</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-white/40">Consensus Reliability</span>
                                    <span className="text-green-500">99.9%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[99.9%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-white/40">Avg Dispute Rate</span>
                                    <span className="text-white">0.02%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[1%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isConnected ? (
                        <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-lg font-bold text-yellow-500 mb-2 relative">Developer Tools</h3>
                            <p className="text-sm text-yellow-100/60 mb-4 relative">
                                Need tokens for testing? Use the authenticated faucet to get free $T and HLS.
                            </p>
                            <Link href="/faucet">
                                <button className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg transition-colors relative shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                                    Open Faucet
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                            <h3 className="text-lg font-bold text-blue-400 mb-2 relative">Node Management</h3>
                            <p className="text-sm text-blue-400/60 mb-4 relative">
                                Connect your wallet to manage your nodes, register recipes, and claim rewards.
                            </p>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-lg transition-all relative">
                                Connect Wallet
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
