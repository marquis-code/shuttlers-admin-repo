import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { usePagination } from '@/composables/utils/table'

const loading_carousels = ref(false)
    const carouselsList = ref([] as Record<string, any>[])

export const use_get_carousels = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()

    const getCarousels = async () => {
        loading_carousels.value = true
        const res = await campaigns_api.$_get_carousels(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            carouselsList.value = res.data
        }
        loading_carousels.value = false
    }
    setFunction(getCarousels)
    return { getCarousels, loading_carousels, carouselsList, prev, ...metaObject, next, moveTo }
}
