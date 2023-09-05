import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUserCreditLineUsage = () => {
    const loading = ref(false)
    const creditLineUsageList = ref([] as any)

    const getUserCreditLineUsage = async (id: string) => {
        loading.value = true
        const res = await corporates_api.$_get_credit_line_usage(id) as CustomAxiosResponse
        if (res.type !== 'Error') {
            creditLineUsageList.value = res.data
        }
        loading.value = false
    }
    return { creditLineUsageList, loading, getUserCreditLineUsage }
}
