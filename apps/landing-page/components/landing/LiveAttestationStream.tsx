"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Attestation {
    id: string;
    source: string;
    method: string;
    timestamp: string;
    status: 'pending' | 'signed' | 'aggregated';
}

const SOURCES = ['Binance API', 'CoinGecko', 'Chainlink Feeds', 'Uniswap V3', 'TheGraph', 'Etherscan'];
const METHODS = ['GET', 'POST', 'WSS'];

export function LiveAttestationStream() {
    const [attestations, setAttestations] = useState<Attestation[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            const newAtt: Attestation = {
                id: Math.random().toString(36).substr(2, 9),
                source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
                method: METHODS[Math.floor(Math.random() * METHODS.length)],
                timestamp: new Date().toLocaleTimeString(),
                status: 'pending'
            };

            setAttestations(prev => [newAtt, ...prev].slice(0, 6));

            // Simulate progression
            setTimeout(() => {
                setAttestations(prev => prev.map(a => a.id === newAtt.id ? { ...a, status: 'signed' } : a));
            }, 800);

            setTimeout(() => {
                setAttestations(prev => prev.map(a => a.id === newAtt.id ? { ...a, status: 'aggregated' } : a));
            }, 1600);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <div className="h-[400px]" />;

    return (
        <div className="flex flex-col gap-2 w-full max-w-[400px] pointer-events-none sm:pointer-events-auto">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Live Network Activity
                </span>
                <span className="text-[10px] text-foreground/30 font-mono">SEPOLIA-AVS-01</span>
            </div>

            <div className="space-y-2 relative">
                <AnimatePresence initial={false}>
                    {attestations.map((att) => (
                        <motion.div
                            key={att.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-3 rounded-xl border border-primary/10 bg-secondary/20 backdrop-blur-sm flex items-center justify-between group overflow-hidden relative"
                        >
                            {/* Inner progress line */}
                            <motion.div 
                                className="absolute bottom-0 left-0 h-[1px] bg-primary/30"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.6, ease: "linear" }}
                            />

                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                                    att.status === 'aggregated' ? 'bg-primary/20 text-primary' : 'bg-foreground/5 text-foreground/40'
                                } transition-colors duration-500`}>
                                    {att.method}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-foreground">{att.source}</span>
                                    <span className="text-[10px] text-foreground/30 font-mono">{att.id}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                                    att.status === 'aggregated' ? 'text-primary' : 'text-foreground/20'
                                }`}>
                                    {att.status}
                                </span>
                                <span className="text-[9px] text-foreground/20 italic">{att.timestamp}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
