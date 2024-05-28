import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

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
	$_get_corporates_for_selector_component: (search = '') => {
		const url = `/corporates?limit=${20}&page=${1}&search=${search}`
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
	$_get_credit_line_usage: (corporateId: number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/credit-line-usages?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_by_id: (id: string) => {
		const url = `/corporates/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_staffs: (corporateId: number, metaObject: TMetaObject, filterData: { search: any; branch_ids: any; shift_ids: any, work_days: any, route: any }) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/staff?limit=${metaObject.page_size.value}&page=${metaObject.page.value}&search=${filterData.search.value}${filterData.branch_ids.value.length ? `&branch_ids=${JSON.stringify(filterData.branch_ids.value)}` : ''}${filterData.shift_ids.value.length ? `&shift_ids=${JSON.stringify(filterData.shift_ids.value)}` : ''}${filterData.work_days.value.length ? `&work_days=${JSON.stringify(filterData.work_days.value)}` : ''}${filterData.route.value.id ? `&route_ids=${JSON.stringify([filterData.route.value.id])}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_corporate_staffs: (corporateId: number, filterData: { search: any; branch_ids: any; shift_ids: any, work_days: any, route: any }) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/staff?limit=100000&search=${filterData.search.value}${filterData.branch_ids.value.length ? `&branch_ids=${JSON.stringify(filterData.branch_ids.value)}` : ''}${filterData.shift_ids.value.length ? `&shift_ids=${JSON.stringify(filterData.shift_ids.value)}` : ''}${filterData.work_days.value.length ? `&work_days=${JSON.stringify(filterData.work_days.value)}` : ''}${filterData.route.value.id ? `&route_ids=${JSON.stringify([filterData.route.value.id])}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_company_wallet_info_by_id: (id: number) => {
		const url = `/corporates/${id}/wallets`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_branches: (id: number | string) => {
		const url = `/corporates/${id}/office-branches?limit=10000`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_shifts: (id: number | string) => {
		const url = `/corporates/${id}/work-shifts?limit=10000`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_corporate: (payload: any) => {
		const url = '/corporates'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_corporate: (payload: any, id: string) => {
		const url = `/corporates/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_bulk_staff_assignments: (payload: any) => {
		const url = '/staff-routes-and-workshifts'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_corporate_status: (id: string, payload: any) => {
		const url = `/corporates/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_accout_managers: (corporateId: number) => {
		const url = `/corporates/${corporateId}/managers`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_report: (corporateId: number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/trip-reports?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trips_groups: (corporateId: number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporates/${corporateId}/groups?query=${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_credit_system: (corporateId: number|string) => {
		const url = `/corporates/${corporateId}/credit-system`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_credit_line: (corporateId: number|string, payload: Record<string, any>) => {
		const url = `/corporates/${corporateId}/credit-system`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_company_settings: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_company_domain: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_company_email: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_corperate_settings: (corporateId: number) => {
		const url = `/corporates/${corporateId}/settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_work_branch: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/office-branches`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_work_branch: (corporateId: number, payload: any, id: number) => {
		const url = `/corporates/${corporateId}/office-branches/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_work_branch: (corporateId: number, id: number) => {
		const url = `/corporates/${corporateId}/office-branches/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_create_work_shift: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/work-shifts`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_work_shift: (corporateId: number, payload: any, id: number) => {
		const url = `/corporates/${corporateId}/work-shifts/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_work_shift: (corporateId: number, id: number) => {
		const url = `/corporates/${corporateId}/work-shifts/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_work_branches: (corporateId: number) => {
		const url = `/corporates/${corporateId}/office-branches`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_work_shifts: (corporateId: number) => {
		const url = `/corporates/${corporateId}/work-shifts`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_assign_bussiness_account_manager: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/managers`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_corporate_wallet_transaction_history: (walletId: number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporate-wallets/${walletId}/transactions?${queryParams}&metadata=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_corporate_wallet_transaction_history: async (walletId: number, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/corporate-wallets/${walletId}/transactions?${queryParams}&metadata=true&limit=${5}&page=${1}`
		// return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/corporate-wallets/${walletId}/transactions?${queryParams}&metadata=true&limit=${total}&page=${1}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_corporate_wallet_info: (corporateId: number) => {
		const url = `/corporates/${Number(corporateId)}/wallets`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_activate_corporate_wallet: (walletId: number, payload: any) => {
		const url = `/ledger-accounts/${walletId}/nuban-addresses`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_payment_funding_reference: (wallet_ledger_id: number, payload: any) => {
		const url = `/ledger-accounts/${wallet_ledger_id}/funding-references`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_configure_corporate_options: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_corporate_route_manifest: (corporateId: number, payload: any) => {
		const url = `/corporates-report/${corporateId}/route-manifest`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_corporate_overdraft: (corporateId: number, payload: any) => {
		const url = `/corporate-wallets/${corporateId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_credit_system_exectutions: (creditLineId: number, metaObject: TMetaObject) => {
		const url = `/credit-systems/${creditLineId}/executions?query=&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&ascending=1&byColumn=0`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_apply_credit_system: (creditLineId: number) => {
		const url = `/credit-systems/${creditLineId}/executions`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url)
	},
	$_schedule_credit_system_form_data: (creditLineId: number, payload: FormData) => {
		const url = `/credit-systems/${creditLineId}/executions`
		// return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
		return GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA.post(url, payload)
	},
	$_schedule_credit_system: (creditLineId: number, payload: Record<string, any>) => {
		const url = `/credit-systems/${creditLineId}/executions`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_cancel_credit_system: (executionId: number) => {
		const url = `/credit-systems-executions/${executionId}/`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_corporate_shuttle_request: (corporate_id: number, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/shuttle-requests?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&corporate_id=${corporate_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_shuttle_request_by_id: (request_id: number) => {
		const url = `/shuttle-requests/${request_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_handle_selected_users_credit_line: (executionId: number, payload: any) => {
		const url = `/credit-systems-executions/${executionId}/`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_credit_system: (creditSystemId: number, payload: any) => {
		const url = `/credit-systems/${creditSystemId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_create_corporate_vehicle_capacity: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/vehicle-capacities`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_corporate_vehicle_capacity: (corporateId: number) => {
		const url = `/corporates/${corporateId}/vehicle-capacities?metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_delete_corporate_vehicle_capacity: (capacityId: number | string) => {
		const url = `/corporates-vehicle-capacities/${capacityId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_update_shuttle_request_status: (requestId: number, payload: any) => {
		const url = `/shuttle-requests/${requestId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_corporate_payment_settings: (corporateId: number| string, payload: any) => {
		const url = `/corporates/${corporateId}/payment-settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_fetch_corporate_payment_settings: (corporateId: number|string) => {
		const url = `/corporates/${corporateId}/payment-settings`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_delete_corporate_payment_exemption: (exemptionId: number) => {
		const url = `/corporate-payment-limitations/${exemptionId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_corporate_groups: (corporateId: number) => {
		const url = `/corporates/${corporateId}/groups`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_corporate_group: (corporateId: number, payload: any) => {
		const url = `/corporates/${corporateId}/groups`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update__applicable_employee: (corporateId: number, payload: any) => {
		const url = `/credit-systems/${corporateId}/applicable-employees`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_generate_business_booking_report: (corporateId, routeId, monthId) => {
		const url = `/corporates/${corporateId}/bookings/route/${routeId}/duration/${monthId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporates_staffs_for_selector_component: (search = '', corporateId) => {
		const url = `/corporates/${corporateId}/staff?limit=${20}&page=${1}&search=${search}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_corporate_group_by_id: (id: string | number) => {
		const url = `/corporate-groups/${id}/members?related=corporateGroup,staff`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_edit_corporate_group_by_id: (corporate_id: string | number, group_id: string | number, payload: any) => {
		const url = `/corporates/${corporate_id}/groups/${group_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_add_corporate_group_members: (group_id: string | number, payload) => {
		const url = `/corporate-groups/${group_id}/members`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_delete_corporate_member: (group_id: string | number, member_id: string | any) => {
		const url = `/corporate-groups/${group_id}/members/${member_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_create_corporate_wallet_threshold: (payload: Record<string, any>) => {
		const url = 'corporate-wallet-threshold-settings'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_corporate_wallet_threshold: () => {
		const url = 'corporate-wallet-threshold-settings'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_corporate_wallet_threshold: (id:number|string, payload: Record<string, any>) => {
		const url = `corporate-wallet-threshold-settings/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_corporate_wallet_threshold: (id:number|string) => {
		const url = `corporate-wallet-threshold-settings/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	}
}
