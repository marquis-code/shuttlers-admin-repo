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

export const useGetActiveTripsList = () => {
    const loadingActiveTrips = ref(false)
    const activeTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        from: ref(''),
        to: ref('')
    }

    const { $_get_active_trips } = trips_api

    const getActiveTrips = async () => {
        loadingActiveTrips.value = true
        const res = await $_get_active_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            activeTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingActiveTrips.value = false
    }
    setFunction(activeTripsList)

    watch([filterData.from, filterData.to], (val) => {
        getActiveTrips()
    })
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'from':
                    filterData.from.value = data.value
                break
            case 'to':
                    filterData.to.value = data.value
                break
        }
    }

    return { getActiveTrips, loadingActiveTrips, activeTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetUpcomingTripsList = () => {
    const loadingUpcomingTrips = ref(false)
    const upcomingTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        from: ref(''),
        to: ref('')
    }

    const { $_get_upcoming_trips } = trips_api

    const getUpcomingTrips = async () => {
        loadingUpcomingTrips.value = true
        const res = await $_get_upcoming_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            upcomingTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingUpcomingTrips.value = false
    }
    setFunction(upcomingTripsList)

    watch([filterData.from, filterData.to], (val) => {
        getUpcomingTrips()
    })
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'from':
                    filterData.from.value = data.value
                break
            case 'to':
                    filterData.to.value = data.value
                break
        }
    }

    return { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetCompletedTripsList = () => {
    const loadingCompletedTrips = ref(false)
    const completedTripsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        from: ref(''),
        to: ref('')
    }

    const { $_get_completed_trips } = trips_api

    const getCompletedTrips = async () => {
        loadingCompletedTrips.value = true
        const res = await $_get_completed_trips(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            completedTripsList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingCompletedTrips.value = false
    }
    setFunction(completedTripsList)

    watch([filterData.from, filterData.to], (val) => {
        getCompletedTrips()
    })
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'from':
                    filterData.from.value = data.value
                break
            case 'to':
                    filterData.to.value = data.value
                break
        }
    }

    return { getCompletedTrips, loadingCompletedTrips, completedTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetBusCaptainsList = () => {
    const loadingBusCaptains = ref(false)
    const busCaptainsList = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        search: ref('')
    }

    const { $_get_bus_captains } = trips_api

    const getBusCaptains = async () => {
        loadingBusCaptains.value = true
        const res = await $_get_bus_captains(filterData, metaObject) as CustomAxiosResponse
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
    const { $_get_trip_rating } = trips_api

    const getTripRatings = async (id:string) => {
        loadingTripRatings.value = true
        const res = await $_get_trip_rating(id, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripRatingList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingTripRatings.value = false
    }
    setFunction(getTripRatings)

    return { getTripRatings, loadingTripRatings, tripRatingList, moveTo, ...metaObject, next, prev }
}
