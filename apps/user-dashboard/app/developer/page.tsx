'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Key, Shield, Zap, Info, Plus, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import useSWR from 'swr';
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
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <Key className="w-16 h-16 text-muted-foreground/20 mb-6" />
                <h2 className="text-2xl font-bold mb-2">Developer Authentication Required</h2>
                <p className="text-muted-foreground max-w-sm mb-8">
                    Connect your wallet to manage Subscriptions and API keys for the Truth-as-a-Service protocol.
                </p>
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold">
                    Connect Wallet
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Developer Hub</h1>
                <p className="text-muted-foreground">Manage your FTS subscriptions and secure API access.</p>
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
            <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    My Subscriptions
                </h2>

                {subscriptions.length === 0 ? (
                    <div className="p-12 border border-dashed border-border rounded-2xl bg-muted/30 text-center">
                        <p className="text-muted-foreground mb-4">You don't have any active subscriptions yet.</p>
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm">
                            Initialize Free Tier
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {subscriptions.map((sub: any) => (
                            <div key={sub.subscription_id} className="bg-card border border-border rounded-2xl overflow-hidden">
                                <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg">Subscription #{sub.subscription_id}</h3>
                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full">
                                                {sub.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Usage: {sub.quota_used.toLocaleString()} / {sub.quota_limit.toLocaleString()} calls
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleCreateKey(sub.subscription_id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Generate API Key
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Active API Keys</h4>

                                    {revealedKey && (
                                        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl animate-in zoom-in-95">
                                            <p className="text-[10px] font-bold text-primary uppercase mb-2">New Key Generated (Save this, it won't be shown again!)</p>
                                            <div className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border">
                                                <code className="text-sm font-mono flex-1">{revealedKey}</code>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(revealedKey);
                                                        setRevealedKey(null);
                                                    }}
                                                    className="p-2 hover:bg-muted rounded-md transition-colors text-primary"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {/* In a real app, you'd fetch keys separately, but for now we'll assume they are grouped or the sub data has them */}
                                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border/50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                                                    <Key className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold">Production Sentinel Key</div>
                                                    <div className="text-[10px] font-mono text-muted-foreground">fr_live_******************</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-[10px] text-muted-foreground mr-4">Used: 420 calls</div>
                                                <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                                                    <Trash2 className="w-4 h-4" />
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
            <div className="p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex gap-4">
                <Info className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-yellow-500 mb-1">Centralized Security Protocol</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Nodes must use their internal `Friehub-Subscription-Key` to route requests through the Sovereign Backend.
                        Requests using raw provider keys (FRED, SportMonks) will be rejected by the Guardian network to prevent quota exploitation.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ name, price, calls, features, active }: any) {
    return (
        <div className={`p-8 bg-card border rounded-2xl flex flex-col ${active ? 'border-primary ring-1 ring-primary/20' : 'border-border'}`}>
            <h3 className="font-bold text-xl mb-1">{name}</h3>
            <div className="text-3xl font-bold mb-1">{price}</div>
            <div className="text-xs text-muted-foreground mb-6">{calls} API Requests</div>

            <div className="space-y-3 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {f}
                    </div>
                ))}
            </div>

            <button className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all ${active ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-muted text-foreground hover:bg-muted/80'
                }`}>
                {active ? 'Manage Plan' : 'Choose Plan'}
            </button>
        </div>
    );
}
