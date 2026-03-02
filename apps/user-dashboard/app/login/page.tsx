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
        <div className="min-h-screen flex flex-col md:flex-row bg-[#050505] selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
            {/* Left Section: Branding & Vision */}
            <div className="hidden md:flex flex-1 relative flex-col justify-center px-12 lg:px-24 border-r border-white/5 overflow-hidden">
                {/* Premium Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <ComponentInstanceIcon width={24} height={24} className="text-primary" />
                        </div>
                        <span className="text-2xl font-display font-black tracking-tighter text-white">Friehub TaaS</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tighter mb-8 leading-[0.9] text-white">
                        THE TRUTH <br />
                        <span className="text-primary italic">STANDARD.</span>
                    </h1>

                    <div className="space-y-8 max-w-md">
                        <div className="flex items-center gap-5 group">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                                <LockClosedIcon width={20} height={20} className="text-white/40 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-[11px] font-black text-white/40 group-hover:text-white/60 uppercase tracking-[0.2em] transition-colors">Protocol Intelligence</h3>
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Non-custodial cryptographic access</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                                <LightningBoltIcon width={20} height={20} className="text-white/40 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-[11px] font-black text-white/40 group-hover:text-white/60 uppercase tracking-[0.2em] transition-colors">Real-time Attestation</h3>
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Instant execution of sovereign recipes</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
                        © 2026 Friehub Network • Protocol v1.4
                    </div>
                </motion.div>
            </div>

            {/* Right Section: Core Login */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                {/* Subtle Grid Pattern for Right Side */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Mobile Branding */}
                <div className="absolute top-8 left-8 flex items-center gap-3 md:hidden">
                    <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg">
                        <ComponentInstanceIcon width={16} height={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-display font-black tracking-tighter text-white">Friehub TaaS</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 w-full max-w-[420px]"
                >
                    {/* Glassmorphism Container */}
                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700" />

                        <div className="relative z-10">
                            <div className="mb-10">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
                                >
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Access Point</span>
                                </motion.div>
                                <h1 className="text-4xl font-display font-black tracking-tighter mb-3 text-white">
                                    ACCESS <span className="text-primary italic">TAAS</span>
                                </h1>
                                <p className="text-sm text-white/30 font-medium tracking-tight leading-relaxed">
                                    Sign in with your operator identity to begin node management and truth stream orchestration.
                                </p>
                            </div>

                            <div className="space-y-6">
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
                                                    <span className="block text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1.5">Operator</span>
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

                            <div className="mt-12 flex items-center justify-between text-[10px] font-bold text-white/10 uppercase tracking-[0.2em] border-t border-white/5 pt-8">
                                <div className="flex gap-6">
                                    <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                                </div>
                                <span className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    Operational
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
