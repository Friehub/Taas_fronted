'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseEther, formatEther, type Hex } from 'viem';
import useSWR from 'swr';
import { toast } from 'sonner';
import {
    BoxIcon,
    LightningBoltIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    ShadowIcon,
    PlusIcon,
    MinusIcon,
    ReloadIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import NodeRegistryABI from '@/lib/abi/NodeRegistry.json';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';
const NODE_REGISTRY_ADDRESS = (process.env.NEXT_PUBLIC_NODE_REGISTRY_ADDRESS || '0xbD3E6271db9f9F57A08B33bf5c57f042A1f777f4') as Hex;

export default function NetworkPage() {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    const { data: nodesData, mutate: refreshNodes, isLoading } = useSWR(
        isConnected ? `${INDEXER_URL}/nodes?operator=${address}` : null,
        fetcher
    );

    if (!publicClient) return null;

    const nodes = nodesData?.data || [];

    const handleStake = async (nodeId: string) => {
        if (!isConnected) return;
        setIsActionLoading(`stake-${nodeId}`);
        try {
            const hash = await writeContractAsync({
                address: NODE_REGISTRY_ADDRESS,
                abi: NodeRegistryABI as any,
                functionName: 'stake',
                args: [nodeId as Hex],
                value: parseEther('100') // Default staking increment
            });
            toast.promise(publicClient.waitForTransactionReceipt({ hash }), {
                loading: 'Staking $T...',
                success: () => {
                    refreshNodes();
                    return 'Successfully staked more $T';
                },
                error: 'Staking failed'
            });
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setIsActionLoading(null);
        }
    };

    const handleUnstake = async (nodeId: string) => {
        if (!isConnected) return;
        setIsActionLoading(`unstake-${nodeId}`);
        try {
            const hash = await writeContractAsync({
                address: NODE_REGISTRY_ADDRESS,
                abi: NodeRegistryABI as any,
                functionName: 'initiateUnstake',
                args: [nodeId as Hex]
            });
            toast.promise(publicClient.waitForTransactionReceipt({ hash }), {
                loading: 'Initiating unbonding...',
                success: () => {
                    refreshNodes();
                    return 'Unbonding initiated. Check cooldown.';
                },
                error: 'Unbonding failed'
            });
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setIsActionLoading(null);
        }
    };

    const handleWithdraw = async (nodeId: string) => {
        if (!isConnected) return;
        setIsActionLoading(`withdraw-${nodeId}`);
        try {
            const hash = await writeContractAsync({
                address: NODE_REGISTRY_ADDRESS,
                abi: NodeRegistryABI as any,
                functionName: 'withdrawStake',
                args: [nodeId as Hex]
            });
            toast.promise(publicClient.waitForTransactionReceipt({ hash }), {
                loading: 'Withdrawing stake...',
                success: () => {
                    refreshNodes();
                    return 'Stake successfully withdrawn to wallet';
                },
                error: 'Withdrawal failed'
            });
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setIsActionLoading(null);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                    <ExclamationTriangleIcon width={40} height={40} />
                </div>
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Wallet Not Connected</h2>
                    <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest mt-2">Please connect your wallet to manage your infrastructure</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Network Infrastructure</h1>
                    <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <BoxIcon className="text-primary" width={14} height={14} />
                        Node Management & Reputational Staking
                    </p>
                </div>
                <button
                    onClick={() => refreshNodes()}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary hover:border-primary/30 transition-all active:scale-95"
                >
                    <ReloadIcon className={cn("transition-transform group-hover:rotate-180 duration-500", isLoading && "animate-spin")} />
                    Refresh Status
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-48 bg-card/40 border border-white/5 rounded-3xl animate-pulse" />
                    ))
                ) : nodes.length > 0 ? (
                    nodes.map((node: any) => (
                        <div key={node.node_id} className="group relative bg-card/40 backdrop-blur-2xl border border-white/5 hover:border-primary/20 rounded-[2.5rem] transition-all duration-700 overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />

                            <div className="p-10 flex flex-col lg:flex-row gap-10 items-start lg:items-center relative z-10">
                                {/* Identity Block */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-2xl transition-all duration-500",
                                            node.status === 'ACTIVE'
                                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500/20 shadow-emerald-500/10"
                                                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                        )}>
                                            <ShadowIcon width={28} height={28} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-black text-foreground tracking-tight uppercase">{node.node_type}</h3>
                                                <div className={cn(
                                                    "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    node.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                                )}>
                                                    {node.status}
                                                </div>
                                            </div>
                                            <p className="text-xs font-mono text-foreground/40 mt-1 tabular-nums">{node.node_id}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 font-mono">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon width={14} height={14} />
                                            Last Pulse: {node.last_heartbeat ? formatDistanceToNow(new Date(node.last_heartbeat), { addSuffix: true }) : 'Never'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LightningBoltIcon width={14} height={14} />
                                            Registered: {formatDistanceToNow(new Date(node.registered_at))} ago
                                        </div>
                                    </div>
                                </div>

                                {/* Staking Stats */}
                                <div className="grid grid-cols-2 gap-8 px-10 border-x border-white/5">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Stake Amount</span>
                                        <div className="text-2xl font-black text-primary tabular-nums">
                                            {formatEther(BigInt(node.stake_amount || 0))} <span className="text-xs text-primary/40 font-bold">$T</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Reputation</span>
                                        <div className="text-2xl font-black text-foreground tabular-nums">
                                            {node.reputation || '100%'}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 shrink-0 min-w-[320px]">
                                    <button
                                        onClick={() => handleStake(node.node_id)}
                                        disabled={!!isActionLoading}
                                        className="flex-1 h-16 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isActionLoading === `stake-${node.node_id}` ? <ReloadIcon className="animate-spin" /> : <PlusIcon width={18} height={18} />}
                                        Stake $T
                                    </button>

                                    {node.unlock_time && BigInt(node.unlock_time) > 0n ? (
                                        <button
                                            onClick={() => handleWithdraw(node.node_id)}
                                            disabled={!!isActionLoading}
                                            className="flex-1 h-16 bg-white/5 border border-white/10 text-foreground/60 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                        >
                                            {isActionLoading === `withdraw-${node.node_id}` ? <ReloadIcon className="animate-spin" /> : <LightningBoltIcon width={18} height={18} />}
                                            Withdraw
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUnstake(node.node_id)}
                                            disabled={!!isActionLoading}
                                            className="flex-1 h-16 bg-white/5 border border-white/10 text-foreground/60 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center justify-center gap-3"
                                        >
                                            {isActionLoading === `unstake-${node.node_id}` ? <ReloadIcon className="animate-spin" /> : <MinusIcon width={18} height={18} />}
                                            Unbond
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Unbonding info footer if active */}
                            {node.unlock_time && BigInt(node.unlock_time) > 0n && (
                                <div className="px-10 py-4 bg-rose-500/10 border-t border-rose-500/20 flex items-center gap-3 text-rose-500">
                                    <ExclamationTriangleIcon width={16} height={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        Unbonding in progress: Unlocks {formatDistanceToNow(new Date(Number(node.unlock_time) * 1000), { addSuffix: true })}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-card/20 border-2 border-dashed border-white/5 rounded-[3rem] text-center space-y-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-foreground/10">
                            <BoxIcon width={32} height={32} />
                        </div>
                        <div>
                            <h3 className="text-foreground/40 text-lg font-black uppercase tracking-widest">No Infrastructure Found</h3>
                            <p className="text-foreground/20 text-[10px] font-bold uppercase tracking-widest mt-2 max-w-sm mx-auto">
                                You haven't registered any nodes on this network yet. Launch your first node to participate.
                            </p>
                        </div>
                        <Link href="/register-node" className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            Register Node
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
