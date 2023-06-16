/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#4876FF',
                secondary: '#CAFD50'
            },
            maxHeight: {
                answer: '600px'
            },
            width: {
                'title-mobile': '336px',
                'title-desktop': '579px'
            }
        }
    },
    plugins: []
}
