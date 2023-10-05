import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const trips_api = {
	$_get_graph: () => {
		const url = '/trips/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_active_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/active?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_upcoming_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/upcoming?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_completed_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/completed?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_bus_captains: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/bus-captains?${queryParams}&related=user,route,itinerary&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_by_id: (id:string) => {
		const url = `/trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_passengers: (id:string) => {
		const url = `/trips/${id}/passengers`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_upcoming_trip_by_id: (id:string) => {
		const url = `/upcoming-trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
