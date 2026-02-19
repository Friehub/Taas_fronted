"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {
    Activity,
    ShieldCheck,
    RefreshCw,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ExternalLink,
    Key,
    Clock,
    Zap,
    MonitorIcon,
    TerminalSquare
} from 'lucide-react';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function InfrastructurePage() {
    const API_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

    // 1. Fetch Node/Feed Health
    const { data: healthData, error: healthError, mutate: refreshHealth } = useSWR(`${API_URL}/health`, fetcher, { refreshInterval: 10000 });
    const { data: feedsData, error: feedsError } = useSWR(`${API_URL}/gateway/feeds`, fetcher, { refreshInterval: 15000 });

    const [keyName, setKeyName] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [isRotating, setIsRotating] = useState(false);
    const [rotationResult, setRotationResult] = useState<{ success: boolean, message: string } | null>(null);

    const handleKeyRotation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyName || !keyValue) return;

        setIsRotating(true);
        setRotationResult(null);

        try {
            const resp = await axios.post(`${API_URL}/gateway/feeds/auth`, {
                keys: { [keyName]: keyValue }
            });
            setRotationResult({ success: true, message: `Successfully updated ${keyName}` });
            setKeyName('');
            setKeyValue('');
        } catch (err: any) {
            setRotationResult({ success: false, message: err.response?.data?.error || 'Failed to rotate key' });
        } finally {
            setIsRotating(false);
        }
    };

    const status = healthData?.status || 'OFFLINE';
    const components = healthData?.components || {};
    const feeds = feedsData?.feeds || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Infrastructure Management</h1>
                    <p className="text-sm text-muted-foreground font-mono">Sovereign Gateway Control // Cluster-A1</p>
                </div>
                <div className="flex gap-3">
                    <a
                        href={`${API_URL}/api-docs`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all border border-primary/20"
                    >
                        <ExternalLink size={14} />
                        API Explorer
                    </a>
                    <button
                        onClick={() => refreshHealth()}
                        className="px-4 py-2 bg-muted text-foreground hover:bg-muted/80 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all border border-border"
                    >
                        <RefreshCw size={14} className={healthData ? "" : "animate-spin"} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Overall Health Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border p-5 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Gateway Status</div>
                    <div className="flex items-center gap-3">
                        {status === 'healthy' ? (
                            <CheckCircle2 className="text-emerald-500" size={24} />
                        ) : status === 'degraded' ? (
                            <AlertCircle className="text-yellow-500" size={24} />
                        ) : (
                            <XCircle className="text-red-500" size={24} />
                        )}
                        <div>
                            <div className="text-xl font-bold uppercase">{status}</div>
                            <div className="text-[10px] text-muted-foreground">Uptime: {Math.floor((healthData?.uptime || 0) / 3600)}h {Math.floor(((healthData?.uptime || 0) % 3600) / 60)}m</div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Database Integrity</div>
                    <div className="flex items-center gap-3 text-emerald-500 font-bold">
                        <MonitorIcon size={24} />
                        <span className="text-xl uppercase">Active</span>
                    </div>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Cache (Redis)</div>
                    <div className="flex items-center gap-3">
                        <Zap className={components.cache?.healthy ? "text-primary" : "text-red-500"} size={24} />
                        <span className="text-xl font-bold uppercase">{components.cache?.healthy ? 'Connected' : 'Error'}</span>
                    </div>
                </div>
            </div>

            {/* Data Feeds & Key Rotation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Feed Status List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-card border border-border rounded-xl">
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Activity size={16} className="text-primary" />
                                Data Provider Health
                            </h3>
                            <span className="text-[10px] font-mono text-muted-foreground">Showing {feeds.length} Providers</span>
                        </div>
                        <div className="divide-y divide-border">
                            {feeds.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground text-xs italic">
                                    Loading provider states...
                                </div>
                            ) : (
                                feeds.map((feed: any) => (
                                    <div key={feed.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${feed.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                                            <div>
                                                <div className="text-sm font-bold text-foreground">{feed.name}</div>
                                                <div className="text-[10px] text-muted-foreground uppercase font-mono">{feed.id} // {feed.category}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 text-[10px] font-mono">
                                            <div className="flex flex-col items-end">
                                                <span className="text-slate-500">STATE</span>
                                                <span className={`font-bold ${feed.circuitBreaker.state === 'OPEN' ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {feed.circuitBreaker.state}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-slate-500">FAILURES</span>
                                                <span className="font-bold text-foreground">{feed.circuitBreaker.failures || 0}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-slate-500">LATENCY</span>
                                                <span className="font-bold text-primary">{feed.circuitBreaker.latency ? `${Math.round(feed.circuitBreaker.latency)}ms` : '---'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Key Rotation Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
                            <Key size={16} className="text-yellow-500" />
                            Master Key Rotation
                        </h3>
                        <form onSubmit={handleKeyRotation} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Key Name</label>
                                <select
                                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                                    value={keyName}
                                    onChange={(e) => setKeyName(e.target.value)}
                                >
                                    <option value="">Select a service...</option>
                                    <option value="SPORTMONKS_API_KEY">SportMonks API</option>
                                    <option value="OPENWEATHER_API_KEY">OpenWeather</option>
                                    <option value="FRED_API_KEY">FRED (Economics)</option>
                                    <option value="X_API_KEY">X (Twitter)</option>
                                    <option value="CMC_API_KEY">CoinMarketCap</option>
                                    <option value="BIRDEYE_API_KEY">Birdeye</option>
                                    <option value="THEODDSAPI_API_KEY">The Odds API</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Secret Value</label>
                                <input
                                    type="password"
                                    placeholder="Enter new master key..."
                                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-mono"
                                    value={keyValue}
                                    onChange={(e) => setKeyValue(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isRotating}
                                className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {isRotating ? <RefreshCw size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                                {isRotating ? 'Rotating...' : 'Rotate Master Key'}
                            </button>

                            {rotationResult && (
                                <div className={`p-3 rounded-lg text-[10px] font-bold ${rotationResult.success ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {rotationResult.message}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-[10px]">
                        <div className="flex items-center gap-2 mb-3 text-slate-500 border-b border-slate-800 pb-2">
                            <TerminalSquare size={12} />
                            SYSTEM_ADVISORY
                        </div>
                        <div className="space-y-2 text-slate-400">
                            <p className="text-emerald-500/80 underline decoration-emerald-500/20">NOTE:</p>
                            <p>Key rotation happens in-memory and will persist until service reboot. Ensure .env is updated for permanence.</p>
                            <div className="h-px bg-slate-800 my-2" />
                            <p className="text-yellow-500/80">WARNING:</p>
                            <p>Sovereign Gateway uses strict EIP-712 signing. Verification failures may occur if providers are unhealthy during multi-source rounds.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
