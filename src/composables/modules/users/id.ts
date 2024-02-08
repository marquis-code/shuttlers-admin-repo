import { users_api, corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useUserModal } from '@/composables/core/modals'

const selectedUser = ref({} as any)
const selectedUserId = ref('')
const bookingType = ref('')

export const useUserIdDetails = () => {
    const loading = ref(false)

    const getUserById = async () => {
        // selectedUserId.value = id
        const id = String(useRoute().params.id)
        loading.value = true
        const res = await users_api.$_get_user_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedUser.value = res.data
        }
        loading.value = false
        return res.data
    }
    return { selectedUser, loading, getUserById, selectedUserId }
}

export const useUserCorporateWalletLimitUsageInfo = () => {
    const loading = ref(false)
    const corporateWalletInfo = ref({} as Record<string, any>)
    const getUserCorporateWalletLimitUsageInfo = async () => {
        const id = Number(useRoute().params.id)
        // selectedUserId.value = id
        loading.value = true
        const res = await users_api.$_get_user_corporate_wallet_limit_usage_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateWalletInfo.value = res.data
        }
        loading.value = false
    }
    return { corporateWalletInfo, loading, getUserCorporateWalletLimitUsageInfo }
}

export const useUserBookings = () => {
    const loading = ref(false)
    const bookings = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        search: ref(''),
        from: ref(''),
        to: ref('')
    }

    const setBookingType = (itm: string) => {
        bookingType.value = itm
    }

    watch([filterData.search, filterData.to], (val) => {
        getBookings()
    })

    const { $_get_user_active_bookings, $_get_user_completed_and_past_bookings } = users_api

    const getBookings = async () => {
        let res
        loading.value = true
        if (bookingType.value === 'active') {
            res = await $_get_user_active_bookings(selectedUserId.value, metaObject, bookingType.value, filterData) as CustomAxiosResponse
        } else {
            res = await $_get_user_completed_and_past_bookings(selectedUserId.value, metaObject, bookingType.value, filterData) as CustomAxiosResponse
        }

        if (res.type !== 'ERROR') {
            bookings.value = res.data?.data
            metaObject.total.value = res.data?.metadata?.total_pages
        }
        loading.value = false
    }
    setFunction(getBookings)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.from.value = data.value[0] ? data.value[0] : ''
                filterData.to.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    return { getBookings, loading, bookings, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject, setBookingType, bookingType }
}

export const useGetBusCaptainRoutes = () => {
    const loading = ref(false)
     const busCaptainRoutes = ref([] as any)
    const getBusCaptainRoutesById = async () => {
        // selectedUserId.value = id
        const id = String(useRoute().params.id)
        loading.value = true
        const res = await users_api.$_load_bus_captain_routes(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            busCaptainRoutes.value = res.data
        }
        loading.value = false
    }
    return { busCaptainRoutes, loading, getBusCaptainRoutesById }
}

export const useDeleteBusCaptains = () => {
    const loading = ref(false)

    const deleteBusCaptain = async (id: string) => {
        loading.value = true
        const res = await users_api.$_remove_bus_captain(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Bus captain was successfully removed'
            })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
        return res.data
    }
    return { loading, deleteBusCaptain }
}

export const useBookUserTrip = () => {
    const loading = ref(false)

    const handleUserTripBooking = async (payload) => {
        const user_id = String(useRoute().params.id)
        loading.value = true
        const res = await users_api.$_book_trip(user_id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Trip was successfully booked for user'
            })
            useUserModal().closeBookTrip()
        }
        loading.value = false
        // return res.data
    }
    return { loading, handleUserTripBooking }
}
