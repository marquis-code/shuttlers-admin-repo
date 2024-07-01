// composables/useFeatureFlag.js

import { UnleashClient } from 'unleash-proxy-client'

const UNLEASH_KEY = import.meta.env.VITE_UNLEASH_KEY as string

console.log(UNLEASH_KEY)
export const useFeatureFlag = () => {
  const unleashInitialized = ref(false)
  const featureFlags = ref({})
  let unleash

  onMounted(() => {
 unleash = new UnleashClient({
    url: 'https://unleash.shuttlers.africa/api/frontend',
    clientKey: UNLEASH_KEY,
   appName: 'shuttlers'

 })

    unleash.on('synchronized', () => {
      featureFlags.value = unleash.getFeatureToggleDefinitions()
      unleashInitialized.value = true
    })

    unleash.start()
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
