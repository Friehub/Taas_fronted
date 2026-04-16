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

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';

export default function DashboardPage() {
    const { operator } = useSelector((state: RootState) => state.dashboard);
    const { address, isConnected } = useAccount();

    const stats = [
        { label: "Node Health", value: `${operator.health}%`, icon: GlobeIcon, status: "Optimal Status", color: "text-primary" },
        { label: "Personal Uptime", value: operator.uptime, icon: ClockIcon, status: "30-day aggregate", color: "text-foreground" },
        { label: "Rewards", value: `${operator.rewards}`, icon: LightningBoltIcon, status: "TaaSTokens Earned", color: "text-foreground" },
        { label: "Success Rate", value: `${operator.successRate}%`, icon: ShieldCheckIcon, status: "No faults detected", color: "text-foreground" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-1000">
            {/* Header Area */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
                    Operator Dashboard
                </h1>
                <p className="text-sm text-foreground/40 font-medium">
                    System telemetry and node performance metrics for active oracle operator <span className="text-primary font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-onyx border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">{stat.label}</span>
                            <stat.icon className="w-5 h-5 text-primary/60" />
                        </div>
                        <div className={`text-3xl font-display font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{stat.status}</div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* Velocity Chart Area */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-lg font-display font-bold">Attestation Velocity</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg">LIVE</span>
                                <span className="px-3 py-1 bg-white/5 text-foreground/40 text-[10px] font-bold rounded-lg uppercase">24H</span>
                            </div>
                        </div>
                        {/* Custom SVG Bar Chart */}
                        <div className="h-64 flex items-end justify-between gap-1 overflow-hidden relative">
                            {operator.attestations.map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.02, duration: 1 }}
                                    className="flex-1 bg-primary/40 hover:bg-primary rounded-t-sm transition-colors relative group"
                                >
                                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[8px] font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {val}ms
                                     </div>
                                </motion.div>
                            ))}
                            {/* Grid Lines */}
                            <div className="absolute inset-x-0 bottom-0 border-b border-white/5 w-full h-full pointer-events-none flex flex-col justify-between opacity-50">
                                <div className="border-t border-white/5 w-full h-0" />
                                <div className="border-t border-white/5 w-full h-0" />
                                <div className="border-t border-white/5 w-full h-0" />
                            </div>
                        </div>
                    </div>

                    {/* Recent Events */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-display font-bold">Recent Events</h3>
                            <button className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">View Explorer</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "ETH/USD Feed Update", block: "#18,284,921", time: "1s ago", val: "$2,412.32", status: "VERIFIED" },
                                { name: "SOL/USD Feed Update", block: "#18,284,899", time: "14s ago", val: "$104.55", status: "VERIFIED" },
                                { name: "Weather Node Consensus", block: "#18,283,945", time: "3m ago", val: "12.5°C", status: "VERIFIED" }
                            ].map((event, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <GlobeIcon width={18} height={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">{event.name}</div>
                                            <div className="text-[10px] text-foreground/40 font-mono">{event.block} • {event.time}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-primary">{event.val}</div>
                                        <div className="text-[8px] font-bold text-primary/40 tracking-widest">{event.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Configuration Panel */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8">
                         <div className="flex items-center gap-2 mb-8">
                            <MixerVerticalIcon className="text-primary" />
                            <h3 className="text-lg font-display font-bold uppercase tracking-tight">Configuration</h3>
                         </div>
                         <div className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-foreground/40 mb-2 block">Network RPC</label>
                                <div className="bg-background border border-white/10 rounded-lg p-3 text-xs font-mono text-foreground/60 truncate">
                                    https://rpc.friehub.io/v1/mai...
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-foreground/40 mb-2 block">Signing Key ID</label>
                                <div className="bg-background border border-white/10 rounded-lg p-3 text-xs font-mono text-foreground/60 truncate">
                                    FRI-SK-TT4-ALPHA-01
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-foreground/40 mb-2 block">Plan</label>
                                <div className="flex items-center justify-between bg-background border border-white/10 rounded-lg p-3">
                                    <span className="text-sm font-bold">Standard Subscription</span>
                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">Active</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-4">
                                Edit Configuration
                            </button>
                         </div>
                    </div>

                    {/* Availability Map Small */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-grid-mint opacity-5" />
                         <div className="relative z-10">
                            <h3 className="text-[10px] uppercase font-bold text-foreground/40 mb-4">Global Availability</h3>
                            <div className="text-2xl font-display font-bold mb-2">99.9% Up</div>
                             {/* Small world map visual */}
                             <div className="h-32 w-full mt-4 flex items-center justify-center opacity-40">
                                <GlobeIcon className="w-16 h-16 animate-pulse text-primary" />
                             </div>
                         </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8">
                         <h3 className="text-[10px] uppercase font-bold text-foreground/40 mb-6 tracking-widest">System Resources</h3>
                         <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                                    <span>CPU Load</span>
                                    <span>24%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary/60 w-[24%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                                    <span>Memory</span>
                                    <span>4.2GB / 8GB</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary/60 w-[52%]" />
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
