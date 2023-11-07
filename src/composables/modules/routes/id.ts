import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedRoute = ref({} as Record<string, any>)
const selectedRouteId = ref('')
// const selectedPartnerAccountSid = ref('')
const routeId = ref<number>()

export const useRouteIdDetails = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteBusstops = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteItinerary = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteTrips = () => {
    const loading = ref(false)
    const tripsList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        startDate: ref(''),
        endDate: ref(''),
        tripStatus: ref(''),
        itineraryId: ref('')
    }

    watch([filterData.startDate, filterData.endDate, filterData.itineraryId, filterData.tripStatus], (val) => {
        getRouteTrips()
    })

    const getRouteTrips = async () => {
        loading.value = true
        const res = await routes_api.$_get_route_trips_by_id(selectedRouteId.value, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripsList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    setFunction(getRouteTrips)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
                filterData.startDate.value = data.value[0]
                filterData.endDate.value = data.value[1]
                break
                case 'tripStatus':
                    filterData.tripStatus.value = data.value
                    break
                case 'itineraryId':
                        filterData.itineraryId.value = data.value
                        break
        }
    }

    return { tripsList, loading, getRouteTrips, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useRoutePaymentOptionsById = () => {
    const loadingSelectedRoutePaymentOptions = ref(false)
    const routePaymentOptionsList = ref([] as any)

    const getRoutePaymentOptionsById = async () => {
        loadingSelectedRoutePaymentOptions.value = true
        const res = await routes_api.$_get_payment_options_by_id(selectedRouteId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routePaymentOptionsList.value = res?.data
        }
        loadingSelectedRoutePaymentOptions.value = false
    }
    return { selectedRoute, routePaymentOptionsList, loadingSelectedRoutePaymentOptions, getRoutePaymentOptionsById }
}

export const useTripStartTimeById = () => {
    const loadingRouteItineraries = ref(false)
    const itineraries = ref([] as any)
    const getTripStartTimeById = async (id: string) => {
        loadingRouteItineraries.value = true
        const res = await routes_api.$_get_trip_start_time(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            itineraries.value = res.data.data
        }
        loadingRouteItineraries.value = false
    }
    return { selectedRoute, loadingRouteItineraries, getTripStartTimeById, itineraries }
}

export const useRoutePassengersById = () => {
    const loadingRoutePassengers = ref(false)
    const routePassengers = ref([] as any)
    const getRoutePassengerseById = async (id: string) => {
        loadingRoutePassengers.value = true
        const res = await routes_api.$_get_route_passengers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routePassengers.value = res.data.data
        }
        loadingRoutePassengers.value = false
    }
    return { selectedRoute, loadingRoutePassengers, getRoutePassengerseById, routePassengers }
}

export const useRouteDriversById = () => {
    const loadingRouteDrivers = ref(false)
    const routeDrivers = ref([] as any)
    const getRouteDriversById = async (id: string) => {
        loadingRouteDrivers.value = true
        const res = await routes_api.$_get_route_drivers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routeDrivers.value = res.data.data
        }
        loadingRouteDrivers.value = false
    }
    return { selectedRoute, loadingRouteDrivers, getRouteDriversById, routeDrivers }
}

export const useRouteBookingsById = () => {
    const loadingRouteBookings = ref(false)
    const corporateId = ref('')
    const routeBookings = ref([] as any)
    const payload = reactive({
        booking_days: []
    })
    const getRouteBookingsById = async (id: string) => {
        loadingRouteBookings.value = true
        const res = await routes_api.$_get_route_bookings(id, corporateId.value, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routeBookings.value = res.data.data
        }
        loadingRouteBookings.value = false
    }
    return { selectedRoute, loadingRouteBookings, getRouteBookingsById, routeBookings, payload, corporateId }
}

export const useRouteBusstopList = () => {
    const loading = ref(false)
    const busstopsList = ref([] as any)
    const getRouteBusstopsById = async (id: string) => {
        loading.value = true
        const res = await routes_api.$_get_routes_busstops(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            busstopsList.value = res.data.data
        }
        loading.value = false
    }
    return { loading, getRouteBusstopsById, busstopsList }
}
