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
	$_create_corporate: (payload: any) => {
		const url = '/corporates'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url)
},
$_bulk_staff_assignments: (payload:any) => {
	const url = '/staff-routes-and-workshifts'
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_update_corporate_status: (id:string, payload:any) => {
	const url = `/corporates/${id}`
	return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
},
$_get_accout_managers: (corporateId:number) => {
	const url = `/corporates/${corporateId}/managers`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_get_trip_report: (corporateId:number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
	const queryParams = useTableFilter(filterData)
	const url = `/corporates/${corporateId}/trip-reports?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_get_trips_groups: (corporateId:number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
	const queryParams = useTableFilter(filterData)
	const url = `/corporates/${corporateId}/groups?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_get_credit_system: (corporateId:number) => {
	const url = `/corporates/${corporateId}/credit-system`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_create_company_domain: (corporateId:number, payload: any) => {
	const url = `/corporates/${corporateId}/settings`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_get_corperate_settings: (corporateId:number) => {
	const url = `/corporates/${corporateId}/settings`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_create_work_branch: (corporateId:number, payload:any) => {
	const url = `/corporates/${corporateId}/office-branches`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_update_work_branch: (corporateId:number, payload:any, id:number) => {
	const url = `/corporates/${corporateId}/office-branches/${id}`
	return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
},
$_delete_work_branch: (corporateId:number, id:number) => {
	const url = `/corporates/${corporateId}/office-branches/${id}`
	return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
},
$_create_work_shift: (corporateId:number, payload:any) => {
	const url = `/corporates/${corporateId}/work-shifts`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_update_work_shift: (corporateId:number, payload:any, id:number) => {
	const url = `/corporates/${corporateId}/work-shifts/${id}`
	return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
},
$_delete_work_shift: (corporateId:number, id:number) => {
	const url = `/corporates/${corporateId}/work-shifts/${id}`
	return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
},
$_get_work_branches: (corporateId:number) => {
	const url = `/corporates/${corporateId}/office-branches`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_get_work_shifts: (corporateId:number) => {
	const url = `/corporates/${corporateId}/work-shifts`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_assign_bussiness_account_manager: (corporateId:number, payload: any) => {
	const url = `/corporates/${corporateId}/managers`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_get_corporate_wallet_transaction_history: (walletId:number, metaObject: TMetaObject) => {
	const url = `/corporate-wallets/${walletId}/transactions?metadata=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&filters[type]=all`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_get_corporate_wallet_info: (corporateId:number) => {
	const url = `/corporates/${Number(corporateId)}/wallets`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_activate_corporate_wallet: (walletId:number, payload: any) => {
	const url = `/ledger-accounts/${walletId}/nuban-addresses`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_payment_funding_reference: (wallet_ledger_id:number, payload: any) => {
	const url = `/ledger-accounts/${wallet_ledger_id}/funding-references`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_configure_corporate_options: (corporateId:number, payload: any) => {
	const url = `/corporates/${corporateId}`
	return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
},
$_corporate_route_manifest: (corporateId:number, payload: any) => {
	const url = `/corporates-report/${corporateId}/route-manifest`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_update_corporate_overdraft: (corporateId:number, payload: any) => {
	const url = `/corporate-wallets/${corporateId}`
	return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
},
$_get_credit_system_exectutions: (creditLineId:number, metaObject: TMetaObject) => {
	const url = `/credit-systems/${creditLineId}/executions?query=&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&ascending=1&byColumn=0`
	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
},
$_apply_credit_system: (creditLineId:number) => {
	const url = `/credit-systems/${creditLineId}/executions`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url)
},
$_schedule_credit_system: (creditLineId:number, payload:any) => {
	const url = `/credit-systems/${creditLineId}/executions`
	return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
},
$_cancel_credit_system: (executionId:number) => {
	const url = `/credit-systems-executions/${executionId}/`
	return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
}
}
