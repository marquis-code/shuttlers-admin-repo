import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const payload = {
    schedule_bus_stops: [],
    source_itinerary_id: '',
    destination_itinerary_id: '',
    start_date: '',
    end_date: ''
}
const loading = ref(false)
export const useBookingTransfer = () => {
    const { $_transfer_bookings } = trips_api
    const transferPassengers = async () => {
        loading.value = true
        const result = await $_transfer_bookings(payload) as CustomAxiosResponse
        if (result.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Passengers were transferred successfully.' })
        }
        loading.value = false
    }

    const setBookingTransferPayload = (data) => {
        payload.schedule_bus_stops = data.schedule_bus_stops
        payload.source_itinerary_id = data.source_itinerary_id
        payload.destination_itinerary_id = data.destination_itinerary_id
        payload.start_date = data.start_date
        payload.end_date = data.end_date
    }

    return { loading, setBookingTransferPayload, transferPassengers }
}
