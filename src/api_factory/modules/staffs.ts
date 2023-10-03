import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const staffs_api = {
	$_get_staffs: () => {
		const url = '/staff'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
