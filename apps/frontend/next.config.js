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
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [{
            protocol: 'https',
            port: '',
            hostname: '**.ipfs.dweb.link'
        }]
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
