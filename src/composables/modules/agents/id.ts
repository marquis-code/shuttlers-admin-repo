import { useCreateRoute } from '../routes/create'
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
    return { selectedAgent, AgentByIdloading, getAgentById, selectedId }
}

export const useGetAgentRouteSuggestionsById = () => {
    const AgentSuggestedRoute = ref({} as any)
    const loading = ref(false)
    const getAgentRouteSuggestionsById = async (id: string, shouldSetForm = false) => {
        loading.value = true
        const res = await agents_api.$_get_agent_route_suggestions_by_id(id) as CustomAxiosResponse
        loading.value = false
        if (res.type !== 'ERROR') {
            AgentSuggestedRoute.value = res.data

            if (shouldSetForm) setFormInfoForCreateRouteForm(AgentSuggestedRoute.value)
            return res.data
        }
    }
    return { getAgentRouteSuggestionsById, AgentSuggestedRoute, loading }
}

const setFormInfoForCreateRouteForm = (data:Record<string, any>) => {
    const { createRouteForm } = useCreateRoute()
    createRouteForm.start_location.value = { name: data.pickup, lat: '0', lng: '0' }
    createRouteForm.end_location.value = { name: data.destination, lat: '0', lng: '0' }
    createRouteForm.sales_route_suggestions_id.value = data.id
}
