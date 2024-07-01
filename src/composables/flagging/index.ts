// composables/useFeatureFlag.js

import { UnleashClient } from 'unleash-proxy-client'

const UNLEASH_KEY = import.meta.env.VITE_UNLEASH_KEY as string

  const unleashInitialized = ref(false)
  const featureFlags = ref({})
let unleash

export const useFeatureFlag = () => {
const initializeUnleash = () => {
    return new Promise((resolve, reject) => {
      try {
        unleash = new UnleashClient({
          url: 'https://unleash.shuttlers.africa/api/frontend',
          clientKey: UNLEASH_KEY,
          appName: 'shuttlers-admin'
        })

        unleash.on('ready', () => {
          unleashInitialized.value = true
          resolve(true)
        })

        unleash.start()
      } catch (error) {
        reject(error)
      }
    })
  }

 const getFeatureFlag = (name, retryInterval = 1000, maxRetries = 50) => {
    const tryGetFeatureFlag = (retries) => {
      if (unleashInitialized.value) {
        return unleash.isEnabled(name)
      }
      if (retries <= 0) {
        return null
      }
      setTimeout(() => tryGetFeatureFlag(retries - 1), retryInterval)
    }

    return tryGetFeatureFlag(maxRetries)
  }

  return {
    getFeatureFlag, initializeUnleash
  }
}
