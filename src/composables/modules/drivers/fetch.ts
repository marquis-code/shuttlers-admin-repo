import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetDriversList = () => {
    const loading = ref(false)
    const driversList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        start_date_filter: ref(''),
        end_date_filter: ref('')
    }

    const { $_get_drivers } = drivers_api

    const getDriversList = async () => {
        loading.value = true

        const res = await $_get_drivers(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            driversList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, rating: item.rating ?? 'N/A' }))
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getDriversList)

    watch([filterData.status, filterData.start_date_filter, filterData.end_date_filter], (val) => {
        getDriversList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'start_date_filter':
                filterData.status.value = data.value
                break
            case 'end_date_filter':
                filterData.status.value = data.value
                break
        }
    }

    return { getDriversList, loading, driversList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
