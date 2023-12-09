import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const fleets_api = {
	$_get_fleets: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
       const url = `/vehicles?limit=${meta.page_size.value}&page=${meta.page.value}&${queryParams}&metadata=true&include=trip_count&related=vehicle_type,partner,drivers,driver`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_fleet_inspection_days: (meta:TMetaObject) => {
		const url = `/inspection-days?limit=${meta.page_size.value}&page=${meta.page.value}&sort[created_at]=desc`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleets_by_id: (id:number) => {
		const url = `/vehicles/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleet_history_by_id: (id:string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/vehicles/${id}/rides?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleets_rating_by_id: (id:string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `ratings/vehicles/${id}?${queryParams}&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleet_documents_by_id: (id:string, partnerId: string) => {
		const url = `/partners/${partnerId}/vehicle/${id}/vehicle-documents`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleet_revenue_by_id: (id:string) => {
		const url = `/revenues?vehicleId=${id}&page=1&perPage=10`
		return $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API.get(url)
	},
	$_decomission_vehicle: (id:string) => {
		const url = `vehicles/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_update_tracking: (id:string, payload:any) => {
		const url = `vehicles/${id}/tracking`
		return GATEWAY_ENDPOINT_WITH_AUTH.put(url, payload)
	},
	$_update_vehicle: (id:string, payload:any) => {
		const url = `vehicles/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_vehicle_types: () => {
		const url = '/vehicle-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
