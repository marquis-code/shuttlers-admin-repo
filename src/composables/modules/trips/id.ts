import { ref, computed } from 'vue'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch/upcomingTrips'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch/completedTrips'
import { useGetCancelledTripsList } from '@/composables/modules/trips/fetch/cancelledTrips'

import { usePagination } from '@/composables/utils/table'
const { moveTo: financialsMoveTo, metaObject, next, prev, setFunction } = usePagination()

const selectedTrip = ref({} as Record<string, any>)
const selectedTripId = ref('')
const tripFinancialId = ref('')

const currentIndex = ref(1)
export const useTripIdDetails = () => {
    const loading = ref(false)

    const getTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
        }
        loading.value = false
    }
    return { selectedTrip, loading, getTripById, selectedTripId }
}

export const useUpcomingTripIdDetails = () => {
    const { getUpcomingTrips, upcomingTripsList, moveTo } = useGetUpcomingTripsList()
    const selectedTripIndex = computed(() => {
    return upcomingTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})
    const loading = ref(false)
    const getUpcomingTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_upcoming_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
            if (upcomingTripsList.value.length === 0) {
                await getUpcomingTrips()
            }
        }
        loading.value = false
    }

    const handleNext = async () => {
        if (selectedTripIndex.value < upcomingTripsList.value.length - 1) {
            const nextTripId = upcomingTripsList.value[selectedTripIndex.value + 1].id
            await getUpcomingTripById(nextTripId)
        }
        if (selectedTripIndex.value === upcomingTripsList.value.length - 1) {
            currentIndex.value++
            loading.value = true
            await moveTo(currentIndex.value)
            loading.value = false
        }
    }
    const handlePrev = async () => {
        if (selectedTripIndex.value > 0) {
            const prevTripId = upcomingTripsList.value[selectedTripIndex.value - 1].id
            await getUpcomingTripById(prevTripId)
        }
        if (selectedTripIndex.value === 0) {
            if (currentIndex.value !== 1) {
                currentIndex.value -= 1
               await moveTo(currentIndex.value)
            }
        }

        // if (selectedTripIndex.value === -1) {
        //     currentIndex.value = 1
        //     await moveTo(currentIndex.value)
        // }
    }
    return { selectedTrip, loading, getUpcomingTripById, handleNext, handlePrev, selectedTripIndex }
}

export const useActiveTripIdDetails = () => {
    const { getActiveTrips, activeTripsList, moveTo: activeMoveTo } = useGetActiveTripsList()
    const activeSelectedTripIndex = computed(() => {
    return activeTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})

    const loading = ref(false)
    const getActiveTripById = async (id: string) => {
        selectedTrip.value = {}
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
            if (activeTripsList.value.length === 0) {
                await getActiveTrips()
            }
        }
        loading.value = false
    }

    const handleNext = async () => {
        if (activeSelectedTripIndex.value < activeTripsList.value.length - 1) {
            const nextTripId = activeTripsList.value[activeSelectedTripIndex.value + 1].id
            await getActiveTripById(nextTripId)
        }
        if (activeSelectedTripIndex.value === activeTripsList.value.length - 1) {
            currentIndex.value++
            loading.value = true
            await activeMoveTo(currentIndex.value)
            loading.value = false
        }
    }
    const handlePrev = async () => {
        if (activeSelectedTripIndex.value > 0) {
            const prevTripId = activeTripsList.value[activeSelectedTripIndex.value - 1].id
            await getActiveTripById(prevTripId)
        }
        if (activeSelectedTripIndex.value === 0) {
            if (currentIndex.value !== 1) {
                currentIndex.value -= 1
               await activeMoveTo(currentIndex.value)
            }
        }
    }
    return { selectedTrip, loading, getActiveTripById, handleNext, handlePrev, activeSelectedTripIndex }
}

export const useCompletedTripIdDetails = () => {
    const { getCompletedTrips, completedTripsList, moveTo: completedMoveTo } = useGetCompletedTripsList()
    const completedSelectedTripIndex = computed(() => {
    return completedTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})
    const loading = ref(false)
    const getCompletedTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
            if (completedTripsList.value.length === 0) {
                await getCompletedTrips()
            }
        }
        loading.value = false
    }

    const handleNext = async () => {
        if (completedSelectedTripIndex.value < completedTripsList.value.length - 1) {
            const nextTripId = completedTripsList.value[completedSelectedTripIndex.value + 1].id
            await getCompletedTripById(nextTripId)
        }
        if (completedSelectedTripIndex.value === completedTripsList.value.length - 1) {
            currentIndex.value++
            loading.value = true
            await completedMoveTo(currentIndex.value)
            loading.value = false
        }
    }
    const handlePrev = async () => {
        if (completedSelectedTripIndex.value > 0) {
            const prevTripId = completedTripsList.value[completedSelectedTripIndex.value - 1].id
            await getCompletedTripById(prevTripId)
        }
        if (completedSelectedTripIndex.value === 0) {
            if (currentIndex.value !== 1) {
                currentIndex.value -= 1
               await completedMoveTo(currentIndex.value)
            }
        }
    }
    return { selectedTrip, loading, getCompletedTripById, handleNext, handlePrev, completedSelectedTripIndex }
}

export const useCancelledTripIdDetails = () => {
    const { getCancelledTrips, cancelledTripsList, moveTo: cancelledMoveTo } = useGetCancelledTripsList()
    const cancelledSelectedTripIndex = computed(() => {
    return cancelledTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})
    const loading = ref(false)
    const getCancelledTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_upcoming_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
            if (cancelledTripsList.value.length === 0) {
                await getCancelledTrips()
            }
        }
        loading.value = false
    }

    const handleNext = async () => {
        if (cancelledSelectedTripIndex.value < cancelledTripsList.value.length - 1) {
            const nextTripId = cancelledTripsList.value[cancelledSelectedTripIndex.value + 1].id
            await getCancelledTripById(nextTripId)
        }
        if (cancelledSelectedTripIndex.value === cancelledTripsList.value.length - 1) {
            currentIndex.value++
            loading.value = true
            await cancelledMoveTo(currentIndex.value)
            loading.value = false
        }
    }
    const handlePrev = async () => {
        if (cancelledSelectedTripIndex.value > 0) {
            const prevTripId = cancelledTripsList.value[cancelledSelectedTripIndex.value - 1].id
            await getCancelledTripById(prevTripId)
        }
        if (cancelledSelectedTripIndex.value === 0) {
            if (currentIndex.value !== 1) {
                currentIndex.value -= 1
               await cancelledMoveTo(currentIndex.value)
            }
        }
    }
    return { selectedTrip, loading, getCancelledTripById, handleNext, handlePrev, cancelledSelectedTripIndex }
}

export const useTripFinancials = () => {
    const loading = ref(false)
    const tripFinancials = ref([])
    const revenueStats = ref({})

    const getTripFinancials = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_financials(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripFinancials.value = res?.data?.deductions
            tripFinancialId.value = res?.data?.id
            revenueStats.value = { ...res.data }
        }
        loading.value = false
    }
    return { tripFinancials, tripFinancialId, loading, getTripFinancials, revenueStats, financialsMoveTo, ...metaObject, next, prev }
}
