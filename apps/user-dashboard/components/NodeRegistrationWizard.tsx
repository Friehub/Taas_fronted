'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSignMessage, usePublicClient, useReadContract } from 'wagmi';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { parseEther, type Hex, formatEther } from 'viem';
import {
    ShadowIcon,
    LockClosedIcon,
    DownloadIcon,
    CheckCircledIcon,
    ArrowRightIcon,
    CopyIcon,
    CheckIcon,
    InfoCircledIcon,
    ChevronRightIcon,
    ComponentInstanceIcon,
    GitHubLogoIcon,
    ExternalLinkIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Artifacts (ABIs)
import NodeRegistryABI from '../lib/abi/NodeRegistry.json';
import TAASTokenABI from '../lib/abi/TAASToken.json';

const NODE_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_NODE_REGISTRY_ADDRESS as Hex;
const T_TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_T_TOKEN_ADDRESS || '0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F') as Hex;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.friehub.cloud';
const INDEXER_API_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'https://taas.friehub.cloud';

const STEPS = [
    { title: 'Role', description: 'Choose your role' },
    { title: 'Identity', description: 'Generate operator' },
    { title: 'Stake', description: 'Lock $T assets' },
    { title: 'Finish', description: 'Done' },
];

export function NodeRegistrationWizard() {
    const [step, setStep] = useState(1);
    const [nodeType, setNodeType] = useState<'SENTINEL' | 'CHALLENGER'>('SENTINEL');
    const [provisionToken, setProvisionToken] = useState<string | null>(null);
    const [nodeAddress, setNodeAddress] = useState<string | null>(null);
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [copiedToken, setCopiedToken] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);

    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { signMessageAsync } = useSignMessage();
    const { writeContractAsync } = useWriteContract();
    const [lastTxHash, setLastTxHash] = useState<Hex | undefined>();
    const { isLoading: isWaiting } = useWaitForTransactionReceipt({ hash: lastTxHash });

    const [isApproveLoading, setIsApproveLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    // Read allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: T_TOKEN_ADDRESS,
        abi: TAASTokenABI as any,
        functionName: 'allowance',
        args: address ? [address, NODE_REGISTRY_ADDRESS] : undefined,
    });

    const handleCopy = (text: string, type: 'token' | 'address') => {
        navigator.clipboard.writeText(text);
        if (type === 'token') {
            setCopiedToken(true);
            setTimeout(() => setCopiedToken(false), 2000);
        } else {
            setCopiedAddress(true);
            setTimeout(() => setCopiedAddress(false), 2000);
        }
        toast.success(`${type === 'token' ? 'Code' : 'Address'} copied to clipboard`);
    };

    const handleGenerateProvision = async () => {
        if (!address) return;

        try {
            // 1. Generate Local Operator Key
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            setPrivateKey(pk);
            setNodeAddress(account.address);

            // 2. Get Signed Token from Backend
            const message = `Generate Provision Token for ${nodeType} as ${address}`;
            const signature = await signMessageAsync({ message });

            const res = await fetch(`${API_URL}/auth/provision/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, nodeType, signature, message })
            });

            const data = await res.json();
            if (data.success) {
                setProvisionToken(data.tokenCode);
                setStep(2);
                toast.success('Registration Code Generated');
            } else {
                throw new Error(data.error);
            }
        } catch (e: any) {
            toast.error(`Provisioning failed: ${e.message}`);
        }
    };

    const handleStakeAndRegister = async () => {
        if (!nodeAddress || !provisionToken || !publicClient) return;
        const stakeAmount = parseEther('1000');

        try {
            // 1. Check & Handle Allowance
            if (!allowance || (allowance as bigint) < stakeAmount) {
                setIsApproveLoading(true);
                toast.info('Approving $T tokens...');
                const approveHash = await writeContractAsync({
                    address: T_TOKEN_ADDRESS,
                    abi: TAASTokenABI as any,
                    functionName: 'approve',
                    args: [NODE_REGISTRY_ADDRESS, stakeAmount],
                });
                setLastTxHash(approveHash);
                await publicClient.waitForTransactionReceipt({ hash: approveHash });
                await refetchAllowance();
                setIsApproveLoading(false);
                toast.success('Approval successful');
            }

            // 2. Register Node
            setIsRegisterLoading(true);
            toast.info('Registering node on-chain...');
            const registerHash = await writeContractAsync({
                address: NODE_REGISTRY_ADDRESS,
                abi: NodeRegistryABI as any,
                functionName: 'registerNode',
                args: [
                    nodeAddress as Hex,
                    nodeType === 'SENTINEL' ? 0 : 1,
                    `http://pending-${provisionToken}.friehub.cloud`,
                    JSON.stringify({ name: `My ${nodeType}`, provisionToken }),
                    stakeAmount
                ]
            });
            setLastTxHash(registerHash);
            await publicClient.waitForTransactionReceipt({ hash: registerHash });

            setStep(4);
            toast.success('Node successfully registered and staked!');
        } catch (e: any) {
            toast.error(`Registration failed: ${e.message}`);
        } finally {
            setIsApproveLoading(false);
            setIsRegisterLoading(false);
        }
    };

    const downloadConfig = () => {
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet1.helioschainlabs.org';
        const config = `NODE_MODE=${nodeType.toLowerCase()}\nOPERATOR_PRIVATE_KEY=${privateKey}\nOWNER_ADDRESS=${address}\nREGISTRATION_TOKEN=${provisionToken}\nRPC_URL=${rpcUrl}\nINDEXER_URL=${INDEXER_API_URL}`;
        const blob = new Blob([config], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `node-${provisionToken?.toLowerCase()}.env`;
        a.click();
        toast.success('Configuration bundle downloaded');
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Horizontal Stepper */}
            <div className="flex justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((s, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center group">
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500",
                            step > i + 1 ? "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(234,179,8,0.4)]" :
                                step === i + 1 ? "bg-white/5 border-primary/50 text-primary shadow-[0_0_15px_rgba(234,179,8,0.2)] scale-110" :
                                    "bg-white/5 border-white/5 text-foreground/20"
                        )}>
                            {step > i + 1 ? <CheckIcon width={20} height={20} /> : <span className="text-xs font-black">{i + 1}</span>}
                        </div>
                        <div className="absolute top-12 whitespace-nowrap text-center">
                            <div className={cn(
                                "text-[9px] font-black uppercase tracking-[0.2em] transition-colors",
                                step >= i + 1 ? "text-primary" : "text-foreground/20"
                            )}>{s.title}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="p-10 bg-card/40 backdrop-blur-2xl border-white/5 shadow-2xl relative overflow-hidden glass-premium rounded-3xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <GitHubLogoIcon width={120} height={120} />
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {step === 1 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Role</h2>
                                    <p className="text-sm text-muted-foreground">Sentinels propose data, Challengers audit the proposals.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setNodeType('SENTINEL')}
                                        className={cn(
                                            "group p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                                            nodeType === 'SENTINEL'
                                                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                                                : "border-border hover:border-primary/30 hover:bg-accent/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={cn(
                                                "p-4 rounded-2xl transition-all duration-500",
                                                nodeType === 'SENTINEL' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-white/5 text-foreground/40 group-hover:bg-primary/10 group-hover:text-primary"
                                            )}>
                                                <ShadowIcon width={24} height={24} />
                                            </div>
                                            {nodeType === 'SENTINEL' && (
                                                <span className="text-[9px] font-black bg-primary text-primary-foreground px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">Recommended</span>
                                            )}
                                        </div>
                                        <div className="font-display font-bold text-xl text-foreground mb-2 tracking-tight">Sentinel</div>
                                        <p className="text-[11px] text-foreground/40 leading-relaxed font-medium">
                                            The backbone of Friehub. Collect and propose truth data to earn protocol fees.
                                        </p>
                                    </button>

                                    <button
                                        onClick={() => setNodeType('CHALLENGER')}
                                        className={cn(
                                            "group p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                                            nodeType === 'CHALLENGER'
                                                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                                                : "border-border hover:border-primary/30 hover:bg-accent/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn(
                                                "p-3 rounded-xl transition-colors",
                                                nodeType === 'CHALLENGER' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                            )}>
                                                <ComponentInstanceIcon width={24} height={24} />
                                            </div>
                                        </div>
                                        <div className="font-bold text-lg text-foreground mb-1">Challenger</div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            The immune system. Audit proposals and dispute incorrect truths to earn bond slashings.
                                        </p>
                                    </button>
                                </div>

                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start">
                                    <InfoCircledIcon className="text-primary mt-0.5 shrink-0" width={18} height={18} />
                                    <p className="text-[11px] text-foreground/60 leading-relaxed font-medium">
                                        Changing roles later requires un-staking and a cooldown period. Active nodes are deployed via the <a href="https://github.com/friehub/truth-node" target="_blank" className="text-primary hover:underline font-bold inline-flex items-center gap-1">Truth Node Repo <ExternalLinkIcon /></a>.
                                    </p>
                                </div>

                                <Button
                                    className="w-full h-12 text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                                    onClick={handleGenerateProvision}
                                    disabled={!isConnected}
                                >
                                    Initialize Identity <ChevronRightIcon width={16} height={16} className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Generating Identity</h2>
                                    <p className="text-sm text-muted-foreground">We've generated a unique operator identity for your node.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 relative group">
                                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
                                            Registration Token
                                            <button onClick={() => handleCopy(provisionToken || '', 'token')} className="hover:text-foreground transition-colors">
                                                {copiedToken ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
                                            </button>
                                        </div>
                                        <div className="text-3xl font-mono font-bold tracking-[0.1em] text-primary truncate">
                                            {provisionToken}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl relative group">
                                        <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <LockClosedIcon width={12} height={12} className="text-primary" />
                                            Operator Wallet (Generated)
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-mono text-slate-300">
                                                {nodeAddress}
                                            </div>
                                            <button onClick={() => handleCopy(nodeAddress || '', 'address')} className="text-slate-500 hover:text-white transition-colors">
                                                {copiedAddress ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
                                            </button>
                                        </div>
                                        <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight leading-tight">
                                                This key only exists in your browser. Download the bundle in the last step to save it.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                                    onClick={() => setStep(3)}
                                >
                                    Proceed to Staking <ChevronRightIcon width={16} height={16} className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Network Staking</h2>
                                    <p className="text-sm text-muted-foreground">Stake 1,000 $T to secure your node and start earning.</p>
                                </div>

                                <div className="p-8 bg-card rounded-2xl border-2 border-primary/20 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                                        <ComponentInstanceIcon width={32} height={32} />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-foreground">1,000 $T</div>
                                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Security Bond</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                                    <ShadowIcon className="text-amber-500 shrink-0" width={18} height={18} />
                                    <div className="text-[11px] text-muted-foreground leading-relaxed">
                                        Your bond is stored in the <strong>NodeRegistry</strong>. It is subject to protocol rules and can be slashed if your node acts maliciously.
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                                    onClick={handleStakeAndRegister}
                                    disabled={isApproveLoading || isRegisterLoading || isWaiting}
                                >
                                    {isApproveLoading ? 'Approving $T...' : isRegisterLoading ? 'Activating...' : isWaiting ? 'Confirming...' : 'Stake & Activate Node'}
                                </Button>

                                <p className="text-[10px] text-center text-muted-foreground">
                                    Transaction hash will appear after wallet confirmation.
                                </p>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-8 text-center">
                                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-float">
                                    <CheckCircledIcon width={40} height={40} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tight">Node Activated!</h2>
                                    <p className="text-sm text-muted-foreground px-8">
                                        Configuration generated successfully. You are now officially a {nodeType === 'SENTINEL' ? 'Sentinel' : 'Challenger'}.
                                    </p>
                                </div>

                                <div className="max-w-xs mx-auto p-4 bg-muted/50 rounded-xl border border-border flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Status</div>
                                        <div className="text-emerald-500 font-bold">ONLINE</div>
                                    </div>
                                    <div className="h-8 w-px bg-border" />
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Bond</div>
                                        <div className="text-foreground font-bold">1,000 $T</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-14 font-black uppercase tracking-[0.2em] border-white/10 hover:bg-white/5 rounded-2xl transition-all" onClick={downloadConfig}>
                                        <DownloadIcon className="mr-3" width={18} height={18} /> Download Code
                                    </Button>
                                    <Button className="h-14 font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-primary/20" onClick={() => window.location.href = '/'}>
                                        Dashboard <ChevronRightIcon className="ml-3" width={18} height={18} />
                                    </Button>
                                </div>

                                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left space-y-4">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                        <GitHubLogoIcon width={16} height={16} /> Deployment Instructions
                                    </div>
                                    <ol className="text-[11px] text-foreground/40 space-y-2 font-medium leading-relaxed list-decimal list-inside">
                                        <li>Clone the <a href="https://github.com/friehub/truth-node" target="_blank" className="text-primary hover:underline font-bold">truth-node</a> repository to your server</li>
                                        <li>Place the <code>.env</code> file in the project root</li>
                                        <li>Run <code>docker-compose up -d</code> to initialize your node</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </Card>
        </div>
    );
}
