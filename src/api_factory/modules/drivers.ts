import { GATEWAY_ENDPOINT_WITH_AUTH, CustomAxiosResponse } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

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
	},
	$_get_drivers_for_selector_component: (search = '') => {
		const url = `/drivers?limit=${20}&page=${1}&metadata=true&related=vehicle&search=${search}&status=active&field=fields:id,vehicle_id,fname,lname,email,phone,avatar,vehicle`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_assign_driver_to_route: (driverId:number|string, payload:any) => {
		const url = `/drivers/${driverId}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_unassign_driver_to_route: (driverId:number|string, payload:any) => {
		const url = `/drivers/${driverId}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url, payload)
	},
	$_update_assigned_driver_to_route: (id:number, payload:any) => {
		const url = `/route-vehicle/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_driver_from_itinerary: (driverId:number, payload) => {
		const url = `/drivers/${driverId}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url, payload)
	},
	$_deactivate_driver: (payload) => {
		const url = '/drivers/update-availability'
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_notify_driver: (payload) => {
		const url = '/drivers-notifications'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_graph: (driverId:number|string) => {
		const url = `/drivers/${driverId}/trips/graph`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_driver_ratings: (driverId:number|string, meta:TMetaObject, filterData?: Record<string, any>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/ratings/drivers/${driverId}?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_driver: (driverId:number|string, payload: Record<string, any>) => {
		const url = `/drivers/${driverId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_driver_active_trips: (driverId:number|string) => {
		const url = `/drivers/${driverId}/active-trips`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_driver_routes: (driverId:number|string) => {
		const url = `/drivers/${driverId}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_delete_driver: (driverId:number|string) => {
		const url = `/drivers/${driverId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_download_all_drivers: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/drivers?${queryParams}&limit=${10}&page=${1}&metadata=true&related=device`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/drivers?${queryParams}&limit=${total}&page=${1}&metadata=true&related=device`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No drivers data to download' })
				return null
			}
        }
	}
}
