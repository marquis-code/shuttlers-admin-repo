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

  const getWaitlist = async () => {
    loadingWaitlist.value = true
    const res = (await waitlist_api.$_get_waitlist(metaObject, filterData)) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      waitlistList.value = res.data.data
      const { pageCount: total_pages } = res.data.metadata
      metaObject.total.value = total_pages
    }
    loadingWaitlist.value = false
  }
  setFunction(getWaitlist)

  watch([filterData.sort, filterData.fromdate, filterData.todate], (val) => {
    getWaitlist()
  })
  const onFilterUpdate = (data: any) => {
    switch (data.type) {
      case 'sort':
        filterData.sort.value = data.value
        break
      case 'dateRange':
        filterData.fromdate.value = data.value[0] || ''
        filterData.todate.value = data.value[1] || ''
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
