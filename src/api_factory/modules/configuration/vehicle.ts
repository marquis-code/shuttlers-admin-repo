import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const inspection_api = {
	$_create_charge_types: (payload:any) => {
		const url = '/additional-charges-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
