import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'

const carousel_details = ref({} as Record<string, any>)
const loading = ref(false)

export const useCarouselDetails = () => {
    const getCarouselDetails = async (carousel_id: number|string) => {
        loading.value = true
        const res = await campaigns_api.$_get_carousel_details(Number(carousel_id)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            carousel_details.value = res.data?.id ? res?.data : {}
        }
        loading.value = false
    }

    return { loading, carousel_details, getCarouselDetails }
}
