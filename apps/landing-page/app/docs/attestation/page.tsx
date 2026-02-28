"use client";

import { clsx } from "clsx";

import { DocHero, DocSection, CodeBlock, InfoBox } from "../../../components/docs/DocComponents";
import { motion } from "framer-motion";
import { LayersIcon, LockClosedIcon, CheckCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function AttestationPage() {
    return (
        <article className="prose prose-invert max-w-none">
            <DocHero
                title="Truth Attestation"
                subtitle="The Sovereign finality layer of Friehub. Converting raw data into a portable, verifiable Universal Truth Proof (UTP)."
            />

            <DocSection title="What is an Attestation?">
                <p>
                    An **Attestation** is the final, signed output produced by the Sovereign Logic Engine after a Recipe's pipeline completes.
                    It serves as the on-chain anchor for the entire truth lifecycle, ensuring that the resolved value
                    has been verified by the Sentinel network and anchored in a Universal Truth Proof.
                </p>

                <div className="my-16 p-12 rounded-3xl bg-muted/10 border border-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-dot-white opacity-[0.02] pointer-events-none" />
                    <ProofDiagram />
                </div>
            </DocSection>

            <DocSection title="Universal Truth Proof">
                <p>
                    Every attested result is packaged into a **Universal Truth Proof**. This is a portable,
                    version-tagged cryptographic record that includes:
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-10">
                    <ProofFeature title="Truth Value" desc="The resolved outcome (Numeric, Binary, etc)." />
                    <ProofFeature title="Recipe Hash" desc="SHA-256 fingerprint for logic integrity." />
                    <ProofFeature title="Sentinel SIG" desc="EIP-712 standard cryptographic signatures." />
                    <ProofFeature title="Execution Trace" desc="Step-by-step audit of the data pipeline." />
                </div>
            </DocSection>

            <DocSection title="Attestation Status">
                <p>
                    When a truth request resolves, the status indicates the final quality of the result.
                    Consumers can use this to handle edge cases like insufficient data or ambiguous results.
                </p>
                <div className="space-y-4 my-10">
                    <StatusItem status="ATTESTED" desc="Truth successfully computed and signed." active />
                    <StatusItem status="AMBIGUOUS" desc="Data sources disagreed beyond the threshold." />
                    <StatusItem status="INSUFFICIENT" desc="A required variable was missing or unparsable." />
                    <StatusItem status="PENDING_TIME" desc="Resolution is deferred until a future timestamp." />
                </div>
            </DocSection>

            <InfoBox type="important">
                All Attestations go through an <strong>Optimistic Dispute Window</strong> on-chain. This ensures a final layer of economic security where challengers can dispute invalid proofs before finalization.
            </InfoBox>
        </article>
    );
}

function ProofDiagram() {
    return (
        <div className="relative flex flex-col items-center gap-12 py-10 z-10">
            <div className="flex gap-12 items-center">
                <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center text-foreground/20">
                    <LayersIcon />
                </div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary"
                >
                    <ArrowRightIcon />
                </motion.div>
                <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary shadow-[0_0_40px_rgba(170,255,184,0.1)]">
                    <LockClosedIcon width={40} height={40} />
                </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Cryptographic Finality</div>
        </div>
    );
}

function ProofFeature({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-6 rounded-xl border border-border bg-background/50">
            <h4 className="text-xs font-bold text-foreground mb-2 uppercase tracking-widest flex items-center gap-2">
                <CheckCircledIcon className="text-primary" /> {title}
            </h4>
            <p className="text-[11px] text-foreground/40 leading-relaxed font-light">{desc}</p>
        </div>
    );
}

function StatusItem({ status, desc, active }: { status: string, desc: string, active?: boolean }) {
    return (
        <div className={clsx(
            "flex items-center gap-6 p-4 rounded-xl border transition-all",
            active ? "bg-primary/5 border-primary/20" : "bg-background border-border"
        )}>
            <span className={clsx(
                "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/30"
            )}>{status}</span>
            <span className="text-xs text-foreground/50 font-medium">{desc}</span>
        </div>
    );
}
