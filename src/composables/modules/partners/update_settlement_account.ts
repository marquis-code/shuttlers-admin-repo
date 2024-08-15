import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerConfigs } from '@/composables/modules/partners'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const obj = {
    acct_id: ref(''),
    cycle: ref('')
}
const settlement_accounts = ref([] as Record<string, any>[])

const clearObj = () => {
    obj.acct_id.value = ''
    obj.cycle.value = ''
}

export const useUpdateSettlementAccount = () => {
    const updateSettlementAccount = async () => {
        loading.value = true
        const partnerId = useRoute().params.id as string
        const payload = {
            earningCycle: obj?.cycle.value
        }
        const res = await partners_api.$_set_earning_cycle(partnerId, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: res?.data?.message || 'Partner earning cycle updated successfully'
            })
            usePartnerModal().closeUpdateSettlementAccount()
            usePartnerConfigs().getPartnerConfigs()
        }
        loading.value = false
    }

    const initUpdateSettlementAccount = (current_earning_cycle = '') => {
        obj.cycle.value = current_earning_cycle
        usePartnerModal().openUpdateSettlementAccount()
    }

    return { loading, ...obj, updateSettlementAccount, settlement_accounts, clearObj, initUpdateSettlementAccount }
}
