'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { BoxIcon, LinkBreak2Icon, CheckCircledIcon, UpdateIcon, ReloadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

// Common development IDs and placeholders
const KNOWN_EXTENSION_IDS = [
    process.env.NEXT_PUBLIC_SENTINEL_EXTENSION_ID,
    "YOUR_LOCAL_EXTENSION_ID",
].filter(Boolean) as string[];

export function ExtensionLink() {
    const { address, isConnected } = useAccount();
    const [isExtensionDetected, setIsExtensionDetected] = useState(false);
    const [isLinked, setIsLinked] = useState(false);
    const [lastSyncedAddress, setLastSyncedAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Extension ID - in a real app, this would be a constant or fetched from config
    const extensionId = process.env.NEXT_PUBLIC_SENTINEL_EXTENSION_ID || "YOUR_EXTENSION_ID";

    useEffect(() => {
        const checkExtension = async () => {
            if (typeof window === 'undefined' || !(window as any).chrome?.runtime) return;

            // Try to ping the extension
            try {
                // Note: This requires EXTERNAL messaging permission in manifest.json
                (window as any).chrome.runtime.sendMessage(extensionId, { type: 'PING' }, (response: any) => {
                    if ((window as any).chrome.runtime.lastError) {
                        setIsExtensionDetected(false);
                    } else {
                        setIsExtensionDetected(true);
                    }
                });
            } catch (e) {
                setIsExtensionDetected(false);
            }
        };

        checkExtension();
    }, []);

    const syncWallet = async () => {
        if (!address || !(window as any).chrome?.runtime) return;
        setLoading(true);

        try {
            // Generate a 'Sentinel Key' (burner) specifically for this browser session
            // In a production app, we might store this in encrypted local storage
            const privateKey = generatePrivateKey();
            const account = privateKeyToAccount(privateKey);

            const payload = {
                address: account.address,
                privateKey: privateKey,
                linkedMainAccount: address
            };

            (window as any).chrome.runtime.sendMessage(extensionId, {
                type: 'SYNC_SENTINEL_WALLET',
                payload
            }, (response: any) => {
                setLoading(false);
                if (response?.success) {
                    setIsLinked(true);
                    setLastSyncedAddress(account.address);
                } else {
                    alert('Sync failed. Please ensure the extension is installed and allowed.');
                }
            });
        } catch (err) {
            setLoading(false);
            console.error('Sync Error:', err);
        }
    };

    if (!isConnected) return null;

    return (
        <div className="p-6 bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                    <BoxIcon width={14} height={14} className="text-primary/60" />
                    Sentinel Node Extension
                </h3>
                {isExtensionDetected ? (
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 font-black uppercase tracking-widest">
                        Detected
                    </span>
                ) : (
                    <span className="text-[9px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full border border-rose-500/20 font-black uppercase tracking-widest">
                        Offline
                    </span>
                )}
            </div>

            <p className="text-[11px] text-foreground/40 mb-6 leading-relaxed font-medium">
                Connect the browser extension to verify truth data locally and earn additional protocol incentives.
            </p>

            {isLinked ? (
                <div className="space-y-4">
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                        <CheckCircledIcon width={16} height={16} className="text-emerald-500" />
                        <div>
                            <div className="text-[10px] font-black text-foreground uppercase tracking-widest">Extension Linked</div>
                            <div className="text-[10px] font-mono text-foreground/30 font-bold">{lastSyncedAddress?.slice(0, 10)}...</div>
                        </div>
                    </div>
                    <button
                        onClick={syncWallet}
                        className="w-full py-2 text-[9px] uppercase tracking-[0.2em] font-black text-foreground/30 hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                        <UpdateIcon width={12} height={12} />
                        Rotate Session Key
                    </button>
                </div>
            ) : (
                <button
                    disabled={!isExtensionDetected || loading}
                    onClick={syncWallet}
                    className="w-full h-11 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <ReloadIcon width={14} height={14} className="animate-spin" />
                    ) : (
                        <LinkBreak2Icon width={14} height={14} />
                    )}
                    {isExtensionDetected ? 'Sync Session' : 'Download Sentinel v2'}
                </button>
            )}

            {!isExtensionDetected && (
                <p className="text-[9px] text-foreground/20 mt-4 text-center font-black uppercase tracking-[0.1em]">
                    Requires Sentinel Console v2.4+
                </p>
            )}
        </div>
    );
}
