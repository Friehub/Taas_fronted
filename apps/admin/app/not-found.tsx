'use client';

import { getLandingUrl } from '../lib/shared/url-manager';
import { Providers } from '../components/shared/Providers';
import { config } from '../lib/wagmi';
import { Sidebar, Header } from '../components/AppLayout';

export default function NotFound() {
    return (
        <html lang="en">
            <body className="antialiased bg-background text-foreground">
                <Providers wagmiConfig={config}>
                    <div className="flex min-h-screen bg-background">
                        <Sidebar />
                        <div className="flex-1 flex flex-col min-w-0">
                            <Header />
                            <main className="flex-1 overflow-y-auto p-8">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h2 className="text-2xl font-bold">Page Not Found</h2>
                                    <p className="text-muted-foreground">Could not find requested resource</p>
                                </div>
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
