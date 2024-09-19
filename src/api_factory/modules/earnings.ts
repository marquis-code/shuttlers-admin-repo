import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const earnings_api = {

	$_get_shuttlers_balance_partners: () => {
		const url = '/monnifybalance'
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_earnings_wallet_balance: (partnerSId: string) => {
		const url = `/partners/${partnerSId}/wallets`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_attach_deduction: (earningId: string, payload: Record<string, any>) => {
		const url = `/earnings/${earningId}/deductions/apply`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_get_earnings: (meta: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		// &filterDateBy=referenceTime
		const url = `/earnings?${queryParams}&perPage=${meta.page_size.value}&page=${meta.page.value}&filterDateBy=referenceTime`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_download_earnings: (total: number, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/earnings?${queryParams}&perPage=${total}&page=${1}`
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
	$_get_earnings_unapplied_deductions: (partnerId: string) => {
		const url = `/deductions?partnerId=${partnerId}&applied=false`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_earnings_applied_deductions: (earningId: string) => {
		const url = `/deductions?earningId=${earningId}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partner_revenue: (partnerSid: string, earningId: string, meta: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${partnerSid}/revenues?${queryParams}&earningId=${earningId}&page=${meta.page.value}&perPage=${meta.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_download_partner_revenue: async (partnerSid: string, earningId: string, filterData?: Record<string, Ref>, total?: number) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${partnerSid}/revenues?${queryParams}&earningId=${earningId}&page=${1}&perPage=${total || 10}`
		// return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
		const res = await $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.result?.length) {
				const total = res.data.metadata.total
				return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(`/partners/${partnerSid}/revenues?${queryParams}&earningId=${earningId}&page=${1}&perPage=${total}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
		}
	},
	$_approve_revenue: (partnerSid: string, earningId: string, payload: Record<string, any>) => {
		const url = `/partners/${partnerSid}/earnings/${earningId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_retry_approve_revenue: (partnerSid: string, earningId: string, payload: Record<string, any>) => {
		const url = `/partners/${partnerSid}/earnings/${earningId}/retry`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_approvers: (earningId: string) => {
		const url = `/earnings/${earningId}/approvers`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	}
}
