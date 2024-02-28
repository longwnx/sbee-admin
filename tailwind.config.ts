import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#C5AE8F',
        primary600: '#B19D81',
        gray25: '#FCFCFD',
        gray50: '#F9FAFB',
        gray100: '#F2F4F7',
        gray200: '#EAECF0',
        gray250: '#E3E3E3',
        gray300: '#D0D5DD',
        gray350: '#D4D4D4',
        gray400: '#98A2B3',
        gray500: '#667085',
        gray600: '#475467',
        gray700: '#344054',
        gray800: '#1D2939',
        gray900: '#101828',
        gray960: '#0C1226',
        blue500: '#2E90FA',
        blueLight500: '#0BA5EC',
        blueDark600: '#155EEF',
        error500: '#F04438',
        success500: '#12B76A',
        success501: '#11BA4A',
        neutral02: '#F4F4F4',
        neutral03: '#EFEFEF',
        neutral04: '#EEEFF2',
        neutral05: '#7F8596',
        neutral08: '#22252D',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
export default config
