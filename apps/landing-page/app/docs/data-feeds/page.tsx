"use client";

import { DocHero, DocSection, CodeBlock, InfoBox } from "../../components/docs/DocComponents";
import {
    MixIcon,
    BarChartIcon,
    SunIcon,
    LinkBreak1Icon,
    CircleIcon,
    DesktopIcon
} from "@radix-ui/react-icons";

export default function DataFeedsPage() {
    return (
        <article className="prose prose-invert max-w-none">
            <DocHero
                title="Standard Data Feeds"
                subtitle="The TaaS Sovereign Gateway provides a curated layer of enterprise-grade data, abstracting API complexity and credential management."
            />

            <DocSection title="How Feeds Work">
                <p>
                    Data Feeds are the sensory organs of the TaaS network. Instead of nodes calling APIs directly, they request
                    signed <strong>TruthPoints</strong> from the Friehub Gateway. This ensures that every data point is
                    verifiable and that sensitive API credentials never leave secure infrastructure.
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-12">
                    <FeatureItem title="Zero Credential Leak" desc="Sentinels never handle raw API keys. They only relay signed certificates." />
                    <FeatureItem title="Sub-Second Latency" desc="Optimized edge-fetching ensures truth is delivered with minimal overhead." />
                </div>
            </DocSection>

            <DocSection title="Available Categories">
                <p>The gateway organizes data sources into standardized categories for easy routing in your Recipes:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-10">
                    <CategoryCard icon={<BarChartIcon />} label="Crypto" />
                    <CategoryCard icon={<MixIcon />} label="Sports" />
                    <CategoryCard icon={<CircleIcon />} label="Forex" />
                    <CategoryCard icon={<SunIcon />} label="Weather" />
                    <CategoryCard icon={<LinkBreak1Icon />} label="On-Chain" />
                    <CategoryCard icon={<DesktopIcon />} label="AI / Web" />
                </div>
            </DocSection>

            <DocSection title="Implementation">
                <p>Define a <code>standard-feed</code> node in your Recipe to access gateway data:</p>
                <CodeBlock
                    language="json"
                    code={`{\n  "id": "fetch_btc",\n  "type": "standard-feed",\n  "category": "crypto",\n  "method": "binance",\n  "args": ["BTCUSDT"],\n  "targetVar": "btcPrice"\n}`}
                />
            </DocSection>

            <InfoBox type="info">
                <strong>Resilience by Design.</strong> The gateway handles multi-source aggregation and circuit-breaking internally. If a primary provider fails, the gateway automatically falls back to secondary sources.
            </InfoBox>
        </article>
    );
}

function CategoryCard({ icon, label }: { icon: any, label: string }) {
    return (
        <div className="p-6 rounded-xl border border-border bg-muted/20 flex flex-col items-center gap-3 hover:border-primary/50 transition-all cursor-default group">
            <div className="text-foreground/20 group-hover:text-primary transition-colors">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 group-hover:text-foreground/80 transition-colors">{label}</span>
        </div>
    );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {title}
            </h4>
            <p className="text-[11px] text-foreground/40 leading-relaxed font-light">{desc}</p>
        </div>
    );
}
