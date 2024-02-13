import { batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
export const useGetBatchBookingList = () => {
    const loading = ref(false)
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const batchBookingList = ref([] as any)
    // const filterData = {
    //     search: ref('')
    // }
    const { $_get_batch_bookings } = batch_booking_api
    // watch([filterData.search], (val) => {
    //     getBatchBookingList()
    // })
    const getBatchBookingList = async () => {
        loading.value = true

        const res = await $_get_batch_bookings(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            metaObject.total.value = res?.data.metadata?.total_pages || 0
           batchBookingList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, pickup: JSON.parse(item?.booking_data?.meta)?.pickup, dropoff: JSON.parse(item?.booking_data?.meta)?.destination, routeCode: JSON.parse(item?.booking_data?.meta)?.route_code, userCount: item?.users.length, status: item?.processing_completed_at ? 'processed' : 'pending', created_at: item?.created_at }))
        }
        loading.value = false
    }

    // const onFilterUpdate = (data: any) => {
    //     switch (data.type) {
    //         case 'search':
    //             filterData.search.value = data.value
    //             break
    //     }
    // }
    setFunction(getBatchBookingList)

    return { getBatchBookingList, loading, batchBookingList, moveTo, ...metaObject, next, prev }
}
