'use client';

import Link from 'next/link';
import { getLandingUrl } from '../lib/shared/url-manager';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';
import { Sidebar, Header } from '../components/AppLayout';
import { useState } from 'react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-display font-black text-foreground uppercase tracking-widest mb-4">404: Route Lost</h2>
            <p className="text-xs text-foreground/40 font-black uppercase tracking-[0.2em] mb-8">This truth does not exist in the stream</p>
            <Link
                href="/"
                className="px-6 py-2 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
                Return to Command
            </Link>
        </div>
    );
}
