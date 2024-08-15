import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useGetPartnerAccount } from '@/composables/modules/partners/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const configs = ref({} as Record<string, any>)

export const usePartnerConfigs = () => {
    const getPartnerConfigs = async () => {
        loading.value = true
        const partnerId = useRoute().params.id as string
        const res = await partners_api.$_get_partner_config(partnerId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            configs.value = res.data?.data
        }
        loading.value = false
    }

    return { loading, getPartnerConfigs, configs }
}
