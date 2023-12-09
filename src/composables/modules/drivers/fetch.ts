import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const driversList = ref([] as any)
export const filterData = {
    status: ref('active') as Ref<'active'|'inactive'>,
    start_date_filter: ref(''),
    end_date_filter: ref(''),
    search: ref('')
}

export const useGetDriversList = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const { $_get_drivers } = drivers_api

    const getDriversList = async () => {
        driversList.value = []
        loading.value = true

        const res = await $_get_drivers(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            driversList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, rating: item.rating ?? 'N/A' }))
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getDriversList)

    watch([filterData.status, filterData.start_date_filter, filterData.search], () => {
        getDriversList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '1' ? 'active' : 'inactive'
                break
            case 'dateRange':
                if (data.value.length === 2) {
                    filterData.start_date_filter.value = data.value[0]
                    filterData.end_date_filter.value = data.value[1]
                }
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getDriversList, loading, driversList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
