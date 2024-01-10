import { waitlist_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetwaitlistList = () => {
  const loadingWaitlist = ref(false)
  const waitlistList = ref([])
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()
  const filterData = {
    sort: ref(''),
    fromdate: ref(''),
    todate: ref('')
  }

  const { $_get_waitlist } = waitlist_api

  const getWaitlist = async () => {
    loadingWaitlist.value = true
    const res = (await $_get_waitlist(
      metaObject,
      filterData
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      waitlistList.value = res.data.data
      metaObject.total.value = res.data.metadata.pageCount
    }
    loadingWaitlist.value = false
  }
  setFunction(waitlistList)

  watch([filterData.sort, filterData.fromdate, filterData.todate], (val) => {
    getWaitlist()
  })
  const onFilterUpdate = (data: any) => {
    switch (data.type) {
      case 'sort':
        filterData.sort.value = data.value
        break
      case 'dateRange':
        filterData.fromdate.value = data.value[0]
        filterData.todate.value = data.value[1]
        break
    }
  }

  return {
    getWaitlist,
    loadingWaitlist,
    waitlistList,
    filterData,
    onFilterUpdate,
    moveTo,
    ...metaObject,
    next,
    prev
  }
}
