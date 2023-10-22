    import { TELEMETRY_ENDPOINT } from '@/api_factory/axios.config'

export const telemetry_api = {
    $_get_vehicles: () => {
		const url = '/vehicles'
		return TELEMETRY_ENDPOINT.get(url)
    },
    $_get_vehicle_positions: (id:string) => {
		const url = `/api/v1/vehicles/${id}/positions?page=1&size=500000`
		return TELEMETRY_ENDPOINT.get(url)
    }
}
