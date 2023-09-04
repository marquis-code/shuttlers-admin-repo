import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const routes_api = {
	$_recent_routes: () => {
		const url = '/routes?status=all&limit=5'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
