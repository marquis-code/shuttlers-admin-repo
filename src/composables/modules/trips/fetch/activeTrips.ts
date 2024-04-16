import { watchDebounced } from '@vueuse/core'
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
  const loadingMoreActiveTrips = ref(false)

  const currentRoute = computed(() => { return useRoute().fullPath })

  const { moveTo, metaObject, next, prev, setFunction, showLoadMore } = usePagination()

  const getActiveTrips = async () => {
    const request = async (shouldReset = false) => {
      if (shouldReset) {
        metaObject.page.value = 1
      }
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
        metaObject.total_pages.value = res.data.metadata.total_pages
        metaObject.total.value = res.data.metadata.total
      }
      loadingActiveTrips.value = false
    }
    addToQueue(request)
  }
  setFunction(getActiveTrips)

  watchDebounced(watchArray, () => {
     getActiveTrips()
  }, { debounce: 1000, maxWait: 1000 })

  const loadMoreActiveTrip = async () => {
      const request = async () => {
      loadingMoreActiveTrips.value = true
      const res = (await trips_api.$_get_active_trips(
        filterData,
        metaObject
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        activeTripsList.value.push(...res.data.data.map((trip) => {
 trip.vehicle_status = false
          return trip
            }))
        metaObject.total_pages.value = res.data.metadata.total_pages
        metaObject.total.value = res.data.metadata.total
      }
      loadingMoreActiveTrips.value = false
    }
    addToQueue(request)
  }

  const loadMore = () => {
    if (metaObject.page.value >= metaObject.total_pages.value) return
    metaObject.page.value++
    loadMoreActiveTrip()
  }

  return {
  showLoadMore, loadMore, loadingMoreActiveTrips,
    getActiveTrips, loadingActiveTrips,
    activeTripsList, filterData,
    onFilterUpdate, moveTo,
    ...metaObject, next, prev
  }
}
