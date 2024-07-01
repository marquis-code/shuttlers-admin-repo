import { useFeatureFlag } from '@/composables/flagging'

const { initializeUnleash } = useFeatureFlag()

export default async function setup(route:any) {
    await initializeUnleash()
}
