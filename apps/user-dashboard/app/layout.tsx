'use client';

import './main.css';
import { Toaster } from 'sonner';
import { Sidebar, Header } from '../components/AppLayout';
import { cn } from '@/lib/utils';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';

import { usePathname } from 'next/navigation';

import { useState } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLanding = pathname === '/' || pathname === '/docs';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300">
                <Providers wagmiConfig={config}>
                    <Toaster richColors position="top-right" />
                    <div className="flex min-h-screen bg-background relative">
                        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                        <div className="flex-1 flex flex-col min-w-0">
                            <Header setIsOpen={setIsSidebarOpen} />
                            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
