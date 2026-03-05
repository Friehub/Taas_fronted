'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useApiKeys, createApiKey, revokeApiKey, ApiKey } from '@/lib/api';
import { PlusIcon, TrashIcon, CopyIcon, EyeOpenIcon, EyeClosedIcon, ExternalLinkIcon, CodeIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

export default function DeveloperPage() {
    const { address, isConnected } = useAccount();
    const { apiKeys, isLoading: keysLoading, mutate: mutateKeys } = useApiKeys();

    const [isCreatingKey, setIsCreatingKey] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyHash, setNewKeyHash] = useState<string | null>(null);
    const [showKeyHash, setShowKeyHash] = useState(false);

    const handleCreateKey = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const key = await createApiKey(newKeyName, 30); // Default 30 days
            setNewKeyHash(key.token_hash || null);
            setShowKeyHash(true);
            setNewKeyName('');
            setIsCreatingKey(false);
            mutateKeys();
            toast.success('API Key generated successfully');
        } catch (error) {
            toast.error('Failed to create API key');
        }
    };

    const handleRevokeKey = async (id: string) => {
        try {
            await revokeApiKey(id);
            mutateKeys();
            toast.success('API Key revoked');
        } catch (error) {
            toast.error('Failed to revoke key');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase shrink-0">Developer Portal</h1>
                    <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <CodeIcon className="text-primary" width={14} height={14} />
                        Manage your TaaS SDK Integration Keys
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-wider">SDK API Tokens</h3>
                            <button
                                onClick={() => setIsCreatingKey(!isCreatingKey)}
                                className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 flex items-center gap-1"
                            >
                                <PlusIcon width={14} height={14} /> New Token
                            </button>
                        </div>

                        {/* Create form */}
                        {isCreatingKey && (
                            <form onSubmit={handleCreateKey} className="p-6 border-b border-border bg-muted/10 space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Token Identifier</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Production Oracle Gateway"
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:brightness-110 transition-all">
                                    Generate SDK Token
                                </button>
                            </form>
                        )}

                        {/* One-time token reveal */}
                        {newKeyHash && (
                            <div className="p-6 border-b border-primary/30 bg-primary/10 space-y-3">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest">Copy this token now. It won't be shown again.</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 block w-full bg-background border border-primary/20 rounded-lg p-3 text-xs font-mono text-primary break-all">
                                        {showKeyHash ? newKeyHash : '••••••••••••••••••••••••••••••••••••••••'}
                                    </code>
                                    <button type="button" onClick={() => setShowKeyHash(!showKeyHash)} className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 focus:outline-none">
                                        {showKeyHash ? <EyeClosedIcon width={16} height={16} /> : <EyeOpenIcon width={16} height={16} />}
                                    </button>
                                    <button type="button" onClick={() => copyToClipboard(newKeyHash)} className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 focus:outline-none">
                                        <CopyIcon width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* List Keys */}
                        <div className="p-6 space-y-4">
                            {!isConnected ? (
                                <p className="text-xs text-center text-muted-foreground font-bold uppercase tracking-widest">Connect wallet to manage tokens</p>
                            ) : keysLoading ? (
                                <div className="h-12 bg-white/5 animate-pulse rounded-lg" />
                            ) : apiKeys.length > 0 ? (
                                apiKeys.map((key: ApiKey) => (
                                    <div key={key.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl group hover:border-primary/30 transition-colors">
                                        <div>
                                            <p className="text-sm font-bold truncate max-w-[200px]">{key.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">
                                                {key.status} • {key.id.slice(0, 8)}...
                                            </p>
                                        </div>
                                        {key.status === 'ACTIVE' && (
                                            <button onClick={() => handleRevokeKey(key.id)} className="text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10 p-2 rounded-lg transition-all focus:outline-none">
                                                <TrashIcon width={16} height={16} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <CodeIcon className="mx-auto h-8 w-8 text-muted-foreground opacity-20 mb-3" />
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">No Active SDK Tokens</p>
                                    <p className="text-[10px] text-muted-foreground/60 mt-1 max-w-xs mx-auto">Generate a token to start building with the TaaS SDK.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column Docs/Help */}
                <div className="space-y-6">
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Integration Guide</h3>
                        <p className="text-xs text-foreground/60 mb-4 leading-relaxed">
                            Use these tokens to authenticate your DApps with the TaaS Gateway. Embed your active token in the Taas SDK initialization.
                        </p>
                        <div className="bg-muted/10 border border-white/5 rounded-lg p-3 font-mono text-[10px] text-foreground/80 break-all mb-4">
                            import &#123; TaasClient &#125; from '@friehub/taas-sdk';<br /><br />
                            const client = new TaasClient(&#123;<br />
                            &nbsp;&nbsp;apiKey: 'taas_...' <span className="text-foreground/30">// Your generated token</span><br />
                            &#125;);
                        </div>
                        <a href="https://docs.friehub.cloud/guides/getting-started" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-1">
                            Read SDK Docs <ExternalLinkIcon width={12} height={12} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
