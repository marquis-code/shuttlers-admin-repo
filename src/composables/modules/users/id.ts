import { users_api, corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

const selectedUser = ref({} as any)
const selectedUserId = ref('')
const bookingType = ref('')

export const useUserIdDetails = () => {
    const loading = ref(false)

    const getUserById = async (id: string) => {
        selectedUserId.value = id
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
    const getUserCorporateWalletLimitUsageInfo = async (id: number) => {
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
        start_date: ref(''),
        end_date: ref('')
    }

    const setBookingType = (itm: string) => {
        bookingType.value = itm
    }

    watch([filterData.search, filterData.start_date, filterData.end_date], (val) => {
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
            bookings.value = res.data
            metaObject.total.value = res.data?.length
        }
        loading.value = false
    }
    setFunction(getBookings)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date.value = data.value
                filterData.end_date.value = data.value
                break
        }
    }

    return { getBookings, loading, bookings, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject, setBookingType, bookingType }
}

export const useGetBusCaptainRoutes = () => {
    const loading = ref(false)
     const busCaptainRoutes = ref([] as any)
    const getBusCaptainRoutesById = async (id: string) => {
        selectedUserId.value = id
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
