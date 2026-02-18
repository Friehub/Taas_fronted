"use client";

import { useState, useEffect } from 'react';
import {
    Activity,
    Zap,
    ShieldCheck,
    AlertTriangle,
    Clock,
    ExternalLink,
    Filter
} from 'lucide-react';

interface TruthEvent {
    id: string;
    type: 'REQUEST' | 'PROPOSAL' | 'CHALLENGE' | 'FINALIZED';
    text: string;
    time: string;
    proposer?: string;
    outcome?: any;
    status: 'pending' | 'verified' | 'disputed' | 'finalized';
}

export default function TruthStream() {
    const [events, setEvents] = useState<TruthEvent[]>([
        { id: '1', type: 'REQUEST', text: 'New proposal for eth-merge-status', time: '2m ago', status: 'pending' },
        { id: '2', type: 'FINALIZED', text: 'btc-price-daily resolved to 1', time: '5m ago', status: 'finalized', outcome: 1 },
        { id: '3', type: 'CHALLENGE', text: 'ChallengerBot verified 0x31a...', time: '12m ago', status: 'verified' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Mock updates
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const getTypeStyles = (type: TruthEvent['type']) => {
        switch (type) {
            case 'REQUEST': return { bg: 'bg-yellow-500/5', border: 'border-yellow-500/10', text: 'text-yellow-500', icon: Zap };
            case 'PROPOSAL': return { bg: 'bg-blue-500/5', border: 'border-blue-500/10', text: 'text-blue-500', icon: Activity };
            case 'CHALLENGE': return { bg: 'bg-purple-500/5', border: 'border-purple-500/10', text: 'text-purple-500', icon: ShieldCheck };
            case 'FINALIZED': return { bg: 'bg-green-500/5', border: 'border-green-500/10', text: 'text-green-500', icon: ShieldCheck };
            default: return { bg: 'bg-card', border: 'border-border', text: 'text-muted-foreground', icon: Clock };
        }
    };

    return (
        <div className="flex flex-col h-full space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/20">
                        <Activity size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-black text-xl tracking-tight uppercase text-foreground">Live <span className="gradient-text">Stream</span></h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Resolution Network</p>
                    </div>
                </div>
                <button className="p-3 bg-card rounded-2xl text-muted-foreground hover:text-foreground transition-all border border-border hover:bg-muted">
                    <Filter size={18} />
                </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide max-h-[700px]">
                {events.map((event) => {
                    const style = getTypeStyles(event.type);
                    const Icon = style.icon;

                    return (
                        <div key={event.id} className={`group relative p-6 rounded-[32px] border ${style.border} ${style.bg} transition-all duration-500 hover:translate-x-1 shadow-sm`}>
                            <div className="flex items-start justify-between">
                                <div className="flex gap-5">
                                    <div className={`p-3 rounded-2xl bg-background/50 ${style.text} border border-border`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${style.text}`}>{event.type}</span>
                                            <span className="text-[10px] text-muted-foreground italic">/ {event.time}</span>
                                        </div>
                                        <h4 className="font-bold text-foreground tracking-tight leading-snug">{event.text}</h4>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            {event.outcome !== undefined && (
                                                <div className="flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20">
                                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Result</span>
                                                    <span className="text-xs font-black text-primary">{event.outcome}</span>
                                                </div>
                                            )}

                                            {(event.status === 'verified' || event.status === 'finalized') && (
                                                <button className="flex items-center gap-2 px-3 py-1 bg-background/50 hover:bg-background border border-border rounded-full text-[9px] font-black text-muted-foreground hover:text-foreground uppercase tracking-widest transition-all">
                                                    <ShieldCheck size={12} className="text-primary" />
                                                    Audit Proof
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 text-muted-foreground group-hover:text-primary transition-all">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Network Health Dock */}
            <div className="p-6 glass-premium rounded-[32px] border border-border space-y-4 bg-card/30">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
                        <span className="text-muted-foreground">12 Sentinels Online</span>
                    </div>
                    <span className="text-muted-foreground">v.1.4.0</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[99.9%] shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                </div>
                <div className="flex gap-4 pt-2">
                    <AlertTriangle size={14} className="text-primary shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                        Dispute window active. ChallengerBots are currently monitoring 1,240 open proposals.
                    </p>
                </div>
            </div>
        </div>
    );
}
