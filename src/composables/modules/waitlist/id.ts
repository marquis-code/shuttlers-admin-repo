import { waitlist_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedWaitlist = ref([] as Record<string, any>)
const selectedWaitlistId = ref('')
const { moveTo, metaObject, next, prev, setFunction } = usePagination()

export const useWaitlistIdDetails = () => {
    const loading = ref(false)

    const getWaitlistById = async (id: string) => {
        selectedWaitlistId.value = id
        loading.value = true
        const res = await waitlist_api.$_get_waitlist_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedWaitlist.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getWaitlistById)

    return { selectedWaitlist, loading, getWaitlistById, moveTo, ...metaObject, next, prev }
}
