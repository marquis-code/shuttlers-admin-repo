import { useAlert } from '@/composables/core/notification'
import { transactions_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRecentTransactionsList = () => {
    const loadingTransactions = ref(false)
    const transactionsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        source: ref(''),
        from: ref(''),
        to: ref('')
    }

    const { $_recent_transactions } = transactions_api

    const getTransactionList = async () => {
        loadingTransactions.value = true
        const res = await $_recent_transactions(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            transactionsList.value = res.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingTransactions.value = false
    }
    setFunction(getTransactionList)

    watch([filterData.source, filterData.from, filterData.to], (val) => {
        getTransactionList()
    })
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'source':
                filterData.source.value = data.value
                break
            case 'from':
                    filterData.from.value = data.value
                break
            case 'to':
                    filterData.to.value = data.value
                break
        }
    }

    return { getTransactionList, loadingTransactions, transactionsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
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
