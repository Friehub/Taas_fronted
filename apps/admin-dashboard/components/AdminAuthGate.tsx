'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { ShieldAlert, ShieldCheck, Lock, LogOut } from 'lucide-react';
import axios from 'axios';

interface AdminAuthGateProps {
    children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { disconnect } = useDisconnect();

    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3002';

    useEffect(() => {
        // Check local storage for existing session
        const storedSession = localStorage.getItem(`admin_session_${address}`);
        if (storedSession) {
            const { timestamp } = JSON.parse(storedSession);
            // Session valid for 1 hour
            if (Date.now() - timestamp < 3600000) {
                setIsVerified(true);
            } else {
                localStorage.removeItem(`admin_session_${address}`);
            }
        }
        setIsLoading(false);
    }, [address]);

    const handleLogin = async () => {
        if (!address) return;

        setError(null);
        setIsLoading(true);

        try {
            const timestamp = Date.now();
            const message = `Login to Friehub Admin: ${timestamp}`;
            const signature = await signMessageAsync({ message });

            const response = await axios.post(`${API_URL}/verify-admin`, {
                address,
                message,
                signature
            });

            if (response.data.success) {
                setIsVerified(true);
                localStorage.setItem(`admin_session_${address}`, JSON.stringify({
                    verified: true,
                    timestamp
                }));
            } else {
                setError(response.data.error || 'Authorization failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Verification failed');
            console.error('Admin Login Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setIsVerified(false);
        localStorage.removeItem(`admin_session_${address}`);
        disconnect();
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card rounded-2xl border border-border/50 shadow-2xl">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Access Restricted</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    This is a Sovereign Operations layer. Please connect an authorized admin wallet to manage the protocol.
                </p>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-sm mb-8 max-w-sm">
                    <strong>Note:</strong> Only wallets whitelisted in the Sovereign Backend can pass the SIWE gate.
                </div>
            </div>
        );
    }

    if (!isVerified) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card rounded-2xl border border-border/50 shadow-2xl">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Identity Verification</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Connected as <code className="bg-muted px-2 py-1 rounded text-primary">{address?.substring(0, 6)}...{address?.substring(38)}</code>.
                    Please sign a message to prove ownership of this administrative identity.
                </p>

                {error && (
                    <div className="mb-6 px-4 py-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading ? 'Verifying...' : 'Sign Identity Message'}
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="absolute top-[-70px] right-0 flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Admin
                </div>
                <button
                    onClick={handleLogout}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
            {children}
        </div>
    );
};
