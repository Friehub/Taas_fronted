'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LockClosedIcon,
    ComponentInstanceIcon,
    LightningBoltIcon,
    InfoCircledIcon,
    PlusIcon,
    CopyIcon,
    TrashIcon,
    CheckCircledIcon,
    ReloadIcon,
    EnterIcon,
    BackpackIcon,
    ArrowRightIcon
} from '@radix-ui/react-icons';
import { useAccount, useSignMessage, useConnect, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { injected } from 'wagmi/connectors';
import { cn } from '@/lib/utils';

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
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-6 border border-primary/20 shadow-2xl shadow-primary/5">
                                <ComponentInstanceIcon width={40} height={40} className="text-primary" />
                            </div>
                            <h1 className="text-4xl font-display font-black tracking-tighter text-foreground mb-1">Friehub TaaS</h1>
                            <p className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.3em] text-center">
                                High-Fidelity Truth Network
                            </p>
                        </div>

                        {/* Info Callout */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-10 flex gap-4">
                            <InfoCircledIcon className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-primary/60 font-medium leading-relaxed">
                                Friehub utilizes <span className="text-primary font-bold">SIWE</span> (Sign-In with Ethereum) for non-custodial protocol access. Your identity remains private and secure.
                            </p>
                        </div>

                        {/* Action Area */}
                        <div className="space-y-4">
                            {!isConnected ? (
                                <button
                                    onClick={() => connect({ connector: injected() })}
                                    className="w-full h-14 bg-white/5 border border-white/5 hover:bg-white/10 text-foreground font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-md active:scale-[0.98]"
                                >
                                    <BackpackIcon width={20} height={20} className="text-primary" />
                                    Initialize Identity
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between backdrop-blur-md">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            </div>
                                            <span className="text-xs font-mono font-bold text-foreground/60 tracking-tight">
                                                {address?.slice(0, 6)}...{address?.slice(-4)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => disconnect()}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/20 hover:text-rose-500 transition-colors"
                                        >
                                            Rotate
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full h-14 bg-primary text-primary-foreground font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group"
                                    >
                                        {isLoading ? (
                                            <ReloadIcon width={20} height={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                <EnterIcon width={20} height={20} />
                                                <span>{isVerifying ? 'Authenticating...' : 'Enter Dashboard'}</span>
                                                <ArrowRightIcon width={18} height={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">
                            <span>Protocol v1.4.0</span>
                            <div className="flex gap-6">
                                <a href="#" className="hover:text-primary transition-colors">Compliance</a>
                                <a href="#" className="hover:text-primary transition-colors">Manifesto</a>
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
