"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
    { text: "$ taas-gateway start --mode sovereign", delay: 0 },
    { text: "[INFO] Initializing TaaS Unified Capability Model...", delay: 800 },
    { text: "[INFO] Loaded 14 Active Plugins from /taas-plugins", delay: 1200 },
    { text: "[INFO] Vault initialized. Unlocking ethereum_key via KMS...", delay: 1800 },
    { text: "[INFO] Libp2p Swarm listening on /ip4/0.0.0.0/tcp/9000", delay: 2400 },
    { text: "[INFO] Connecting to Bootstrap Peers (2/2)", delay: 2800 },
    { text: "[WARN] Sentinel Network: Awaiting block finality...", delay: 3500 },
    { text: "[SUCCESS] Gateway Node online. EIP-712 signer attached.", color: "text-foreground", delay: 4200 },
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
        <div className="w-full max-w-2xl mx-auto md:mx-0 glass-premium rounded-2xl shadow-[0_30px_60px_-12px_rgba(47,174,156,0.15)] overflow-hidden font-mono text-[10px] sm:text-xs relative z-20 group flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-foreground/10 bg-foreground/5">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-[10px] text-foreground/30 tracking-widest uppercase font-bold">
                    taas-node-production
                </div>
                <div className="ml-auto flex items-center gap-4 text-[9px] text-foreground font-bold">
                    <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-foreground animate-pulse" /> 92ms</span>
                    <span className="opacity-20">|</span>
                    <span>v0.4.2-alpha</span>
                </div>
            </div>

            <div className="flex flex-1 min-h-[300px]">
                {/* Metrics Sidebar */}
                <div className="w-32 border-r border-foreground/5 bg-foreground/[0.02] p-4 flex flex-col gap-6 shrink-0">
                    <div className="space-y-1">
                        <div className="text-[8px] text-foreground/30 uppercase font-bold">CPU Load</div>
                        <div className="text-xs font-bold text-foreground">12.4%</div>
                        <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-foreground" animate={{ width: '12.4%' }} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[8px] text-foreground/30 uppercase font-bold">Memory</div>
                        <div className="text-xs font-bold text-foreground">420MB</div>
                        <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-foreground" animate={{ width: '30%' }} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[8px] text-foreground/30 uppercase font-bold">Peers</div>
                        <div className="text-xs font-bold text-foreground">14 Connected</div>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 flex-1 flex flex-col gap-2 overflow-y-auto bg-transparent relative">
                    {/* Data Flow CSS Line */}
                    <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-foreground/10 overflow-hidden">
                        <div className="w-full h-20 bg-gradient-to-b from-transparent via-foreground to-transparent animate-scan" />
                    </div>

                    {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex items-start ${line.color || "text-foreground/60"}`}
                        >
                            {line.text.startsWith("$") ? (
                                <span className="text-foreground mr-2 font-bold">~</span>
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
                            className="w-2 h-4 bg-foreground/40 mt-1"
                        />
                    )}
                </div>
            </div>
            
            {/* Subtle glow effect behind terminal */}
            <div className="absolute inset-0 max-w-full mx-auto -z-10 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000 bg-gradient-to-tr from-foreground/10 to-transparent pointer-events-none" />
        </div>
    );
}
