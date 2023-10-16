import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const amenities_api = {
    $_get_amenities: (metaObject: TMetaObject) => {
		const url = `/vehicle-amenities?metadata=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_inspection_sites: (metaObject: TMetaObject) => {
		const url = `/inspection-sites?sort[created_at]=desc&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_cities: (metaObject: TMetaObject) => {
		const url = '/city/all?limit=1000&fields=id,name'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_cost_of_supply: (metaObject: TMetaObject) => {
		const url = `/vehicle-types/cost-of-supply?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_vehicle_types: (metaObject: TMetaObject) => {
		const url = `/vehicle-types?metadata=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_create_amenity: (payload: any) => {
		const url = '/vehicle-amenities?metadata=false'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
