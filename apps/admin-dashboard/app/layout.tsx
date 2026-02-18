'use client';

import './main.css';
import { Sidebar, Header } from '../components/AppLayout';
import { cn } from '../lib/shared/utils';
import { Providers } from '../components/shared/Providers';
import { AdminAuthGate } from '../components/AdminAuthGate';
import { config } from '../lib/wagmi';

import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLanding = pathname === '/' || pathname === '/docs';

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300">
                <Providers wagmiConfig={config}>
                    <AdminAuthGate>
                        <div className="flex min-h-screen bg-background">
                            <Sidebar />
                            <div className="flex-1 flex flex-col min-w-0">
                                <Header />
                                <main className="flex-1 overflow-y-auto p-8">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </AdminAuthGate>
                </Providers>
            </body>
        </html>
    );
}
