import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

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
	$_get_all_vehicle_types_without_paginating: () => {
		const url = `/vehicle-types?limit=10000&page=${1}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_route_prices: (metaObject: TMetaObject, vehicleId:string|number, routeType:string) => {
		const url = `/route-prices?limit=${metaObject.page_size.value}&page=${metaObject.page.value}${vehicleId ? `&vehicle_type=${vehicleId}` : ''}${routeType ? `&route_type=${routeType}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_route_pricing_control: async (vehicleId:string|number, routeType:string) => {
		const url = `/route-prices?limit=${5}&page=${1}${vehicleId ? `&vehicle_type=${vehicleId}` : ''}${routeType ? `&route_type=${routeType}` : ''}`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/route-prices?limit=${total}&page=${1}${vehicleId ? `&vehicle_type=${vehicleId}` : ''}${routeType ? `&route_type=${routeType}` : ''}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
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
	},
	$_update_route_cost_of_supply: (routeVehicleId:number, payload:any) => {
		const url = `/route-vehicle/${routeVehicleId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_route_selling_price: (itineraryId:number, payload:any) => {
		const url = `/route-itineraries/${itineraryId}/price`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_update_route_pricing_others: (itineraryId:number, payload:any) => {
		const url = `/route-itineraries/${itineraryId}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_fleet_trip_rating_settings: (serviceId) => {
		const url = `/rating/settings/service-id/${serviceId}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	  },
	  $_get_trip_rating_data: (payload: any) => {
		  const url = '/rating/reports/generic'
		  return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	  }
}
