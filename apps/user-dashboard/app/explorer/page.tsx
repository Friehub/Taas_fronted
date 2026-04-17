"use client";

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { 
    GlobeIcon, 
    LightningBoltIcon, 
    ShadowIcon, 
    ShieldCheckIcon,
    MixerVerticalIcon,
    ClockIcon,
    ArrowRightIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

export default function ExplorerPage() {
    const { network } = useSelector((state: RootState) => state.dashboard);

    const stats = [
        { label: "Total Active Nodes", value: network.activeNodes.toLocaleString(), icon: GlobeIcon, trend: "+12%" },
        { label: "Network Uptime", value: `${network.uptime}%`, icon: ClockIcon, trend: "Stable" },
        { label: "Requests Processed", value: network.requestsProcessed, icon: LightningBoltIcon, trend: "+1.4M" },
        { label: "TVL (EigenLayer)", value: network.tvl, icon: ShieldCheckIcon, trend: "+4.3%" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-1000">
            {/* Header Area */}
            <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-primary tracking-widest">
                    <span>Network</span>
                    <span className="text-foreground/20">•</span>
                    <span>Explorer</span>
                </div>
                <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
                    Network Veracity Explorer
                </h1>
                <p className="text-sm text-foreground/40 font-medium">
                    Real-time monitoring of the Friehub decentralized oracle network. Verifying computational integrity across distributed nodes.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-onyx border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">{stat.label}</span>
                            <stat.icon className="w-5 h-5 text-primary/60" />
                        </div>
                        <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
                        <div className="flex items-center gap-2">
                             <div className="h-1 w-16 bg-primary/20 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-2/3" />
                             </div>
                             <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* Map Area */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8 relative overflow-hidden min-h-[500px]">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-lg font-display font-bold">Global Node Distribution</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-[10px] font-bold text-foreground/40 uppercase">Primary Hubs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                    <span className="text-[10px] font-bold text-foreground/40 uppercase">Edge Nodes</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* World Map Visual (Abstract) */}
                        <div className="absolute inset-x-0 bottom-0 top-32 flex items-center justify-center opacity-40">
                             <div className="relative w-full h-full p-12">
                                 <div className="absolute inset-0 bg-grid-mint opacity-10" />
                                 <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,230,118,0.8)] animate-pulse" />
                                 <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(0,230,118,0.6)] animate-pulse delay-75" />
                                 <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,230,118,0.8)] animate-pulse delay-150" />
                                 <div className="w-full h-full border border-white/5 rounded-full border-dashed animate-spin-slow opacity-20" />
                             </div>
                        </div>

                        <div className="absolute bottom-12 left-12 bg-onyx/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-w-[200px]">
                             <div className="text-[10px] uppercase font-bold text-primary mb-4 tracking-widest">Live Status</div>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-foreground/60">North America</span>
                                    <span className="text-xs font-mono font-bold">1,120</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-foreground/60">Europe</span>
                                    <span className="text-xs font-mono font-bold">845</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-foreground/60">Asia Pacific</span>
                                    <span className="text-xs font-mono font-bold">517</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Throughput Chart */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-display font-bold">Network Throughput</h3>
                                <p className="text-xs text-foreground/40 mt-1">TPS analysis across main cluster groups</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded">1H</button>
                                <button className="px-3 py-1 bg-white/5 text-foreground/40 text-[10px] font-bold rounded">24H</button>
                                <button className="px-3 py-1 bg-white/5 text-foreground/40 text-[10px] font-bold rounded">7D</button>
                            </div>
                        </div>
                        <div className="h-48 flex items-end gap-2">
                            {[40, 30, 60, 80, 50, 45, 70, 90, 100, 85, 75, 60].map((v, i) => (
                                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group overflow-hidden">
                                     <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${v}%` }}
                                        className="w-full bg-primary/60 group-hover:bg-primary transition-colors"
                                     />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Recent Oracle Proofs */}
                    <div className="bg-onyx border border-white/5 rounded-[32px] p-8">
                         <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-display font-bold uppercase tracking-tight">Recent Oracle Proofs</h3>
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         </div>
                         <div className="space-y-4">
                            {[
                                { id: "0x8d2d...51a0", type: "ETH/USD Feed", consensus: "24/24 NODES", time: "2s ago" },
                                { id: "0xc14a...a55b", type: "WeatherData Aggregator", consensus: "18/24 NODES", time: "18s ago" },
                                { id: "0x392b...fa2d", type: "E-commerce Inventory", consensus: "22/24 NODES", time: "43s ago" },
                                { id: "0x0001...6bd1", type: "Treasury Settlement", consensus: "24/24 NODES", time: "1m ago" },
                                { id: "0x3341...bb28", type: "Historical Query", consensus: "STAGE PROOF", time: "4m ago" }
                            ].map((proof, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-primary/40 transition-all cursor-pointer">
                                    <div className="flex justify-between text-[10px] font-bold mb-2">
                                        <span className="text-primary uppercase">Verified Proof</span>
                                        <span className="text-foreground/40">{proof.time}</span>
                                    </div>
                                    <div className="text-sm font-mono font-bold mb-1 truncate">{proof.id}</div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 mb-3">
                                        <ShadowIcon className="w-3 h-3" />
                                        {proof.type}
                                    </div>
                                    <div className="flex justify-between items-center bg-background rounded-lg p-2">
                                         <span className="text-[10px] font-bold text-foreground/40 uppercase">Consensus</span>
                                         <span className="text-[10px] font-mono font-bold text-primary">{proof.consensus}</span>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors mt-6">
                            View All Proofs
                         </button>
                    </div>

                    {/* Join Network CTA */}
                    <div className="bg-primary/10 border border-primary/20 rounded-[32px] p-8 relative overflow-hidden">
                         <div className="absolute -right-4 -bottom-4 opacity-10">
                             <GlobeIcon className="w-48 h-48" />
                         </div>
                         <div className="relative z-10">
                            <h3 className="text-2xl font-display font-bold mb-4">Join the Veracity Network</h3>
                            <p className="text-sm text-foreground/60 mb-8">
                                Stake EIGEN and run a Friehub Oracle Node to earn rewards while securing the future of decentralized data processing.
                            </p>
                            <div className="space-y-3">
                                <Link href="/register-node" className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                    Become an Operator
                                </Link>
                                <Link href="/docs" className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                                    Documentation
                                </Link>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
