'use client';

import { http, createConfig } from 'wagmi';
import { createClient } from 'viem';

// Helios Testnet configuration
export const heliosChain = {
    id: 42000,
    name: 'Helios Testnet',
    nativeCurrency: { name: 'Helios', symbol: 'HLS', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.helios.frii.site'] },
        public: { http: ['https://rpc.helios.frii.site'] },
    },
    blockExplorers: {
        default: { name: 'Helios Explorer', url: 'https://explorer.helios.frii.site' },
    },
} as const;

export const config = createConfig({
    chains: [heliosChain as any],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    },
});
