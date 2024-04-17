import { stats_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

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
        const service_id = ref('')
        const resp = await stats_api.$_get_trip_rating_service_id() as CustomAxiosResponse
        if (resp.type !== 'ERROR') {
            console.log(resp.data)
            service_id.value = resp.data?.data?.reference || ''
        } else {
            useAlert().openAlert({ type: 'ERROR', msg: 'Could not get rating service id' })
            return
        }

        const res = await $_trip_rating_info(service_id.value) as CustomAxiosResponse
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

    return { getFilteredTripRating, loadingRatingByDate, filteredRatingData, payload }
}

export const usePassengersRatingsGraph = () => {
    const loadingPassengersRatings = ref(false)
    const passengersRatings = ref([] as any)
    const payload = {
        startDate: ref(''),
        endDate: ref('')
    }

    const { $_trip_passenger_rating } = stats_api

    const getPassengersRating = async () => {
        loadingPassengersRatings.value = true

        const res = await $_trip_passenger_rating({
            startDate: payload.startDate.value,
            endDate: payload.endDate.value
        }) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            passengersRatings.value = res.data
        }
        loadingPassengersRatings.value = false
    }

    watch([payload.startDate, payload.endDate], (val) => {
        getPassengersRating()
    })

    return { getPassengersRating, loadingPassengersRatings, passengersRatings, payload }
}
