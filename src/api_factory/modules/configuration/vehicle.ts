import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const inspection_api = {
	$_create_inspection_sites: (payload:any) => {
		const url = '/inspection-sites'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
    $_create_vehicle_types: (payload:any) => {
		const url = '/vehicle-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_vehicle_types: (id, payload:any) => {
		const url = `/vehicle-types/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_inspection_sites: (id, payload:any) => {
		const url = `/inspection-sites/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
    $_create_vehicle_cost_of_supply: (payload:any) => {
		const url = '/vehicle-types/cost-of-supply'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_vehicle_cost_of_supply: (id, payload:any) => {
		const url = `/vehicle-types/cost-of-supply/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_vehicle_cost_of_supply: (id, payload:any) => {
		const url = `/vehicle-types/cost-of-supply/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url, payload)
	},
	$_delete_vehicle_types: (id: number) => {
		const url = `/vehicle-types/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_delete_inspection_site: (id: number) => {
		const url = `/inspection-sites/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	}
}
