import { useEventIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useEventModal } from '@/composables/core/modals'

const loading = ref(false)
const routes = ref([]) as Ref<Record<string, any>[]>
const isEdit = ref(false)

const clearObj = () => {
    isEdit.value = false
    routes.value = []
}

export const useAddRoutesToEvent = () => {
	const assignRoutesToEvent = async () => {
		loading.value = true
        const eventId = useRoute().params.id as string
        let payload:{routes: any[]}
        if (isEdit.value) {
            payload = {
                routes: routes.value.map((el) => {
                    return {
                        dropoff: el?.dropoff,
                        id: el?.routeId,
                        pickup: el?.pickup,
                        routeCode: el?.routeCode
                    }
                })
            }
        } else {
            payload = {
                routes: routes.value.map((el) => {
                    return {
                        dropoff: el?.destination,
                        id: el?.id,
                        pickup: el?.pickup,
                        routeCode: el?.route_code
                    }
                })
            }
        }
		const res = await events_api.$_add_routes_to_events(eventId, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Routes assigned to event successfully' })
            useEventIdDetails().getEventById()
            useEventIdDetails().getEventRoutes()
            useEventModal().closeAssignRoutes()
        }
        loading.value = false
	}

    const initEditRoutes = (_routes:Record<string, any>[]) => {
        isEdit.value = true
        routes.value = _routes
        useEventModal().openAssignRoutes()
    }

	return { loading, assignRoutesToEvent, routes, isEdit, clearObj, initEditRoutes }
}
