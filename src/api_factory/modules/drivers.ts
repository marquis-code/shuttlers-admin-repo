import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const drivers_api = {

	$_get_drivers: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/drivers?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&related=device`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_driver_by_id: (id:string) => {
		const url = `/drivers/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_query_drivers: (query: string) => {
		const url = '/users/search?limit=10'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, { user: query })
	},
	$_get_driver_customer_rating: (id:string, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/users/${id}/user-route-schedules?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_driver: (payload) => {
		const url = '/drivers'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
