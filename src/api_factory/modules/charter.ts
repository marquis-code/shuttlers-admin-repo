import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const charter_api = {
    $_recent_charter_requests: () => {
		const url = '/charters?limit=5'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
