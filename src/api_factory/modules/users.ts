import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const users_api = {
	$_recent_signups: (meta:TMetaObject, params) => {
		const url = `/users?limit=${meta.page.value}&page=${meta.page.value}&sort[created_at]=desc`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_users: () => {
		const url = '/users?limit=20&page=1&metadata=true&sort[id]=desc&related=wallet&status=active'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_user_by_id: (id:string) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_batch_refund: () => {
		const url = '/refund-logs'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
