"use client";

import { motion } from 'framer-motion';
import { DownloadIcon, UploadIcon, ComponentInstanceIcon } from '@radix-ui/react-icons';

const MOCK_API_RESPONSE = `{
  "status": "success",
  "data": {
    "symbol": "BTC/USD",
    "price_raw": "94215.42",
    "timestamp": 1711739200
  }
}`;

const MOCK_PLUGIN_CODE = `import { SovereignAdapter, OutputSchema } from "@taas/plugin-sdk";
import { z } from "zod";

export class BinancePrice extends SovereignAdapter {
  // Define strict output boundaries
  outputSchema = z.object({
    price: z.number().positive(),
    lastUpdated: z.number()
  });

  async fetchData() {
    // 1. Safe Network Request
    const res = await this.client.get(
      "https://api.binance.com/v3/ticker/price?symbol=BTCUSDT"
    );

    // 2. Map and Convert
    return {
      price: parseFloat(res.data.price_raw),
      lastUpdated: res.data.timestamp
    };
  }
}`;

export function PluginPlayground() {
    return (
        <section className="py-32 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                        The Core Engine
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-[-0.04em] mb-8 leading-[0.9]">
                        The Prediction <span className="text-primary italic">Engine.</span>
                    </h2>
                    <p className="text-lg text-foreground/40 font-medium leading-relaxed">
                        No massive infrastructure overhead. Build a highly-secure Sovereign Adapter 
                        in TypeScript directly in your IDE, deploy to the gateway, and watch 
                        the threshold proofs roll in.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 bg-surface-low rounded-sm overflow-hidden p-4 shadow-2xl relative">
                    
                    {/* Visual Connector in the middle for large screens */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full items-center justify-center z-20">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <ComponentInstanceIcon className="text-primary w-5 h-5" />
                        </motion.div>
                    </div>

                    {/* Left Pane: The API Data */}
                    <div className="bg-[#0D0D0D] p-8 flex flex-col h-full min-h-[400px]">
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
                            <DownloadIcon className="text-foreground/40" />
                            <div className="flex-1 text-[11px] font-mono text-foreground/40 uppercase tracking-widest">
                                Raw HTTP Source
                            </div>
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>
                        <pre className="font-mono text-sm leading-loose text-primary/70 overflow-x-auto">
                            <code>{MOCK_API_RESPONSE}</code>
                        </pre>
                    </div>

                    {/* Right Pane: The Adapter */}
                    <div className="bg-[#050505] p-8 flex flex-col h-full relative group">
                        {/* Background glow indicating processing */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-primary/20 relative z-10">
                            <UploadIcon className="text-primary" />
                            <div className="flex-1 text-[11px] font-mono text-primary uppercase tracking-widest px-2">
                                TaaS Sovereign Adapter
                            </div>
                            <div className="text-[10px] font-mono text-primary/40 p-1 border border-primary/20 rounded bg-primary/5">
                                TS
                            </div>
                        </div>
                        <pre className="font-mono text-sm leading-loose text-white/70 overflow-x-auto relative z-10">
                            <code>
                                <span className="text-primary/60">import</span> {"{ SovereignAdapter, OutputSchema }"} <span className="text-primary/60">from</span> <span className="text-[#AAFFB8]">"@taas/plugin-sdk"</span>;{'\n'}
                                <span className="text-primary/60">import</span> {"{ z }"} <span className="text-primary/60">from</span> <span className="text-[#AAFFB8]">"zod"</span>;{'\n\n'}
                                
                                <span className="text-primary/60">export class</span> BinancePrice <span className="text-primary/60">extends</span> SovereignAdapter {"{"}{'\n'}
                                {'  '}<span className="text-foreground/30 italic">// Define strict output boundaries</span>{'\n'}
                                {'  '}outputSchema = z.object({"{"}{'\n'}
                                {'    '}price: z.number().positive(),{'\n'}
                                {'    '}lastUpdated: z.number(){'\n'}
                                {'  '}{"}"});{'\n\n'}
                                
                                {'  '}<span className="text-primary/60">async</span> fetchData() {"{"}{'\n'}
                                {'    '}<span className="text-foreground/30 italic">// 1. Safe Network Request</span>{'\n'}
                                {'    '}<span className="text-primary/60">const</span> res = <span className="text-primary/60">await this</span>.client.get({'\n'}
                                {'      '}<span className="text-[#AAFFB8]">"https://api.binance.com/v3/ticker/price?symbol=BTCUSDT"</span>{'\n'}
                                {'    '});{'\n\n'}
                                
                                {'    '}<span className="text-foreground/30 italic">// 2. Map and Convert</span>{'\n'}
                                {'    '}<span className="text-primary/60">return</span> {"{"}{'\n'}
                                {'      '}price: parseFloat(res.data.price_raw),{'\n'}
                                {'      '}lastUpdated: res.data.timestamp{'\n'}
                                {'    '}{"}"};{'\n'}
                                {'  '}{"}"}{'\n'}
                                {"}"}
                            </code>
                        </pre>
                    </div>

                </div>
            </div>
        </section>
    );
}
