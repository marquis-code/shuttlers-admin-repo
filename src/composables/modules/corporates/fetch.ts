import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetCorporateGraph = () => {
    const loading = ref(false)
    const corporatesGraphData = ref({} as any)

    const { $_get_graph } = corporates_api

    const getCorporatesGraph = async () => {
        loading.value = true
        const res = await $_get_graph() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesGraphData.value = res.data
        }
        loading.value = false
    }

    return { getCorporatesGraph, loading, corporatesGraphData }
}

export const useGetCorporateList = () => {
    const loading = ref(false)
    const corporatesList = ref([] as any)
    const corporateMetaData = ref({} as any)

    const { $_get_list } = corporates_api

    const getCorporatesList = async () => {
        loading.value = true
        const res = await $_get_list() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesList.value = res.data.models
            corporateMetaData.value = res.data.pagination?.rowCount
        }
        loading.value = false
    }

    return { getCorporatesList, loading, corporatesList }
}
