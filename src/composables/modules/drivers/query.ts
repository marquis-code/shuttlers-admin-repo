import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useQueryDriver = () => {
    const loadingQueriedDriver = ref(false)
    const queriedDriver = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        search: ref(''),
        has_driver: ref(true)
    }

    const queryDriver = async (query: string) => {
        if (query.length < 1) return
        loadingQueriedDriver.value = true
        filterData.search.value = query
        const res = await drivers_api.$_get_drivers(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedDriver.value = res.data.data
        }
        loadingQueriedDriver.value = false
    }

    const fetch = async () => {
        loadingQueriedDriver.value = true
        const res = await drivers_api.$_get_drivers(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedDriver.value = res.data.data
        }
        loadingQueriedDriver.value = false
    }

    return { queryDriver, loadingQueriedDriver, queriedDriver, fetch, filterData, ...metaObject }
}
