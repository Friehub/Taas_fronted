import { cn } from './AppLayout';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StatProps {
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
            <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl animate-pulse">
                <div className="h-4 w-24 bg-white/5 rounded mb-4" />
                <div className="h-8 w-32 bg-white/5 rounded" />
            </div>
        );
    }

    return (
        <div className="group relative p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/20 transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[50px] transform translate-x-10 -translate-y-10 group-hover:bg-yellow-500/10 transition-colors" />

            <div className="relative flex justify-between items-start mb-4">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</div>
                {Icon && <Icon size={16} className="text-white/20 group-hover:text-yellow-500 transition-colors" />}
            </div>

            <div className="relative mb-2">
                <div className="text-3xl font-bold text-white font-display tracking-tight">{value}</div>
            </div>

            {(trend !== undefined || trendLabel) && (
                <div className="relative flex items-center gap-2">
                    {trend !== undefined && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded",
                            trend >= 0
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                        )}>
                            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                    {trendLabel && (
                        <span className="text-xs text-white/30 font-medium">{trendLabel}</span>
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
