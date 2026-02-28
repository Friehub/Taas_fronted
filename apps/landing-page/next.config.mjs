import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
};

export default nextConfig;
