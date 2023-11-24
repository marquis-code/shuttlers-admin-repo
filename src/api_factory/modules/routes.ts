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
		// meta.page_size.value = 100000
		const url = `/routes?fields[route]=id,pickup,destination,status,route_code,corporate_id,is_exclusive,visibility&sort[pickup]=asc&related=&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true&${queryParams}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_by_id: (id:string) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_busstops_by_id: (id:string) => {
		const url = `/routes/${id}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_itineraries_by_route_id: (id:string|number) => {
		const url = `/routes/${id}/itineraries?itinerary_only=1`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_trips_by_id: (id:string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/routes/${id}/trips?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_time: () => {
		const url = '/route-itineraries-trip-time'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_suggested_routes: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
        const queryParams = useTableFilter(filterData)
        const url = `/suggest?limit=${meta.page_size.value}&page=${meta.page.value}&sort[created_at]=desc&${queryParams}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_payment_options: () => {
        const url = '/payment-options'
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_payment_options_by_id: (id:string) => {
        const url = `/routes/${id}/payment-options`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_trip_start_time: (id:string) => {
        const url = `/routes/${id}/itineraries?itinerary_only=1`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_route_passengers: (id:string) => {
        const url = `/routes/${id}/users`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_route_drivers: (id:string) => {
        const url = `/routes/${id}/drivers`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_route_bookings: (id:string, corporateId:string, payload) => {
        const url = `/routes/${id}/bookings/${corporateId}`
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
	$_get_routes_busstops: (id: string) => {
		const url = `/routes/${id}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_routes_itineraries_vehicles_by_itinerary_id: (id: string) => {
		const url = `/route-itineraries/${id}/vehicles`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_busstops_by_itinerary_id: (id: string) => {
		const url = `/itineraries/${id}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_pricing: (id: string, payload: any) => {
		const url = `/routes/${id}/price-calculation`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_routes: (search = '') => {
		const url = `/routes?limit=20&fields[route]=id,pickup,destination,city_id,pickup_geometry,destination_geometry,slug,overview_polyline,fare,visibility&search=${search}&status=1`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_single_itinerary_details: (id:number|string) => {
		const url = `/route-itineraries/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_route_status: (id:number, payload:any) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_handle_route_duplication: (id:any, payload) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_route_passengers_by_route_id: (id:string) => {
		const url = `/trips/${id}/passengers?isUpcomingTrip=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url)
	},
	$_handle_route_deletion: (id:any) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_duplicate_route: (payload:any) => {
		const url = '/routes/duplicates'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
