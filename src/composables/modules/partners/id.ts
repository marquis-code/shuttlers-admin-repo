import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedPartner = ref({} as Record<string, any>)
const selectedPartnerId = ref('')

export const usePartnerIdDetails = () => {
    const loading = ref(false)

    const getPartnerById = async (id: string) => {
        selectedPartnerId.value = id
        loading.value = true
        const res = await partners_api.$_get_partner_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedPartner.value = res.data
        }
        loading.value = false
    }
    return { selectedPartner, loading, getPartnerById }
}
