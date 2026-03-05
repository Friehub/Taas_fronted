// Shared types and utilities for FTS dashboard

export interface NetworkStats {
    totalRequests: number;
    activeFeeds: number;
    totalStaked: number;
    avgLatency: number;
    totalNodes?: number;
    sentinelNodes?: number;
    challengerNodes?: number;
}

export interface AppConfig {
    contracts: {
        SOURCE_REGISTRY: string;
        NODE_REGISTRY: string;
        TRUTH_ORACLE: string;
        T_TOKEN: string;
        HLS_FAUCET: string;
    };
    network: string;
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

export interface PublicStatus {
    status: string;
    lastUpdate: string;
    uptime: number;
    blockHeight: number;
    services: {
        api: string;
        indexer: string;
        gateways: Record<string, string>;
    };
}

// API Configuration
const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'https://taas.friehub.cloud';
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.friehub.cloud';
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || BACKEND_URL;

// Decentralized Contract Addresses (Fallbacks)
export const T_TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_T_TOKEN_ADDRESS || '0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F') as `0x${string}`;
export const HLS_FAUCET_ADDRESS = (process.env.NEXT_PUBLIC_HLS_FAUCET_ADDRESS || T_TOKEN_ADDRESS) as `0x${string}`;

// Authenticated Fetch Helper
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('friehub_auth_token') : null;

    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, { ...options, headers });
}

// API Functions
export async function fetchStats(): Promise<NetworkStats> {
    try {
        const res = await fetch(`${BACKEND_URL}/nodes/stats`);
        if (!res.ok) throw new Error('Backend unreachable');
        const json = await res.json();
        return json.data;
    } catch (e) {
        console.error('Failed to fetch stats:', e);
        return {
            totalRequests: 0,
            activeFeeds: 0,
            totalStaked: 0,
            avgLatency: 0,
            sentinelNodes: 0
        };
    }
}

export async function fetchActivity(): Promise<ActivityItem[]> {
    try {
        const res = await fetch(`${GATEWAY_URL}/gateway/truth/recent?limit=10`);
        if (!res.ok) throw new Error('Gateway unreachable');
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        console.error('Failed to fetch activity:', e);
        return [];
    }
}

// Auth Functions
export async function getSiweNonce(address: string): Promise<string> {
    const res = await fetch(`${BACKEND_URL}/auth/siwe/nonce/${address}`);
    if (!res.ok) throw new Error('Failed to get nonce');
    const json = await res.json();
    return json.nonce;
}

export async function verifySiwe(message: string, signature: string): Promise<string> {
    const res = await fetch(`${BACKEND_URL}/auth/siwe/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature })
    });
    if (!res.ok) throw new Error('Failed to verify SIWE');
    const json = await res.json();
    if (json.token) {
        localStorage.setItem('friehub_auth_token', json.token);
    }
    return json.token;
}

export async function nodeLogin(address: string, signature: string, message: any): Promise<string> {
    const res = await fetch(`${BACKEND_URL}/auth/nodes/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, message })
    });
    if (!res.ok) throw new Error('Node login failed');
    const json = await res.json();
    return json.token;
}

export async function fetchConfig(): Promise<AppConfig> {
    const res = await fetch(`${BACKEND_URL}/gateway/config`);
    if (!res.ok) throw new Error('Failed to fetch config');
    const json = await res.json();
    return json;
}

export function useConfig() {
    const { data, error, isLoading } = useSWR<AppConfig>('/gateway/config', fetchConfig, {
        revalidateOnFocus: false,
        shouldRetryOnError: false
    });

    // Merge with decentralized defaults
    const mergedConfig: AppConfig = {
        contracts: {
            SOURCE_REGISTRY: data?.contracts?.SOURCE_REGISTRY || '',
            NODE_REGISTRY: data?.contracts?.NODE_REGISTRY || '',
            TRUTH_ORACLE: data?.contracts?.TRUTH_ORACLE || '',
            T_TOKEN: data?.contracts?.T_TOKEN || T_TOKEN_ADDRESS,
            HLS_FAUCET: data?.contracts?.HLS_FAUCET || HLS_FAUCET_ADDRESS
        },
        network: data?.network || 'Helios Testnet'
    };

    return { config: mergedConfig, error, isLoading: isLoading && !data };
}

export async function fetchHealth(): Promise<PublicStatus> {
    const res = await fetch(`${BACKEND_URL}/status/public`);
    if (!res.ok) throw new Error('Failed to fetch health');
    const json = await res.json();
    return json;
}

export function useHealth() {
    const { data, error, isLoading } = useSWR<PublicStatus>('/status/public', fetchHealth, {
        refreshInterval: 5000 // Refresh every 5s
    });
    return { health: data, error, isLoading };
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
    try {
        const res = await fetch(`${INDEXER_URL}/sources`);
        if (!res.ok) throw new Error('Indexer unreachable');
        const json = await res.json();

        return json.data.map((source: any) => ({
            id: source.sourceId,
            name: `Source ${source.sourceId.slice(0, 8)}`,
            category: source.category || 'General',
            description: source.endpoint,
            creator: source.owner,
            createdAt: new Date(source.registeredAt).getTime(),
            usageCount: source.metrics?.totalFetches || 0
        }));
    } catch (e) {
        console.error('Failed to fetch recipes:', e);
        return [];
    }
}

export interface ApiKey {
    id: string;
    name: string;
    token_hash?: string; // Only provided on creation
    expires_at: string | null;
    status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
    created_at: string;
}

export function useApiKeys() {
    const { data, error, isLoading, mutate } = useSWR<ApiKey[]>('/auth/api-keys', async (url: string) => {
        const res = await authenticatedFetch(`${BACKEND_URL}${url}`);
        if (!res.ok) throw new Error('Failed to fetch API keys');
        const json = await res.json();
        return json.data;
    });

    return {
        apiKeys: data || [],
        isLoading,
        isError: error,
        mutate
    };
}

export async function createApiKey(name: string, expiresInDays: number | null): Promise<ApiKey> {
    const res = await authenticatedFetch(`${BACKEND_URL}/auth/api-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expiresInDays })
    });
    if (!res.ok) throw new Error('Failed to create API key');
    const json = await res.json();
    return json.data;
}

export async function revokeApiKey(keyId: string): Promise<void> {
    const res = await authenticatedFetch(`${BACKEND_URL}/auth/api-keys/${keyId}/revoke`, {
        method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to revoke API key');
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
