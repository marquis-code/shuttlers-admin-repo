import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedTrip = ref({} as Record<string, any>)
const selectedTripId = ref('')

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
        }
        loading.value = false
    }
    return { selectedTrip, loading, getUpcomingTripById }
}
