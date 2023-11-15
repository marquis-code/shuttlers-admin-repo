import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedTripRating = ref({} as Record<string, any>)
const selectedTripRatingId = ref('')

export const useTripRatingIdDetails = () => {
    const loading = ref(false)

    const getTripRatingById = async (id: string) => {
        selectedTripRatingId.value = id
        loading.value = true
        const res = await configure_api.$_get_trip_rating_details(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTripRating.value = res.data.data
        }
        loading.value = false
    }
    return { selectedTripRating, loading, getTripRatingById }
}
