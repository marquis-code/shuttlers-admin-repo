import { Ref } from 'vue'
import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const trip_issues_api = {
	$_get_all_issues: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trip-issues?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_issues_types: () => {
		const url = '/trip-issue-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_issues: (payload: any) => {
		const url = '/trip-issues'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_resolve_issues: (issue_id:number, payload: any) => {
		const url = `/trip-issues/${issue_id}/resolve`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	}
}
