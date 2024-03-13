import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'

const selectedRequest = ref({})

export const useGetCorporateShuttleRequests = () => {
  const loading = ref(false)
  const shuttleRequests = ref([])

  const { metaObject, moveTo, next, prev, setFunction } = usePagination()

  const { $_get_corporate_shuttle_request } = corporates_api

  const filterData = {
    sharing_type: ref(''),
    created_at: ref('')
  }
  watch([filterData.sharing_type, filterData.created_at], (val) => {
    getCorporateShuttleRequest()
  })

  const getCorporateShuttleRequest = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
    loading.value = true
    const res = (await $_get_corporate_shuttle_request(
      selectedCorporate.value.id,
      metaObject,
      filterData
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      shuttleRequests.value = res.data.data
      metaObject.total.value = res.data.metadata?.total
    }
    loading.value = false
  }
  setFunction(getCorporateShuttleRequest)

  const onFilterUpdate = (data) => {
    switch (data.type) {
      case 'search':
        filterData.sharing_type.value = data.value
        break
      case 'status':
        filterData.created_at.value = data.value
        break
    }
  }

  return {
    getCorporateShuttleRequest,
    loading,
    shuttleRequests,
    ...metaObject,
    next,
    prev,
    moveTo,
    onFilterUpdate,
    filterData,
    selectedRequest
  }
}
