import { useFeatureFlag } from '@/composables/flagging'

const { getFeatureFlag } = useFeatureFlag()

await useFeatureFlag().initializeUnleash()

export const ZeroBookingFlag = () => getFeatureFlag('ZeroBookingSharedRouteWeb')
export const NewEarningsFlag = () => getFeatureFlag('NewEarningsWeb')
export const ShouldUseGoogleMaps = () => getFeatureFlag('ShouldUseGoogleMaps')
export const AdminCanUpdatePartnerKYC = () => getFeatureFlag('AdminCanUpdatePartnerKYC')
export const AdminCanAttachPartnerDeductions = () => getFeatureFlag('AdminCanAttachPartnerDeductions')
export const AllowWeeklyAndMonthlyEarningPeriod = () => getFeatureFlag('AllowWeeklyAndMonthlyEarningPeriod')
