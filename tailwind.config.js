/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'pulse-glow': 'pulse-glow 3s infinite',
                'kenburns': 'kenburns 15s linear infinite',
            },
            keyframes: {
                'fade-in-up': {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.5', transform: 'scale(1.05)' },
                },
                'kenburns': {
                    '0%': { transform: 'scale(1)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '40%': { opacity: '1' },
                    '50%': { transform: 'scale(1.1)', opacity: '0' },
                    '100%': { opacity: '0' },
                }
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
