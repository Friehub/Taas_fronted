import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Friehub | The High-Fidelity Decentralized Oracle Network',
    description: 'Secure, scaled, and sovereign. TaaS provides sub-second resolution and absolute integrity for next-generation dApps and builders.',
    openGraph: {
        title: 'Friehub | The High-Fidelity Decentralized Oracle Network',
        description: 'Secure, scaled, and sovereign. TaaS provides sub-second resolution and absolute integrity.',
        url: 'https://friehub.cloud',
        siteName: 'Friehub',
        images: [
            {
                url: 'https://friehub.cloud/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Friehub | Verifiable Truth Infrastructure',
        description: 'The high-fidelity decentralized oracle network for builders requiring absolute integrity.',
        images: ['https://friehub.cloud/og-image.png'],
    },
};

import './main.css';
import { Providers } from '../components/shared/Providers';
import { SmoothScroll } from '../components/shared/SmoothScroll';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300">
                <SmoothScroll />
                <Providers themeProps={{ attribute: "class", defaultTheme: "system", enableSystem: true }}>
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
