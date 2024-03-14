import { promotions_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loadingPromotions = ref(false)
const promotionsList = ref([] as any)

export const useGetPromotionsList = () => {
    const { moveTo, metaObject, next, prev } = usePagination()

    const { $_get_promotions } = promotions_api

    const getPromotionsList = async () => {
        loadingPromotions.value = true

        const res = await $_get_promotions(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            promotionsList.value = res.data.models
            metaObject.total.value = res.data.meta?.total
        }
        loadingPromotions.value = false
    }

    return { getPromotionsList, loadingPromotions, promotionsList, moveTo, ...metaObject, next, prev }
}
