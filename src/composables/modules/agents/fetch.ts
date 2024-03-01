import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { usePagination } from '@/composables/utils/table'

    const agentsList = ref([] as any)
export const useGetAgentsList = () => {
    const loading = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_agents } = agents_api

    const getAgentsList = async () => {
        agentsList.value = []
        loading.value = true

        const response = await $_get_agents(metaObject) as CustomAxiosResponse

        if (response.type !== 'ERROR') {
            agentsList.value = response.data.data
            metaObject.total.value = response.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getAgentsList)

    return { getAgentsList, loading, agentsList, moveTo, ...metaObject, next, prev }
}
