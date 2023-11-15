import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const rental_api = {
    $_recent_charter_requests: () => {
		const url = '/charters?limit=5'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_rental_requests: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/event-charters?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_rental_by_id: (id:string) => {
		const url = `/event-charters/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_charter_order: ({ charter_id, vehicle_id, cost }) => {
		const url = `/event-charters/${charter_id}/orders/${vehicle_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, { cost })
	},
	$_update_rental_status: (id:string, payload:any) => {
		const url = `/event-charters/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	}
}
