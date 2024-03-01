import {
  addToQueue,
  filterData,
  watchArray,
  onFilterUpdate,
  formattedCSVData
} from './helpers'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination, useTableFilter } from '@/composables/utils/table'
import { useDownloadReport } from '@/composables/utils/csv'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { usePaginatedFetchAndDownload } from '@/composables/core/useBatchDownload'
const {
  fetchAllPagesAndDownload,
  isDownloading,
  error,
  mergedData
} = usePaginatedFetchAndDownload()

const { download, loading: downloading } = useDownloadReport()
const total_pages = ref() as any
const activeTripsList = ref([] as Record<string, any>[])
const currentRoute = computed(() => {
  return useRoute().fullPath
})

const downloadReport = async () => {
  const route = useRoute()
  downloading.value = false
  const queryParams = useTableFilter(filterData)
  const routeType = (useRoute().name as string)?.split('-')[2]
  const baseURL = `/trips/${
    routeType === 'cancelled' ? 'upcoming' : routeType
  }?${queryParams}${queryParams ? '&' : ''}&limit=${
    total_pages.value > 150 ? '200' : '10'
  }&metadata=true&sort[created_at]=desc${
    routeType === 'cancelled' ? '&is_cancelled=true' : ''
  }`
  const fromParam = ref('') as any
  const toParam = ref('') as any
  watchEffect(() => {
    if (route?.query?.dateRange) {
      fromParam.value = (route?.query?.dateRange as string).split(',')[0] ?? ''
      toParam.value = (route?.query?.dateRange as string).split(',')[1] ?? ''
    }
  })

  const constructApiUrl = computed(() => {
    let url = baseURL
    const params = new URLSearchParams()

    if (fromParam.value)
      params.append('from', (route?.query?.dateRange as string).split(',')[0])
    if (toParam.value)
      params.append('to', (route?.query?.dateRange as string).split(',')[1])

    const queryString = params.toString()
    if (queryString) url += `&${queryString}`

    return url
  })

  if (total_pages.value > 150) {
    useConfirmationModal().openAlert({
      title: 'Please Confirm',
      type: 'DANGER',
      desc: 'It is recommended  to download a minimum of 10 days to avoid request time outs',
      loading: downloading,
      call_function: () => {
        useConfirmationModal().closeAlert()
        downloading.value = true
        fetchAllPagesAndDownload(constructApiUrl.value)
        .then(() => {
          const csvData = formattedCSVData(mergedData.value)
          download(csvData, `${routeType} trip report`)
          useAlert().openAlert({
            type: 'SUCCESS',
            msg: `Total ${routeType} Trip report ${
              fromParam?.value
                ? `${fromParam?.value} to ${toParam?.value}`
                : ''
            }`
          })
          downloading.value = false
        })
        .catch((error) => {
          throw new Error(error)
        }).finally(() => {
          downloading.value = false
        })
      }
    })
  } else {
    downloading.value = true
    fetchAllPagesAndDownload(constructApiUrl.value)
      .then(() => {
        const csvData = formattedCSVData(mergedData.value)
        download(csvData, `${routeType} trip report`)
        useAlert().openAlert({
          type: 'SUCCESS',
          msg: `Total ${routeType} Trip report ${
            fromParam?.value ? `${fromParam?.value} to ${toParam?.value}` : ''
          }`
        })
        downloading.value = false
      })
      .catch((error) => {
        throw new Error(error)
      }).finally(() => {
        downloading.value = false
      })
  }
}

export const useGetActiveTripsList = () => {
  const loadingActiveTrips = ref(false)

  const { moveTo, metaObject, next, prev, setFunction } = usePagination()

  const getActiveTrips = async () => {
    const request = async () => {
      loadingActiveTrips.value = true
      const res = (await trips_api.$_get_active_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        activeTripsList.value = res.data.data
        total_pages.value = res.data.metadata.total_pages
        metaObject.total.value = res.data.metadata.total_pages
      }
      loadingActiveTrips.value = false
    }
    addToQueue(request)
  }
  setFunction(getActiveTrips)

  watch(watchArray, () => {
    if (currentRoute.value.includes('active')) getActiveTrips()
  })

  return {
    getActiveTrips,
    loadingActiveTrips,
    activeTripsList,
    filterData,
    onFilterUpdate,
    moveTo,
    ...metaObject,
    next,
    prev,
    downloadReport
  }
}

const upcomingTripsList = ref([] as Record<string, any>[])
export const useGetUpcomingTripsList = () => {
  const loadingUpcomingTrips = ref(false)
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()

  const getUpcomingTrips = async () => {
    const request = async () => {
      loadingUpcomingTrips.value = true
      const res = (await trips_api.$_get_upcoming_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        upcomingTripsList.value = res.data.data
        total_pages.value = res.data.metadata.total_pages
        metaObject.total.value = res.data.metadata.total_pages
      }
      loadingUpcomingTrips.value = false
    }
    addToQueue(request)
    return upcomingTripsList.value
  }

  setFunction(getUpcomingTrips)

  watch(watchArray, () => {
    if (currentRoute.value.includes('upcoming')) getUpcomingTrips()
  })

  return {
    getUpcomingTrips,
    loadingUpcomingTrips,
    upcomingTripsList,
    filterData,
    onFilterUpdate,
    moveTo,
    ...metaObject,
    next,
    prev,
    downloadReport
  }
}

const completedTripsList = ref([] as Record<string, any>[])

export const useGetCompletedTripsList = () => {
  const loadingCompletedTrips = ref(false)
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()

  const getCompletedTrips = async () => {
    const request = async () => {
      loadingCompletedTrips.value = true
      const res = (await trips_api.$_get_completed_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        completedTripsList.value = res.data.data
        total_pages.value = res.data.metadata.total_pages
        metaObject.total.value = res.data.metadata.total_pages
      }
      loadingCompletedTrips.value = false
    }
    addToQueue(request)
  }
  setFunction(getCompletedTrips)

  watch(watchArray, () => {
    if (currentRoute.value.includes('completed')) getCompletedTrips()
  })

  return {
    getCompletedTrips,
    loadingCompletedTrips,
    completedTripsList,
    filterData,
    onFilterUpdate,
    moveTo,
    ...metaObject,
    next,
    prev,
    downloadReport
  }
}

const cancelledTripsList = ref([] as Record<string, any>[])
export const useGetCancelledTripsList = () => {
  const loadingCancelledTrips = ref(false)
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()

  const getCancelledTrips = async () => {
    const request = async () => {
      loadingCancelledTrips.value = true
      const res = (await trips_api.$_get_cancelled_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        cancelledTripsList.value = res.data.data
        metaObject.total.value = res.data.metadata.total_pages
      }
      loadingCancelledTrips.value = false
    }
    addToQueue(request)
    return cancelledTripsList.value
  }

  setFunction(getCancelledTrips)

  watch(watchArray, () => {
    if (currentRoute.value.includes('cancelled')) getCancelledTrips()
  })

  return {
    getCancelledTrips,
    loadingCancelledTrips,
    cancelledTripsList,
    filterData,
    onFilterUpdate,
    moveTo,
    ...metaObject,
    next,
    prev,
    downloadReport
  }
}
