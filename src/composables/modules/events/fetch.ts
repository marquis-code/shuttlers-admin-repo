import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetEvents = () => {
    const loadingEvents = ref(false)
    const eventsList = ref([] as any)
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const filterData = {
        search: ref(''),
        fromdate: ref(''),
        todate: ref('')
    }

    watch([filterData.fromdate, filterData.todate, filterData.search], (val) => {
        metaObject.page.value = 1
        getEventsList()
    })

    const { $_get_events } = events_api

    const getEventsList = async () => {
        loadingEvents.value = true

        const res = await $_get_events(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            eventsList.value = res.data.data
            metaObject.total.value = res.data.metadata?.pageCount
        }
        loadingEvents.value = false
    }

    setFunction(getEventsList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
                filterData.fromdate.value = data.value[0] ? data.value[0] : ''
                filterData.todate.value = data.value[1] ? data.value[1] : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getEventsList, loadingEvents, eventsList, filterData, onFilterUpdate, ...metaObject, next, prev, moveTo }
}

export const useGetUpcomingEvents = () => {
    const loadingUpcomingEvents = ref(false)
    const upcomingEventsList = ref([] as any)
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const filterData = {
        search: ref(''),
        status: ref('accepted'),
        fromDate: ref(''),
        toDate: ref('')
    }

    watch([filterData.status, filterData.fromDate, filterData.toDate, filterData.search], (val) => {
        getUpcomingEventsList()
    })

    const { $_get_events } = events_api

    const getUpcomingEventsList = async () => {
        loadingUpcomingEvents.value = true

        const res = await $_get_events(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            upcomingEventsList.value = res.data.data
            metaObject.total.value = res.data.metadata?.pageCount
        }
        loadingUpcomingEvents.value = false
    }

    setFunction(getUpcomingEventsList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.fromDate.value = data.value
                filterData.toDate.value = data.value
                break
        }
    }

    return { getUpcomingEventsList, loadingUpcomingEvents, upcomingEventsList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}
