import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const users_api = {
    $_recent_signups: () => {
		const url = '/users?limit=5&page=1&sort[created_at]=desc'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_users: () => {
		const url = '/users?limit=20&page=1&metadata=true&sort[id]=desc&related=wallet&status=active'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_batch_booking: () => {
		const url = '/batch-bookings?limit=10&page=1&metadata=true'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
