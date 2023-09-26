import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useUserActiveBookings = () => {
    const loading = ref(false)
    const activeBookingsList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUserActiveBookingsById = async (id: string) => {
        loading.value = true
        const res = await users_api.$_get_active_booking(id, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            activeBookingsList.value = res.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }

    setFunction(getUserActiveBookingsById)

    return { activeBookingsList, loading, getUserActiveBookingsById, next, prev, moveTo, ...metaObject }
}
