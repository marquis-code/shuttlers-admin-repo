import { useUserIdDetails } from '../users/id'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetTripPassenger = () => {
    const loading = ref(false)
    const tripPassengerData = ref({} as any)

    const { $_get_trip_passengers } = trips_api

    const getTripPassenger = async (id:string) => {
        loading.value = true
        const res = await $_get_trip_passengers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripPassengerData.value = res.data
        }
        loading.value = false
    }

    return { getTripPassenger, loading, tripPassengerData }
}
const loading = ref(false)
const cardIsOpen = ref(false)
const userDetails = ref({} as Record<string, any>)

export const useShowTripPassengersCard = () => {
    const { getUserById, selectedUser } = useUserIdDetails()

    const openCard = async (data: any) => {
        cardIsOpen.value = true
        loading.value = true
        userDetails.value = await getUserById(data.id)
        loading.value = false
    }

    const closeCard = () => {
        cardIsOpen.value = false
        userDetails.value = {}
        loading.value = false
    }

    return { loading, cardIsOpen, userDetails, openCard, closeCard }
}
