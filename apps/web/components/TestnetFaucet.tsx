/**
 * Testnet Faucet Component
 * Allows users to claim free $T tokens for testing
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import TokenABI from '@/lib/abi/TAASToken.json';

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
        abi: TokenABI as any,
        functionName: 'canClaimFaucet',
        args: address ? [address] : undefined,
    });

    const { data: timeUntilClaim, refetch: refetchTime } = useReadContract({
        address: tokenAddress,
        abi: TokenABI as any,
        functionName: 'timeUntilNextClaim',
        args: address ? [address] : undefined,
    });

    const { data: faucetAmount } = useReadContract({
        address: tokenAddress,
        abi: TokenABI as any,
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
            abi: TokenABI.abi,
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-blue-900 font-semibold mb-2">Connect Wallet to Use Faucet</div>
                <div className="text-sm text-blue-700">
                    Get free $T tokens for testnet
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
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-indigo-900">Testnet Faucet</h3>
                    <p className="text-sm text-indigo-700">Claim {tokenAmount.toLocaleString()} $T every 24 hours</p>
                </div>
                <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                    TESTNET ONLY
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending || isConfirming ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {isPending ? 'Confirm in wallet...' : 'Processing...'}
                        </span>
                    ) : (
                        `Claim ${tokenAmount.toLocaleString()} $T`
                    )}
                </button>
            ) : (
                <div className="text-center py-3">
                    <div className="text-sm text-indigo-700 mb-1">Next claim available in:</div>
                    <div className="text-2xl font-bold text-indigo-900">
                        {formatTime(timeRemaining)}
                    </div>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-indigo-200">
                <div className="text-xs text-indigo-600 space-y-1">
                    <div> Use $T for staking as Sentinel node</div>
                    <div> Use $T for challenging incorrect proposals</div>
                    <div> Faucet disabled on mainnet</div>
                </div>
            </div>
        </div>
    );
}
