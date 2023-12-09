import VueGoogleMaps from 'vue-google-maps-community-fork'
import { defineNuxtPlugin } from '#app'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export default defineNuxtPlugin((nuxtApp) => {
 nuxtApp.vueApp.use(VueGoogleMaps, {
   load: {
     key: GOOGLE_MAPS_API_KEY
   }
 })
})
