import { stats_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetDashboardStats = () => {
    const loading = ref(false)
    const statsData = ref({
        totalRides: { name: 'Total Rides', value: 0 },
        totalTransactions: { name: 'Total Transactions', value: 0 },
        totalUsers: { name: 'Total Users', value: 0 },
        totalDrivers: { name: 'Total Drivers', value: 0 }
    })

    const { $_drivers_count, $_rides_count, $_transactions_count, $_users_count } = stats_api

    const getStats = async () => {
        loading.value = true
        const res = await Promise.all([$_drivers_count(), $_rides_count(), $_transactions_count(), $_users_count()]) as CustomAxiosResponse[]
        if (res[0].type !== 'ERROR') {
            const [drivers, rides, transactions, users] = res
            statsData.value.totalDrivers.value = drivers.data?.count
            statsData.value.totalRides.value = rides.data?.count
            statsData.value.totalTransactions.value = transactions.data?.count
            statsData.value.totalUsers.value = users.data?.count
            loading.value = false
        }
    }

    return { getStats, loading, statsData }
}

export const useGetTripRatingInfo = () => {
    const loadingTripRatingInfo = ref(false)
    const tripRatingData = ref({} as any)

    const { $_trip_rating_info } = stats_api

    const getTripRatingData = async () => {
        loadingTripRatingInfo.value = true

        const res = await $_trip_rating_info() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            tripRatingData.value = res.data.data
        }
        loadingTripRatingInfo.value = false
    }

    return { getTripRatingData, loadingTripRatingInfo, tripRatingData }
}

export const useGetRatingInfoByDate = () => {
    const loadingRatingByDate = ref(false)
    const filteredRatingData = ref({} as any)
    const payload = {
        from: ref(''),
        to: ref('')
    }

    const { $_trip_rating_info_by_date } = stats_api

    const getFilteredTripRating = async () => {
        loadingRatingByDate.value = true

        const res = await $_trip_rating_info_by_date({
            from: payload.from.value,
            to: payload.to.value
        }) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            filteredRatingData.value = res.data
        }
        loadingRatingByDate.value = false
    }

    watch([payload.from, payload.to], (val) => {
        getFilteredTripRating()
    })

    return { getFilteredTripRating, loadingRatingByDate, filteredRatingData, payload }
}
