import { GATEWAY_ENDPOINT_WITH_AUTH, CustomAxiosResponse } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

export const users_api = {

	$_get_users: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_all_users: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users?${queryParams}&limit=${10}&page=${1}&metadata=true&sort[id]=desc&related=wallet`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/users?${queryParams}&limit=${total}&page=${1}&metadata=true&sort[id]=desc&related=wallet`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_searched_users: (payload: any, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `users/search?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&sort[id]=desc&related=wallet`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_graph: () => {
		const url = '/users/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_users: (payload) => {
		const url = '/users'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_users: (payload, id) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_query_users: (query: string) => {
		const url = '/users/search?limit=10&status=active'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, { user: query })
	},
	$_create_notification: (payload) => {
		const url = '/notifications'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_user_by_id: (id:string) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_users_by_corporate_id: (id:string) => {
		const url = `/users?limit=10000&page=1&metadata=true&sort[id]=desc&status=active&is_corporate=1&corporate_id=${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_batch_refund: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/refund-logs?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_refund: (payload: Record<string, any>) => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_refund: (id, payload: Record<string, any>) => {
		const url = `/refund-logs/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_refund_audit: (id) => {
		const url = `/booking-log-audits?log_id=${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_process_refund: (payload: Record<string, any>) => {
		const url = '/refund-logs/process-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_delete_refund: (id:string) => {
		const url = `/refund-logs/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_wallet_transactions: (id:string, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users/${id}/wallet?limit=${metaObject.page_size.value}&page=${metaObject.page.value}&${queryParams}`
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
	},
	$_refund_user: (id: string, payload: Record<string, any>) => {
		const url = `user-route-schedules/${id}/refund`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_user_corporate_wallet_limit_usage_by_id: (id:number) => {
		const url = `/users/${id}/corporate-wallet-limit-usage`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_user_completed_and_past_bookings: (id:string | number, metaObject:TMetaObject, bookingType, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users/${id}/user-route-schedules?${queryParams}&status=${bookingType}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_user_active_bookings: (id:string | number, metaObject:TMetaObject, bookingType, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users/${id}/routes?${queryParams}&status=${bookingType}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_change_password: (payload, id) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_wallet: (payload, userId, walletId) => {
		const url = `/wallet/${walletId}/user/${userId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_create_bus_captain: (payload) => {
		const url = '/bus-captains'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_load_bus_captain_routes: (id) => {
		const url = `/bus-captains/${id}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_remove_bus_captain: (id) => {
		const url = `/bus-captains/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_book_trip: (id, payload) => {
		const url = `/users/${id}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_upload_user_avatar: (userId:number|string, payload: Record<string, any>) => {
		const url = `/user/avatar/${userId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_user_trip_graph: (userId:number|string) => {
		const url = `/users/${userId}/trips/graph`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_users_for_selector_component: (search = '', payload?: any) => {
		const defaultUrl = `/users?limit=${20}&page=${1}&metadata=true&sort[id]&related=wallet`
		const searchUrl = `/users/search?limit=${20}&page=${1}&metadata=true&sort[id]=desc&related=wallet&status=active`
		if (search === '') {
			return GATEWAY_ENDPOINT_WITH_AUTH.get(defaultUrl)
		} else {
			return GATEWAY_ENDPOINT_WITH_AUTH.post(searchUrl, payload)
		}
	}
}
