import { charter_api, routes_api, transactions_api, users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useRecentDashboardStats = () => {
    const loading = ref(false)
    const recentRoutes = ref([])
    const recentCharter = ref([])
    const recentSignups = ref([])
    const recentTransactions = ref([])

    const { $_recent_signups } = users_api
    const { $_recent_transactions } = transactions_api
    const { $_recent_routes } = routes_api
    const { $_recent_charter_requests } = charter_api

    const loadRecentStats = async () => {
        loading.value = true
        const res = await Promise.allSettled([$_recent_signups(), $_recent_transactions(), $_recent_routes(), $_recent_charter_requests()]) as unknown as CustomAxiosResponse[]
        console.log(res, 'ap res resu;lt here')
        recentSignups.value = res[0]?.value?.data
        recentTransactions.value = res[1]?.value?.data
        recentRoutes.value = res[2]?.value?.data
        recentCharter.value = res[3]?.value?.data?.data

        loading.value = false
    }

    return { loadRecentStats, loading, recentRoutes, recentCharter, recentSignups, recentTransactions }
}
