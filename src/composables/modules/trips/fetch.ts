import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetTripsGraph = () => {
    const loading = ref(false)
    const tripsGraphData = ref({} as any)

    const { $_get_graph } = trips_api

    const getTripsGraph = async () => {
        loading.value = true
        const res = await $_get_graph() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripsGraphData.value = res.data
        }
        loading.value = false
    }

    return { getTripsGraph, loading, tripsGraphData }
}
