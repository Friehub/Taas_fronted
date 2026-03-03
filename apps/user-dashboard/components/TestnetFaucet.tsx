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
    symbol: string;
    description: string;
    isNative?: boolean;
    overrideAmount?: number;
}

export function TestnetFaucet({ tokenAddress, symbol, description, isNative, overrideAmount }: FaucetProps) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isCorrectChain = chainId === heliosChain.id;

    // Read faucet state (only for tokens with faucet logic)
    const { data: canClaim, isLoading: isLoadingCanClaim, refetch: refetchCanClaim } = useReadContract({
        address: tokenAddress,
        abi: FAUCET_ABI,
        functionName: 'canClaimFaucet',
        args: address ? [address] : undefined,
    });

    const { data: timeUntilClaim, isLoading: isLoadingTime, refetch: refetchTime } = useReadContract({
        address: tokenAddress,
        abi: FAUCET_ABI,
        functionName: 'timeUntilNextClaim',
        args: address ? [address] : undefined,
    });

    const { data: faucetAmount, isLoading: isLoadingAmount } = useReadContract({
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

        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    };

    // Hydration safety
    if (!mounted) return <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 h-[160px] animate-pulse" />;

    if (!isConnected) {
        return (
            <div className="bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-8 text-center glass-premium transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <ReloadIcon width={24} height={24} className="animate-pulse" />
                </div>
                <div className="text-foreground font-black text-xs uppercase tracking-[0.2em] mb-2 uppercase">Identity Required</div>
                <div className="text-[11px] text-foreground/40 font-medium leading-relaxed">
                    Connect your wallet to claim {symbol} assets<br />and initialize your Sentinel node.
                </div>
            </div>
        );
    }

    if (!isCorrectChain) {
        return (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
                <div className="text-yellow-500 font-bold mb-2">Wrong Network</div>
                <p className="text-xs text-yellow-500/60 mb-4">
                    Please switch to the Helios Testnet to claim {symbol}.
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

    const tokenAmount = overrideAmount !== undefined ? overrideAmount : (faucetAmount ? Number(faucetAmount) / 1e18 : 1000);

    const isLoading = isLoadingCanClaim || isLoadingTime || (overrideAmount === undefined && isLoadingAmount);

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 relative overflow-hidden group min-h-[160px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8 relative">
                <div>
                    <h3 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-1">{description}</h3>
                    <p className="text-xl font-display font-bold text-foreground tracking-tight">
                        {isLoading ? '...' : tokenAmount.toLocaleString()} ${symbol}
                    </p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    {isLoading || isPending || isConfirming ? (
                        <UpdateIcon width={20} height={20} className="animate-spin" />
                    ) : (
                        <LightningBoltIcon width={20} height={20} />
                    )}
                </div>
            </div>

            {isSuccess && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl animate-in zoom-in-95 duration-300">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest text-center">
                        Successfully claimed ${symbol}!
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse" />
            ) : canClaim ? (
                <button
                    onClick={handleClaim}
                    disabled={isPending || isConfirming}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-95"
                >
                    {isPending || isConfirming ? (
                        `Processing...`
                    ) : (
                        `Claim Tokens`
                    )}
                </button>
            ) : (
                <div className="text-center py-4 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="text-[9px] font-black text-foreground/20 mb-1 uppercase tracking-[0.2em]">Cooldown</div>
                    <div className="text-base font-mono font-bold text-foreground/60 tabular-nums">
                        {formatTime(timeRemaining)}
                    </div>
                </div>
            )}
        </div>
    );
}
