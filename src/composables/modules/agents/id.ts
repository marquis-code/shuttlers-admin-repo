import { agents_api } from '@/api_factory/modules/agent'
import { CustomAxiosResponse } from '@/api_factory/modules'

const selectedAgent = ref({} as any)

export const useAgentIdDetails = () => {
    const loading = ref(false)

    const getAgentById = async (id:string) => {
        loading.value = true
        const res = await agents_api.$_get_agent_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedAgent.value = res.data
        }
        loading.value = false
        return res.data
    }
    return { selectedAgent, loading, getAgentById }
}
