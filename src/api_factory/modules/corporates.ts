import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const corporates_api = {
	$_get_graph: () => {
		const url = '/corporates/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_list: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)

		const url = `/corporates?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`

		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_demo_request: () => {
		const url = '/prospective-corporates'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_shuttle_request: () => {
		const url = '/shuttle-requests?page=1&limit=10&sort[created_at]=desc'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
