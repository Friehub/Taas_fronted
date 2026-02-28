"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOG_EVENTS = [
    { type: 'ATTEST', platform: 'BINANCE', asset: 'BTC_USDT', status: '[VERIFIED]' },
    { type: 'SIGNAL', platform: 'POLYMARKET', asset: 'US_ELECTION', status: '[MATCHED]' },
    { type: 'PUSH', platform: 'ETHEREUM', asset: 'TAAS_ORACLE', status: '[SUCCESS]' },
    { type: 'ATTEST', platform: 'COINBASE', asset: 'ETH_USDC', status: '[VERIFIED]' },
    { type: 'SIGNAL', platform: 'WEATHER', asset: 'NYC_TEMP', status: '[STAMPED]' },
    { type: 'RESOLVE', platform: 'MARKETS', asset: 'FED_RATES', status: '[FINALIZED]' },
];

export function ProtocolHUD() {
    const [logs, setLogs] = useState<{ id: number, text: string }[]>([]);

    useEffect(() => {
        let idCount = 0;
        const interval = setInterval(() => {
            const event = LOG_EVENTS[Math.floor(Math.random() * LOG_EVENTS.length)];
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const sig = Math.random().toString(16).substring(2, 6);

            const logText = `> ${event.type}: ${event.platform}::${event.asset} | SIG: 0x${sig} | ${event.status} | [${timestamp}]`;

            setLogs(prev => [...prev.slice(-4), { id: idCount++, text: logText }]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-32 right-12 md:top-40 md:right-24 z-20 pointer-events-none hidden md:block select-none">
            <div className="p-4 border border-primary/20 bg-background/40 backdrop-blur-md rounded-sm w-[380px] overflow-hidden">
                <div className="flex items-center gap-2 mb-3 border-b border-primary/10 pb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Sentinel Network :: Live Feed</span>
                </div>

                <div className="space-y-1.5 font-mono text-[8.5px] leading-tight">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-foreground/40 line-clamp-1 break-all"
                            >
                                {log.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Technical Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                    <div className="w-full h-[1px] bg-primary absolute top-1/2 -translate-y-1/2 animate-scan" />
                </div>
            </div>
        </div>
    );
}
