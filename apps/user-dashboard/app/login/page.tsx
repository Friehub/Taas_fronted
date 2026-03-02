'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ComponentInstanceIcon,
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
            const statement = 'Sign in to Friehub TaaS.';
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
        <div className="min-h-screen flex flex-col md:flex-row bg-[#050505] selection:bg-primary/30 selection:text-primary relative overflow-hidden font-sans">
            {/* Left Section: Pure Branding */}
            <div className="hidden md:flex flex-1 relative flex-col justify-center px-12 lg:px-24 border-r border-white-[0.03] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-primary/5 rounded-full blur-[160px] animate-pulse" />
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-4 mb-16 opacity-40">
                        <ComponentInstanceIcon width={24} height={24} className="text-primary" />
                        <span className="text-xl font-display font-black tracking-tighter text-white">Friehub TaaS</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.85] text-white">
                        THE TRUTH <br />
                        <span className="text-primary italic opacity-80">STANDARD.</span>
                    </h1>
                </motion.div>
            </div>

            {/* Right Section: Focused Login */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative z-10 w-full max-w-[380px]"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-black tracking-tighter text-white mb-2">SIGN IN</h2>
                        <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full" />
                    </div>

                    <div className="space-y-6">
                        {!isConnected ? (
                            <button
                                onClick={() => connect({ connector: injected() })}
                                className="group relative w-full h-16 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-[0.98]"
                            >
                                <BackpackIcon width={20} height={20} className="text-primary transition-transform group-hover:scale-110" />
                                CONNECT WALLET
                            </button>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[11px] font-mono font-bold text-white/40 tracking-tight">
                                            {address?.slice(0, 6)}...{address?.slice(-4)}
                                        </span>
                                        <button
                                            onClick={() => disconnect()}
                                            className="ml-2 text-[9px] font-black uppercase tracking-widest text-white/10 hover:text-rose-500/50 transition-colors"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                    className="relative w-full h-16 bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.4em] rounded-2rem transition-all duration-500 hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative z-10 flex items-center gap-3">
                                        {isLoading ? (
                                            <ReloadIcon width={20} height={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                <span>{isVerifying ? 'Verifying' : 'ENTER'}</span>
                                                <ArrowRightIcon width={18} height={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
