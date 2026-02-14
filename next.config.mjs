/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
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
    }
};

export default nextConfig;
