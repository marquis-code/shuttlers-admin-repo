import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { ZeroBookingFlag } from '@/composables/flagging/flags'

export const trips_api = {
	$_get_graph: () => {
		const url = '/trips/graph'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_start_trip: (payload) => {
		const url = '/trips'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_end_trip: (id:string, payload) => {
		const url = `/trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_cancel_trip: (id:string, payload) => {
		const url = `/upcoming-trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url, { data: payload })
	},
	$_complete_trip: (id:string) => {
		const url = `/upcoming-trips/${id}/trips`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url)
	},
	$_update_trip: (id:string, payload) => {
		const url = `/upcoming-trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_active_trip: (id:string, payload) => {
		const url = `/active-trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_active_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/active?${queryParams}${queryParams ? '&' : ''}limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_upcoming_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const old_url = `/trips/upcoming?${queryParams}${queryParams ? '&' : ''}limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		const new_url = `/tripsV2/upcoming?${queryParams}${queryParams ? '&' : ''}limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc&`
		const url = ZeroBookingFlag ? new_url : old_url
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_cancelled_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/upcoming?${queryParams}&is_cancelled=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_completed_trips: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/trips/completed?${queryParams}${queryParams ? '&' : ''}limit=${metaObject.page_size.value}&page=${metaObject.page.value}&metadata=true&sort[created_at]=desc`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_bus_captains: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/bus-captains?${queryParams}&related=user,route,itinerary&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_by_id: (id:string|number) => {
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
	},
	$_get_trip_rating: (id:string, metaObject: TMetaObject) => {
		const url = `/ratings/trips/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_financials: (id:string) => {
		const url = `/trips/${id}/revenues`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_deduct_partner_trip_earnings_by_id: (id:string, payload) => {
		const url = `/revenues/${id}/deductions`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.post(url, payload)
	},
	$_get_active_trip_passengers: (id:string) => {
		const url = `trips/${id}/passengers`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_upcoming_trip_passengers: (id:string|number) => {
		const url = `/trips/${id}/passengers?isUpcomingTrip=1`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_notify_trip_passenger: (payload:any) => {
		const url = '/notifications'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_transfer_trip: (payload:Record<string, any>) => {
		const url = '/trip-revenues/trips-vehicle'
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_remove_bus_captain: (id) => {
		const url = `/bus-captains/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_cancel_completed_trip: (payload:Record<string, any>) => {
		const url = '/cancelled-trips'
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_add_passengers_to_upcoming_trip: (id: string | number, payload) => {
       const url = `/trips/${id}/passengers?isUpcomingTrip=true`
	   return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_transfer_bookings: (payload) => {
	 const url = '/user-route-schedules/transfers'
	 return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_resync_revenue: (payload:Record<string, any>) => {
		const url = '/trips/revenues'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
