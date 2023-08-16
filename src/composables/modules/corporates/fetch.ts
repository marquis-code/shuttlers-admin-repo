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
