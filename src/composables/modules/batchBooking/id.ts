import { batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { exportAsCsv } from '@/composables/utils/csv'

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

    const downloadBookings = () => {
        if (!selectedBooking.value?.processing_result?.data?.length) {
            useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
            return
        }
        const data = selectedBooking.value?.processing_result?.data
        const newArr = data.map((el) => {
            return {
                Email_address: el?.userId || 'N/A',
                Status: el?.success ? 'Completed' : 'Failed',
                Reason: el?.error ? el?.error : 'N/A'
            }
        })
        exportAsCsv(newArr, 'Batch booking list')
    }
    return { selectedBooking, loading, getBatchBookingById, downloadBookings }
}
