import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const payouts = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
export const filterData = {
    status: ref('pending-payout,pending-settlement'),
    startDate: ref(''),
    endDate: ref(''),
    search: ref('')
}

export const usePendingPayouts = () => {
	const { moveTo, metaObject, next, prev, setFunction } = usePagination()
	const fetchPendingPayouts = async () => {
		loading.value = true
		const res = await earnings_api.$_get_earnings(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			payouts.value = res.data.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages || 0
        }
        loading.value = false
	}

	setFunction(fetchPendingPayouts)

    watch([filterData.endDate, filterData.search], () => {
		metaObject.page.value = 1
        fetchPendingPayouts()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

	return { loading, payouts, fetchPendingPayouts, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
