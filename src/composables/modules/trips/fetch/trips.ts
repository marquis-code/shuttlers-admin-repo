import { addToQueue, filterData, watchArray, onFilterUpdate, formattedCSVData } from './helpers'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useDownloadReport } from '@/composables/utils/csv'

const { download } = useDownloadReport()

const activeTripsList = ref([] as Record<string, any>[])

export const useGetActiveTripsList = () => {
    const loadingActiveTrips = ref(false)

    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getActiveTrips = async () => {
        const request = async () => {
            loadingActiveTrips.value = true
            const res = await trips_api.$_get_active_trips(filterData, metaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                activeTripsList.value = res.data.data
                metaObject.total.value = res.data.metadata.total_pages
            }
            loadingActiveTrips.value = false
        }
        addToQueue(request)
    }

    const downloadReport = async () => {
        const { metaObject: downloadMetaObject } = usePagination()
        const request = async () => {
            downloadMetaObject.page_size.value = metaObject.total.value * metaObject.page_size.value
            const res = await trips_api.$_get_active_trips(filterData, downloadMetaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                const csvData = formattedCSVData(res.data.data)
                download(csvData, 'Active Trip Report')
            }
            loadingActiveTrips.value = false
        }
        addToQueue(request)
    }
    setFunction(getActiveTrips)

    watch(watchArray, () => {
        getActiveTrips()
    })

    return { getActiveTrips, loadingActiveTrips, activeTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadReport }
}

const upcomingTripsList = ref([] as Record<string, any>[])
export const useGetUpcomingTripsList = () => {
    const loadingUpcomingTrips = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUpcomingTrips = async () => {
        const request = async () => {
            loadingUpcomingTrips.value = true
            const res = await trips_api.$_get_upcoming_trips(filterData, metaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                upcomingTripsList.value = res.data.data
                metaObject.total.value = res.data.metadata.total_pages
            }
            loadingUpcomingTrips.value = false
        }
        addToQueue(request)
        return upcomingTripsList.value
    }

    const downloadReport = async () => {
        const { metaObject: downloadMetaObject } = usePagination()
        const request = async () => {
            downloadMetaObject.page_size.value = metaObject.total.value * metaObject.page_size.value
            const res = await trips_api.$_get_upcoming_trips(filterData, downloadMetaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                const csvData = formattedCSVData(res.data.data)
                download(csvData, 'Upcoming Trip Report')
            }
            loadingUpcomingTrips.value = false
        }
        addToQueue(request)
    }
    setFunction(getUpcomingTrips)

    watch(watchArray, () => {
        getUpcomingTrips()
    })

    return { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadReport }
}

const completedTripsList = ref([] as Record<string, any>[])

export const useGetCompletedTripsList = () => {
    const loadingCompletedTrips = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getCompletedTrips = async () => {
        const request = async () => {
            loadingCompletedTrips.value = true
            const res = await trips_api.$_get_completed_trips(filterData, metaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                completedTripsList.value = res.data.data
                metaObject.total.value = res.data.metadata.total_pages
            }
            loadingCompletedTrips.value = false
        }
        addToQueue(request)
    }
    const downloadReport = async () => {
        const { metaObject: downloadMetaObject } = usePagination()
        const request = async () => {
            downloadMetaObject.page_size.value = metaObject.total.value * metaObject.page_size.value
            const res = await trips_api.$_get_completed_trips(filterData, downloadMetaObject) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                const csvData = formattedCSVData(res.data.data)
                download(csvData, 'Completed Trip Report')
            }
            loadingCompletedTrips.value = false
        }
        addToQueue(request)
    }
    setFunction(getCompletedTrips)

    watch(watchArray, () => {
        getCompletedTrips()
    })

    return { getCompletedTrips, loadingCompletedTrips, completedTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadReport }
}
