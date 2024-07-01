import { useFeatureFlag } from '@/composables/flagging'

const { getFeatureFlag } = useFeatureFlag()

export const ZeroBookingFlag = () => getFeatureFlag('ZeroBookingSharedRouteWeb')
