'use client';

import { StatCard, StatusBadge } from '../../components/shared/StatCard';
import { Activity as ActivityIcon, Users, Server, Globe, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useActivity, formatNumber } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { OutcomeDisplay } from '@/components/OutcomeDisplay';

export default function LiveTruthsPage() {
    const { activity, isLoading } = useActivity();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Live Truth Stream</h1>
                <p className="text-muted-foreground">Real-time verification events from the FTS protocol.</p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-32 bg-card border border-border rounded-xl animate-pulse" />
                    ))
                ) : activity?.length ? (
                    activity.map((item: any) => (
                        <div key={item.id} className="p-6 bg-card border border-border hover:border-primary/20 rounded-xl transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                        <ActivityIcon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                                {item.recipeName || 'Verification Event'}
                                            </h3>
                                            <StatusBadge status="active" />
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <span className="font-mono bg-muted px-2 py-0.5 rounded">ID: {item.recipeId}</span>
                                            <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                            {item.txHash && (
                                                <a href={`https://explorer.helioschainlabs.org/tx/${item.txHash}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-1">
                                                    TX: <span className="font-mono">{item.txHash.slice(0, 6)}...{item.txHash.slice(-4)}</span>
                                                </a>
                                            )}
                                        </div>

                                        <div className="bg-muted border border-border rounded-lg p-4 max-w-2xl">
                                            <OutcomeDisplay outcome={item.outcome} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 shrink-0">
                                    <button className="px-4 py-2 border border-border hover:bg-muted rounded-lg text-sm font-bold text-foreground transition-colors">
                                        Verify Proof
                                    </button>
                                    <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-lg text-sm font-bold transition-colors">
                                        View On-Chain
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-16 text-center border border-border rounded-xl bg-muted/50">
                        <ActivityIcon size={48} className="mx-auto text-muted-foreground/20 mb-6" />
                        <h3 className="text-xl text-foreground font-bold mb-2">Stream is Quiet</h3>
                        <p className="text-muted-foreground">Waiting for new verification events...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
