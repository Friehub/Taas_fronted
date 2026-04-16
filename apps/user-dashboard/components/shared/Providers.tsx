'use client';

import * as React from 'react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';
import { WagmiProvider, type Config } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary';

import { StoreProvider } from '../../lib/store/provider';

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
        <StoreProvider>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...themeProps}>
                        <ErrorBoundary>
                            {mounted ? children : (
                                <div suppressHydrationWarning style={{ visibility: 'hidden' }}>
                                    {children}
                                </div>
                            )}
                        </ErrorBoundary>
                    </ThemeProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </StoreProvider>
    );
}
