import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'

const banner_details = ref({} as Record<string, any>)
const loading = ref(false)

export const useBannerDetails = () => {
    const getBannerDetails = async (banner_id: number|string) => {
        loading.value = true
        const res = await campaigns_api.$_get_banner_details(Number(banner_id)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            banner_details.value = res.data?.id ? res?.data : {}
        }
        loading.value = false
    }

    return { loading, banner_details, getBannerDetails }
}
