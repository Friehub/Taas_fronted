"use client";

import { DocHero, DocSection, CodeBlock, InfoBox } from "../../components/docs/DocComponents";
import { motion } from "framer-motion";
import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons";

export default function GettingStartedPage() {
    return (
        <article className="prose prose-invert max-w-none">
            <DocHero
                title="Getting Started"
                subtitle="The Sovereign Logic protocol for a verifiable world. TaaS bridges the gap between off-chain reality and on-chain intelligence."
            />

            <DocSection title="What is TaaS?">
                <p>
                    <strong>Truth-as-a-Service (TaaS)</strong> is a decentralized Sovereign Logic protocol built for verifying complex, structured real-world facts.
                    It enables developers to deploy "Truth Recipes" that are executed autonomously by a globally distributed
                    network of Sentinels, producing cryptographically final Attestations.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-12">
                    <UseCaseCard
                        title="Sports & Events"
                        desc="Did the Chiefs win the Super Bowl? TaaS fetches and attests the final score."
                    />
                    <UseCaseCard
                        title="Parametric Insurance"
                        desc="Did rainfall exceed 5mm? TaaS verifies weather station data autonomously."
                    />
                </div>
            </DocSection>

            <DocSection title="How It Works">
                <p>The TaaS lifecycle is driven by the <strong>Sovereign Logic Engine</strong>:</p>
                <div className="space-y-4 my-10">
                    <StepItem num="01" text="Define a Recipe using Sovereign Logic syntax." />
                    <StepItem num="02" text="Request truth on-chain via TruthOracleV2." />
                    <StepItem num="03" text="Sentinels execute the Recipe in a sandboxed VM." />
                    <StepItem num="04" text="A Universal Truth Proof (UTP) is generated." />
                    <StepItem num="05" text="Truth is finalized on-chain and consumed." />
                </div>
            </DocSection>

            <DocSection title="Prerequisites">
                <p>To begin building with TaaS, ensure you have the following environment setup:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Node.js</strong> v18+</li>
                    <li><strong>pnpm</strong> v8.0.0+</li>
                    <li><strong>PostgreSQL</strong> (for backend persistence)</li>
                    <li><strong>EVM Wallet</strong> (funded with testnet HLS for gas fees)</li>
                </ul>

                <InfoBox type="important">
                    TaaS is currently in early-access. To provision a node or access private registries, you must be part of the authorized Sentinel network.
                </InfoBox>
            </DocSection>

            <DocSection title="Public Repositories">
                <p>Access the TaaS ecosystem through our public developer resources and modular packages:</p>
                <div className="space-y-4 my-8">
                    <RepoItem
                        title="taas-sdk"
                        url="https://github.com/Friehub/taas-sdk"
                        desc="The primary SDK for building, testing, and simulating Sovereign Logic Truth Recipes locally."
                    />
                    <RepoItem
                        title="taas-interfaces"
                        url="https://github.com/Friehub/taas-interfaces"
                        desc="Shared TypeScript types, EIP-712 definitions, and Sovereign Logic protocol interfaces."
                    />
                    <RepoItem
                        title="taas-nodes"
                        url="https://github.com/Friehub/taas-nodes"
                        desc="The open-source Sentinel (Truth Node) and Challenger software suite for the TaaS network."
                    />
                </div>

                <InfoBox type="info">
                    <strong>NPM Access:</strong> Our core interfaces and SDK are also available via the <code>@friehub</code> scope on the GitHub Packages registry.
                </InfoBox>
            </DocSection>
        </article>
    );
}

function RepoItem({ title, url, desc }: { title: string, url: string, desc: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-muted/10 hover:border-primary/30 transition-all group"
        >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <CubeIcon />
            </div>
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">{title}</h4>
                    <ArrowRightIcon className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-xs text-foreground/40 leading-relaxed font-light">{desc}</p>
            </div>
        </a>
    );
}

function UseCaseCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-8 rounded-2xl border border-border bg-muted/20 hover:border-primary/30 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <CubeIcon />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-3">{title}</h4>
            <p className="text-sm text-foreground/40 leading-relaxed font-light">{desc}</p>
        </div>
    );
}

function StepItem({ num, text }: { num: string, text: string }) {
    return (
        <div className="flex gap-6 items-center p-4 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border">
            <span className="text-[10px] font-black text-primary p-2 bg-primary/10 rounded min-w-[32px] text-center">{num}</span>
            <span className="text-foreground/60 text-sm font-medium">{text}</span>
            <ArrowRightIcon className="ml-auto text-primary opacity-0 hover:opacity-100 transition-opacity" />
        </div>
    );
}
