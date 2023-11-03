import { ref, computed } from 'vue'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
import { useAlert } from '@/composables/core/notification'
const { getUpcomingTrips, upcomingTripsList, moveTo } = useGetUpcomingTripsList()

const selectedTrip = ref({} as Record<string, any>)
const selectedTripId = ref('')
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
    return { selectedTrip, loading, getTripById }
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
    }
    return { selectedTrip, loading, getUpcomingTripById, handleNext, handlePrev, selectedTripIndex }
}
