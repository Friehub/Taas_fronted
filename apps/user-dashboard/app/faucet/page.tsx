'use client';

import { TestnetFaucet } from '@/components/TestnetFaucet';
import { useConfig } from '@/lib/api';
import { LightningBoltIcon, InfoCircledIcon } from '@radix-ui/react-icons';

export default function FaucetPage() {
    const { config, isLoading, error } = useConfig();

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-2">
                <h1 className="text-3xl font-display font-black tracking-tight uppercase">Testnet Faucet</h1>
                <p className="text-foreground/40 text-sm font-bold uppercase tracking-widest">
                    Fuel your Sentinel node with Helios testnet assets
                </p>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6 h-48 bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl animate-pulse" />
            ) : error ? (
                <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                    <p className="text-red-500 font-bold uppercase tracking-wider text-xs">Failed to load protocol configuration</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <TestnetFaucet
                        tokenAddress={config?.contracts.T_TOKEN as `0x${string}`}
                        symbol="T"
                        description="Fuel Station"
                    />
                    <TestnetFaucet
                        tokenAddress={config?.contracts.HLS_FAUCET as `0x${string}`}
                        symbol="HLS"
                        description="Native Gas"
                        overrideAmount={0.1}
                    />
                </div>
            )}
        </div>
    );
}
