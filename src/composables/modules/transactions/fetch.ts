import { transactions_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRecentTransactionsList = () => {
    const loadingTransactions = ref(false)
    const transactionsList = ref([] as any)

    const { $_recent_transactions } = transactions_api

    const getTransactionList = async () => {
        loadingTransactions.value = true

        const res = await $_recent_transactions() as CustomAxiosResponse

        if (res.type !== 'Error') {
            transactionsList.value = res.data
        }
        loadingTransactions.value = false
    }

    return { getTransactionList, loadingTransactions, transactionsList }
}
