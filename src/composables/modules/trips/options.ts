import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useConfirmationModal, usePasswordConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch/upcomingTrips'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch/completedTrips'
import { useGetCancelledTripsList } from '@/composables/modules/trips/fetch/cancelledTrips'
import { useCommuteModal } from '@/composables/core/modals'
import { useTripIdDetails, useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
type TripType = 'upcoming'|'completed'|'cancelled'|'active'
const selectedTrip = ref({} as any)
const tripType = ref('upcoming') as Ref<TripType>

export const useTripOptions = () => {
    const loading = ref(false)
    const password = ref('')

    const initializeTripUpdate = (tripObj, type:TripType) => {
        selectedTrip.value = tripObj
        tripType.value = type
        useCommuteModal().openUpdateDriverAndVehicle()
    }
    const initializeStartTrips = (tripObj) => {
        selectedTrip.value = tripObj
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you sure you want to start this trip?', loading, call_function: () => startTrip() })
    }
    const initializeCancelTrips = (tripObj) => {
        selectedTrip.value = tripObj
        usePasswordConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you sure you want to cancel this trip ?', loading, password, call_function: () => cancelTrip() })
    }
    const initializeCompleteTrips = (tripObj) => {
        selectedTrip.value = tripObj
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you absolutely sure ?', loading, password, call_function: () => completeTrip() })
    }
    const initializeEndTrips = (tripObj) => {
        selectedTrip.value = tripObj
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: 'Are you sure you want to end this trip?', loading, password, call_function: () => endTrip() })
    }

    const updateTrip = async (payload) => {
        const { getUpcomingTripById } = useUpcomingTripIdDetails()
        const { getTripById } = useTripIdDetails()
        loading.value = true
        let res:CustomAxiosResponse
        if (tripType.value === 'active') {
            res = await trips_api.$_update_active_trip(selectedTrip.value.id, payload) as CustomAxiosResponse
        } else {
            res = await trips_api.$_update_trip(selectedTrip.value.id, payload) as CustomAxiosResponse
        }
        if (res.type !== 'ERROR') {
            (tripType.value !== 'upcoming') ? getTripById(selectedTrip.value.id) : getUpcomingTripById(selectedTrip.value.id)
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip updated successfully' })
            useCommuteModal().closeUpdateDriverAndVehicle()
            if (tripType.value === 'upcoming') useGetUpcomingTripsList().getUpcomingTrips()
            if (tripType.value === 'active') useGetActiveTripsList().getActiveTrips()
            if (tripType.value === 'completed') useGetCompletedTripsList().getCompletedTrips()
            if (tripType.value === 'cancelled') useGetCancelledTripsList().getCancelledTrips()
        }
        loading.value = false
        useCommuteModal().closeUpdateDriverAndVehicle()
    }

    const startTrip = async () => {
        loading.value = true
        const sent_data = {
            route_id: selectedTrip.value.route_id,
            driver_id: selectedTrip.value.driver_id,
            route_itinerary_id: selectedTrip.value.route_itinerary_id,
            trip_date: selectedTrip.value.trip_date,
            pickup_coordinate: selectedTrip.value?.route?.pickup_coordinate
        }

        const res = await trips_api.$_start_trip(sent_data) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip Started successfully' })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
        useConfirmationModal().closeAlert()
    }

    const cancelTrip = async () => {
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

    const endTrip = async () => {
        loading.value = true
        const res = await trips_api.$_end_trip(selectedTrip.value.id, {
            route_id: selectedTrip.value.route_id,
            destination_coordinate: selectedTrip.value.destination_coordinate
                ? selectedTrip.value.destination_coordinate
                : '6.5135466666661115, 3.3668908333333337'
         }) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip ended successfully' })
            useConfirmationModal().closeAlert()
             useGetActiveTripsList().getActiveTrips()
        }
        loading.value = false
        useConfirmationModal().closeAlert()
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

    return { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips, initializeTripUpdate, initializeEndTrips, selectedTrip, loading, updateTrip }
}
