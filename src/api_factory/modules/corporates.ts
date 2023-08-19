import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const corporates_api = {
	$_get_graph: () => {
		const url = '/corporates/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_list: () => {
		const url = '/corporates?new_signup'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
