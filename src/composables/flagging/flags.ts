import { useFeatureFlag } from '@/composables/flagging'

const { getFeatureFlag } = useFeatureFlag()

await useFeatureFlag().initializeUnleash()

export const ZeroBookingFlag = () => getFeatureFlag('ZeroBookingSharedRouteWeb')
export const NewEarningsFlag = () => getFeatureFlag('NewEarningsWeb')
export const ShouldUseGoogleMaps = () => getFeatureFlag('ShouldUseGoogleMaps')
