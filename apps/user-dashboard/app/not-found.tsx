'use client';

import { getLandingUrl } from '../lib/shared/url-manager';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';
import { Sidebar, Header } from '../components/AppLayout';
import { useState } from 'react';

export default function NotFound() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <html lang="en">
            <body className="antialiased bg-background text-foreground">
                <Providers wagmiConfig={config}>
                    <div className="flex min-h-screen bg-background relative">
                        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                        <div className="flex-1 flex flex-col min-w-0">
                            <Header setIsOpen={setIsSidebarOpen} />
                            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
                                    <p className="text-sm text-muted-foreground">Could not find requested resource</p>
                                </div>
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
