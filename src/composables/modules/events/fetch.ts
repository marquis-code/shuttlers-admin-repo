import { events_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetEvents = () => {
    const loadingEvents = ref(false)
    const eventsList = ref([] as any)

    const { $_get_events } = events_api

    const getEventsList = async () => {
        loadingEvents.value = true

        const res = await $_get_events() as CustomAxiosResponse

        if (res.type !== 'Error') {
            eventsList.value = res.data.data
        }
        loadingEvents.value = false
    }

    return { getEventsList, loadingEvents, eventsList }
}

export const useGetUpcomingEvents = () => {
    const loadingUpcomingEvents = ref(false)
    const upcomingEventsList = ref([] as any)

    const { $_get_upcoming_events } = events_api

    const getUpcomingEventsList = async () => {
        loadingUpcomingEvents.value = true

        const res = await $_get_upcoming_events() as CustomAxiosResponse

        if (res.type !== 'Error') {
            upcomingEventsList.value = res.data.data
        }
        loadingUpcomingEvents.value = false
    }

    return { getUpcomingEventsList, loadingUpcomingEvents, upcomingEventsList }
}
