import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUserTransactions = () => {
    const loading = ref(false)
    const transactionsList = ref([] as any)

    const getUserTransactionsById = async (id: string) => {
        loading.value = true
        const res = await users_api.$_get_wallet_transactions(id) as CustomAxiosResponse
        if (res.type !== 'Error') {
            transactionsList.value = res?.data?.walletHistory
        }
        loading.value = false
    }
    return { transactionsList, loading, getUserTransactionsById }
}
