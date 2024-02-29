import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'

const selectedAgent = ref({} as any)
const selectedId = ref('')
const AgentByIdloading = ref(false)

export const useAgentIdDetails = () => {
    const getAgentById = async (id: string) => {
        if (selectedId.value === id) return selectedAgent.value
        selectedId.value = id
        AgentByIdloading.value = true
        const res = await agents_api.$_get_agent_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedAgent.value = res.data
        }
        AgentByIdloading.value = false
        return res.data
    }
    return { selectedAgent, AgentByIdloading, getAgentById }
}
