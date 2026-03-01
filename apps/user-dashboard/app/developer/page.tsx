'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import {
    LockClosedIcon,
    ComponentInstanceIcon,
    LightningBoltIcon,
    InfoCircledIcon,
    PlusIcon,
    CopyIcon,
    TrashIcon,
    CheckCircledIcon,
    ReloadIcon
} from '@radix-ui/react-icons';
import useSWR from 'swr';
import { cn } from '@/lib/utils';
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DeveloperPage() {
    const { address, isConnected } = useAccount();
    const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

    // 1. Fetch Subscriptions
    const { data: subsData, mutate: mutateSubs } = useSWR(
        isConnected ? `${INDEXER_URL}/subscriptions?address=${address}` : null,
        fetcher
    );

    // 2. State for creating new key
    const [isCreating, setIsCreating] = useState(false);
    const [newKeyLabel, setNewKeyLabel] = useState('');
    const [revealedKey, setRevealedKey] = useState<string | null>(null);

    const subscriptions = subsData?.data || [];

    const handleCreateKey = async (subId: number) => {
        try {
            const response = await fetch(`${INDEXER_URL}/api-keys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscriptionId: subId,
                    label: newKeyLabel || 'Primary Key'
                })
            });
            const data = await response.json();
            if (data.success) {
                setRevealedKey(data.apiKey);
                mutateSubs();
            }
        } catch (err) {
            console.error('Failed to create key:', err);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 border border-white/5 backdrop-blur-md">
                    <LockClosedIcon width={32} height={32} className="text-primary/40" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-3 tracking-tight">Developer Access Required</h2>
                <p className="text-[11px] text-foreground/40 font-medium max-w-xs mb-8 uppercase tracking-[0.1em] leading-relaxed">
                    Connect your identity to manage protocol subscriptions and secure API access.
                </p>
                <button className="h-11 px-8 bg-primary text-primary-foreground rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Initialize Identity
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8">
            {/* Header */}
            <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-12 bg-primary/20 rounded-full hidden md:block" />
                <h1 className="text-4xl font-display font-black tracking-tighter mb-2">Developer Hub</h1>
                <p className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.2em]">Scale your truth infrastructure with high-fidelity APIs.</p>
            </div>

            {/* Subscription Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PricingCard
                    name="Free Tier"
                    price="0 HLS"
                    calls="1,000 / mo"
                    features={['Public Data Access', 'Community Support']}
                />
                <PricingCard
                    name="Pro Sentinel"
                    price="500 HLS"
                    calls="50,000 / mo"
                    active
                    features={['Premium Data Sources', 'Priority Support', 'Custom Recipes']}
                />
                <PricingCard
                    name="Enterprise"
                    price="Custom"
                    calls="Unlimited"
                    features={['Dedicated Instance', 'SLA Guarantee', 'Hybrid Cloud Support']}
                />
            </div>

            {/* Active Subscriptions & Keys */}
            <div className="space-y-8">
                <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] flex items-center gap-3">
                    <ComponentInstanceIcon width={14} height={14} className="text-primary" />
                    Protocol Subscriptions
                </h2>

                {subscriptions.length === 0 ? (
                    <div className="p-16 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm text-center">
                        <p className="text-[11px] font-bold text-foreground/30 mb-6 uppercase tracking-[0.1em]">No active subscriptions found in this epoch.</p>
                        <button className="h-10 px-6 bg-primary/10 text-primary border border-primary/20 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-primary/20 transition-all">
                            Provision Free Tier
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {subscriptions.map((sub: any) => (
                            <div key={sub.subscription_id} className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden group transition-all hover:border-primary/20">
                                <div className="p-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-display font-black text-xl tracking-tight">Vault #{sub.subscription_id}</h3>
                                            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                                {sub.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-[10px] font-mono text-foreground/40 font-bold uppercase tracking-widest">
                                                Quota: <span className="text-foreground">{sub.quota_used.toLocaleString()}</span> / {sub.quota_limit.toLocaleString()}
                                            </div>
                                            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(sub.quota_used / sub.quota_limit) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCreateKey(sub.subscription_id)}
                                        className="flex items-center gap-2 h-10 px-5 bg-primary text-primary-foreground rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
                                    >
                                        <PlusIcon width={12} height={12} />
                                        Generate Key
                                    </button>
                                </div>

                                <div className="p-8">
                                    <h4 className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-6">Credential Management</h4>

                                    {revealedKey && (
                                        <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-4">Temporary Key Disclosure — Action Required</p>
                                            <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                                                <code className="text-xs font-mono flex-1 text-primary tracking-tight">{revealedKey}</code>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(revealedKey);
                                                        setRevealedKey(null);
                                                    }}
                                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-primary"
                                                >
                                                    <CopyIcon width={16} height={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/key hover:border-white/10 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
                                                    <LockClosedIcon width={18} height={18} className="text-foreground/40 group-hover/key:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <div className="text-[11px] font-black uppercase tracking-widest">Main Production Key</div>
                                                    <div className="text-[10px] font-mono text-foreground/30 font-bold">fr_live_******************</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.1em] hidden md:block">420 Transactions</div>
                                                <button className="p-2 text-foreground/20 hover:text-rose-500 transition-colors">
                                                    <TrashIcon width={16} height={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* API Warning */}
            <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl flex gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <InfoCircledIcon width={80} height={80} />
                </div>
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <InfoCircledIcon width={24} height={24} className="text-amber-500" />
                </div>
                <div className="relative">
                    <h4 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2">Network Routing Protocol</h4>
                    <p className="text-[11px] text-foreground/40 font-medium leading-relaxed max-w-2xl">
                        Nodes must use their assigned <code className="text-primary font-mono bg-primary/5 px-1 pb-0.5 rounded">Friehub-Subscription-Key</code> to route requests through the Sovereign Backend.
                        Direct calls using raw provider keys (FRED, SportMonks) are strictly prohibited by the Guardian nodes to preserve network integrity.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ name, price, calls, features, active }: any) {
    return (
        <div className={cn(
            "p-8 bg-card/40 backdrop-blur-md border rounded-3xl flex flex-col transition-all duration-500 hover:scale-[1.02]",
            active ? "border-primary/40 shadow-2xl shadow-primary/5 scale-[1.05] z-10" : "border-white/5"
        )}>
            <div className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-4">{name}</div>
            <div className="text-3xl font-display font-black tracking-tighter mb-1">{price}</div>
            <div className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] mb-8">{calls} QUOTA</div>

            <div className="space-y-4 mb-10 flex-1">
                {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircledIcon width={14} height={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-[11px] text-foreground/60 font-medium leading-tight">{f}</span>
                    </div>
                ))}
            </div>

            <button className={cn(
                "w-full h-11 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                active
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-white/5 text-foreground hover:bg-white/10"
            )}>
                {active ? 'Manage Plan' : 'Provision Tier'}
            </button>
        </div>
    );
}
