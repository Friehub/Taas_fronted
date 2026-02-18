import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Force Webpack since we have custom aliases (Next.js 16 requirement)
    turbopack: {},
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pbs.twimg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pbs.twimg.com https://abs.twimg.com; font-src 'self'; connect-src 'self' https://taas.friehub.cloud https://api.friehub.cloud https://*.walletconnect.com https://*.walletconnect.org;",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/overview',
            },
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
            },
        ]
    },
    transpilePackages: ['@friehub/data-feeds', '@friehub/recipes', '@friehub/execution-engine'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
            {
                protocol: 'https',
                hostname: 'abs.twimg.com',
            },
            {
                protocol: 'https',
                hostname: 'api.twitter.com',
            }
        ]
    },
    webpack: (config, { isServer }) => {
        const path = require('path');
        // Force wagmi and react-query to resolve to the app's node_modules
        config.resolve.alias['wagmi'] = path.resolve(process.cwd(), 'node_modules/wagmi');
        config.resolve.alias['@tanstack/react-query'] = path.resolve(process.cwd(), 'node_modules/@tanstack/react-query');
        config.resolve.alias['@react-native-async-storage/async-storage'] = false;

        // Ignore react-native specific modules that Metamask SDK tries to import in the browser
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                '@react-native-async-storage/async-storage': false,
            };
        }

        return config;
    }
};

export default nextConfig;
