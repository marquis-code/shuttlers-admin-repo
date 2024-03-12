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
            metaObject.total.value = res.data.metadata.pageCount
        }
        loading.value = false
    }
    setFunction(getWaitlistById)

    watch([filterData.routeCode, filterData.search], (val) => {
        if (filterData.routeCode.value) {
            const result = selectedWaitlist.value.filter((itm) => {
                return (itm.routeCode.includes(filterData.routeCode.value))
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
