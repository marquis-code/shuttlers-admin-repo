import { batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetBatchBookingList = () => {
    const loading = ref(false)
    const batchBookingList = ref([] as any)

    const { $_get_batch_booking } = batch_booking_api

    const getBatchBookingList = async () => {
        loading.value = true

        const res = await $_get_batch_booking() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
        batchBookingList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, pickup: JSON.parse(item?.booking_data?.meta)?.pickup, dropoff: JSON.parse(item?.booking_data?.meta)?.destination, routeCode: JSON.parse(item?.booking_data?.meta)?.route_code, userCount: item?.users.length, status: item?.processing_completed_at ? 'processed' : 'pending', created_at: item?.created_at }))
        }
        loading.value = false
    }

    return { getBatchBookingList, loading, batchBookingList }
}
