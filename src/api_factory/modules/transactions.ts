import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const transactions_api = {
	$_recent_transactions: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/transactions?limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&sort[created_at]=desc&related=user&${queryParams}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_transactions_by_id: (id: string) => {
		const url = `/transactions/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_transactions_graph: () => {
		const url = '/transactions/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
