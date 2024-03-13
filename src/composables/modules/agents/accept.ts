import { useGetAgentsRoutes } from './routes'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { useAlert } from '@/composables/core/notification'
import { useRouteModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'

const selectedRoute = ref({} as Record<string, any>)

export const useAcceptRouteSuggestion = () => {
    const loading = ref(false)
    const setAcceptRoute = (data: Record<string, any>) => {
        selectedRoute.value = data
        useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Accept Route', desc: 'To approve this route, you will need to add stops and configure the route, do you wish to proceed?', call_function: accept, loading })
    }
    const accept = async () => {
        useConfirmationModal().closeAlert()
        useRouter().push('/trips/routes/create-route')
    }

    return {
        accept,
        setAcceptRoute

    }
}
