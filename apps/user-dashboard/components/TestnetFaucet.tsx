import { useState, useEffect } from 'react';
import {
    LightningBoltIcon,
    UpdateIcon,
    CheckCircledIcon,
    ClockIcon,
    InfoCircledIcon,
    ReloadIcon,
    CheckIcon
} from '@radix-ui/react-icons';
import { useAccount, useChainId, useSwitchChain, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { heliosChain } from '@/lib/wagmi';
import { cn } from '@/lib/utils';

// ABI for TTruthToken faucet functions
const FAUCET_ABI = [
    {
        name: 'claimFromFaucet',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: []
    },
    {
        name: 'canClaimFaucet',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'bool' }]
    },
    {
        name: 'timeUntilNextClaim',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }]
    },
    {
        name: 'faucetAmount',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }]
    }
] as const;

interface FaucetProps {
    tokenAddress: `0x${string}`;
}

export function TestnetFaucet({ tokenAddress }: FaucetProps) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    const isCorrectChain = chainId === heliosChain.id;

    // Read faucet state
    const { data: canClaim, refetch: refetchCanClaim } = useReadContract({
        address: tokenAddress,
        abi: FAUCET_ABI,
        functionName: 'canClaimFaucet',
        args: address ? [address] : undefined,
    });

    const { data: timeUntilClaim, refetch: refetchTime } = useReadContract({
        address: tokenAddress,
        abi: FAUCET_ABI,
        functionName: 'timeUntilNextClaim',
        args: address ? [address] : undefined,
    });

    const { data: faucetAmount } = useReadContract({
        address: tokenAddress,
        abi: FAUCET_ABI,
        functionName: 'faucetAmount',
    });

    // Write function for claiming
    const { writeContract, data: hash, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    // Update countdown timer
    useEffect(() => {
        if (timeUntilClaim) {
            setTimeRemaining(Number(timeUntilClaim));

            const interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        refetchCanClaim();
                        refetchTime();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timeUntilClaim, refetchCanClaim, refetchTime]);

    // Refetch on success
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                refetchCanClaim();
                refetchTime();
            }, 2000);
        }
    }, [isSuccess, refetchCanClaim, refetchTime]);

    const handleClaim = () => {
        writeContract({
            address: tokenAddress,
            abi: FAUCET_ABI,
            functionName: 'claimFromFaucet',
        });
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        }
        return `${secs}s`;
    };

    if (!isConnected) {
        return (
            <div className="bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-8 text-center glass-premium transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <ReloadIcon width={24} height={24} className="animate-pulse" />
                </div>
                <div className="text-foreground font-black text-xs uppercase tracking-[0.2em] mb-2 uppercase">Identity Required</div>
                <div className="text-[11px] text-foreground/40 font-medium leading-relaxed">
                    Connect your wallet to claim testnet assets<br />and initialize your Sentinel node.
                </div>
            </div>
        );
    }

    if (!isCorrectChain) {
        return (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
                <div className="text-yellow-500 font-bold mb-2">Wrong Network</div>
                <p className="text-xs text-yellow-500/60 mb-4">
                    Please switch to the Helios Testnet to claim tokens.
                </p>
                <button
                    onClick={() => switchChain({ chainId: heliosChain.id })}
                    className="px-4 py-2 bg-yellow-500 text-black font-bold text-xs rounded-lg hover:bg-yellow-400 transition-colors"
                >
                    Switch to Helios
                </button>
            </div>
        );
    }

    const tokenAmount = faucetAmount ? Number(faucetAmount) / 1e18 : 1000;

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <LightningBoltIcon width={60} height={60} />
            </div>
            <div className="flex items-center justify-between mb-6 relative">
                <div>
                    <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-1">Fuel Station</h3>
                    <p className="text-[11px] text-primary font-black uppercase tracking-widest">{tokenAmount.toLocaleString()} $T / 24H</p>
                </div>
                <div className="px-2.5 py-1 bg-white/5 border border-white/10 text-foreground/40 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                    Testing Only
                </div>
            </div>

            {isSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                    <div className="text-sm font-semibold text-green-900">
                        Successfully claimed {tokenAmount.toLocaleString()} $T!
                    </div>
                </div>
            )}

            {canClaim ? (
                <button
                    onClick={handleClaim}
                    disabled={isPending || isConfirming}
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:scale-100 active:scale-95"
                >
                    {isPending || isConfirming ? (
                        <span className="flex items-center justify-center gap-2">
                            <UpdateIcon width={16} height={16} className="animate-spin" />
                            {isPending ? 'Signing...' : 'Confirming...'}
                        </span>
                    ) : (
                        `Claim ${tokenAmount.toLocaleString()} $T`
                    )}
                </button>
            ) : (
                <div className="text-center py-4 bg-white/5 border border-white/5 rounded-xl">
                    <div className="text-[9px] font-black text-foreground/30 mb-1 uppercase tracking-[0.2em]">Cooling Down</div>
                    <div className="text-lg font-display font-bold text-foreground tracking-tighter tabular-nums flex items-center justify-center gap-2">
                        <ClockIcon width={16} height={16} className="text-primary/40" />
                        {formatTime(timeRemaining)}
                    </div>
                </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="text-[9px] text-foreground/30 space-y-2 font-bold uppercase tracking-[0.1em]">
                    <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded hover:text-foreground/60 transition-colors">
                        <CheckIcon width={10} height={10} className="text-primary" /> Sentinel Staking Bond
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded hover:text-foreground/60 transition-colors">
                        <CheckIcon width={10} height={10} className="text-primary" /> Truth Dispute Fees
                    </div>
                </div>
            </div>
        </div>
    );
}
