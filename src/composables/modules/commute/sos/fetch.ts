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

        if (res.type !== 'ERROR') {
            sosList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingSos.value = false
    }
    setFunction(getSosList)

    return { getSosList, loadingSos, sosList, prev, ...metaObject, next, moveTo }
}

export const useSosRequestList = () => {
    const loadingSosRequest = ref(false)
    const sosRequestList = ref([] as Record<string, any>[])

    const getSosRequestList = async (id:string) => {
        loadingSosRequest.value = true

        const res = await sos_api.$_get_sos_request(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            sosRequestList.value = res.data.data
        }
        loadingSosRequest.value = false
    }

    return { getSosRequestList, loadingSosRequest, sosRequestList }
}
