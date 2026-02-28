"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOG_EVENTS = [
    { type: 'ATTEST', platform: 'BINANCE', asset: 'BTC_USDT', status: '[VERIFIED]', color: 'text-primary' },
    { type: 'SIGNAL', platform: 'POLYMARKET', asset: 'US_ELECTION', status: '[MATCHED]', color: 'text-primary/60' },
    { type: 'PUSH', platform: 'ETHEREUM', asset: 'TAAS_ORACLE', status: '[SUCCESS]', color: 'text-primary' },
    { type: 'ATTEST', platform: 'COINBASE', asset: 'ETH_USDC', status: '[VERIFIED]', color: 'text-primary/60' },
    { type: 'SIGNAL', platform: 'WEATHER', asset: 'NYC_TEMP', status: '[STAMPED]', color: 'text-primary/40' },
    { type: 'RESOLVE', platform: 'MARKETS', asset: 'FED_RATES', status: '[FINALIZED]', color: 'text-primary' },
];

export function ProtocolHUD() {
    const [logs, setLogs] = useState<{ id: number, text: string, color: string }[]>([]);

    useEffect(() => {
        let idCount = 0;
        const interval = setInterval(() => {
            const event = LOG_EVENTS[Math.floor(Math.random() * LOG_EVENTS.length)];
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

            const logText = `> ${event.type}: ${event.platform}::${event.asset} | [${timestamp}]`;

            setLogs(prev => [...prev.slice(-3), { id: idCount++, text: logText, color: event.color }]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-32 right-12 md:top-40 md:right-24 z-20 pointer-events-none hidden md:block select-none">
            <div className="p-4 border border-primary/20 bg-background/40 backdrop-blur-md rounded-sm w-[340px] overflow-hidden relative">
                <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Sentinel Network // 04</span>
                    </div>
                    <span className="text-[8px] font-mono text-primary/40">Uptime: 99.98%</span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-[8px] font-mono text-foreground/40 uppercase tracking-widest">
                        <span>Attestation Clarity</span>
                        <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ['80%', '95%', '85%'] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="h-full bg-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1 font-mono text-[8px] leading-tight">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -5 }}
                                className={`${log.color} line-clamp-1`}
                            >
                                {log.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-primary/20 animate-scan pointer-events-none" />
            </div>
        </div>
    );
}
