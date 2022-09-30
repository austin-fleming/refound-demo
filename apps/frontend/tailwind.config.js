/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

const withOpacityValue = (variable) => ({ opacityValue }) => {
    if (opacityValue === undefined) {
        return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: withOpacityValue('--c-background'),
                    less: withOpacityValue('--c-background--less'),
                    lesser: withOpacityValue('--c-background--lesser'),
                },
                primary: {
                    DEFAULT: withOpacityValue('--c-primary'),
                    less: withOpacityValue('--c-primary--less'),
                    lesser: withOpacityValue('--c-primary--lesser'),
                },
                trustLevel: {
                    trusted: {
                        bg: 'var(--c-trust-trusted-bg)',
                        fg: 'var(--c-trust-trusted-fg)',
                    },
                    verified: {
                        bg: 'var(--c-trust-verified-bg)',
                        fg: 'var(--c-trust-verified-fg)',
                    },
                    none: {
                        bg: 'var(--c-trust-none-bg)',
                        fg: 'var(--c-trust-none-fg)',
                    }
                }
            },
            fontFamily: {
                // 'sans': ['Manrope', ...defaultTheme.fontFamily.sans]
                'sans': ['primary-family', ...defaultTheme.fontFamily.sans]
            },
            maxWidth: {
                container: `var(--l-max-content-width)`,
                'container-narrow': `var(--l-max-content-width--narrow)`,
            },
            spacing: {
                contentPadding: 'var(--l-content-padding)',
                sitegap: '32px', // TODO: remove?
                sitepad: '2rem', // TODO: remove?
                sitebottom: '8rem', // TODO: remove?
                headerTopHeight: 'var(--l-header-top-height)',
                adjustedFullHeight: 'var(--l-adjusted-full-height)',
            },
            keyframes: {
                toastProgress: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' }
                }
            },
            animation: {
                toastProgress: 'toastProgress 5s linear infinite'
            }
        },
    },
    daisyui: {
        themes: [
            {
                refound: {
                    "primary": "#0D0D0D",
                    "primary-content": "#ffffff",
                    "secondary": "#1A1919",
                    "secondary-content": "#ffffff",
                    "accent": "#262626",
                    "accent-content": "#ffffff",
                    "neutral": "#000000",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#F2F2F2",
                    "base-300": "#E6E5E5",
                    "base-content": "#000000",
                    "info": "#0070F3",
                    "info-content": "#ffffff",
                    "success": "#21CC51",
                    "success-content": "#ffffff",
                    "warning": "#FF6154",
                    "warning-content": "#ffffff",
                    "error": "#DE1C8D",
                    "error-content": "#ffffff",
                    "--rounded-box": "0.25rem",
                    "--rounded-btn": "0.125rem",
                    "--rounded-badge": "0.125rem",
                    "--animation-btn": "0",
                    "--animation-input": "0",
                    "--btn-focus-scale": "1",
                    "--tab-radius": "0",
                    "--btn-text-case": "normal"
                }
            }
        ]
    },
    plugins: [require('@tailwindcss/forms'), require("@tailwindcss/typography"), require('daisyui')],
}
