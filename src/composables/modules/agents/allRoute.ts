import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'

const suggestedRoutes = ref([] as any[])
const loading = ref(false)

export const useGetAgentsRoutes = () => {
    const getAgentsRoute = async () => {
        suggestedRoutes.value = []
        loading.value = true

        const response = await agents_api.$_get_route_suggestions() as CustomAxiosResponse

        if (response.type !== 'ERROR') {
            suggestedRoutes.value = response.data.data
        }
        loading.value = false
    }

    return { getAgentsRoute, loading, suggestedRoutes }
}
