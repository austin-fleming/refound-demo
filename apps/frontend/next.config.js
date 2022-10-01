/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        images: {
            images: {
                domains: ['dive.google.com', 'www.toby-binder.de', 'www.birdlife.org', 'avatars.githubusercontent.com'],
            },
            // domains: ['images.unsplash.com'],
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                    pathname: '/**'
                },
                {
                    protocol: 'https',
                    hostname: 'drive.google.com',
                    pathname: '/**'
                },
                {
                    protocol: 'https',
                    hostname: '**.w3s.link'
                },
                {
                    protocol: 'https',
                    hostname: '**.arweave.net',
                    pathname: '/**'
                }]
        },
    },
    /* future: {
        webpack5: true
    }, */
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            child_process: false,
            readline: false
            /* net: false,
            child_process: false,
            readline: false */
        }
        return config
    }
}

module.exports = nextConfig
