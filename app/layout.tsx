'use client';

import './globals.css';
import { Sidebar, Header } from '../components/AppLayout';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmi';

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased selection:bg-yellow-500/30 selection:text-white bg-[#000000] text-white">
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <div className="flex min-h-screen">
                            <Sidebar />
                            <div className="flex-1 flex flex-col min-w-0">
                                <Header />
                                <main className="flex-1 p-8 overflow-y-auto">
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
