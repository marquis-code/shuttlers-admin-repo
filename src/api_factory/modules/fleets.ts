import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const fleets_api = {
	$_get_fleets: () => {
		const url = '/vehicles?limit=10&page=1&status=active&metadata=true&include=trip_count&related=vehicle_type,partner,drivers'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_fleet_inspection_days: () => {
		const url = '/inspection-days?page=1&limit=10&sort[created_at]=desc'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
