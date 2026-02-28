"use client";

import { Sidebar, MobileNav } from "../../components/docs/Sidebar";
import { motion } from "framer-motion";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col pt-20">
            {/* Mobile Navigation */}
            <MobileNav />

            <div className="container mx-auto px-6 flex flex-1">
                {/* Desktop Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <main className="flex-1 py-12 lg:px-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>

                    {/* Footer for Docs */}
                    <footer className="mt-32 pt-8 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/20">
                        <span>Friehub Documentation v1.0</span>
                        <span>Standardizing Autonomous Truth</span>
                    </footer>
                </main>
            </div>
        </div>
    );
}
