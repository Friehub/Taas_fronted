import { ArrowTopRightIcon, ArrowBottomRightIcon, ActivityLogIcon } from '@radix-ui/react-icons';
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
        <div className="group relative p-6 bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
            <div className="relative flex justify-between items-start mb-6">
                <div className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">{label}</div>
                {Icon && (
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                        <Icon width={14} height={14} />
                    </div>
                )}
            </div>

            <div className="relative mb-3">
                <div className="text-3xl font-display font-bold text-foreground tracking-tighter leading-none">{value}</div>
            </div>

            {(trend !== undefined || trendLabel) && (
                <div className="relative flex items-center gap-2">
                    {trend !== undefined && (
                        <div className={cn(
                            "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm",
                            trend >= 0
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        )}>
                            {trend >= 0 ? <ArrowTopRightIcon width={10} height={10} /> : <ArrowBottomRightIcon width={10} height={10} />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                    {trendLabel && (
                        <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">{trendLabel}</span>
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
