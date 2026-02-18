'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { Hexagon, Link as LinkIcon, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

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
        <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Hexagon size={16} className="text-indigo-500" />
                    Sentinel Extension
                </h3>
                {isExtensionDetected ? (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-wide">
                        Detected
                    </span>
                ) : (
                    <span className="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded border border-rose-500/20 font-bold uppercase tracking-wide">
                        Not Found
                    </span>
                )}
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Connect browser extension to verify truth data locally.
            </p>

            {isLinked ? (
                <div className="space-y-4">
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-center gap-3">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <div>
                            <div className="text-xs font-bold text-white">Linked</div>
                            <div className="text-[10px] font-mono text-slate-500">{lastSyncedAddress?.slice(0, 10)}...</div>
                        </div>
                    </div>
                    <button
                        onClick={syncWallet}
                        className="w-full py-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={12} />
                        Update Key
                    </button>
                </div>
            ) : (
                <button
                    disabled={!isExtensionDetected || loading}
                    onClick={syncWallet}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wide rounded-lg transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <RefreshCw size={14} className="animate-spin" />
                    ) : (
                        <LinkIcon size={14} />
                    )}
                    {isExtensionDetected ? 'Sync Extension' : 'Install Extension'}
                </button>
            )}

            {!isExtensionDetected && (
                <p className="text-[10px] text-slate-600 mt-4 text-center">
                    Requires TaaS Sentinel Lite v2.4+
                </p>
            )}
        </div>
    );
}
