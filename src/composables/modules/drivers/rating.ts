import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const driverRating = ref([] as any[])
const filterData = {
    creation_date_start: ref(''),
    creation_date_end: ref('')
}

export const useDriverRating = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const { $_get_driver_ratings } = drivers_api

    const getDriverRating = async () => {
		const id = useRoute().params.id as string
        driverRating.value = []
        loading.value = true

        const res = await $_get_driver_ratings(id, metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            driverRating.value = res.data.data.length ? res.data.data : []
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getDriverRating)

    watch([filterData.creation_date_end], () => {
        getDriverRating()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
                if (data.value.length === 2) {
                    filterData.creation_date_start.value = data.value[0]
                    filterData.creation_date_end.value = data.value[1]
                }
                break
        }
    }

    return { getDriverRating, loading, driverRating, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
