import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUserActiveBookings = () => {
    const loading = ref(false)
    const activeBookingsList = ref([] as any)

    const getUserActiveBookingsById = async (id: string) => {
        loading.value = true
        const res = await users_api.$_get_active_booking(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            activeBookingsList.value = res.data
        }
        loading.value = false
    }
    return { activeBookingsList, loading, getUserActiveBookingsById }
}
