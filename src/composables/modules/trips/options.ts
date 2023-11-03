import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useConfirmationModal, usePasswordConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'

const selectedTrip = ref({} as any)

export const useTripOptions = () => {
    const loading = ref(false)
    const password = ref('')

    const initializeStartTrips = (tripObj) => {
        selectedTrip.value = tripObj
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you sure you want to start this trip?', loading, call_function: () => startTrip() })
    }
    const initializeEndTrips = (tripObj) => {
        selectedTrip.value = tripObj
        usePasswordConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you sure you want to cancel this trip ?', loading, password, call_function: () => endTrip() })
    }
    const initializeCompleteTrips = (tripObj) => {
        selectedTrip.value = tripObj
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you absolutely sure ?', loading, password, call_function: () => completeTrip() })
    }

    const startTrip = async () => {
        loading.value = true
        const sent_data = {
            route_id: selectedTrip.value.route_id,
            driver_id: selectedTrip.value.driver_id,
            route_itinerary_id: selectedTrip.value.route_itinerary_id,
            trip_date: selectedTrip.value.trip_date,
            pickup_coordinate: selectedTrip.value.pickup_coordinate
        }

        const res = await trips_api.$_start_trip(sent_data) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip Started successfully' })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
        useConfirmationModal().closeAlert()
    }

    const endTrip = async () => {
        loading.value = true
        const res = await trips_api.$_cancel_trip(selectedTrip.value.id, { password: password.value }) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip Cancelled successfully' })
            usePasswordConfirmationModal().closeAlert()
             useGetUpcomingTripsList().getUpcomingTrips()
        }
        loading.value = false
        usePasswordConfirmationModal().closeAlert()
    }
    const completeTrip = async () => {
        loading.value = true
        const res = await trips_api.$_complete_trip(selectedTrip.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip has been marked as completed' })
            useConfirmationModal().closeAlert()
             useGetUpcomingTripsList().getUpcomingTrips()
        }
        loading.value = false
        useConfirmationModal().closeAlert()
    }

    return { initializeStartTrips, initializeEndTrips, initializeCompleteTrips, loading }
}
