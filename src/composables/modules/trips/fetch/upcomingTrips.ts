import {
  addToQueue,
  filterData,
  watchArray,
  onFilterUpdate
} from './helpers'
import { usePagination } from '@/composables/utils/table'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
const upcomingTripsList = ref([] as Record<string, any>[])
export const useGetUpcomingTripsList = () => {
  const loadingUpcomingTrips = ref(false)
  const total_pages = ref() as any
  const currentRoute = computed(() => {
    return useRoute().fullPath
  })
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
    prev
  }
}
