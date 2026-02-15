// Shared types and utilities for TaaS dashboard

export interface NetworkStats {
    totalRequests: number;
    activeFeeds: number;
    totalStaked: number;
    avgLatency: number;
    totalNodes?: number;
    sentinelNodes?: number;
    challengerNodes?: number;
}

export interface ActivityItem {
    id: string;
    recipeName: string;
    timestamp: number;
    txHash: string;
    outcome: Outcome;
    status: 'pending' | 'active' | 'disputed' | 'finalized';
}

export interface Outcome {
    type: 'BINARY' | 'SCALAR' | 'CATEGORICAL' | 'PROBABILISTIC' | 'INVALID';
    value?: number | string;
    unit?: string;
    options?: string[];
    probability?: number;
    reasoning?: string;
    confidence?: number;
    metadata?: Record<string, any>;
}

// API Configuration
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'https://taas.friehub.cloud';
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.friehub.cloud';

// API Functions
export async function fetchStats(): Promise<NetworkStats> {
    try {
        const res = await fetch(`${INDEXER_URL}/stats`);
        if (!res.ok) throw new Error('Indexer unreachable');
        const json = await res.json();
        return json.data; // Indexer wraps in { success: true, data: ... }
    } catch (e) {
        console.warn('Using mock stats due to error:', e);
        return {
            totalRequests: 124500,
            activeFeeds: 42,
            totalStaked: 1000000,
            avgLatency: 0.8
        };
    }
}

export async function fetchActivity(): Promise<ActivityItem[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/notifications?user=ALL`);
        if (!res.ok) throw new Error('Backend unreachable');
        return res.json();
    } catch (e) {
        console.warn('Using mock activity due to error:', e);
        return [
            {
                id: '1',
                recipeName: 'ETH/BTC Flippening',
                timestamp: Date.now() - 3600000,
                txHash: '0x123...456',
                outcome: { type: 'BINARY', value: 'NO' },
                status: 'finalized'
            }
        ];
    }
}

// Hooks
import useSWR from 'swr';

export function useStats() {
    const { data, error, isLoading } = useSWR<NetworkStats>('/api/admin/stats', fetchStats, {
        refreshInterval: 10000 // Refresh every 10s
    });

    return {
        stats: data,
        isLoading,
        isError: error
    };
}

export function useActivity() {
    const { data, error, isLoading } = useSWR<ActivityItem[]>('/api/notifications', fetchActivity, {
        refreshInterval: 5000 // Refresh every 5s
    });

    return {
        activity: data,
        isLoading,
        isError: error
    };
}

// Recipe-related types and hooks
export interface Recipe {
    id: string;
    name: string;
    category: string;
    description: string;
    creator: string;
    createdAt: number;
    usageCount?: number;
}

async function fetchRecipes(): Promise<Recipe[]> {
    // TODO: Connect to actual API endpoint
    // For now, return mock data
    return [];
}

export function useRecipes() {
    const { data, error, isLoading } = useSWR<Recipe[]>('/api/recipes', fetchRecipes, {
        refreshInterval: 30000 // Refresh every 30s
    });

    return {
        recipes: data || [],
        isLoading,
        isError: error
    };
}

// Formatters
export function formatNumber(num: number): string {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    } else if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toString();
}

export function formatCurrency(amount: number): string {
    if (amount >= 1_000_000) {
        return `$${(amount / 1_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000) {
        return `$${(amount / 1_000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(2)}`;
}

export function formatTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}
