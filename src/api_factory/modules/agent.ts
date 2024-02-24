import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const agents_api = {
	$_get_agents: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/sales-agent?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_create_batch_booking: (payload: any) => {
        const url = '/batch-bookings'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
	$_get_batch_booking_by_id: (id: string) => {
		const url = `/batch-bookings/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
