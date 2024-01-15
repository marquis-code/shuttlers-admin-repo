import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const transactionsList = ref([] as any)
const filterData = {
	endDate: ref(''),
	startDate: ref(''),
    search: ref('')
}

export const useUserTransactions = () => {
    const loading = ref(false)

    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUserTransactionsById = async (id?: string) => {
        // TODO: add pagination logic
        const userId = useRoute().params.id as string
        // if (transactionsList.value.length > 0) return
        loading.value = true
        const res = await users_api.$_get_wallet_transactions(userId, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            transactionsList.value = res?.data?.walletHistory
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    watch([filterData.search, filterData.endDate], () => {
        metaObject.page.value = 1
        getUserTransactionsById()
    })

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				filterData.search.value = data.value
                break
			case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
				break
        }
    }

    setFunction(getUserTransactionsById)
    return { transactionsList, loading, getUserTransactionsById, next, prev, moveTo, ...metaObject, onFilterUpdate }
}
