'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient, useReadContract } from 'wagmi';
import { parseEther, formatEther, type Hex } from 'viem';
import useSWR from 'swr';
import { toast } from 'sonner';
import {
    BoxIcon,
    LightningBoltIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    ShadowIcon,
    MinusIcon,
    ReloadIcon,
    AvatarIcon,
    LockClosedIcon,
    PlusIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import NodeRegistryABI from '@/lib/abi/NodeRegistry.json';
import TAASTokenABI from '@/lib/abi/TAASToken.json';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';
const NODE_REGISTRY_ADDRESS = (process.env.NEXT_PUBLIC_NODE_REGISTRY_ADDRESS || '0xbD3E6271db9f9F57A08B33bf5c57f042A1f777f4') as Hex;
const T_TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_T_TOKEN_ADDRESS || '0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F') as Hex;

export default function NetworkPage() {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    // Read allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: T_TOKEN_ADDRESS,
        abi: TAASTokenABI as any,
        functionName: 'allowance',
        args: address ? [address, NODE_REGISTRY_ADDRESS] : undefined,
    });

    // Read $T Balance
    const { data: tBalance } = useReadContract({
        address: T_TOKEN_ADDRESS,
        abi: TAASTokenABI as any,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
    });

    const { data: nodesData, mutate: refreshNodes, isLoading } = useSWR(
        isConnected ? `${INDEXER_URL}/nodes?operator=${address}` : null,
        fetcher
    );

    if (!publicClient) return null;

    const nodes = nodesData?.data || [];

    const handleStake = async (nodeId: string) => {
        if (!isConnected || !publicClient) return;
        setIsActionLoading(`stake-${nodeId}`);
        const increment = parseEther('100');

        try {
            // 1. Check & Handle Allowance
            if (!allowance || (allowance as bigint) < increment) {
                toast.info('Approving $T tokens...');
                const approveHash = await writeContractAsync({
                    address: T_TOKEN_ADDRESS,
                    abi: TAASTokenABI as any,
                    functionName: 'approve',
                    args: [NODE_REGISTRY_ADDRESS, increment],
                });
                await publicClient.waitForTransactionReceipt({ hash: approveHash });
                await refetchAllowance();
            }

            // 2. Stake
            const hash = await writeContractAsync({
                address: NODE_REGISTRY_ADDRESS,
                abi: NodeRegistryABI as any,
                functionName: 'stake',
                args: [nodeId as Hex, increment]
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
                    <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase shrink-0">Network Infrastructure</h1>
                    <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <BoxIcon className="text-primary" width={14} height={14} />
                        Node Management & Reputational Staking
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    {tBalance !== undefined && (
                        <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-2xl">
                            <LockClosedIcon className="text-primary" width={16} height={16} />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">My $T Balance</span>
                                <span className="text-sm font-mono font-black text-primary">{parseFloat(formatEther(tBalance as bigint)).toLocaleString()} $T</span>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => refreshNodes()}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary hover:border-primary/30 transition-all active:scale-95"
                    >
                        <ReloadIcon className={cn("transition-transform group-hover:rotate-180 duration-500", isLoading && "animate-spin")} />
                        Refresh
                    </button>
                </div>
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
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-display font-black text-foreground tracking-tight uppercase">{node.node_type}</h3>
                                                <div className={cn(
                                                    "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    node.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                                )}>
                                                    {node.status}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-mono">
                                                <div className="flex items-center gap-1.5 text-foreground/60">
                                                    <AvatarIcon className="text-foreground/30" />
                                                    <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-foreground/30">Owner:</span>
                                                    {node.owner_address.slice(0, 6)}...{node.owner_address.slice(-4)}
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                                <div className="flex items-center gap-1.5 text-foreground/60">
                                                    <LockClosedIcon className="text-foreground/30" />
                                                    <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-foreground/30">Operator: </span>
                                                    {node.operator_address.slice(0, 6)}...{node.operator_address.slice(-4)}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-[10px] text-foreground/20 font-mono">Node ID: {node.node_id.slice(0, 16)}...</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6 mt-4 p-4 bg-black/20 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-foreground/40 font-mono">
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="text-primary/70" width={14} height={14} />
                                            Pulse: {node.last_heartbeat ? formatDistanceToNow(new Date(node.last_heartbeat), { addSuffix: true }) : 'Never'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LightningBoltIcon className="text-amber-500/70" width={14} height={14} />
                                            Uptime: {formatDistanceToNow(new Date(node.registered_at))}
                                        </div>
                                        {node.last_heartbeat && (
                                            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                                                ★ {Math.max(1, Math.floor((new Date(node.last_heartbeat).getTime() - new Date(node.registered_at).getTime()) / (8 * 60 * 1000)) + 1)} Heartbeats
                                            </div>
                                        )}
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
