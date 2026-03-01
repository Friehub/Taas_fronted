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
        <div className="min-h-screen flex items-center justify-center bg-[#050505] selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-900/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[440px] p-8 md:p-12 mx-4"
            >
                {/* Glassmorphism Container */}
                <div className="absolute inset-0 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl" />

                <div className="relative z-20">
                    {/* Simplified Header */}
                    <div className="mb-12 text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                        >
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Protocol Access</span>
                        </motion.div>
                        <h1 className="text-5xl font-display font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                            ACCESS <span className="text-primary italic">TAAS</span>
                        </h1>
                        <p className="text-base text-white/40 font-medium tracking-tight px-4 leading-relaxed">
                            Friehub TaaS: The decentralized standard for real-time truth attestation.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Action Area */}
                        <div className="space-y-4">
                            {!isConnected ? (
                                <button
                                    onClick={() => connect({ connector: injected() })}
                                    className="w-full h-16 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                                >
                                    <BackpackIcon width={22} height={22} className="text-primary" />
                                    CONNECT WALLET
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between backdrop-blur-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            </div>
                                            <div>
                                                <span className="block text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1.5">Connected</span>
                                                <span className="text-sm font-mono font-bold text-white/80 tracking-tight">
                                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => disconnect()}
                                            className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-rose-500 transition-colors p-2"
                                        >
                                            Change
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full h-16 bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <div className="relative z-10 flex items-center gap-3">
                                            {isLoading ? (
                                                <ReloadIcon width={22} height={22} className="animate-spin" />
                                            ) : (
                                                <>
                                                    <EnterIcon width={22} height={22} />
                                                    <span>{isVerifying ? 'Verifying...' : 'SIGN IN'}</span>
                                                    <ArrowRightIcon width={20} height={20} className="group-hover:translate-x-1.5 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center">
                        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-8">
                            © 2026 Friehub Network • Protocol v1.4
                        </p>
                        <div className="flex items-center justify-center gap-8 text-[11px] font-bold text-white/20 uppercase tracking-[0.2em] border-t border-white/5 pt-8">
                            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                            <a href="#" className="hover:text-primary transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
