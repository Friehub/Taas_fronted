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
    return (
        <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...themeProps}>
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </WagmiProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
