'use client';

import { TestnetFaucet } from '@/components/TestnetFaucet';

export default function FaucetPage() {
    const tTokenAddress = process.env.NEXT_PUBLIC_TTRUTH_TOKEN_ADDRESS as `0x${string}`;
    const hlsFaucetAddress = process.env.NEXT_PUBLIC_HLS_FAUCET_ADDRESS as `0x${string}`;

    if (!tTokenAddress || !hlsFaucetAddress) {
        return (
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-xl text-red-400">
                <h2 className="font-bold text-lg mb-2">Configuration Error</h2>
                <p>Faucet addresses are missing from environment variables.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Developer Faucet</h1>
                <p className="text-muted-foreground">
                    Claim testnet tokens to build and verify on FTS.
                </p>
            </div>

            <div className="grid gap-6">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">T</div>
                        <h2 className="text-xl font-bold text-foreground">Truth Token ($T)</h2>
                    </div>
                    <TestnetFaucet tokenAddress={tTokenAddress} />
                </div>

                {/* HLS Faucet Section - Reusing component logic or custom implementation */}
                <div className="pt-6 border-t border-border">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">H</div>
                        <h2 className="text-xl font-bold text-foreground">Helios Gas (HLS)</h2>
                    </div>
                    {/* Reuse TestnetFaucet logic but point to HLS Faucet Contract */}
                    <TestnetFaucet tokenAddress={hlsFaucetAddress} />
                </div>
            </div>
        </div>
    );
}
