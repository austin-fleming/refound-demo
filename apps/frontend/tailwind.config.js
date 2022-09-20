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
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./modules/**/*.{js,ts,jsx,tsx}",
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
                headerBottomHeight: 'var(--l-header-bottom-height)',
            },
        },
    },
    daisyui: {
        theme: ['lofi']
    },
    plugins: [require('@tailwindcss/forms'), require("@tailwindcss/typography"), require('daisyui')],
}
