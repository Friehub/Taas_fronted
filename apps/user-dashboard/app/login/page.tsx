'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, Wallet, ArrowRight, Loader2, Info } from 'lucide-react';
import { useAccount, useSignMessage, useConnect, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { injected } from 'wagmi/connectors';

export default function LoginPage() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // Redirection if already authenticated (simple check for token)
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('friehub_auth_token')) {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async () => {
        if (!isConnected) {
            connect({ connector: injected() });
            return;
        }

        try {
            setIsLoading(true);
            setIsVerifying(true);

            // 1. Get Nonce from Backend
            const nonceRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/siwe/nonce/${address}`);
            const { nonce } = await nonceRes.json();

            if (!nonce) throw new Error('Failed to get nonce');

            // 2. Prepare SIWE Message
            const domain = window.location.host;
            const origin = window.location.origin;
            const statement = 'Sign in to Friehub TaaS Dashboard to manage your truth attestation nodes and recipes.';
            const message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}\n\nURI: ${origin}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

            // 3. Sign Message
            const signature = await signMessageAsync({ message });

            // 4. Verify on Backend
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/siwe/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, message, signature }),
            });

            const data = await verifyRes.json();

            if (data.success && data.token) {
                localStorage.setItem('friehub_auth_token', data.token);
                localStorage.setItem('friehub_user', JSON.stringify(data.user));
                toast.success('Successfully authenticated');
                router.push('/');
            } else {
                throw new Error(data.error || 'Verification failed');
            }
        } catch (error: any) {
            console.error('Login Error:', error);
            toast.error(error.message || 'Failed to sign in');
        } finally {
            setIsLoading(false);
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Interior Grain Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <div className="relative z-10">
                        {/* Logo / Header */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                                <ShieldCheck className="text-primary-foreground w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Friehub TaaS</h1>
                            <p className="text-muted-foreground mt-2 text-center text-sm">
                                The high-fidelity truth attestation network.
                            </p>
                        </div>

                        {/* Info Callout */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 flex gap-3">
                            <Info className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-xs text-primary/80 leading-relaxed">
                                We use Sign-In with Ethereum (SIWE) for secure, non-custodial access. Your private keys never leave your wallet.
                            </p>
                        </div>

                        {/* Action Area */}
                        <div className="space-y-4">
                            {!isConnected ? (
                                <button
                                    onClick={() => connect({ connector: injected() })}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <Wallet size={20} />
                                    Connect Wallet
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-secondary/50 rounded-2xl border border-border flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            </div>
                                            <span className="text-sm font-mono text-foreground/80">
                                                {address?.slice(0, 6)}...{address?.slice(-4)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => disconnect()}
                                            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            Disconnect
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full py-4 bg-foreground text-background font-bold rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isLoading ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                <LogIn size={20} />
                                                <span>{isVerifying ? 'Verifying...' : 'Sign in to Dashboard'}</span>
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                            <span>Friehub v1.1.0</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                                <a href="#" className="hover:text-primary transition-colors">Security</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Hint */}
                <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold lg:hidden">
                    Optimized for Mobile Integrity
                </p>
            </motion.div>
        </div>
    );
}
