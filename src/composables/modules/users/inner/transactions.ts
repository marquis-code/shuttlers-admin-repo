import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const transactionsList = ref([] as any)

export const useUserTransactions = () => {
    const loading = ref(false)

    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUserTransactionsById = async (id: string) => {
        // TODO: add pagination logic
        if (transactionsList.value.length > 0) return
        loading.value = true
        const res = await users_api.$_get_wallet_transactions(id, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            transactionsList.value = res?.data?.walletHistory
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }

    setFunction(getUserTransactionsById)
    return { transactionsList, loading, getUserTransactionsById, next, prev, moveTo, ...metaObject }
}
