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
                <div className="grid md:grid-cols-2 gap-6 h-64 bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] animate-pulse" />
            ) : error ? (
                <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                    <p className="text-red-500 font-bold uppercase tracking-wider text-xs">Failed to load protocol configuration</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <TestnetFaucet
                        tokenAddress={config?.contracts.T_TOKEN as `0x${string}`}
                        symbol="T"
                        description="Fuel Station"
                    />
                    <TestnetFaucet
                        tokenAddress={config?.contracts.HLS_FAUCET as `0x${string}`}
                        symbol="HLS"
                        description="Native Gas"
                    />
                </div>
            )}

            <div className="p-8 bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] space-y-6">
                <h3 className="text-[12px] font-black text-foreground/40 uppercase tracking-[0.3em] flex items-center gap-3">
                    <InfoCircledIcon width={16} height={16} className="text-primary" />
                    Protocol Rules
                </h3>

                <div className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">1</div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-wider mb-1">Daily Allowance</p>
                            <p className="text-[10px] text-foreground/40 font-bold uppercase leading-relaxed">
                                Each address can claim tokens once every 24 hours to prevent network spam.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">2</div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-wider mb-1">Gas Required</p>
                            <p className="text-[10px] text-foreground/40 font-bold uppercase leading-relaxed">
                                You must have a small amount of native HELIOS to pay for the claim transaction.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">3</div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-wider mb-1">Staking only</p>
                            <p className="text-[10px] text-foreground/40 font-bold uppercase leading-relaxed">
                                These tokens have no value and are strictly for testing node staking on TaaS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
