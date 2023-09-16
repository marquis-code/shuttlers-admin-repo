import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const users_api = {

	$_get_users: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&sort[id]=desc&related=wallet`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_query_users: (query: string) => {
		const url = '/users/search?limit=10'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, { user: query })
	},
	$_create_notification: (payload) => {
		const url = '/notifications'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, { ...payload })
	},
	$_get_user_by_id: (id:string) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_batch_refund: () => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_refund: (payload: Record<string, any>) => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_process_refund: (payload: Record<string, any>[]) => {
		const url = '/refund-logs/process-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_delete_refund: (id:string) => {
		const url = `/refund-logs/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_wallet_transactions: (id:string, metaObject: TMetaObject) => {
		const url = `/users/${id}/wallet?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_active_booking: (id:string, metaObject: TMetaObject) => {
		const url = `/users/${id}/routes?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_past_booking: (id:string, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users/${id}/user-route-schedules?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_past_booking_by_id: (id:string) => {
		const url = `/user-route-schedules/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
