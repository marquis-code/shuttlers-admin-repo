import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const users_api = {

	$_get_users: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const url = `/users?limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&sort[id]=desc&related=wallet&status=active`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_query_users: (query: string) => {
		const url = '/users/search?limit=10'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, { user: query })
	},
	$_get_user_by_id: (id:string) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_batch_refund: () => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_refund: (params: Record<string, any>) => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, params)
	},
	$_get_wallet_transactions: (id:string) => {
		const url = `/users/${id}/wallet`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_active_booking: (id:string) => {
		const url = `/users/${id}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_past_booking: (id:string, params:any) => {
		let url = `/users/${id}/user-route-schedules`
        if (params.status === 'completed') {
			url = `${url}?status=completed`
		}

		if (params.status === 'cancelled') {
			url = `${url}?status=cancelled`
		}
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
