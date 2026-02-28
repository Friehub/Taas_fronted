"use client";

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function DocHero({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <div className="mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter mb-6">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xl text-foreground/40 font-light leading-relaxed max-w-2xl">
                    {subtitle}
                </p>
            )}
            <div className="mt-10 h-px bg-gradient-to-r from-primary/30 to-transparent w-full" />
        </div>
    );
}

export function DocSection({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) {
    return (
        <section className={clsx("mb-20", className)}>
            {title && (
                <h2 className="text-2xl font-display font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(170,255,184,0.5)]" />
                    {title}
                </h2>
            )}
            <div className="text-foreground/50 leading-relaxed font-light space-y-6">
                {children}
            </div>
        </section>
    );
}

export function CodeBlock({ code, language }: { code: string, language?: string }) {
    return (
        <div className="my-8 rounded-xl overflow-hidden border border-border bg-muted/30 group">
            <div className="flex items-center justify-between px-6 py-3 bg-muted/50 border-b border-border">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">{language || 'code'}</span>
                <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Copy
                </button>
            </div>
            <pre className="p-6 overflow-x-auto font-mono text-sm text-foreground/80 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export function InfoBox({ children, type = 'info' }: { children: React.ReactNode, type?: 'info' | 'warning' | 'important' }) {
    const styles = {
        info: "bg-primary/5 border-primary/20 text-primary/80",
        warning: "bg-orange-500/5 border-orange-500/20 text-orange-400",
        important: "bg-red-500/5 border-red-500/20 text-red-400"
    };

    return (
        <div className={clsx("p-6 rounded-xl border-l-4 my-8", styles[type])}>
            <div className="text-sm leading-relaxed font-medium">
                {children}
            </div>
        </div>
    );
}
