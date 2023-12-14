import { ref, computed } from 'vue'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
import { usePagination } from '@/composables/utils/table'
const { moveTo: financialsMoveTo, metaObject, next, prev, setFunction } = usePagination()
const { getUpcomingTrips, upcomingTripsList, moveTo } = useGetUpcomingTripsList()

const selectedTrip = ref({} as Record<string, any>)
const selectedTripId = ref('')
const tripFinancialId = ref('')
const selectedTripIndex = computed(() => {
    return upcomingTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})

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
        console.log('called')
        console.log(selectedTripIndex.value)
        if (selectedTripIndex.value > 0) {
            console.log('ds')
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
