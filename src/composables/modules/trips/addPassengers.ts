import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
const { getRoutePassengers } = useRoutePassengers()

export const useAddPassengers = () => {
    const { selectedTrip } = useUpcomingTripIdDetails()
    const loading = ref(false)
    const passengersList = ref([]) as any
    const { $_add_passengers_to_upcoming_trip } = trips_api
    const addPassengers = async () => {
        const id = String(useRoute().params.id)
        loading.value = true
        const result = ref() as any
        passengersList.value.map(async (passenger) => {
            result.value = await handlePassengerAddition(passenger, id)
        })
        if (result.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Passengers has been successfully added to trip' })
            useConfirmationModal().closeAlert()
            getRoutePassengers(selectedTrip?.value?.route?.id)
        }
    }

    const handlePassengerAddition = async (passenger, id) => {
        const eachPassengerPayload = {
            user_id: passenger.user_id,
            pickup_route_bus_stop_id: passenger.pickup_route_bus_stop_id,
            destination_route_bus_stop_id: passenger.destination_route_bus_stop_id
        }
        const res = await $_add_passengers_to_upcoming_trip(id, eachPassengerPayload) as CustomAxiosResponse
        loading.value = false
        return res
    }

    const setPassengersList = (data) => {
        passengersList.value = data
    }

    return { loading, addPassengers, passengersList, setPassengersList }
}
