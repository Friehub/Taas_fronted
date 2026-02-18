import React, { useState } from 'react';
import {
    Database,
    Shield,
    Calculator,
    Brain,
    Plus,
    Code,
    Loader2,
    Play,
    Trash2,
    X,
    Zap,
    RefreshCw,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

interface Node {
    id: string;
    type: 'fetch' | 'consensus' | 'math' | 'reasoner';
    config: any;
}

export default function TemplateBuilder() {
    const [templateName, setTemplateName] = useState('New Truth Template');
    const [nodes, setNodes] = useState<Node[]>([]);
    const [showCode, setShowCode] = useState(false);
    const [simulating, setSimulating] = useState(false);
    const [simResult, setSimResult] = useState<any>(null);
    const [showSim, setShowSim] = useState(false);

    const addNode = (type: Node['type']) => {
        const id = `${type}_${nodes.length + 1}`;
        const newNode: Node = {
            id,
            type,
            config: type === 'consensus' ? { sources: [], threshold: 0.8 } : {}
        };
        setNodes([...nodes, newNode]);
    };

    const removeNode = (id: string) => {
        setNodes(nodes.filter(n => n.id !== id));
    };

    const generateJSON = () => {
        return JSON.stringify({
            metadata: { name: templateName, version: '1.0.0' },
            logic: {
                pipeline: nodes.map(n => ({
                    type: n.type,
                    id: n.id,
                    ...n.config
                }))
            }
        }, null, 2);
    };

    const runSimulation = async () => {
        setSimulating(true);
        setShowSim(true);
        try {
            const template = JSON.parse(generateJSON());
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${apiUrl}/api/templates/simulate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template, inputs: {} })
            });
            const data = await res.json();
            setSimResult(data.status === 'error' ? { status: 'FAILED', error: data.message } : data.result);
        } catch (err) {
            console.error("Simulation failed", err);
            setSimResult({ status: 'FAILED', error: 'Could not connect to Truth Node' });
        } finally {
            setSimulating(false);
        }
    };

    return (
        <div className="space-y-10 selection:bg-yellow-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between glass-premium p-8 rounded-[40px] border border-white/10 shadow-2xl gap-6">
                <div className="flex-1 space-y-1">
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="bg-transparent text-4xl font-black focus:outline-none border-b-2 border-transparent focus:border-yellow-500 transition-all w-full tracking-tighter uppercase font-display"
                    />
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">Visual Verification Designer</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowCode(!showCode)}
                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-white/30 border border-white/5 hover:border-white/20"
                        title="View JSON Blueprint"
                    >
                        <Code size={20} />
                    </button>
                    <button
                        onClick={runSimulation}
                        disabled={nodes.length === 0 || simulating}
                        className="px-8 py-4 glass rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-3 disabled:opacity-30 border-white/10 hover:border-yellow-500/50 group"
                    >
                        {simulating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} className="text-yellow-500 group-hover:scale-125 transition-transform" />}
                        Simulate Logic
                    </button>
                    <button className="px-10 py-4 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.3)] rounded-2xl font-black text-black uppercase tracking-wider text-[11px] transition-all hover:scale-105 active:scale-95">
                        Deploy Protocol
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Visual Palette */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] pl-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        Logic Blocks
                    </h3>
                    {[
                        { type: 'fetch', label: 'Data Input', icon: Database, color: 'text-blue-500', desc: 'Universal API integration' },
                        { type: 'consensus', label: 'Consensus', icon: Shield, color: 'text-yellow-500', desc: 'Multi-source validation' },
                        { type: 'math', label: 'Math Engine', icon: Calculator, color: 'text-blue-500', desc: 'Complex transformations' },
                        { type: 'reasoner', label: 'AI Auditor', icon: Brain, color: 'text-purple-500', desc: 'Higher-order reasoning' },
                    ].map((tool) => (
                        <button
                            key={tool.type}
                            onClick={() => addNode(tool.type as any)}
                            className="w-full flex items-center gap-5 p-6 glass border border-white/5 rounded-[32px] hover:border-yellow-500/30 hover:bg-yellow-500/[0.02] transition-all group text-left"
                        >
                            <div className={`p-3.5 rounded-2xl bg-black shadow-inner ${tool.color} group-hover:scale-110 transition-transform border border-white/5`}>
                                <tool.icon size={20} />
                            </div>
                            <div>
                                <div className="font-black text-[12px] text-white/80 uppercase tracking-widest">{tool.label}</div>
                                <div className="text-[9px] text-white/20 font-medium">{tool.desc}</div>
                            </div>
                            <Plus size={16} className="ml-auto text-white/10 group-hover:text-yellow-500 group-hover:rotate-90 transition-all" />
                        </button>
                    ))}
                </div>

                {/* Construction Canvas */}
                <div className="lg:col-span-3 space-y-6 min-h-[600px] p-10 glass-premium rounded-[48px] border border-white/5 backdrop-blur-3xl relative border-dashed border-white/10">
                    {nodes.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 gap-6">
                            <Plus size={64} className="animate-pulse" />
                            <p className="font-black uppercase tracking-[0.5em] text-[10px]">Initialize Verification Sequence</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {nodes.map((node, index) => (
                                <div key={node.id} className="group relative glass p-8 rounded-[40px] border border-white/5 hover:border-yellow-500/20 transition-all flex items-center gap-8 shadow-xl">
                                    <div className="text-[10px] font-black text-white/10 w-6">0{index + 1}</div>
                                    <div className="p-4 bg-black rounded-3xl border border-white/5 shadow-inner">
                                        {node.type === 'fetch' && <Database size={28} className="text-blue-500" />}
                                        {node.type === 'consensus' && <Shield size={28} className="text-yellow-500" />}
                                        {node.type === 'math' && <Calculator size={28} className="text-blue-500" />}
                                        {node.type === 'reasoner' && <Brain size={28} className="text-purple-500" />}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="font-black text-white uppercase tracking-widest text-sm">{node.id}</span>
                                            <span className="text-[9px] px-3 py-1 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-[0.2em] text-white/30">{node.type}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/20 block pl-1">Target Identity</label>
                                                <input
                                                    placeholder="e.g. BTC_PRICE_USD"
                                                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:border-yellow-500/50 text-white/70"
                                                />
                                            </div>
                                            {node.type === 'fetch' && (
                                                <div className="space-y-1.5">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/20 block pl-1">Endpoint URL</label>
                                                    <input
                                                        placeholder="https://api..."
                                                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:border-yellow-500/50 text-white/70 font-mono"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeNode(node.id)}
                                        className="p-4 text-white/10 hover:text-red-500 transition-all hover:bg-red-500/5 rounded-2xl"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    {index < nodes.length - 1 && (
                                        <div className="absolute -bottom-6 left-[108px] w-0.5 h-6 bg-gradient-to-b from-white/10 to-white/5"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Blueprint Modal */}
            {showCode && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl p-12 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="glass-premium border border-white/10 rounded-[48px] w-full max-w-5xl p-12 space-y-8 shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between border-b border-white/10 pb-8">
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Protocol Blueprint</h3>
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Cryptographically auditable JSON definition</p>
                            </div>
                            <button onClick={() => setShowCode(false)} className="p-4 glass rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all border-white/10"><X size={24} /></button>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <pre className="relative p-8 bg-black rounded-[32px] border border-white/10 text-yellow-500 text-sm overflow-auto max-h-[600px] font-mono leading-relaxed scrollbar-hide">
                                {generateJSON()}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Advanced Trace Modal */}
            {showSim && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 flex items-center justify-center animate-in fade-in slide-in-from-top-12 duration-700">
                    <div className="bg-[#050505] border border-white/10 rounded-[64px] w-full max-w-3xl p-12 space-y-10 shadow-[0_0_150px_rgba(234,179,8,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black flex items-center gap-4 text-white uppercase italic tracking-tighter">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center"><Zap size={20} className="text-yellow-500" /></div>
                                    Execution Trace
                                </h3>
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] pl-12">Simulated resolution cycle</p>
                            </div>
                            <button onClick={() => setShowSim(false)} className="p-4 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {simulating ? (
                                <div className="py-24 flex flex-col items-center justify-center gap-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-yellow-500/20 blur-2xl animate-pulse" />
                                        <RefreshCw size={64} className="animate-spin text-yellow-500 relative" />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-[0.5em] text-white/40 animate-pulse">Witnessing Sources...</p>
                                </div>
                            ) : simResult ? (
                                <div className="space-y-12 animate-in fade-in duration-1000">
                                    {/* Verdict Bento */}
                                    <div className={`p-10 rounded-[40px] border relative overflow-hidden group transition-all duration-700 ${simResult.status === 'SUCCESS' ? 'bg-yellow-500/[0.03] border-yellow-500/20' : 'bg-red-500/05 border-red-500/20'}`}>
                                        <div className="absolute top-0 right-0 p-8">
                                            {simResult.status === 'SUCCESS' ? (
                                                <div className="flex items-center gap-2 px-4 py-1.5 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all group-hover:scale-110">
                                                    <CheckCircle2 size={14} /> Truth Verified
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                                    <AlertCircle size={14} /> Logic Error
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Final Outcome</span>
                                            <div className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-2xl">
                                                {simResult.status === 'SUCCESS' ? (simResult.winningOutcome === 1 ? 'True' : (simResult.winningOutcome === 0 ? 'False' : simResult.winningOutcome)) : 'Invalid'}
                                            </div>
                                            <div className="flex items-center gap-4 pt-4">
                                                <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 glow-blue animate-pulse" />
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Confidence: {((simResult.context?.resolved_value_confidence || 1) * 100).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detailed Pulse */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] pl-2">Step Diagnostics</h4>
                                        <div className="grid grid-cols-1 gap-3 max-h-[280px] overflow-auto pr-4 custom-scrollbar">
                                            {nodes.map((n, i) => (
                                                <div key={n.id} className="flex items-center gap-6 p-5 glass rounded-[24px] border border-white/5 hover:border-white/20 transition-all group/node">
                                                    <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center text-[11px] font-black text-white/20 group-hover/node:text-yellow-500 transition-colors">
                                                        0{i + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1">{n.id}</div>
                                                        <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Successful Termination</div>
                                                    </div>
                                                    <CheckCircle2 size={18} className="text-yellow-500 opacity-40 group-hover/node:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowSim(false)}
                                        className="w-full py-6 bg-yellow-500 text-black rounded-[32px] font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.1)]"
                                    >
                                        Return to Designer
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
