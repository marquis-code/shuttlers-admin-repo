import {
  addToQueue,
  filterData,
  watchArray,
  onFilterUpdate
} from './helpers'
import { usePagination } from '@/composables/utils/table'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useGetCompletedTripsList = () => {
  const loadingCompletedTrips = ref(false)
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()
  const total_pages = ref() as any
  const currentRoute = computed(() => {
    return useRoute().fullPath
  })
  const completedTripsList = ref([] as Record<string, any>[])
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
    prev
  }
}
