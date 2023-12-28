import { Ref } from 'vue'
import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const trip_issues_api = {
	$_get_all_issues: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trip-issues?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_all_issues: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trip-issues?${queryParams}&limit=${10}&page=${1}&metadata=true&sort[created_at]=desc&`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/trip-issues?${queryParams}&limit=${total}&page=${1}&metadata=true&sort[created_at]=desc&`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_all_resolved_issues: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trip-issues?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_all_resolved_issues: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trip-issues?${queryParams}&limit=${10}&page=${1}&metadata=true&sort[created_at]=desc&`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/trip-issues?${queryParams}&limit=${total}&page=${1}&metadata=true&sort[created_at]=desc&`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_all_issues_types: () => {
		const url = '/trip-issue-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_resolution_types: () => {
		const url = '/trip-issue-resolution-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_issues: (payload: any) => {
		const url = '/trip-issues'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_issues: (id:number, payload: any) => {
		const url = `/trip-issues/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_resolve_issues: (issue_id:number, payload: any) => {
		const url = `/trip-issues/${issue_id}/resolve`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	}
}
