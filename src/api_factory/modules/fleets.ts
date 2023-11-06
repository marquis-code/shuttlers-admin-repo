import { GATEWAY_ENDPOINT_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const fleets_api = {
	$_get_fleets: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
       const url = `/vehicles?limit=${meta.page_size.value}&page=${meta.page.value}&${queryParams}&metadata=true&include=trip_count&related=vehicle_type,partner,drivers`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_fleet_inspection_days: (meta:TMetaObject) => {
		const url = `/inspection-day?limit=${meta.page_size.value}&page=${meta.page.value}&sort[created_at]=desc`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_fleets_by_id: (id:string) => {
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
	}
}
