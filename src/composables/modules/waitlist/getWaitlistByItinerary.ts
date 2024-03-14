import { waitlist_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'
const { moveTo, metaObject, next, prev, setFunction } = usePagination()

export const useWaitlistByItinerary = () => {
    const loading = ref(false)
    const filterData = {
        itenery: ref('')
    }

    const requestPayload = {
        routeCode: ref('')
    }
    const itineraryWaitlistList = ref([])
    const routeDetailsInfo = ref({})
    const getWaitlistByItineraryId = async () => {
        const { selectedWaitlistObject } = useWaitlistIdDetails()
        loading.value = true
        const res = await waitlist_api.$_get_waitlist_by_itinerary(metaObject, selectedWaitlistObject.value.date, requestPayload.routeCode.value, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            itineraryWaitlistList.value = res.data.data
            routeDetailsInfo.value = res.data.routeDetails
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getWaitlistByItineraryId)

    watch([filterData.itenery], (val) => {
        getWaitlistByItineraryId()
      })

      const onFilterUpdate = (data: any) => {
        if (data.type === 'itenery') {
            filterData.itenery.value = data.value
        }
      }

      const setRequestData = (data) => {
        requestPayload.routeCode.value = data.routeCode
        filterData.itenery.value = data.itenery
      }

    return { routeDetailsInfo, itineraryWaitlistList, setRequestData, filterData, onFilterUpdate, requestPayload, loading, getWaitlistByItineraryId, moveTo, ...metaObject, next, prev }
}
