import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

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

export const useLoadActiveTripPassengers = () => {
    const loading = ref(false)
    const passengersList = ref([])
    const getActiveTripPassengers = async (id: string) => {
        loading.value = true
        const res = await trips_api.$_get_active_trip_passengers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            passengersList.value = res.data.data
        }
        loading.value = false
    }

    return { getActiveTripPassengers, loading, passengersList }
}

export const useLoadUpcomingTripPassengers = () => {
    const loading = ref(false)
    const passengersList = ref([])
    const getUpcomingripPassengers = async (id: string) => {
        loading.value = true
        const res = await trips_api.$_get_upcoming_trip_passengers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            passengersList.value = res.data.data
        }
        loading.value = false
    }

    return { getUpcomingripPassengers, loading, passengersList }
}

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
