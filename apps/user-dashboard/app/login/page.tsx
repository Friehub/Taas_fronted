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

            const nonceRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/siwe/nonce/${address}`);
            const { nonce } = await nonceRes.json();

            if (!nonce) throw new Error('Failed to get nonce');

            const domain = window.location.host;
            const origin = window.location.origin;
            const statement = 'Sign in to Friehub TaaS Dashboard to manage your truth attestation nodes and recipes.';
            const message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}\n\nURI: ${origin}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

            const signature = await signMessageAsync({ message });

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
        <div className="min-h-screen flex flex-col md:flex-row bg-background selection:bg-primary selection:text-primary-foreground">
            {/* Left Section: Branding (Professional Backdrop) */}
            <div className="hidden md:flex md:w-[45%] lg:w-[50%] bg-zinc-950 relative overflow-hidden items-center justify-center p-12 border-r border-white/5">
                {/* Visual Interest: Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/40 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-md text-center md:text-left"
                >
                    <div className="mb-12 inline-flex items-center gap-3 bg-white/5 p-3 pr-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
                            <ComponentInstanceIcon width={24} height={24} className="text-black" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] leading-none mb-1">Sentinel</span>
                            <span className="block text-lg font-display font-black text-white tracking-tighter leading-none">Friehub TaaS</span>
                        </div>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-display font-black text-white mb-6 tracking-tighter leading-[1.1]">
                        The Standard for <span className="text-primary italic">Decentralized</span> Truth.
                    </h2>

                    <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-10 max-w-sm">
                        Access the high-fidelity oracle layer for real-time truth attestation and secure data resolution.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                <LockClosedIcon className="text-white/40 group-hover:text-primary" />
                            </div>
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">EIP-712 Compliance</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                <LightningBoltIcon className="text-white/40 group-hover:text-primary" />
                            </div>
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Real-time Attestation</span>
                        </div>
                    </div>

                    <div className="mt-24 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                        © 2026 Friehub Network • Protocol v1.4
                    </div>
                </motion.div>
            </div>

            {/* Right Section: Core Login */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
                {/* Mobile Branding (only visible on small screens) */}
                <div className="absolute top-8 left-8 flex items-center gap-3 md:hidden">
                    <div className="w-8 h-8 bg-black flex items-center justify-center rounded-lg">
                        <ComponentInstanceIcon width={16} height={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-display font-black tracking-tighter">Friehub TaaS</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-[400px]"
                >
                    <div className="mb-10">
                        <h1 className="text-3xl font-display font-black tracking-tighter mb-2">Initialize Session</h1>
                        <p className="text-sm text-foreground/40 font-medium tracking-tight">Connect your secure operator identity to begin.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Status/Info Callout */}
                        <div className="p-5 rounded-2xl bg-muted/50 border border-border flex gap-4 transition-colors hover:bg-muted/80">
                            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                                <InfoCircledIcon className="text-foreground/40" />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] leading-none">Protocol Message</span>
                                <p className="text-[11px] text-foreground/50 font-medium leading-relaxed">
                                    Friehub utilizes <span className="text-foreground font-bold italic">SIWE</span> for non-custodial access. Your signature generates a local cryptographic session.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="space-y-3">
                            {!isConnected ? (
                                <button
                                    onClick={() => connect({ connector: injected() })}
                                    className="w-full h-14 bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-black text-[11px] uppercase tracking-[0.25em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-black/10 active:scale-[0.98]"
                                >
                                    <BackpackIcon width={20} height={20} className="text-primary" />
                                    Initialize Identity
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            </div>
                                            <div>
                                                <span className="block text-[9px] font-black text-foreground/30 uppercase tracking-widest leading-none mb-1">Active Wallet</span>
                                                <span className="text-xs font-mono font-bold tracking-tight">
                                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => disconnect()}
                                            className="text-[9px] font-black uppercase tracking-widest text-foreground/20 hover:text-rose-500 transition-colors p-2"
                                        >
                                            Disconnect
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full h-14 bg-primary text-primary-foreground font-black text-[11px] uppercase tracking-[0.25em] rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <div className="relative z-10 flex items-center gap-3">
                                            {isLoading ? (
                                                <ReloadIcon width={20} height={20} className="animate-spin" />
                                            ) : (
                                                <>
                                                    <EnterIcon width={20} height={20} />
                                                    <span>{isVerifying ? 'Verifying...' : 'Authorize Session'}</span>
                                                    <ArrowRightIcon width={18} height={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] border-t border-border pt-8">
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors">Support</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        </div>
                        <span>Status: Operational</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
