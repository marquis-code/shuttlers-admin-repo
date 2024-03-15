import {
  addToQueue,
  filterData,
  watchArray,
  onFilterUpdate
} from './helpers'
import { usePagination } from '@/composables/utils/table'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useGetCancelledTripsList = () => {
  const loadingCancelledTrips = ref(false)
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()
  const cancelledTripsList = ref([] as Record<string, any>[])
  const currentRoute = computed(() => {
    return useRoute().fullPath
  })
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
    prev
  }
}
