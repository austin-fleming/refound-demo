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
        // TODO: remove once mocks are done
        domains: ['images.unsplash.com']
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
