import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useGetPartnerAccount, usePartnerIdDetails } from '@/composables/modules/partners/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const configs = ref({} as Record<string, any>)

export const usePartnerConfigs = () => {
    const getPartnerConfigs = async (partner_sid:string) => {
        loading.value = true
        // const partnerId = useRoute().params.id as string
        // const { selectedPartner } = usePartnerIdDetails()
        const res = await partners_api.$_get_partner_config(partner_sid) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            configs.value = res.data?.data
        }
        loading.value = false
    }

    return { loading, getPartnerConfigs, configs }
}
