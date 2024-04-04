import moment from 'moment'
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

const setFormInfoForCreateRouteForm = (data: Record<string, any>) => {
    const time = getDate(`${data.departure_time} ${data.time_of_day}`)

    console.log(time)
    const { createRouteForm } = useCreateRoute()
    const pickup_coordinate = data.pickup_coordinate.split(',')
    const destination_coordinate = data.destination_coordinate.split(',')
    createRouteForm.start_location.value = { name: data.pickup, lat: pickup_coordinate[0], lng: pickup_coordinate[1] }
    createRouteForm.end_location.value = { name: data.destination, lat: destination_coordinate[0], lng: destination_coordinate[1] }
    createRouteForm.sales_route_suggestion_id.value = data.id
    createRouteForm.route_availability.value = 'selected_days'
    createRouteForm.route_availability_days.value = JSON.parse(data.route_available_days)
    createRouteForm.itinerary_time.value = time
}
    const getDate = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number)
        const isPM = timeString.slice(-2).toLowerCase() === 'pm'
        const date = new Date()
        date.setHours(isPM ? hours + 12 : hours)
        date.setMinutes(minutes)

        return date
    }
