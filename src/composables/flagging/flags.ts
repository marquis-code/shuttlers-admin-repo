import { useFeatureFlag } from '@/composables/flagging'

const { getFeatureFlag, initializeUnleash } = useFeatureFlag()

await initializeUnleash()
export const ZeroBookingFlag = getFeatureFlag('ZeroBookingSharedRouteWeb')
