import { sos_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useSosList = () => {
    const loadingSos = ref(false)
    const sosList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_sos } = sos_api

    const filterData = {

    }

    const getSosList = async () => {
        loadingSos.value = true

        const res = await $_get_sos(filterData, metaObject) as CustomAxiosResponse

        if (res.type !== 'Error') {
            sosList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingSos.value = false
    }
    setFunction(getSosList)

    return { getSosList, loadingSos, sosList, prev, ...metaObject, next, moveTo }
}
