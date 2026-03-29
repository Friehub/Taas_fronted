"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_SEQUENCE = [
    { text: "$ taas-gateway start --mode sovereign", delay: 0 },
    { text: "[INFO] Initializing TaaS Unified Capability Model...", delay: 800 },
    { text: "[INFO] Loaded 14 Active Plugins from /taas-plugins", delay: 1200 },
    { text: "[INFO] Vault initialized. Unlocking ethereum_key via KMS...", delay: 1800 },
    { text: "[INFO] Libp2p Swarm listening on /ip4/0.0.0.0/tcp/9000", delay: 2400 },
    { text: "[INFO] Connecting to Bootstrap Peers (2/2)", delay: 2800 },
    { text: "[WARN] Sentinel Network: Awaiting block finality...", delay: 3500 },
    { text: "[SUCCESS] Gateway Node online. EIP-712 signer attached.", color: "text-[#AAFFB8]", delay: 4200 },
    { text: "Listening for Truth Requests on Topic /taas/v1/attestations", delay: 4500 }
];

export function TerminalStartup() {
    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        
        // Start sequence after short initial delay
        const startDelay = setTimeout(() => {
            BOOT_SEQUENCE.forEach((line, index) => {
                const t = setTimeout(() => {
                    setVisibleLines(index + 1);
                }, line.delay);
                timeouts.push(t);
            });
        }, 500);

        return () => {
            clearTimeout(startDelay);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto md:mx-0 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm relative z-20 group">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white/30 tracking-widest uppercase">
                    taas-node-production
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[260px] md:h-[300px] flex flex-col gap-2 overflow-y-auto">
                {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-start ${line.color || "text-white/60"}`}
                    >
                        {line.text.startsWith("$") ? (
                            <span className="text-[#AAFFB8] mr-2">~</span>
                        ) : null}
                        <span className="leading-relaxed whitespace-pre-wrap flex-1">
                            {line.text}
                        </span>
                    </motion.div>
                ))}
                
                {/* Blinking Cursor */}
                {visibleLines > 0 && visibleLines < BOOT_SEQUENCE.length && (
                    <motion.div 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-2 h-4 bg-white/40 mt-1"
                    />
                )}
            </div>
            
            {/* Subtle glow effect behind terminal */}
            <div className="absolute inset-0 max-w-full mx-auto -z-10 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000 bg-gradient-to-tr from-primary/30 to-transparent pointer-events-none" />
        </div>
    );
}
