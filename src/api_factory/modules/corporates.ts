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
	$_get_shuttle_request: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/shuttle-requests?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&sort[created_at]=desc`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_credit_line_usage: (corporateId:number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/credit-line-usages?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_by_id: (id:string) => {
		const url = `/corporates/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_staffs: (corporateId:number, metaObject: TMetaObject, filterData:{search: any;branch_ids: any;shift_ids: any, work_days: any, route: any}) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/staff?limit=${metaObject.page_size.value}&page=${metaObject.page.value}&search=${filterData.search.value}${filterData.branch_ids.value.length ? `&branch_ids=${JSON.stringify(filterData.branch_ids.value)}` : ''}${filterData.shift_ids.value.length ? `&shift_ids=${JSON.stringify(filterData.shift_ids.value)}` : ''}${filterData.work_days.value.length ? `&work_days=${JSON.stringify(filterData.work_days.value)}` : ''}${filterData.route.value.id ? `&route_ids=${JSON.stringify([filterData.route.value.id])}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_company_wallet_info_by_id: (id:number) => {
		const url = `/corporates/${id}/wallets`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_branches: (id:number|string) => {
		const url = `/corporates/${id}/office-branches?limit=10000`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_shifts: (id:number|string) => {
		const url = `/corporates/${id}/work-shifts?limit=10000`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_bulk_staff_assignments: (payload:any) => {
		const url = '/staff-routes-and-workshifts'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
