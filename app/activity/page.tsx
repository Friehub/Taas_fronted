'use client';

import { Activity as ActivityIcon } from 'lucide-react';
import { useActivity, formatNumber } from '@/lib/api';
import { OutcomeDisplay } from '@/components/OutcomeDisplay';
import { StatusBadge } from '@/components/Stats';
import { formatDistanceToNow } from 'date-fns';

export default function LiveTruthsPage() {
    const { activity, isLoading } = useActivity();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Live Truth Stream</h1>
                <p className="text-white/40">Real-time verification events from the TaaS protocol.</p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-32 bg-[#0A0A0A] border border-white/5 rounded-xl animate-pulse" />
                    ))
                ) : activity?.length ? (
                    activity.map((item: any) => (
                        <div key={item.id} className="p-6 bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-xl transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors shrink-0">
                                        <ActivityIcon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                                {item.recipeName || 'Verification Event'}
                                            </h3>
                                            <StatusBadge status="active" />
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                                            <span className="font-mono bg-white/5 px-2 py-0.5 rounded">ID: {item.recipeId}</span>
                                            <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                                            {item.txHash && (
                                                <a href={`https://explorer.helioschainlabs.org/tx/${item.txHash}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                                                    TX: <span className="font-mono">{item.txHash.slice(0, 6)}...{item.txHash.slice(-4)}</span>
                                                </a>
                                            )}
                                        </div>

                                        <div className="bg-white/5 border border-white/5 rounded-lg p-4 max-w-2xl">
                                            <OutcomeDisplay outcome={item.outcome} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 shrink-0">
                                    <button className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-sm font-bold text-white transition-colors">
                                        Verify Proof
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-sm font-bold transition-colors">
                                        View On-Chain
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-16 text-center border border-white/5 rounded-xl bg-white/[0.02]">
                        <ActivityIcon size={48} className="mx-auto text-white/10 mb-6" />
                        <h3 className="text-xl text-white font-bold mb-2">Stream is Quiet</h3>
                        <p className="text-white/40">Waiting for new verification events...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
