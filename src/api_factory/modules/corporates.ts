import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const corporates_api = {
	$_get_graph: () => {
		const url = '/corporates/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_list: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)

		const url = `/corporates?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`

		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_demo_request: (metaObject: TMetaObject) => {
		const url = `/prospective-corporates?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_shuttle_request: () => {
		const url = '/shuttle-requests?page=1&limit=10&sort[created_at]=desc'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_credit_line_usage: (id:string) => {
		const url = `/corporates/95/credit-line-usages?query=&limit=10&ascending=1&page=1&byColumn=0&staffId=${id}&startDate=2023-08-31T23:00:00.000Z&endDate=2023-09-30T22:59:59.999Z`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
