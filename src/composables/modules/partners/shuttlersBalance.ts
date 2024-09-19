import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetShuttlersBalancePartners = () => {
    const loading = ref(false)
    const shuttlersBalancePartners = ref({} as Record<string, any>)

    const { $_get_shuttlers_balance_partners } = earnings_api

    const getShuttlersBalancePartners = async () => {
        loading.value = true
        const response = await $_get_shuttlers_balance_partners()
        shuttlersBalancePartners.value = response.data.data

        loading.value = false
    }

    return {
        shuttlersBalancePartners,
        getShuttlersBalancePartners,
        loading
    }
 }
