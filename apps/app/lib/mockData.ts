import { Outcome } from '../components/OutcomeDisplay';

// Types
export interface Recipe {
    id: string;
    name: string;
    description: string;
    category: 'Crypto' | 'Sports' | 'Economics' | 'Custom';
    frequency: number; // in seconds
    cost: number; // in TAAS
    status: 'active' | 'paused' | 'deprecated';
    outcomeType: 'BINARY' | 'SCALAR' | 'CATEGORICAL' | 'PROBABILISTIC';
    icon?: string;
}

export interface ActivityItem {
    id: string;
    recipeId: string;
    recipeName: string;
    timestamp: string;
    outcome: Outcome;
    txHash: string;
}

// Mock Data
export const MOCK_RECIPES: Recipe[] = [
    {
        id: 'btc-price-daily',
        name: 'BTC > $100k Confirm',
        description: 'Verifies if Bitcoin price exceeds $100,000 USD on daily close via Multi-Source Consensus.',
        category: 'Crypto',
        frequency: 86400,
        cost: 5,
        status: 'active',
        outcomeType: 'BINARY',
        icon: 'Bitcoin'
    },
    {
        id: 'eth-gas-tracker',
        name: 'ETH Gas Price Oracle',
        description: 'Provides the current average Ethereum gas price in Gwei every 10 minutes.',
        category: 'Crypto',
        frequency: 600,
        cost: 1,
        status: 'active',
        outcomeType: 'SCALAR',
        icon: 'Zap'
    },
    {
        id: 'super-bowl-winner',
        name: 'Super Bowl LIX Winner',
        description: 'Determines the winning team of Super Bowl LIX.',
        category: 'Sports',
        frequency: 0, // One-time
        cost: 50,
        status: 'active',
        outcomeType: 'CATEGORICAL',
        icon: 'Trophy'
    },
    {
        id: 'fed-rate-hike',
        name: 'Fed Rate Hike Probability',
        description: 'AI-analyzed probability of a Federal Reserve rate hike in the next meeting.',
        category: 'Economics',
        frequency: 604800, // Weekly
        cost: 25,
        status: 'active',
        outcomeType: 'PROBABILISTIC',
        icon: 'TrendingUp'
    },
    {
        id: 'political-sentiment',
        name: 'Election Sentiment Analysis',
        description: 'Aggregates social sentiment for upcoming election candidates.',
        category: 'Custom',
        frequency: 3600,
        cost: 10,
        status: 'paused',
        outcomeType: 'SCALAR',
        icon: 'Users'
    }
];

export const MOCK_ACTIVITY: ActivityItem[] = [
    {
        id: 'act-1',
        recipeId: 'btc-price-daily',
        recipeName: 'BTC > $100k Confirm',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        outcome: { type: 'BINARY', value: 0, confidence: 0.99 }, // No
        txHash: '0x123...abc'
    },
    {
        id: 'act-2',
        recipeId: 'eth-gas-tracker',
        recipeName: 'ETH Gas Price Oracle',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        outcome: { type: 'SCALAR', value: 14.5, unit: 'Gwei', confidence: 0.95 },
        txHash: '0x456...def'
    },
    {
        id: 'act-3',
        recipeId: 'fed-rate-hike',
        recipeName: 'Fed Rate Hike Probability',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        outcome: {
            type: 'PROBABILISTIC',
            probability: 0.25,
            reasoning: 'Inflation data came in lower than expected, reducing pressure for a hike.'
        },
        txHash: '0x789...ghi'
    },
    {
        id: 'act-4',
        recipeId: 'invalid-request-test',
        recipeName: 'Who will be president in 2050?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        outcome: {
            type: 'INVALID',
            reasoning: 'Event is too far in the future to determine.',
            metadata: { correction: 'Ask about the 2028 election instead.' }
        },
        txHash: '0xabc...123'
    }
];

export const MOCK_STATS = {
    totalRequests: 14502,
    activeNodes: 42,
    totalStaked: 450000,
    avgLatency: 1.2
};

// Data Provider Helper
export async function fetchData<T>(endpoint: string, mockData: T): Promise<T> {
    try {
        // Try to fetch from real API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s timeout

        const res = await fetch(`/api${endpoint.replace('/api', '')}`, {
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' }
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error('API Error');
        return await res.json();
    } catch (e) {
        // Fallback to mock data
        console.warn(`[MockData] Using fallback for ${endpoint}`);
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData;
    }
}
