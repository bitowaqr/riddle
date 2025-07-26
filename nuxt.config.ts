export default defineNuxtConfig({
  app: {
    head: {
      title: 'A Riddle',
      meta: [
        { name: 'description', content: 'A series of challenges to test your wits.' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❓</text></svg>' }
      ]
    },
    css: ['~/assets/css/main.css'],
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: {
    typeCheck: false
  },
  ssr: false,
  fonts: {
    defaults: {
      weight: ['200', '300', '400', '500', '600', '700', '800'],
      style: ['normal', 'italic'],
      subsets: ['latin'],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '~/modules/error-checker'
  ],
  nitro: {
    output: {
      publicDir: './docs'
    }
  }
})