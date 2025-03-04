import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const partners_api = {
	$_get_all_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}&related=owner`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_all_partners: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${10}&page=${1}&related=owner`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/partners?${queryParams}&metadata=true&limit=${total}&page=${1}&related=owner`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_create_notification: (payload) => {
		const url = '/partner-notifications'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_partner: (payload) => {
		const url = '/partners'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_new_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}&new_signup=1&related=owner`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_new_partners: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${10}&page=${1}&new_signup=1&related=owner`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/partners?${queryParams}&metadata=true&limit=${total}&page=${1}&new_signup=1&related=owner`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
    $_get_interested_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partner-interests?${queryParams}&sort[created_at]=desc&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_interested_partners: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partner-interests?${queryParams}&sort[created_at]=desc&metadata=true&limit=${10}&page=${1}`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/partner-interests?${queryParams}&sort[created_at]=desc&metadata=true&limit=${total}&page=${1}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_partner_by_id: (id:string) => {
		const url = `/partners/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_partner_vehicles_by_id: (id:number, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partner/${id}/vehicles?${queryParams}&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}&related=driver`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_partner_drivers_by_id: (account_sid:string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${account_sid}/drivers?${queryParams}&page=${meta.page.value}&limit=${meta.page_size.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_partner_completed_trips_by_id: (account_sid:string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${account_sid}/revenues?${queryParams}&page=${meta.page.value}&perPage=${meta.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partner_accounts_by_id: (account_sid:string, meta:TMetaObject) => {
		const url = `/settlement-accounts?partnerId=${account_sid}&page=${meta.page.value}&limit=${meta.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partner_kyc_by_id: (account_sid:string) => {
		const url = `/partners/${account_sid}/kyc/status`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_partner_earnings_by_id: (account_sid:string) => {
		const url = `/partners/${account_sid}/earnings-summary`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partner_payout: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `earnings?${queryParams}&isApproved=false&status=pending-payout,failed,pending-settlement&${meta.page.value}&limit=${meta.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_get_partners_for_selector_component: (search = '') => {
		const url = `/partners?limit=${20}&page=${1}&metadata=true&search=${search}&related=owner`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_partner_vehicle_by_id: (partnerId:number|string) => {
		const url = `/partner/${partnerId}/vehicles?metadata=true&limit=${1000}&related=driver&status=active`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_partner_drivers_by_id: (partnerSid:number) => {
		const url = `/partners/${partnerSid}/drivers?metadata=true&limit=${1000}&status=active`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_partner: (partnerId:number|string, payload:Record<string, any>) => {
		const url = `/partners/${partnerId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_partner_user_info: (partnerOwnerId:number|string, payload:Record<string, any>) => {
		const url = `/users/${partnerOwnerId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_verify_partner_document: (partnerAccountSid:number|string, documentId: number|string, payload:Record<string, any>, status = 'completed') => {
		const url = `/partners/${partnerAccountSid}/identity-documents/${documentId}/status/${status}`
		return GATEWAY_ENDPOINT_WITH_AUTH.put(url, payload)
	},
	$_delete_partner_account: (partner_sid: string|number) => {
		const url = `/settlement-accounts/${partner_sid}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.delete(url)
	},
	$_add_bank_account: (payload: any) => {
		const url = '/settlement-accounts'
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_assign_partner_account: (accountId: number, payload: Record<string, any>) => {
		const url = `/settlement-accounts/${accountId}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.patch(url, payload)
	},
	$_validate_account_number: (bank_code: string| number, account_number: string| number) => {
		const url = `/banks/resolve-accounts?bank_code=${bank_code}&account_number=${account_number}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_link_vehicles: (payload:Record<string, any>[]) => {
		const url = '/partners/batch-assign-vehicles'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_link_drivers: (payload:Record<string, any>[]) => {
		const url = '/partners/batch-assign-drivers'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_set_earning_cycle: (partner_sid: number|string, payload:Record<string, any>) => {
		const url = `/partnerconfigs/partners/${partner_sid}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_get_partner_config: (partner_sid:string|number) => {
		const url = `/partnerconfigs/partners/${partner_sid}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_update_partner_identity_info: (partner_sid:string|number, payload: Record<string, any>) => {
		const url = `/partners/${partner_sid}/identity-verification`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_partner_address_info: (partner_sid:string|number, payload: Record<string, any>) => {
		const url = `/partners/${partner_sid}/address-verification`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_banks: () => {
		const url = '/bankinfolist'
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	}
}
