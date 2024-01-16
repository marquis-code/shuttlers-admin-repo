import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const refundList = ref([] as any)
const filterData = {
	status: ref(1),
    search: ref('')
}
const loading = ref(false)

export const useGetBatchRefundList = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()

    const { $_get_batch_refund } = users_api

    const getBatchRefundList = async () => {
        loading.value = true

        const res = await $_get_batch_refund(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            refundList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				filterData.search.value = data.value
                break
			case 'status':
				filterData.status.value = data.value
				break
        }
    }

    watch([filterData.search, filterData.status], (val) => {
		metaObject.page.value = 1
        getBatchRefundList()
    })

	setFunction(getBatchRefundList)

    return { getBatchRefundList, loading, refundList, prev, ...metaObject, next, moveTo, onFilterUpdate }
}
