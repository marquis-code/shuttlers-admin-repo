import VueGoogleMaps from 'vue-google-maps-community-fork'
import { defineNuxtPlugin } from '#app'
import { useAlert } from '@/composables/core/notification'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export default defineNuxtPlugin((nuxtApp) => {
 // Check if google.maps object already exists
 if (typeof window !== 'undefined' && !window.google?.maps) {
    // Load the Google Maps API
    nuxtApp.vueApp.use(VueGoogleMaps, {
      load: {
        key: GOOGLE_MAPS_API_KEY
      }
    })
 } else {
  useAlert().openAlert({ type: 'SUCCESS', msg: 'Google Maps API already loaded.' })
 }
})
