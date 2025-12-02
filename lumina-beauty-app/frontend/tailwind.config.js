/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'neon-glow': 'neonGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                neonGlow: {
                    '0%, 100%': {
                        boxShadow: '0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
                    },
                    '50%': {
                        boxShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 0 30px rgba(139, 92, 246, 0.5)'
                    },
                },
            },
        },
    },
    plugins: [],
}
