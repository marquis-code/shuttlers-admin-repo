import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { CustomAxiosResponse } from '@/api_factory/modules'

export const pastPayouts_api = {
    $_get_past_payouts: (accountSid:string, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/partners/${accountSid}/payouts?${queryParams}&page=${metaObject.page.value}&perPage=${metaObject.page_size.value}`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
    $_get_past_deductions: (accountSid:string, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/deductions?${queryParams}&partnerId=${accountSid}&page=${metaObject.page.value}&perPage=${metaObject.page_size.value}&sort=createdAt:desc`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	}
}
