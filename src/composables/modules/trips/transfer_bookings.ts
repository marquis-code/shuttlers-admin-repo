import { useTripsModal } from '@/composables/core/modals'
import { trips_api, partners_api, CustomAxiosResponse, routes_api } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'

const loading = ref(false)
const passengers = ref([] as Record<string, any>[])
const transferBookingObj = {
    route: ref({} as Record<string, any>),
    itinerary: ref({} as Record<string, any>),
    start_date: ref(''),
    end_date: ref(''),
    vehicle: ref({} as Record<string, any>),
    for_today: ref(true)
}
const route_itineraries = ref([] as Record<string, any>[])
const route_vehicles = ref([] as Record<string, any>[])
const bus_stops = ref([] as Record<string, any>[])

const getItinerariesByRouteId = async () => {
    route_itineraries.value = []
    const res = await routes_api.$_get_itineraries_by_route_id(transferBookingObj.route.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        route_itineraries.value = res?.data?.data?.length ? res.data?.data : []
    }
}

const getVehiclesByItineraryId = async () => {
    route_vehicles.value = []
    const res = await routes_api.$_get_routes_itineraries_vehicles_by_itinerary_id(transferBookingObj.itinerary.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        route_vehicles.value = res?.data?.data?.length ? res.data?.data : []
    }
}

const getBusstopsByRouteId = async () => {
    const res = await routes_api.$_get_route_busstops_by_id(transferBookingObj.route.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        bus_stops.value = res?.data?.data?.length ? res.data?.data : []
    }
}

watch(transferBookingObj.route, () => {
    transferBookingObj.itinerary.value = {}
    transferBookingObj.vehicle.value = {}
    if (transferBookingObj.route.value?.id) {
        getItinerariesByRouteId()
        getBusstopsByRouteId()
    }
})

watch(transferBookingObj.itinerary, () => {
    transferBookingObj.vehicle.value = {}
    if (transferBookingObj.itinerary.value?.id) getVehiclesByItineraryId()
})

const pickupLocations = computed(() => {
	return bus_stops.value.filter((stop) => stop.is_pickup)
})

const dropoffLocations = computed(() => {
	return bus_stops.value.filter((stop) => stop.is_dropoff)
})

const computedTableData = computed(() => {
	return passengers.value.map((passenger) => {
      return {
		...passenger,
		passenger_name: passenger?.passenger_name,
		old_pickup: passenger?.pickup?.location,
		old_dropoff: passenger?.destination?.location,
		new_pickup: '',
		new_dropoff: '',
        user_id: passenger?.user_id,
        route_itinerary_id: passenger?.route_itinerary_id,
        trip_date: passenger?.trip_date
	  }
	})
})

const enableStepOneBtn = computed(() => {
    if (!transferBookingObj.for_today.value && !transferBookingObj.start_date.value) return false
    if (!transferBookingObj.for_today.value && !transferBookingObj.end_date.value) return false
    return !!(transferBookingObj.route.value?.id && transferBookingObj.itinerary.value?.id)
})

const clearObj = () => {
    transferBookingObj.route.value = {}
    transferBookingObj.itinerary.value = {}
    transferBookingObj.start_date.value = ''
    transferBookingObj.end_date.value = ''
    transferBookingObj.for_today.value = true
    transferBookingObj.vehicle.value = {}
}

export const useTransferBookings = () => {
    const initTransferBooking = (passengerList:Record<string, any>[]) => {
        if (!passengerList?.length) {
            useAlert().openAlert({ type: 'ERROR', msg: 'You need atleast one passenger to continue' })
            return
        }
        passengers.value = passengerList
        useTripsModal().openTransferBookings()
    }

    const transferBooking = async () => {
        const error = ref(false)
        computedTableData.value.forEach((el) => {
            if (!el?.new_pickup || !el?.new_dropoff) {
                useAlert().openAlert({ type: 'ERROR', msg: 'Please select new pickup and dropoff for all passengers' })
                error.value = true
            }
        })
        if (error.value) return
        const payload = {
            schedule_bus_stops: computedTableData.value.map((el) => {
                return {
                    pickup_id: el?.new_pickup,
                    dropoff_id: el?.new_dropoff,
                    user_id: el?.user_id
                }
            }),
            source_itinerary_id: computedTableData.value[0].route_itinerary_id,
            destination_itinerary_id: transferBookingObj.itinerary.value?.id,
            start_date: computedTableData.value[0].trip_date,
            end_date: computedTableData.value[0].trip_date
        }
        if (!transferBookingObj.for_today.value) {
            payload.start_date = transferBookingObj.start_date.value
            payload.end_date = transferBookingObj.end_date.value
        }
        loading.value = true
        const res = await trips_api.$_transfer_bookings(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'ERROR', msg: 'Bookings transferred successfully' })
            useTripsModal().closeTransferBookings()
            const tripId = useRoute().params.id as string
            if (useRoute().fullPath.includes('upcoming') || useRoute().fullPath.includes('cancelled')) {
                useRoutePassengers().fetchUpcomingRoutePassengers(tripId)
            } else {
                useRoutePassengers().fetchRoutePassengers(tripId)
            }
        }
        loading.value = false
    }

    return { loading, initTransferBooking, passengers, ...transferBookingObj, route_itineraries, route_vehicles, pickupLocations, dropoffLocations, computedTableData, transferBooking, enableStepOneBtn, clearObj }
}
