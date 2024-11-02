// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    apiKey: '', // can be overridden by NUXT_API_KEY environment variable
    apiUrl: '', // can be overridden by NUXT_API_URL envorinment variable
    public: {
      apiKey: '',
      apiUrl: '',
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt',],
})