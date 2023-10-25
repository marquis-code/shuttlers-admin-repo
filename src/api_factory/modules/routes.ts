import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const routes_api = {
	$_recent_routes: () => {
		const url = '/routes?status=all&limit=5'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_suspended_routes: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/routes/booking-suspensions?limit=${meta.page_size.value}&page=${meta.page.value}&sort[created_at]=desc&${queryParams}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_main_routes: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/routes?fields[route]=id,pickup,destination,status,route_code,corporate_id,is_exclusive,visibility&sort[pickup]=asc&related=&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&${queryParams}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_by_id: (id:string) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_busstops_by_id: (id:number) => {
		const url = `/routes/${id}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_itineraries_by_id: (id:number) => {
		const url = `/routes/${id}/itineraries?itinerary_only=1`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_trips_by_id: (id:number, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/routes/${id}/trips?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_time: () => {
		const url = '/route-itineraries-trip-time'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
