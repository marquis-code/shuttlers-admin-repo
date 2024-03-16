import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const agents_api = {
	$_get_agents: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users?account_type=sales_agent&${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_agent_by_id: (id: string) => {
		const url = `/users/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_agent_passageners: (id: string) => {
		const url = `/sales-agent-users?sales_agent_account_id=${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_agent_suggested_routes: (id: string, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/sales-route-suggestions?${queryParams}&agent_account_id=${id}`

		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_agent: (payload: any) => {
		const url = '/users'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_decline_suggestion: (id:string, payload: any) => {
		const url = `/sales-route-suggestions/${id}/decline`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
