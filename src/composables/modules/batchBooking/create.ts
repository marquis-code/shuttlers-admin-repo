import { batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
const batchBookingForm = {
    users: [],
    booking: {
        route_id: '',
        itinerary_id: '',
        pickup_id: '',
        destination_id: '',
        days_ids: [],
        meta: {},
        start_date: '',
        end_date: '',
        recurring: '',
        payment_source: '',
        luggage_quantity: ''
    }
}
export const useCreateBatchBooking = () => {
    const loading = ref(false)
    const { $_create_batch_booking } = batch_booking_api
    const batchBookingResult = ref({})
    const createBatchBooking = async () => {
        loading.value = true

        const res = await $_create_batch_booking(batchBookingForm) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New batch booking request was created successfully' })
            batchBookingResult.value = res.data
        }
        loading.value = false
    }

    const populateBatchBookingForm = (data:any) => {
        batchBookingForm.users = data.users
        batchBookingForm.booking.route_id = data?.booking?.route_id
        batchBookingForm.booking.itinerary_id = data?.booking?.itinerary_id
        batchBookingForm.booking.pickup_id = data?.booking?.pickup_id
        batchBookingForm.booking.destination_id = data?.booking?.destination_id
        batchBookingForm.booking.days_ids = data?.booking?.days_ids
        batchBookingForm.booking.meta = data?.booking?.meta
        batchBookingForm.booking.start_date = data?.booking?.start_date
        batchBookingForm.booking.end_date = data?.booking?.end_date
        batchBookingForm.booking.recurring = data?.booking?.recurring
        batchBookingForm.booking.payment_source = data?.booking?.payment_source
        batchBookingForm.booking.luggage_quantity = data?.booking?.luggage_quantity
    }

    return { createBatchBooking, loading, populateBatchBookingForm, batchBookingResult }
}
