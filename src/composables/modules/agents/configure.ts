import { agents_api } from '@/api_factory/modules/agent'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { usePasswordConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useRouteModal } from '@/composables/core/modals'

const currenciesList = ref([] as any[])

export const useGetCurrencies = () => {
    const loading = ref(false)
    const getCurrencies = async () => {
        loading.value = true
        const res = await agents_api.$_get_currencies() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            currenciesList.value = res.data
        }
        loading.value = false
    }

    return { currenciesList, loading, getCurrencies }
}

const rateData = ref({} as Record<string, any>)
export const useGetCurrentRatesForAgent = () => {
    const rateLoading = ref(false)

    const getRateForAgent = async () => {
        rateLoading.value = true
        const res = await agents_api.$_get_rates('sales_agent', 'SHTCR', 'NGN') as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            rateData.value = res.data
        }
        rateLoading.value = false
    }

    return { rateData, rateLoading, getRateForAgent }
}

export const useCreateSwapConfiguration = () => {
    const loading = ref(false)
    const rate = ref()
    const password = ref()

    const confirm = () => {
        usePasswordConfirmationModal().openAlert({
            call_function: swap,
            desc: 'The updated currency point would be updated across all sales agents, would you like to proceed?',
            title: 'Are you absolutely sure?',
            loading,
            type: 'NORMAL',
            password
        })
    }
    const swap = async () => {
        const source_currency_id = currenciesList.value.find((i) => i.shortName === 'SHTCR')?.id
        const destination_currency_id = currenciesList.value.find((i) => i.shortName === 'NGN')?.id
        const payload = {
            source_currency_id,
            destination_currency_id,
            rate: rate.value,
            fee: 0,
            is_percentage_fee: false,
            status: true
        }

        loading.value = true

        const res = (await agents_api.$_currency_swap_config(payload, rateData.value?.id)) as CustomAxiosResponse

		if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'You have successfully configured sales agent currency,'
            })
            usePasswordConfirmationModal().closeAlert()
            useRouteModal().closeConfigureAgentPoints()
        }
        loading.value = false
    }

    return { loading, rate, confirm }
}
