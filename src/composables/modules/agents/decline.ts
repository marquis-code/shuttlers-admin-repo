import { useGetAgentsRoutes } from './routes'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { useAlert } from '@/composables/core/notification'
import { useRouteModal } from '@/composables/core/modals'

const reason = ref('')
const selectedRoute = ref({} as Record<string, any>)

export const useDeclineRouteSuggestion = () => {
    const loading = ref(false)
    const setDeclineRoute = (data: Record<string, any>) => {
        console.log(data)
        selectedRoute.value = data
        useRouteModal().openDeclineReason()
    }
    const decline = async () => {
        console.log(selectedRoute.value.id)
        if (!selectedRoute.value.id) return

        loading.value = true
        const res = await agents_api.$_decline_suggestion(selectedRoute.value.id, { route_decline_reason: reason.value }) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useRouteModal().closeDeclineReason()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Route suggestion declined successfully' })
        useGetAgentsRoutes().getAgentsRoute(selectedRoute.value.agent_account_id)
        }
        loading.value = false
    }

    return {
        decline,
        setDeclineRoute,
        reason, loading
    }
}
