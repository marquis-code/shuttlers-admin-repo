// composables/useFeatureFlag.js

import { ref, onMounted } from 'vue'
import { UnleashClient } from 'unleash-proxy-client'

const UNLEASH_KEY = import.meta.env.VITE_UNLEASH_KEY as string

export function useFeatureFlag() {
  const unleashInitialized = ref(false)
  const featureFlags = ref({})
  let unleash

  onMounted(() => {
 unleash = new UnleashClient({
    url: 'https://unleash.shuttlers.africa/',
    clientKey: UNLEASH_KEY,
   appName: 'shuttlers'

 })

    unleash.on('synchronized', () => {
      featureFlags.value = unleash.getFeatureToggleDefinitions()
      unleashInitialized.value = true
    })

    // unleash.start()
  })

  const getFeatureFlag = (name) => {
    if (!unleashInitialized.value) {
      console.warn('Unleash is not initialized yet')
      return null
    }
    console.log(name)
    console.log(unleash.isEnabled(name))
    return unleash.isEnabled(name)
  }

  return {
    getFeatureFlag
  }
}
