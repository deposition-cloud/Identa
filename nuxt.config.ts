export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY ?? ''
  }
})
