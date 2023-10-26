import { events_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedEvent = ref({} as Record<string, any>)
const selectedEventId = ref('')

export const useEventIdDetails = () => {
    const loading = ref(false)

    const getEventById = async (id: string) => {
        selectedEventId.value = id
        loading.value = true
        const res = await events_api.$_get_events_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedEvent.value = res.data
        }
        loading.value = false
    }
    return { selectedEvent, loading, getEventById }
}
