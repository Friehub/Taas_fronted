import React, { useState } from 'react';
import { Search, Filter, Shield, CheckCircle, Clock, AlertTriangle, FileText, ChevronRight, ExternalLink, ShieldCheck, RefreshCw, AlertCircle, FileSearch, User, Brain, Activity, CheckCircle2, Info, Database } from 'lucide-react';

interface AuditCertificate {
    requestId: string;
    version: string;
    timestamp: number;
    recipeId: string;
    outcome: string;
    trace: any[];
    rationale: string;
    sources: string[];
    consensus: {
        method: string;
        outliers: string[];
    };
    signature: string;
}

export default function AuditExplorer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [certificate, setCertificate] = useState<AuditCertificate | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        setLoading(true);
        setError(null);

        try {
            await new Promise(r => setTimeout(r, 1200));

            if (searchQuery.length > 5) {
                setCertificate({
                    requestId: searchQuery,
                    version: '1.0.0',
                    timestamp: Date.now() - 3600000,
                    recipeId: 'btc-price-aggregator',
                    outcome: '98,432.50',
                    trace: [
                        { id: 'fetch-1', type: 'fetch', status: 'SUCCESS', result: { price: 98432 }, params: { url: 'https://api.coingecko.com/v3/simple/price' }, duration: 420 },
                        { id: 'fetch-2', type: 'fetch', status: 'SUCCESS', result: { price: 98433 }, params: { url: 'https://min-api.cryptocompare.com/data/price' }, duration: 380 },
                        { id: 'reasoner-1', type: 'reasoner', status: 'SUCCESS', result: { explanation: 'Both high-volume sources agree on the price range. Slight variance within 0.01% threshold.' }, duration: 1500 },
                    ],
                    rationale: 'The winning outcome was determined by cross-referencing Tier-1 exchanges. AI analysis confirms no market manipulation was detected during the verification window.',
                    sources: ['CoinGecko', 'CryptoCompare', 'Binance Websocket'],
                    consensus: {
                        method: 'Weighted Median (Volume-adjusted)',
                        outliers: []
                    },
                    signature: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
                });
            } else {
                setError('Certificate not found. Please verify the Request ID or Transaction Hash.');
            }
        } catch (err) {
            setError('Failed to retrieve audit certificate.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* High-Performance Search Header */}
            <div className="glass-premium p-10 rounded-[48px] border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50" />
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em]">
                            <ShieldCheck size={16} className="glow-gold" />
                            Audit Intelligence
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Truth <span className="gradient-text">Explorer</span></h2>
                        <p className="text-xs text-white/30 max-w-sm font-medium leading-relaxed">Cryptographic proof-of-pedigree for TaaS network proposals. Instant verification for any data resolution.</p>
                    </div>

                    <form onSubmit={handleSearch} className="relative group flex-1 max-w-xl">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="REQUEST_ID OR TRANSACTION_HASH"
                            className="relative w-full bg-black border border-white/10 rounded-[28px] py-6 pl-16 pr-6 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-white/10 text-yellow-500/80"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-yellow-500 transition-colors" size={24} />
                        {loading && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                <RefreshCw size={20} className="text-yellow-500 animate-spin" />
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {error && (
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-[32px] flex items-center gap-4 text-red-500 text-xs font-black uppercase tracking-widest animate-in shake duration-500">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {!certificate && !loading && !error && (
                <div className="py-24 text-center space-y-6">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5 shadow-2xl group cursor-pointer hover:border-yellow-500/20 transition-all">
                        <FileSearch size={40} className="text-white/10 group-hover:text-yellow-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-[0.3em] text-white/40">Ready for Audit</h3>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] max-w-sm mx-auto">Input a unique identifier to unveil the resolution pedigree.</p>
                    </div>
                </div>
            )}

            {certificate && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-1000">
                    {/* Pedigree Metadata */}
                    <div className="space-y-8">
                        <section className="glass-premium p-8 rounded-[40px] border border-white/10 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShieldCheck size={120} className="text-yellow-500" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                Pedigree Stats
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-white/5 pb-4 group">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 flex items-center gap-3"><Clock size={14} /> Timestamp</span>
                                    <span className="text-[11px] font-black text-white group-hover:text-yellow-500 transition-colors">{new Date(certificate.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/5 pb-4 group">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 flex items-center gap-3"><Database size={14} /> Protocol</span>
                                    <span className="text-[10px] font-black px-3 py-1 bg-white/5 rounded-full text-blue-400 border border-white/10 italic">{certificate.recipeId}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/5 pb-4 group">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 flex items-center gap-3"><User size={14} /> Attested By</span>
                                    <span className="text-[9px] font-mono text-white/40 group-hover:text-yellow-500 transition-colors truncate max-w-[140px] uppercase font-bold">{certificate.signature}</span>
                                </div>
                            </div>

                            <div className="pt-6 relative group">
                                <div className="absolute inset-0 bg-yellow-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-[9px] text-white/20 uppercase font-black mb-2 tracking-[0.3em]">Truth Outcome</div>
                                <div className="text-[56px] font-black text-white italic tracking-tighter leading-none group-hover:translate-x-1 transition-transform">{certificate.outcome}</div>
                            </div>
                        </section>

                        <section className="glass-premium p-8 rounded-[40px] border border-white/10 space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-6">Consensus Logic</h3>
                            <div className="p-6 bg-black rounded-[32px] border border-white/5 group hover:border-yellow-500/20 transition-all shadow-inner">
                                <div className="text-[11px] font-black text-yellow-500 uppercase tracking-widest mb-1 italic">{certificate.consensus.method}</div>
                                <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">Verified via Multi-Source Aggregate Plugin</p>
                            </div>
                        </section>
                    </div>

                    {/* Resolution Timeline */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Sentinel Logic */}
                        <section className="glass-premium p-10 rounded-[48px] border border-white/10 bg-gradient-to-br from-purple-500/[0.03] to-transparent relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                                <Brain size={250} className="text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black mb-8 flex items-center gap-4 italic tracking-tight uppercase">
                                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20"><Brain size={20} className="text-purple-400" /></div>
                                AI Witness Statement
                            </h3>
                            <p className="text-white/70 text-lg leading-relaxed italic font-medium border-l-4 border-yellow-500/40 pl-8 py-4 bg-white/[0.02] rounded-r-3xl pr-10">
                                "{certificate.rationale}"
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                {certificate.sources.map((s, i) => (
                                    <span key={i} className="px-4 py-2 bg-black border border-white/10 rounded-full text-[9px] text-white/30 font-black uppercase tracking-widest hover:border-white/20 transition-colors">
                                        Source: {s}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Execution Pulse */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 pl-4 flex items-center gap-3">
                                <Activity size={16} className="text-yellow-500 glow-gold" />
                                Forensic Execution Trace
                            </h3>
                            <div className="space-y-6">
                                {certificate.trace.map((step, i) => (
                                    <div key={step.id} className="relative pl-12 group">
                                        {/* Dynamic Timeline */}
                                        {i !== certificate.trace.length - 1 && (
                                            <div className="absolute left-4 top-12 bottom-[-24px] w-0.5 bg-gradient-to-b from-yellow-500/20 to-transparent"></div>
                                        )}
                                        {/* High-Fi Status Node */}
                                        <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-2xl border-2 border-black flex items-center justify-center transition-all duration-500 ${step.status === 'SUCCESS' ? 'bg-yellow-500 group-hover:scale-125 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-red-600'}`}>
                                            <CheckCircle2 size={16} className="text-black font-black" />
                                        </div>

                                        <div className="glass-premium p-8 rounded-[40px] border border-white/5 hover:border-yellow-500/20 transition-all shadow-xl hover:translate-x-1 duration-500">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-500 italic px-3 py-1 bg-yellow-500/5 rounded-full border border-yellow-500/10">{step.type}</span>
                                                    <span className="text-[10px] text-white/10 font-black uppercase tracking-[0.3em] font-mono">{step.id}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-white/20 tracking-widest uppercase font-display bg-white/5 px-3 py-1 rounded-full border border-white/10">{step.duration}ms</span>
                                            </div>

                                            {step.params?.url && (
                                                <div className="flex items-center gap-3 text-[10px] text-white/30 mb-6 font-mono font-bold bg-black/40 p-3 rounded-2xl border border-white/5 truncate">
                                                    <Info size={14} className="text-blue-500 shrink-0" />
                                                    {step.params.url}
                                                </div>
                                            )}

                                            {step.result && (
                                                <div className="relative group/result">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 back-transparent blur opacity-0 group-hover/result:opacity-100 transition duration-1000"></div>
                                                    <div className="relative bg-black p-6 rounded-[28px] border border-white/10 group-hover/result:border-yellow-500/30 transition-all shadow-inner overflow-hidden">
                                                        <pre className="text-[11px] text-white/60 font-mono overflow-x-auto leading-relaxed custom-scrollbar max-h-[200px]">
                                                            {JSON.stringify(step.result, null, 2)}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="pt-12 text-center">
                            <button className="px-10 py-5 glass-premium rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] hover:text-yellow-500 hover:border-yellow-500/30 transition-all flex items-center gap-4 mx-auto border border-white/10 shadow-2xl">
                                <ExternalLink size={18} className="glow-gold" />
                                Attest on Permanent Record (IPFS)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
