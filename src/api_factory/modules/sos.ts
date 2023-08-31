import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const sos_api = {
	$_get_sos: () => {
		const url = '/sos-requests'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
