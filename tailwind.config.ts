import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Actual color values are defined in `assets/css/main.css`.
        // Use these semantic color names in your utility classes - for example: 
        // primary: 'hsl(var(--primary))',
        // ...
      },
      fontFamily: {
        // project uses @nuxt/fonts
        // add Google fonts here to define font families
        // do not add @import here or in main.css
        // sans: ['font-name', 'fallback-font-name'],
        // serif: ['font-name', 'fallback-font-name'],
        // mono: ['font-name', 'fallback-font-name'],
      },
    },
  },
  plugins: [typography],
}