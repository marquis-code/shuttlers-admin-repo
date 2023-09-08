import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const transactions_api = {
	$_recent_transactions: () => {
		const url = '/transactions?limit=5&page=1&sort[created_at]=desc&related=user'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_transactions_by_id: (id: string) => {
		const url = `/transactions/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
