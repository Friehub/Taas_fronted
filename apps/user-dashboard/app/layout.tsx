'use client';

import './main.css';
import { Toaster } from 'sonner';
import { Sidebar, Header } from '../components/AppLayout';
import { cn } from '@/lib/utils';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';

import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { AuthGuard } from '../components/AuthGuard';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300">
                <Providers wagmiConfig={config}>
                    <AuthGuard>
                        <Toaster richColors position="top-right" />
                        <div className="flex min-h-screen bg-background relative">
                            {!isLoginPage && (
                                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                            )}
                            <div className="flex-1 flex flex-col min-w-0">
                                {!isLoginPage && (
                                    <Header setIsOpen={setIsSidebarOpen} />
                                )}
                                <main className={cn(
                                    "flex-1 overflow-y-auto",
                                    !isLoginPage ? "p-4 md:p-8" : "p-0"
                                )}>
                                    {children}
                                </main>
                            </div>
                        </div>
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
