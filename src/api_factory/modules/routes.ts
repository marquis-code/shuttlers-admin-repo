import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

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
	$_get_main_routes: (meta:TMetaObject, filterData?: Record<string, Ref>, corporateId?: number) => {
		const queryParams = useTableFilter(filterData)
		const url = `/routes?${queryParams}&fields[route]=id,pickup,destination,status,route_code,corporate_id,is_exclusive,visibility&sort[pickup]=asc&related=&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true${corporateId ? `&corporate_id=${corporateId}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_main_routes: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		// const url = `/trip-issues?${queryParams}&limit=${10}&page=${1}&metadata=true&sort[created_at]=desc&`
		const url = `/routes?${queryParams}&fields[route]=id,pickup,destination,status,route_code,corporate_id,is_exclusive,visibility&sort[pickup]=asc&related=&limit=${10}&page=${1}&metadata=true`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data?.metadata?.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/routes?${queryParams}&fields[route]=id,pickup,destination,status,route_code,corporate_id,is_exclusive,visibility&sort[pickup]=asc&related=&limit=${total}&page=${1}&metadata=true`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_route_by_id: (id:string|number) => {
		const url = `/routes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_busstops_by_id: (id:string) => {
		const url = `/routes/${id}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_direction: (payload:Record<string, any>) => {
		const url = '/routes/direction'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
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
	$_get_route_bookings: (id:string|number, corporateId:string|number) => {
        const url = `/routes/${id}/bookings/${corporateId}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
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
	},
	$_create_itineraries: (id:string|number, payload:any) => {
		const url = `/routes/${id}/itineraries`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_itineraries: (itinerary_id:string|number, payload:any) => {
		const url = `/route-itineraries/${itinerary_id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_vehicle_cost_of_supply: (iti_id:string|number, vehicleId:number) => {
		const url = `/route-itineraries/${iti_id}/vehicles/${vehicleId}/cost-of-supply`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_transfer_booking_within_itineraries: (payload) => {
		const url = '/route-vehicles/transfers'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_route_bookings_passengers: (route_id:string|number, payload) => {
        const url = `/routes/${route_id}/bookings/null`
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_routes_charges: (id: string, payload:Record<string, any>) => {
        const url = `/additional-charges/routes/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
	$_edit_busstop: (busstop_id: string|number, payload:Record<string, any>) => {
        const url = `/route-busstops/${busstop_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
	$_delete_busstop: (busstop_id: string|number) => {
        const url = `/route-busstops/${busstop_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
    },
	$_create_busstop: (routeId:string|number, payload: Record<string, any>) => {
		const url = `/routes/${routeId}/busstops`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_route: (payload:Record<string, any>) => {
		const url = '/routes'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_update_route: (routeId:number|string, payload:Record<string, any>) => {
		const url = `/routes/${routeId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_generate_business_booking_report: (routeId: number, start_date:string, end_date:string) => {
		const url = `routes/${routeId}/bookings/start_date/${start_date}/end_date/${end_date}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_passengers_bookings: (routeId:string|number, corporateId:string|number, booking_days: any) => {
        const url = `/routes/${routeId}/bookings/${corporateId || 'null'}`
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, booking_days)
    },
	$_update_payment_options: (payload: any) => {
		const url = '/bulk/route-payment-options'
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_set_availability_configuration: (payload: any) => {
		const url = '/routes/booking-suspensions'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
	// $_get_itinerary_drivers_list: (iti_id:string|number) => {
	// 	const url = `/route-itineraries/${iti_id}/drivers`
	// 	return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	// }
}
