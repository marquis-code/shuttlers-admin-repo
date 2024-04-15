import { events_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedEvent = ref({} as Record<string, any>)
const loading = ref(false)
const loading_routes = ref(false)
const event_routes = ref([] as Record<string, any>[])

export const useEventIdDetails = () => {
    const getEventById = async () => {
        const id = useRoute().params.id as string
        loading.value = true
        const res = await events_api.$_get_events_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedEvent.value = res.data?.data?.id ? res.data?.data : {}
        }
        loading.value = false
    }

    const getEventRoutes = async () => {
        const event_id = useRoute().params.id as string
        loading.value = true
        const res = await events_api.$_get_event_routes(event_id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            event_routes.value = res.data?.length ? res.data : []
        }
        loading.value = false
    }
    return { selectedEvent, loading, getEventById, getEventRoutes, event_routes, loading_routes }
}
