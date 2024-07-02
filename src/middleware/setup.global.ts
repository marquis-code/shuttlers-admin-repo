import { useFeatureFlag } from '@/composables/flagging'

const { initializeUnleash, unleashInitialized } = useFeatureFlag()

export default async function setup(route: any) {
    if (unleashInitialized.value) return
    await initializeUnleash()
}
