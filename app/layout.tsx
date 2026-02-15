'use client';

import './globals.css';
import { Sidebar, Header, cn } from '../components/AppLayout';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmi';

const queryClient = new QueryClient();

import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLanding = pathname === '/' || pathname === '/docs';

    return (
        <html lang="en">
            <body className="antialiased selection:bg-yellow-500/30 selection:text-white bg-[#000000] text-white">
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <div className="flex min-h-screen">
                            {!isLanding && <Sidebar />}
                            <div className="flex-1 flex flex-col min-w-0">
                                {!isLanding && <Header />}
                                <main className={cn("flex-1 overflow-y-auto", !isLanding ? "p-8" : "p-0")}>
                                    {children}
                                </main>
                            </div>
                        </div>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
