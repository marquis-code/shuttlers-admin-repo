import { promotions_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedPromotion = ref({} as Record<string, any>)
const selectedPromoId = ref('')

export const usePromoIdDetails = () => {
    const loading = ref(false)

    const getPromoById = async (id: string) => {
        selectedPromoId.value = id
        loading.value = true
        const res = await promotions_api.$_get_promotions_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedPromotion.value = res.data
        }
        loading.value = false
    }
    return { selectedPromotion, loading, getPromoById }
}
