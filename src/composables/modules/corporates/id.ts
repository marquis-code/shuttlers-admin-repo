import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedCorporate = ref({} as Record<string, any>)
const selectedCorporateId = ref('')

export const useCorporateIdDetails = () => {
    const loading = ref(false)

    const getCorporateById = async (id: string) => {
        selectedCorporateId.value = id
        loading.value = true
        const res = await corporates_api.$_get_corporate_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedCorporate.value = res.data
        }
        loading.value = false
    }
    return { selectedCorporate, loading, getCorporateById }
}
