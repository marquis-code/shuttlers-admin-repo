import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUserPastBookings = () => {
    const loading = ref(false)
    const pastBookingsList = ref([] as any)

    const getUserPastBookingsById = async (id: string, params: any) => {
        loading.value = true
        const res = await users_api.$_get_past_booking(id, params) as CustomAxiosResponse
        if (res.type !== 'Error') {
            pastBookingsList.value = res.data
        }
        loading.value = false
    }
    return { pastBookingsList, loading, getUserPastBookingsById }
}
