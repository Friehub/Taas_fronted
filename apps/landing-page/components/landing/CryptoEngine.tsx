"use client";

import { motion } from 'framer-motion';
import { 
    LockClosedIcon, 
    CheckCircledIcon, 
    LayersIcon,
    ArrowRightIcon
} from '@radix-ui/react-icons';

export function CryptoEngine() {
    return (
        <section className="py-40 border-y border-border bg-muted/10 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    
                    {/* Left: Diagram */}
                    <div className="relative p-8 md:p-12 rounded-3xl bg-background border border-border shadow-2xl group flex flex-col gap-12">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-duration-1000 -z-10 rounded-3xl blur-2xl" />

                        {/* Step 1: JSON to Hash */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-muted/5 border border-border/50 flex flex-col items-center justify-center relative shadow-inner">
                                <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">{'{JSON}'}</span>
                                <span className="font-bold text-foreground">API</span>
                            </div>
                            <ArrowRightIcon className="text-primary/30" />
                            <div className="flex-1 p-4 rounded-xl border border-primary/20 bg-primary/5 font-mono text-xs text-primary/80 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-1 text-[8px] uppercase tracking-widest opacity-50 bg-primary/10">RFC 8785</div>
                                <span className="opacity-50 break-all leading-relaxed">
                                    0x2f3a...b71c (Canonical Hash)
                                </span>
                            </div>
                        </motion.div>

                        {/* Step 2: Protocol Signatures */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-muted/5 border border-border/50 flex flex-col items-center justify-center shrink-0">
                                <LayersIcon className="text-foreground/40 w-6 h-6" />
                            </div>
                            <ArrowRightIcon className="text-primary/30" />
                            <div className="flex-1 flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex-1 h-12 rounded-lg border border-primary/10 bg-primary/5 flex items-center justify-center gap-2 relative overflow-hidden group/sig">
                                        <LockClosedIcon className="w-3 h-3 text-primary/40" />
                                        <span className="text-[9px] font-mono text-primary/60">Sig_{i+1}</span>
                                        {/* Animation sweep */}
                                        <motion.div 
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                        />
                                    </div>
                                ))}
                                <div className="flex-1 h-12 rounded-lg border border-border/50 border-dashed flex items-center justify-center overflow-hidden">
                                     <span className="text-[10px] font-mono text-foreground/20">+13 more</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3: Threshold Aggregation & EIP-712 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl border border-[#AAFFB8]/30 bg-[#AAFFB8]/5 mt-4 relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircledIcon className="text-[#AAFFB8] w-5 h-5" />
                                    <span className="text-sm font-bold text-foreground">BLS Threshold Met (2/3)</span>
                                </div>
                                <span className="text-[10px] uppercase font-mono tracking-widest text-[#AAFFB8]">EIP-712 Valid</span>
                            </div>
                            
                            <div className="w-full bg-[#050505] rounded-xl border border-white/5 p-4 font-mono text-[10px] sm:text-xs text-[#AAFFB8] flex items-center justify-center break-all shadow-inner relative z-10">
                                0xdf84...<span className="text-white/20 px-2">(Aggregated Cryptographic Proof)</span>...9a2e
                            </div>

                            {/* Aggregation beam animation */}
                            <motion.div 
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#AAFFB8]/5 to-transparent -z-0 pointer-events-none"
                            />
                        </motion.div>
                    </div>

                    {/* Right: Copy */}
                    <div>
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary mb-10 border border-primary/20">
                            <LockClosedIcon width={24} height={24} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 text-foreground tracking-tighter">
                            Trust the <br />
                            <span className="text-primary italic">Math.</span>
                        </h2>
                        <p className="text-lg text-foreground/50 leading-relaxed mb-12 max-w-xl font-light">
                            TaaS Gateway doesn't just pass strings to a smart contract. It builds standard, provable truth payloads designed to survive aggressive Byzantine fault topologies.
                        </p>

                        <div className="space-y-8 mb-12">
                            <div className="flex gap-6 items-start">
                                <div className="mt-1 text-primary text-[10px] font-black tracking-widest">01</div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">RFC 8785 Serialization</h4>
                                    <p className="text-sm text-foreground/40 leading-relaxed font-light">Before signing, exact outputs are mapped into canonical JSON. Eliminating whitespace attacks and cross-language parsing mismatch.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="mt-1 text-primary text-[10px] font-black tracking-widest">02</div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">BLS Threshold Signatures</h4>
                                    <p className="text-sm text-foreground/40 leading-relaxed font-light">In Mesh mode, up to 31 nodes produce independent partial signatures. The P2P swarm aggregates them into a single, O(1) verifyizable payload, reducing on-chain gas costs by 95%.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="mt-1 text-primary text-[10px] font-black tracking-widest">03</div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">EIP-712 Compatibility</h4>
                                    <p className="text-sm text-foreground/40 leading-relaxed font-light">All data terminates in Ethereum's native typed data standard. Smart contracts effortlessly decode the exact origin and schema of the TruthPoint.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
