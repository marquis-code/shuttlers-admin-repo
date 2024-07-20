import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRentalList = () => {
    const loadingRental = ref(false)
    const rentalList = ref([] as any)

    const filterData = {
        status: ref(''),
        booking_status: ref(''),
        search: ref(''),
        from: ref(''),
        to: ref('')
    }

    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getRentalList = async () => {
        loadingRental.value = true

        const res = await rental_api.$_get_rental_requests(filterData, metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            rentalList.value = res.data.data
            metaObject.total.value = res?.data?.metadata?.total_pages || 0
        }
        loadingRental.value = false
    }

    setFunction(getRentalList)

    watch([filterData.search, filterData.from, filterData.to, filterData.status, filterData.booking_status], (val) => {
        getRentalList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.from.value = data.value[0] ? data.value[0] : ''
                filterData.to.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    return { getRentalList, onFilterUpdate, loadingRental, rentalList, ...metaObject, next, prev, moveTo, filterData }
}

const loading = ref(false)
const vehicles = ref([] as any)
export const useFetchCharterVehicle = () => {
        const fetch = async () => {
        loading.value = true
        try {
            const response = await rental_api.$_fetch_charter_vehicle()
            vehicles.value = response.data
        } catch (error) {
        } finally {
            loading.value = false
        }
    }
    return { loading, fetch, vehicles }
}
