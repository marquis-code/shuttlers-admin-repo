import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const earnings_api = {
	$_get_earnings: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/earnings?${queryParams}&perPage=${meta.page_size.value}&page=${meta.page.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_mark_as_paid: (payload: Record<string, any>) => {
		const url = '/earnings/paid'
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_deduct_earnings: (earningId: number, payload: Record<string, any>) => {
		const url = `/earnings/${earningId}/deductions`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_deduct_revenue: (revenueId: number, payload: Record<string, any>) => {
		const url = `/revenues/${revenueId}/deductions`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_get_earnings_by_id: (earningId: string) => {
		const url = `/earnings/${earningId}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_earnings_deductions: (earningId: string) => {
		const url = `/deductions?earningId=${earningId}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partner_revenue: (partnerSid: string, earningId: string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${partnerSid}/revenues?${queryParams}&earningId=${earningId}&page=${meta.page.value}&perPage=${meta.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	}
}
