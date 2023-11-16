import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRentalList = () => {
        const loadingRental = ref(false)
    const rentalList = ref([] as any)

    const filterData = {
        status: ref('')
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

    return { getRentalList, loadingRental, rentalList, ...metaObject, next, prev, moveTo, filterData }
}
