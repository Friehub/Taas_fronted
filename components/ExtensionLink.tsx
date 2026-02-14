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
        <div className="p-6 bg-gradient-to-br from-[#0A0A0A] to-[#111] border border-white/5 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Hexagon size={20} className="text-blue-400" />
                    Sentinel Extension
                </h3>
                {isExtensionDetected ? (
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">
                        Detected
                    </span>
                ) : (
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-500/20 font-bold uppercase">
                        Not Found
                    </span>
                )}
            </div>

            <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Connect your browser extension to act as a lightweight Sentinel node using your dashboard identity.
            </p>

            {isLinked ? (
                <div className="space-y-4">
                    <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <div>
                            <div className="text-xs font-bold text-white">Extension Linked</div>
                            <div className="text-[10px] font-mono text-white/40">{lastSyncedAddress?.slice(0, 10)}...</div>
                        </div>
                    </div>
                    <button
                        onClick={syncWallet}
                        className="w-full py-2.5 text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={14} />
                        Update Sentinel Key
                    </button>
                </div>
            ) : (
                <button
                    disabled={!isExtensionDetected || loading}
                    onClick={syncWallet}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <RefreshCw size={16} className="animate-spin" />
                    ) : (
                        <LinkIcon size={16} />
                    )}
                    {isExtensionDetected ? 'Sync with Extension' : 'Extension Required'}
                </button>
            )}

            {!isExtensionDetected && (
                <p className="text-[10px] text-white/30 mt-4 text-center italic">
                    Download the TaaS Sentinel Lite extension to get started.
                </p>
            )}
        </div>
    );
}
