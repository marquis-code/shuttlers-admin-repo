import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'

const graphData = ref([]) as Ref<any[]>
const loading = ref(false)

export const useDriverGraph = () => {
	const getGraph = async (driverId:number|string) => {
		loading.value = true
        const res = await drivers_api.$_get_graph(driverId) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			graphData.value = res.data
        }
        loading.value = false
	}

	return { graphData, loading, getGraph }
}
