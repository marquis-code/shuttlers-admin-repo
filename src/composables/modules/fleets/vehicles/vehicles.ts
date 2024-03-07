import { vehicles_api, CustomAxiosResponse } from '@/api_factory/modules'

const loading = ref(false)
const vehicles = ref([]) as Ref<any[]>

export const useAllVehicles = () => {
	const getVehicles = async () => {
		loading.value = true
		const res = await vehicles_api.$_get_vehicles_for_selector_component() as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			vehicles.value = res.data.data?.length ? res.data.data : []
		}
		loading.value = false
	}

	const getActiveVehicles = async () => {
		loading.value = true
		const res = await vehicles_api.$_get_active_vehicles_for_selector_component() as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			vehicles.value = res.data.data?.length ? res.data.data : []
		}
		loading.value = false
	}

	return { loading, vehicles, getVehicles, getActiveVehicles }
}
