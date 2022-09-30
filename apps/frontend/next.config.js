// const withTM = require('next-transpile-modules')(['@repo/common']);

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
            // domains: ['images.unsplash.com'],
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                    pathname: '/**'
                },
                {
                    protocol: 'https',
                    hostname: '**.w3s.link'
                }]
        },
    },
    future: {
        webpack5: true
    },
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
        config.module.rules.push({
            test: /\.(ts)x?$/, // Just `tsx?` file only
            use: [
                // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
                {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        onlyCompileBundledFiles: true,
                    },
                },
            ],
        });
        return config
    }
}

module.exports = nextConfig
