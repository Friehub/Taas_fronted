'use client';

import './main.css';
import { Toaster } from 'sonner';
import { Sidebar, Header } from '../components/AppLayout';
import { cn } from '@/lib/utils';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';

import { usePathname, useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/login';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('friehub_auth_token');
        if (!token && !isLoginPage) {
            router.push('/login');
        } else if (token && isLoginPage) {
            router.push('/');
        }
    }, [pathname, isLoginPage, router]);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300 font-sans">
                <Providers wagmiConfig={config}>
                    <Toaster richColors position="top-right" />
                    <div className="flex min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
                        {!isLoginPage && (
                            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                        )}
                        <div className="flex-1 flex flex-col min-w-0">
                            {!isLoginPage && (
                                <Header setIsOpen={setIsSidebarOpen} />
                            )}
                            <main className={cn(
                                "flex-1 overflow-y-auto min-h-0",
                                !isLoginPage ? "p-6 md:p-12 lg:p-16 xl:p-20" : "p-0"
                            )}>
                                {children}
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
