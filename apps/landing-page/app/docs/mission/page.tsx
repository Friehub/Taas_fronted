"use client";

import { DocHero, DocSection, InfoBox } from "../../components/docs/DocComponents";
import { GlobeIcon, ShadowIcon, MagicWandIcon } from "@radix-ui/react-icons";

export default function MissionPage() {
    return (
        <article className="prose prose-invert max-w-none">
            <DocHero
                title="Our Mission"
                subtitle="Friehub is dedicated to building the sovereign infrastructure for a verifiable world."
            />

            <DocSection title="Verifiable Trust">
                <p>
                    At the core of the digital era lies a growing crisis: the erosion of objective truth.
                    Friehub was established to address this challenge by building a decentralized intelligence layer
                    that serves as the foundation for verifiable trust.
                </p>
            </DocSection>

            <div className="grid md:grid-cols-3 gap-8 my-20">
                <PrincipleCard
                    icon={<GlobeIcon />}
                    title="Decentralized"
                    desc="No central point of failure. Truth is verified by a global network of Sentinels."
                />
                <PrincipleCard
                    icon={<ShadowIcon />}
                    title="Transparent"
                    desc="Every attestation is backed by reproducible logic. No black boxes."
                />
                <PrincipleCard
                    icon={<MagicWandIcon />}
                    title="Autonomous"
                    desc="Pure logic. Zero infrastructure management for developers."
                />
            </div>

            <DocSection title="What is TaaS?">
                <p>
                    <strong>TaaS (Truth-as-a-Service)</strong> is the primary implementation of Friehub's mission.
                    It is the high-fidelity protocol that bridges the gap between raw, often unreliable external data
                    and the absolute requirements of decentralized systems.
                </p>
                <p>
                    Unlike traditional oracles that merely relay information, TaaS provides a <strong>verification framework</strong>.
                    Through our network of Sentinel nodes, we don't just ask "What is the data?"; we ask "Is this data the truth?"
                </p>
            </DocSection>

            <InfoBox type="info">
                Our vision is a world where real-world data is handled with the same cryptographic certainty as on-chain transactions,
                enabling a new class of resilient and honest applications.
            </InfoBox>
        </article>
    );
}

function PrincipleCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-2xl border border-border bg-muted/10">
            <div className="text-primary mb-6">{icon}</div>
            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-widest">{title}</h4>
            <p className="text-xs text-foreground/40 leading-relaxed font-light">{desc}</p>
        </div>
    );
}
