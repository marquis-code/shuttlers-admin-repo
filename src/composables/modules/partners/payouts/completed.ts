import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const payouts = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const filterData = {
    status: ref('settled'),
    startDate: ref(''),
    endDate: ref(''),
    search: ref('')
}

export const useCompletedPayouts = () => {
	const { moveTo, metaObject, next, prev, setFunction } = usePagination()
	const fetchCompletedPayouts = async () => {
		loading.value = true
		const res = await earnings_api.$_get_earnings(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			payouts.value = res.data.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages || 0
        }
        loading.value = false
	}

	setFunction(fetchCompletedPayouts)

    watch([filterData.endDate, filterData.search], () => {
		metaObject.page.value = 1
        fetchCompletedPayouts()
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

	return { loading, payouts, fetchCompletedPayouts, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
