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
        console.log(res, 'passengers rating res here')
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

// export const fetchRatingsChartData = () => {
//     const loadingRatingsChartData = true
//     const errorLoadingRatingsChartData = false
//     const errorMessage = ''

//     const startDate = moment().subtract(6, 'd').format('YYYY-MM-DD')
//     const endDate = moment().format('YYYY-MM-DD')
//     const payload = {
//       settings_id: this.settingsId,
//       start_date: startDate,
//       end_date: endDate
//     }

//     Promise.all([
//       this.axios.get(
//         `/v1/routes/passengers/stats?startDate=${startDate}&endDate=${endDate}`
//       ),
//       this.axios.post('/rating/reports/graph/day', payload)
//     ])
//       .then((res) => {
//         const passengersResponse = res[0].data
//         const ratingsResponse = res[1].data.data
//         const dates = getDatesInRange(startDate, endDate)

//         const ratingsData = dates.map((date) => {
//           const datum = {}
//           datum.date = date
//           datum.total_passengers = passengersResponse[date].total
//           datum.average_daily_rating = passengersResponse[date].rating
//           datum.total_rating =
//             ratingsResponse.find((item) => item.day === date)?.count || 0

//           return datum
//         })

//         this.ratingsChartData = getRatingsChartData(ratingsData)
//       })
//       .catch(() => {
//         this.errorLoadingRatingsChartData = true
//         this.errorMessage =
//           'Sorry, we couldn\'t load the ratings graph at this time. Please'
//       })
//       .finally(() => (this.loadingRatingsChartData = false))
//   },
