'use client';

import * as React from 'react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';
import { WagmiProvider, type Config } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary';

const queryClient = new QueryClient();

export interface ProvidersProps {
    children: React.ReactNode;
    wagmiConfig: Config;
    themeProps?: Omit<ThemeProviderProps, 'children'>;
}

export function Providers({ children, wagmiConfig, themeProps }: ProvidersProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...themeProps}>
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
                    </QueryClientProvider>
                </WagmiProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
