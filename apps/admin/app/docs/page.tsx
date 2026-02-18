"use client";

import {
    Book,
    Terminal,
    ShieldAlert,
    Coins,
    Zap,
    Network,
    Server,
    Cpu,
    ArrowLeft,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'overview', title: 'Protocol Overview', icon: Book, external: false },
        { id: 'custom-data', title: 'Custom Data Feeds', icon: Cpu, external: false }, // Keep as hybrid or link out? Keeping hybrid for now as it has nice UI
        { id: 'sentinel', title: 'Sentinel Guide', icon: Terminal, external: true, href: 'https://friehub.github.io/taas-core/nodes/truth-node' },
        { id: 'challenger', title: 'Challenger Guide', icon: ShieldAlert, external: true, href: 'https://friehub.github.io/taas-core/nodes/challenger-lite' },
        { id: 'contracts', title: 'Smart Contracts', icon: Coins, external: true, href: 'https://friehub.github.io/taas-core/protocol/contracts' },
        { id: 'recipes', title: 'Recipe System', icon: Network, external: true, href: 'https://friehub.github.io/taas-core/protocol/recipes' },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 animate-in fade-in duration-700">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
                <div>
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            section.external ? (
                                <a
                                    key={section.id}
                                    href={section.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                                >
                                    <section.icon size={18} className="group-hover:text-blue-400 transition-colors" />
                                    {section.title}
                                    <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ) : (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === section.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <section.icon size={18} />
                                    {section.title}
                                </button>
                            )
                        ))}
                    </nav>
                </div>

                <div className="glass p-5 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Zap size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">v5.0 Helios Alpha</span>
                    </div>
                    <p className="text-white/30 text-[11px] leading-relaxed">
                        TaaS is currently in battle-testing phase. All node operations on Helios contribute to Mainnet reputation.
                    </p>
                    <button className="w-full p-3 bg-white/5 hover:bg-white/10 text-white/60 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                        Join Discord <ExternalLink size={12} />
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 max-w-4xl">
                {activeSection === 'overview' && (
                    <article className="space-y-10">
                        <section className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tighter">The <span className="gradient-text">Pedigree</span> of Truth</h1>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                TaaS (Truth-as-a-Service) is not just an oracle; it's a verifiable pipeline that bridges reality and the blockchain.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-blue-500/20 transition-all group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <Cpu size={24} />
                                </div>
                                <h3 className="text-xl font-bold">ZK-VM Verification</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Every resolution runs in a RISC-V ZK-VM. This ensures the Sentinel produces a mathematical proof that it followed your logic, not just a reports a result.
                                </p>
                            </div>
                            <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-purple-500/20 transition-all group">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                                    <Network size={24} />
                                </div>
                                <h3 className="text-xl font-bold">AaaS Certificates</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Audit-as-a-Service provides an immutable CID for every resolution. One click allows anyone to audit the raw data, rationale, and source consensus.
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6 pt-10 border-t border-white/5">
                            <h2 className="text-2xl font-bold">How it Works</h2>
                            <div className="space-y-4">
                                {[
                                    { step: '1', title: 'Request', desc: 'A Smart Contract triggers TruthRequested on Helios.' },
                                    { step: '2', title: 'Sentinel Processing', desc: 'The Sentinel fetches multi-source data and runs it through its ZK-VM logic.' },
                                    { step: '3', title: 'AaaS Pinning', desc: 'The full audit trace is pinned to IPFS as a Truth Certificate.' },
                                    { step: '4', title: 'On-Chain Proposal', desc: 'The result + IPFS link are proposed to the Global Oracle.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 text-sm font-black text-white/20">
                                            {item.step}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white/80">{item.title}</h4>
                                            <p className="text-sm text-white/40">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </article>
                )}

                {activeSection === 'custom-data' && (
                    <article className="space-y-10">
                        <section className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tighter">Custom <span className="gradient-text">Data Feeds</span></h1>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                Beyond curated sources, TaaS allows the community to leverage any public JSON API for truth resolution.
                            </p>
                        </section>

                        <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                            <h3 className="text-xl font-bold">The Generic API Connector</h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Our `generic-api` source enables a "Bring Your Own Data" (BYOD) model. You can point the Oracle to any URL and specify which field to extract as the truth.
                            </p>

                            <div className="space-y-4 pt-4">
                                <h4 className="text-xs font-black uppercase text-white/20 tracking-widest">Example Verification Template</h4>
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-xs text-blue-400 overflow-x-auto">
                                    <pre>{`{
  "params": {
    "source": "generic-api",
    "url": "https://api.example.com/v1/result",
    "path": "final_outcome.index"
  }
}`}</pre>
                                </div>
                            </div>
                        </div>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold">Auditability</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Every custom request generates a Truth Certificate (AaaS) that includes the target URL and the raw JSON response captured at the time of resolution.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold">Universal Coverage</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    From obscure sports leagues to niche stock exchanges, if it has a JSON API, TaaS can resolve it while maintaining decentralization and verifiability.
                                </p>
                            </div>
                        </section>
                    </article>
                )}

                {activeSection === 'sentinel' && (
                    <article className="space-y-10">
                        <section className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tighter">Run a <span className="gradient-text">Sentinel</span></h1>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                Power the resolution of decentralized markets and earn protocol fees.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Server size={24} className="text-blue-500" />
                                Deployment (Node-in-a-Box)
                            </h2>
                            <div className="space-y-4">
                                <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                                    <h4 className="text-sm font-bold text-white/60 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Step 1: Prerequisites
                                    </h4>
                                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-blue-400">
                                        # Install Docker & Docker Compose<br />
                                        curl -sSL https://get.docker.com | sh
                                    </div>
                                </div>

                                <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                                    <h4 className="text-sm font-bold text-white/60 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Step 2: Configuration
                                    </h4>
                                    <p className="text-xs text-white/30">Copy .env.example to .env and fill in your private key and RPC URL.</p>
                                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-blue-400">
                                        NODE_MODE=sentinel<br />
                                        PRIVATE_KEY=0xyour_key_here<br />
                                        RPC_URL=https://testnet1.helioschainlabs.org/
                                    </div>
                                </div>

                                <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                                    <h4 className="text-sm font-bold text-white/60 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Step 3: Launch
                                    </h4>
                                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-blue-400">
                                        docker-compose up -d --build
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                )}

                {activeSection === 'challenger' && (
                    <article className="space-y-10">
                        <section className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tighter">Secure with <span className="gradient-text">Challengers</span></h1>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                Protect the protocol from bad actors and earn slashing rewards.
                            </p>
                        </section>

                        <div className="glass p-10 rounded-[40px] border border-yellow-500/10 bg-yellow-500/[0.02] space-y-6">
                            <h2 className="text-2xl font-bold text-yellow-500">Passive Defense Revenue</h2>
                            <p className="text-white/40 leading-relaxed">
                                Challenger nodes don't propose results. Instead, they re-verify every active proposal on the network. If they find a discrepancy, they submit a **Dispute**. If they win, the proposer's bond is slashed and given directly to the Challenger.
                            </p>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-600 font-bold text-sm">
                                To activate, simply set NODE_MODE=challenger in your Docker setup.
                            </div>
                        </div>
                    </article>
                )}

                {activeSection === 'staking' && (
                    <article className="space-y-10">
                        <section className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tighter">Staking & <span className="gradient-text">$T Token</span></h1>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                The economic backbone of the Truth Network.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Coins size={20} className="text-blue-500" />
                                    The $T Token
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    $T is the universal utility token for the TaaS ecosystem. It is used for paying resolution fees, providing node security bonds, and governance.
                                </p>
                                <ul className="space-y-3 text-sm font-bold text-white/60">
                                    <li className="flex items-center gap-3">
                                        <ChevronRight size={14} className="text-blue-500" />
                                        Pay for Truth Requests
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <ChevronRight size={14} className="text-blue-500" />
                                        Staking for Node Admission
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <ChevronRight size={14} className="text-blue-500" />
                                        Protocol Governance Voting
                                    </li>
                                </ul>
                            </div>

                            <div className="glass p-8 rounded-[40px] border border-blue-500/20 bg-blue-500/[0.03] space-y-6">
                                <h3 className="text-xl font-bold">Bonding Mechanics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-white/30 uppercase tracking-widest font-bold">Min Bond</span>
                                        <span className="text-2xl font-black italic">1,000 $T</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                                    </div>
                                    <p className="text-[11px] text-white/30 leading-relaxed italic">
                                        * Bonds are locked for the duration of the liveness window (2 hours on Helios). Once finalized, the bond + node tip is released back to your wallet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                )}
            </main>
        </div>
    );
}
