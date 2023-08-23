import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const trips_api = {
	$_get_graph: () => {
		const url = '/trips/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
