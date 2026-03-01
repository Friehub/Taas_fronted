'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-[200px] flex items-center justify-center p-6 bg-red-50/5 border border-red-500/20 rounded-2xl">
                    <div className="text-center">
                        <h2 className="text-sm font-black text-red-500 uppercase tracking-widest mb-2">Something went wrong</h2>
                        <p className="text-[10px] text-foreground/40 font-medium uppercase tracking-widest">The application encountered an unexpected error.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors"
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
