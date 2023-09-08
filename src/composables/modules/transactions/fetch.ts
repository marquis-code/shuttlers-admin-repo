import { useAlert } from '@/composables/core/notification'
import { transactions_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRecentTransactionsList = () => {
    const loadingTransactions = ref(false)
    const transactionsList = ref([] as any)

    const { $_recent_transactions } = transactions_api

    const getTransactionList = async () => {
        loadingTransactions.value = true
        const res = await $_recent_transactions() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            transactionsList.value = res.data
        }
        loadingTransactions.value = false
    }

    return { getTransactionList, loadingTransactions, transactionsList }
}

const transaction = ref({} as any)

export const useGetTransactionById = () => {
    const loading = ref(false)

    const getTransactionById = async (id: string) => {
        if (!id) return useAlert().openAlert({ type: 'ERROR', msg: 'Transaction ID is required' })
        loading.value = true
        const res = await transactions_api.$_get_transactions_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            transaction.value = res.data
        }
        loading.value = false
     }

    return { loading, getTransactionById, transaction }
}
