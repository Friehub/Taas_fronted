"use client";

import { motion } from 'framer-motion';
import {
    TwitterLogoIcon,
    CopyIcon,
    CheckIcon,
    ComponentInstanceIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';

interface MembershipBadgeProps {
    email: string;
}

export function MembershipBadge({ email }: MembershipBadgeProps) {
    const [copied, setCopied] = useState(false);
    const proofId = `FRH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(proofId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareUrl = "https://friehub.com";
    const shareText = `Just attested to the @friehub waitlist. Proof ID: ${proofId}\n\nStandardizing Autonomous Truth. 🟢 #TaaS #Friehub`;
    const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto p-8 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm relative overflow-hidden group"
        >
            {/* Background Detail */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <ComponentInstanceIcon width={120} height={120} className="text-primaryRotate-12" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <CheckIcon width={20} height={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary">Attestation Confirmed</h4>
                        <p className="text-[10px] text-foreground/40 font-mono">{email}</p>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-background/50 border border-primary/10 rounded-sm font-mono text-[12px]">
                    <span className="text-foreground/40 block mb-1 uppercase text-[9px] tracking-widest">Protocol Proof ID</span>
                    <span className="text-foreground font-bold tracking-tighter">{proofId}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleCopy}
                        className="h-12 border border-primary/20 hover:bg-primary/10 rounded-sm flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="text-primary" /> Copied
                            </>
                        ) : (
                            <>
                                <CopyIcon /> Copy Proof
                            </>
                        )}
                    </button>

                    <a
                        href={xShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 bg-foreground text-background hover:opacity-90 rounded-sm flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        <TwitterLogoIcon /> Share to X
                    </a>
                </div>
            </div>

            {/* Technical Detail */}
            <div className="mt-6 pt-4 border-t border-primary/5 flex justify-between items-center opacity-30">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Sentinel-04 Verified</span>
                <span className="text-[8px] font-mono">STAMP::${new Date().getFullYear()}</span>
            </div>
        </motion.div>
    );
}
