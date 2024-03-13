import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const rewards_api = {
    $_create_rewards: (payload: Record<string, any>) => {
		const url = '/customer-rewards'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
