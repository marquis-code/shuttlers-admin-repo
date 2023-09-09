import { batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedBooking = ref({} as Record<string, any>)
const selectedBookingId = ref('')

export const useBatchBookingIdDetails = () => {
    const loading = ref(false)

    const getBatchBookingById = async (id: string) => {
        selectedBookingId.value = id
        loading.value = true
        const res = await batch_booking_api.$_get_batch_booking_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedBooking.value = res.data
        }
        loading.value = false
    }
    return { selectedBooking, loading, getBatchBookingById }
}
