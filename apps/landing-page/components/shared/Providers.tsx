'use client';

import * as React from 'react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';
import { ErrorBoundary } from './ErrorBoundary';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: Omit<ThemeProviderProps, 'children'>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    return (
        <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...themeProps}>
                {children}
            </ThemeProvider>
        </ErrorBoundary>
    );
}
