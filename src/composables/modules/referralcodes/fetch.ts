import { referrals_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetPromotionsList = () => {
    const loadingReferrals = ref(false)
    const referralsList = ref([] as any)
    const { moveTo, metaObject, next, prev } = usePagination()

    const { $_get_referrals } = referrals_api

    const getReferralsList = async () => {
        loadingReferrals.value = true

        const res = await $_get_referrals(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            referralsList.value = res.data.models
            metaObject.total.value = res.data.meta?.total
        }
        loadingReferrals.value = false
    }

    return { getReferralsList, loadingReferrals, referralsList, moveTo, ...metaObject, next, prev }
}
