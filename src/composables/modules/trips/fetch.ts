import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetTripsGraph = () => {
    const loading = ref(false)
    const tripsGraphData = ref({} as any)

    const { $_get_graph } = trips_api

    const getTripsGraph = async () => {
        loading.value = true
        const res = await $_get_graph() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripsGraphData.value = res.data
        }
        loading.value = false
    }

    return { getTripsGraph, loading, tripsGraphData }
}

const filterData = {
    from: ref(''),
    to: ref(''),
    search: ref(''),
    route_type: ref(''),
    route_visibility: ref(''),
    occupancy_rate_from: ref(''),
    occupancy_rate_to: ref(''),
    city_ids: ref(''),
    vehicle_categories: ref(''),
    trip_time_list: ref('')
}

const onFilterUpdate = (data: any) => {
    switch (data.type) {
        case 'from':
            filterData.from.value = data.value
            break
        case 'to':
            filterData.to.value = data.value
            break
        case 'routeType':
            filterData.route_type.value = data.value.length === 0 || data.value.length === 2 ? '' : data.value.map((item: any) => item.value).join('')
            break
        case 'visibility':
            filterData.route_visibility.value = data.value.length === 0 || data.value.length === 2 ? '' : data.value.map((item: any) => item.value).join('')
            break
        case 'city':
            filterData.city_ids.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'vehicleType':
            filterData.vehicle_categories.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'startTime':
            filterData.trip_time_list.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'occupancy':
            filterData.occupancy_rate_from.value = data.value[0]
            filterData.occupancy_rate_to.value = data.value[1]
            break
    }
}

const watchArray = [filterData.from, filterData.to, filterData.route_type, filterData.route_visibility,
    filterData.vehicle_categories, filterData.city_ids, filterData.trip_time_list,
    filterData.occupancy_rate_from, filterData.occupancy_rate_to]

export const useGetActiveTripsList = () => {
    const loadingActiveTrips = ref(false)
    const activeTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getActiveTrips = async () => {
        loadingActiveTrips.value = true
        const res = await trips_api.$_get_active_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            activeTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingActiveTrips.value = false
    }
    setFunction(activeTripsList)

    watch(watchArray, () => {
        getActiveTrips()
    })

    return { getActiveTrips, loadingActiveTrips, activeTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetUpcomingTripsList = () => {
    const loadingUpcomingTrips = ref(false)
    const upcomingTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUpcomingTrips = async () => {
        loadingUpcomingTrips.value = true
        const res = await trips_api.$_get_upcoming_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            upcomingTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingUpcomingTrips.value = false
    }
    setFunction(upcomingTripsList)

    watch(watchArray, () => {
        getUpcomingTrips()
    })

    return { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetCompletedTripsList = () => {
    const loadingCompletedTrips = ref(false)
    const completedTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getCompletedTrips = async () => {
        loadingCompletedTrips.value = true
        const res = await trips_api.$_get_completed_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            completedTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingCompletedTrips.value = false
    }
    setFunction(completedTripsList)

    watch(watchArray, () => {
        getCompletedTrips()
    })

    return { getCompletedTrips, loadingCompletedTrips, completedTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetBusCaptainsList = () => {
    const loadingBusCaptains = ref(false)
    const busCaptainsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        search: ref('')
    }

    const getBusCaptains = async () => {
        loadingBusCaptains.value = true
        const res = await trips_api.$_get_bus_captains(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            busCaptainsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingBusCaptains.value = false
    }
    setFunction(busCaptainsList)

    watch([filterData.search], (val) => {
        getBusCaptains()
    })
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getBusCaptains, loadingBusCaptains, busCaptainsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetTripRatingList = () => {
    const loadingTripRatings = ref(false)
    const tripRatingList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getTripRatings = async (id: string) => {
        loadingTripRatings.value = true
        const res = await trips_api.$_get_trip_rating(id, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripRatingList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingTripRatings.value = false
    }
    setFunction(getTripRatings)

    return { getTripRatings, loadingTripRatings, tripRatingList, moveTo, ...metaObject, next, prev }
}
