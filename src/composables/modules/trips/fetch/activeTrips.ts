import {
  addToQueue,
  filterData,
  watchArray,
  onFilterUpdate
} from './helpers'
import { usePagination } from '@/composables/utils/table'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'

  const activeTripsList = ref([] as Record<string, any>[])
export const useGetActiveTripsList = () => {
  const loadingActiveTrips = ref(false)
  const total_pages = ref() as any

  const currentRoute = computed(() => { return useRoute().fullPath })

  const { moveTo, metaObject, next, prev, setFunction } = usePagination()

  const getActiveTrips = async () => {
    const request = async () => {
      loadingActiveTrips.value = true
      const res = (await trips_api.$_get_active_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        activeTripsList.value = res.data.data.map((trip) => {
          trip.vehicle_status = false
          return trip
            })
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
    prev
  }
}
