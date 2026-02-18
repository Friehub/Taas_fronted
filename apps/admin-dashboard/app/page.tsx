"use client";

import { StatCard, StatusBadge } from '../components/shared/StatCard';
import { Activity, Users, AlertTriangle, Shield, Clock, Server, ArrowUpRight, ArrowDownRight, Settings, Lock, Unlock, Search, Ban } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function AdminPage() {
    const API_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

    // 1. Fetch System Stats
    const { data: statsData, error: statsError } = useSWR(`${API_URL}/stats`, fetcher, { refreshInterval: 30000 });

    // 2. Fetch Node List
    const { data: nodesData, error: nodesError } = useSWR(`${API_URL}/nodes`, fetcher, { refreshInterval: 10000 });

    const [isPaused, setIsPaused] = useState(false);

    const stats = [
        {
            label: "Total Nodes",
            value: statsData?.data?.total_sources || "...",
            change: "+8%", // Mocking change for now
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Active Nodes",
            value: statsData?.data?.active_sources || "...",
            change: "Live",
            icon: Server,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            label: "System Health",
            value: statsData?.success ? "99.9%" : "OFFLINE",
            change: "Stable",
            icon: Activity,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            label: "Total Staked",
            value: statsData?.data?.total_staked ? `${(parseFloat(statsData.data.total_staked) / 1e18).toFixed(0)} T` : "...",
            change: "+$12k",
            icon: Shield,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
    ];

    const nodes = nodesData?.data || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Command Center</h1>
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-muted-foreground font-mono">Sovereign Operations Layer // v9.1</p>
                        <span className="text-slate-700">|</span>
                        <a
                            href="https://github.com/Friehub/taas-private/blob/main/docs/MANIFESTO.md"
                            target="_blank"
                            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                        >
                            View Master Manifesto v9.1
                        </a>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all border border-border">
                        <Settings size={14} />
                        Params
                    </button>
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all border ${isPaused
                            ? "bg-red-500 text-white border-red-600"
                            : "bg-muted text-foreground border-border hover:border-red-500/50 hover:text-red-500"
                            }`}
                    >
                        {isPaused ? <Unlock size={14} /> : <Lock size={14} />}
                        {isPaused ? "Resume Protocol" : "Emergency Pause"}
                    </button>
                </div>
            </div>

            {/* Stats Grid - Admin View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-5 rounded-xl hover:border-primary/20 transition-all group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            <stat.icon size={14} className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                        </div>
                        <div className="text-2xl font-bold text-foreground font-mono">{stat.value}</div>
                        <div className={`text-[10px] font-medium mt-1 ${stat.change.startsWith('+') || stat.change === 'Stable' || stat.change === 'Live' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Node Management - Table View */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Users size={16} className="text-indigo-500" />
                                Node Registry
                            </h3>
                            <div className="relative">
                                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search Node ID..."
                                    className="bg-background/40 text-foreground text-xs pl-8 pr-4 py-1.5 rounded-md border border-border focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="w-full text-left text-xs">
                            <div className="grid grid-cols-6 px-4 py-2 bg-muted text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
                                <div className="col-span-2">Node Identifier</div>
                                <div>Type</div>
                                <div>Status</div>
                                <div className="text-right">Stake</div>
                                <div className="text-right">Actions</div>
                            </div>

                            {nodes.length === 0 && (
                                <div className="p-8 text-center text-muted-foreground">
                                    No nodes found in registry.
                                </div>
                            )}

                            {nodes.map((node: any) => (
                                <div key={node.node_id} className="grid grid-cols-6 px-4 py-3 items-center border-b border-border last:border-0 hover:bg-muted transition-colors">
                                    <div className="col-span-2">
                                        <div className="font-bold text-foreground mb-0.5 truncate pr-4">{node.node_id}</div>
                                        <div className="font-mono text-muted-foreground/60 text-[10px] truncate pr-4">{node.operator_address}</div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold bg-muted-foreground/10 px-1.5 py-0.5 rounded text-muted-foreground">
                                            {node.node_type}
                                        </span>
                                    </div>
                                    <div>
                                        <span className={cn(
                                            "inline-block w-1.5 h-1.5 rounded-full mr-2",
                                            node.status === 'ACTIVE' ? "bg-emerald-500" : "bg-red-500"
                                        )} />
                                        <span className={node.status === 'ACTIVE' ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}>
                                            {node.status}
                                        </span>
                                    </div>
                                    <div className="text-right font-mono text-foreground font-medium">
                                        {(parseFloat(node.stake_amount) / 1e18).toLocaleString()} T
                                    </div>
                                    <div className="text-right">
                                        <button className="text-slate-500 hover:text-red-500 transition-colors">
                                            <Ban size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Logs - Terminal Style */}
                <div className="space-y-6">
                    <div className="bg-background border border-border rounded-xl p-4 h-full font-mono">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity size={12} />
                            Audit Log
                        </h3>
                        <div className="space-y-4 relative">
                            {/* Connector Line */}
                            <div className="absolute left-1.5 top-1 bottom-1 w-px bg-white/10" />

                            {[
                                { action: "Sovereign Layer Online", user: "Sys", time: "NOW", color: "text-green-500" },
                                { action: "SIWE Gate Enabled", user: "Admin", time: "5m", color: "text-blue-500" },
                                { action: "Health Monitor Active", user: "Sys", time: "8m", color: "text-emerald-500" },
                                { action: "Genesis Sync Complete", user: "Sys", time: "1h", color: "text-indigo-500" },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 relative text-xs">
                                    <div className={`w-3 h-3 rounded-full bg-black border border-white/20 flex-shrink-0 z-10`} />
                                    <div className="w-full">
                                        <div className="flex justify-between mb-0.5">
                                            <span className={`${log.color} font-bold`}>{log.action}</span>
                                            <span className="text-slate-600">{log.time}</span>
                                        </div>
                                        <div className="text-muted-foreground/60 text-[10px] mt-1">Source: {log.user}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility to merge classes
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
