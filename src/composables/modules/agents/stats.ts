import { stats_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetSalesAgentsStats = () => {
    const loading = ref(false)
    const statsData = ref({} as Record<string, any>)

    const getSalesAgentsStats = async () => {
        loading.value = true
        const res = await stats_api.$_Sales_agent_stats() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            statsData.value = res.data
            loading.value = false
        }
    }

    return { getSalesAgentsStats, loading, statsData }
}
