"use client";

import { GitHubLogoIcon, TwitterLogoIcon, FileTextIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function LandingFooter() {
    return (
        <footer className="py-24 bg-surface-low border-none">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
                        <div className="font-display font-black text-3xl text-foreground tracking-tighter">
                            TaaS
                        </div>
                        <p className="text-sm text-foreground/40 max-w-xs leading-relaxed font-light">
                            Standardizing threshold veracity for the sovereign internet. 
                            A multi-process oracle runtime for institutional-grade data pipelines.
                        </p>
                        <div className="flex items-center gap-6 mt-4">
                            <a href="https://x.com/friehub" className="text-foreground/20 hover:text-primary transition-all">
                                <TwitterLogoIcon width={20} height={20} />
                            </a>
                            <a href="https://github.com/friehub" className="text-foreground/20 hover:text-primary transition-all">
                                <GitHubLogoIcon width={20} height={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Architecture</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Gateway Core</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Plugin SDK</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Mesh P2P</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Developers</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Documentation</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">GitHub</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Live Status</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Bug Bounty</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Ecosystem</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Explorer</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Waitlist</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Grant Program</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-light">Governance</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-none flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-[10px] text-foreground/20 font-mono uppercase tracking-widest leading-loose">
                        © 2026 TaaS Protocol Architecture. <br className="md:hidden" />
                        Designed for Verifiable Autonomy.
                    </div>
                    
                    <div className="flex items-center gap-10 text-[10px] uppercase font-black tracking-[0.2em] text-foreground/20">
                        <Link href="/privacy" className="hover:text-foreground transition-all">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-all">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-foreground transition-all">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
