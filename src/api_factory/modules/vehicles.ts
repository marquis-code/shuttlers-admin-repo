import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const vehicles_api = {
	$_get_vehicles_for_selector_component: () => {
		const url = `/vehicles?limit=${10000}&page=${1}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_vehicle: (vehicleId: string|number, payload: Record<string, any>) => {
		const url = `/vehicles/${vehicleId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	}
}
