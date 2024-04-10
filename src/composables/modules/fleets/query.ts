import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useQueryVehicle = () => {
    const loadingQueriedVehicle = ref(false)
    const queriedVehicle = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        search: ref('')
        // has_driver: ref(true)
    }

    const queryVehicle = async (query: string) => {
        if (query.length < 1) return
        loadingQueriedVehicle.value = true
        filterData.search.value = query
        const res = await fleets_api.$_get_fleets(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedVehicle.value = res.data.data
        }
        loadingQueriedVehicle.value = false
    }

    const fetch = async () => {
        loadingQueriedVehicle.value = true
        const res = await fleets_api.$_get_fleets(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedVehicle.value = res.data.data
        }
        loadingQueriedVehicle.value = false
    }

    return { queryVehicle, loadingQueriedVehicle, queriedVehicle, fetch, filterData, ...metaObject }
}
