import { waitlist_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedWaitlist = ref([] as Record<string, any>)
const selectedWaitlistObject = ref({}) as any
const { moveTo, metaObject, next, prev, setFunction } = usePagination()

export const useWaitlistIdDetails = () => {
    const loading = ref(false)
    const filterData = {
        routeCode: ref(''),
        search: ref('')
    }

    const getWaitlistById = async () => {
        loading.value = true
        const res = await waitlist_api.$_get_waitlist_by_id(metaObject, selectedWaitlistObject.value.date, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedWaitlist.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getWaitlistById)

    watch([filterData.routeCode, filterData.search], (val) => {
        if (filterData.routeCode.value) {
            const result = selectedWaitlist.value.filter((itm) => {
                return (itm.value.toUpperCase().includes(val))
            })
            selectedWaitlist.value = result
            return selectedWaitlist.value
        } else {
            getWaitlistById()
        }
      })

      const onFilterUpdate = (data: any) => {
        if (data.type === 'search') {
            filterData.search.value = data.value
        }

        if (filterData.routeCode.value) {
            filterData.routeCode.value = data.value
        }
      }

    return { selectedWaitlist, selectedWaitlistObject, onFilterUpdate, loading, getWaitlistById, moveTo, filterData, ...metaObject, next, prev }
}

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

    return { selectedWaitlist, routeDetailsInfo, itineraryWaitlistList, setRequestData, filterData, onFilterUpdate, requestPayload, loading, getWaitlistByItineraryId, moveTo, ...metaObject, next, prev }
}
