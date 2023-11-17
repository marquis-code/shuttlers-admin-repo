import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const configure_api = {
    $_get_amenities: (metaObject: TMetaObject) => {
		const url = `/vehicle-amenities?metadata=true&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_inspection_sites: (metaObject: TMetaObject) => {
		const url = `/inspection-sites?sort[created_at]=desc&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_cities: () => {
		const url = '/city/all?limit=1000&fields=id,name'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_cost_of_supply: (metaObject: TMetaObject) => {
		const url = `/vehicle-types/cost-of-supply?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_create_amenity: (payload: {image: any, name: string, short_name: string}) => {
		const url = '/vehicle-amenities?metadata=false'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_get_vehicle_types: (metaObject: TMetaObject) => {
		const url = `/vehicle-types?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_prices: (metaObject: TMetaObject) => {
		const url = `/route-prices?limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_payment_options: () => {
		const url = '/payment-options'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_general_payment_options: () => {
		const url = '/general-payment-options'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_rating_settings: () => {
		const url = '/general-payment-options'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_payment_options: (payload: any) => {
		const url = '/bulk/general-payment-options'
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_amenity: (id:string) => {
		const url = `/vehicle-amenities/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_trip_ratings_settings: (serviceId: string) => {
		const url = `/rating/settings/service-id/${serviceId}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_get_categories_by_settings: (id: string) => {
		const url = `/rating/settings/${id}/categories`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_create_trip_rating_catogory: (payload: any) => {
		const url = '/rating/categories'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_create_trip_rating_options: (payload: any) => {
		const url = '/rating/options'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_get_trip_rating_details: (id: string) => {
		const url = `/rating/categories/${id}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
