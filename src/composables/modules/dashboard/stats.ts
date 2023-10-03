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
