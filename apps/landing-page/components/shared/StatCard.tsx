import { cn } from '../../lib/shared/utils';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import * as React from 'react';

export interface StatProps {
    label: string;
    value: React.ReactNode;
    trend?: number;
    trendLabel?: string;
    icon?: React.ElementType;
    loading?: boolean;
}

export function StatCard({ label, value, trend, trendLabel, icon: Icon, loading }: StatProps) {
    if (loading) {
        return (
            <div className="p-6 bg-card border border-border rounded-xl animate-pulse">
                <div className="h-4 w-24 bg-muted rounded mb-4" />
                <div className="h-8 w-32 bg-muted rounded" />
            </div>
        );
    }

    return (
        <div className="group relative p-6 bg-card border border-border rounded-xl transition-all duration-300 hover:border-primary/20">
            <div className="relative flex justify-between items-start mb-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                {Icon && <Icon size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />}
            </div>

            <div className="relative mb-2">
                <div className="text-2xl font-bold text-foreground font-mono tracking-tight">{value}</div>
            </div>

            {(trend !== undefined || trendLabel) && (
                <div className="relative flex items-center gap-2">
                    {trend !== undefined && (
                        <div className={cn(
                            "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
                            trend >= 0
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-rose-500/10 text-rose-500"
                        )}>
                            {trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                    {trendLabel && (
                        <span className="text-[10px] text-slate-500 font-medium">{trendLabel}</span>
                    )}
                </div>
            )}
        </div>
    );
}

export function StatusBadge({ status }: { status: 'active' | 'paused' | 'error' | 'pending' }) {
    const styles = {
        active: "bg-green-500/10 text-green-500 border-green-500/20",
        paused: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        error: "bg-red-500/10 text-red-500 border-red-500/20",
        pending: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border",
            styles[status] || styles.pending
        )}>
            {status}
        </span>
    );
}
