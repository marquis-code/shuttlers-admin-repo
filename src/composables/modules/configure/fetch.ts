import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const creatingAmenities = ref(false)
const payloads = {
    name: ref(''),
    image: ref(''),
    short_name: ref('')
}
const tripRatingSettingsReference = ref({} as any)

export const useAmenitiesList = () => {
    const loadingAmenities = ref(false)
    const amenitiesList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_amenities } = configure_api

    const getAmenitiesList = async () => {
        loadingAmenities.value = true

        const res = await $_get_amenities(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            amenitiesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingAmenities.value = false
    }
    setFunction(getAmenitiesList)

    return { getAmenitiesList, loadingAmenities, amenitiesList, prev, ...metaObject, next, moveTo }
}

export const useInspectionSitesList = () => {
    const loadingInspectionSites = ref(false)
    const inspectionSiteList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_inspection_sites } = configure_api

    const getInspectionSiteList = async () => {
        loadingInspectionSites.value = true

        const res = await $_get_inspection_sites(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            inspectionSiteList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingInspectionSites.value = false
    }
    setFunction(getInspectionSiteList)

    return { getInspectionSiteList, loadingInspectionSites, inspectionSiteList, prev, ...metaObject, next, moveTo }
}

export const useVehicleTypesList = () => {
    const loadingVehicleTypes = ref(false)
    const vehicleTypesList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_vehicle_types } = configure_api

    const getVehicleTypesList = async () => {
        loadingVehicleTypes.value = true

        const res = await $_get_vehicle_types(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            vehicleTypesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingVehicleTypes.value = false
    }
    setFunction(getVehicleTypesList)

    return { getVehicleTypesList, loadingVehicleTypes, vehicleTypesList, prev, ...metaObject, next, moveTo }
}

export const useRoutePricesList = () => {
    const loadingRoutePrices = ref(false)
    const vehicleId = ref('')
    const routeType = ref('')
    const routePricesList = ref([] as Record<string, any>[])
    const loading_selling_price = ref(false)
    const loading_cost_of_supply = ref(false)
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_route_prices } = configure_api

    const getRoutePricesList = async () => {
        loadingRoutePrices.value = true
        const res = await $_get_route_prices(metaObject, vehicleId.value, routeType.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routePricesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingRoutePrices.value = false
    }
    setFunction(getRoutePricesList)
    watch([vehicleId, routeType], () => {
        metaObject.page.value = 1
        getRoutePricesList()
    })

    const busStopName = (busStops:any, busStopId:any) => {
        if (!busStops || !busStopId) return ''
        const item = busStops.find((i:any) => i.id === busStopId)
        if (!item) return ''
        return item.name
    }

    const downloadRoutePriceControl = async() => {
        downloading.value = true
        const name = ref(`${routeType.value}-route-prices`)
        const res = await configure_api.$_download_route_pricing_control(vehicleId.value, routeType.value) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const datas = res.data.data
			const newArr:any[] = []
			for (let i = 0; i < datas.length; i++) {
				const data = datas[i]

                const y = {
                    Route_code: data?.route?.route_code,
                    Itinerary: data?.route_itinerary?.trip_time || 'N/A',
                    Vehicle: `${data.vehicle?.brand} ${data.vehicle?.name} ${data.vehicle?.registration_number} - ${data.vehicle?.type}`,
                    Pricing_scheme: data.route_itinerary?.pricing_scheme || 'N/A',
                    Pricing_type: data.route_itinerary?.pricing_type || 'N/A',
                    Pricing_config:
                        data.route_itinerary.pricing_type === 'margin_value_generated'
                        ? `${data.route_itinerary?.pricing_margin} ${data.route_itinerary?.pricing_margin_unit}`
                        : data.route_itinerary?.pricing_type === 'route_price_table_lookup' && data.active_route_price
                        ? `From ${busStopName(
                                data.route?.route_bus_stops,
                                data.active_route_price?.start_route_bus_stop_id
                            )} To ${busStopName(
                                data.route?.route_bus_stops,
                                data.active_route_price?.end_route_bus_stop_id
                            )}`
                        : 'N/A',
                    Cost_of_supply: data.cost_of_supply || 'N/A',
                    Selling_price_currency: data.active_route_price?.fare_currency || 'NGN',
                    Selling_price: data.active_route_price?.fare || 'N/A'
                }
				newArr.push(y)
			}
			exportAsCsv(newArr, name.value)
        }
        downloading.value = false
    }

    const updateRouteCostOfSupply = async (cost_of_supply:{new:number;old:number}, data:Record<string, any>) => {
        loading_cost_of_supply.value = true
        const payload = {
            driver_id: data.driver_id,
            cost_of_supply: cost_of_supply.new,
            vehicle_id: data.vehicle_id
        }
        const res = await configure_api.$_update_route_cost_of_supply(data.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Cost of supply updated successfully' })
            getRoutePricesList()
        }
        loading_cost_of_supply.value = false
    }

    const updateRouteSellingPrice = async (selling_price:{new:number;old:number}, data:Record<string, any>) => {
        loading_selling_price.value = true
        const payload = {
            update: [
                {
                  id: data.active_route_price.id,
                  fare: selling_price.new
                }
            ]
        }
        const res = await configure_api.$_update_route_selling_price(data.route_itinerary.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Selling price updated successfully' })
            getRoutePricesList()
        }
        loading_selling_price.value = false
    }
    type PricingKeyType = 'pricing_margin_unit'|'pricing_margin'|'pricing_scheme'|'pricing_type'
    const updateRouteOtherPricing = async (data:Record<string, any>, key: PricingKeyType, value:string|number) => {
        const payload = {
            [key]: value
        }
        const res = await configure_api.$_update_route_pricing_others(data.route_itinerary.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: `${key} updated successfully` })
            getRoutePricesList()
        }
    }

    return { getRoutePricesList, loadingRoutePrices, routePricesList, prev, ...metaObject, next, moveTo, vehicleId, routeType, updateRouteCostOfSupply, loading_selling_price, updateRouteSellingPrice, loading_cost_of_supply, updateRouteOtherPricing, downloadRoutePriceControl, downloading }
}

export const useGeneralPaymentOptionsList = () => {
    const loadingGeneralPaymentOptions = ref(false)
const generalPaymentOptionsList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_general_payment_options } = configure_api

    const getGeneralPaymentOptionsList = async () => {
        loadingGeneralPaymentOptions.value = true

        const res = await $_get_general_payment_options() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            generalPaymentOptionsList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingGeneralPaymentOptions.value = false
    }
    setFunction(getGeneralPaymentOptionsList)

    return { getGeneralPaymentOptionsList, loadingGeneralPaymentOptions, generalPaymentOptionsList, prev, ...metaObject, next, moveTo }
}

export const usePaymentOptionsList = () => {
    const loadingPaymentOptions = ref(false)
const paymentOptionsList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_payment_options } = configure_api

    const getPaymentOptionsList = async () => {
        loadingPaymentOptions.value = true

        const res = await $_get_payment_options() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            paymentOptionsList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingPaymentOptions.value = false
    }
    setFunction(getPaymentOptionsList)

    return { getPaymentOptionsList, loadingPaymentOptions, paymentOptionsList, prev, ...metaObject, next, moveTo }
}

export const useCitiesList = () => {
    const loadingCities = ref(false)
const citiesList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_cities } = configure_api

    const getCitiesList = async () => {
        loadingCities.value = true

        const res = await $_get_cities() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            citiesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingCities.value = false
    }
    setFunction(getCitiesList)

    return { getCitiesList, loadingCities, citiesList, prev, ...metaObject, next, moveTo }
}

export const useCostOfSupplyList = () => {
const loadingCostOfSupply = ref(false)
const costOfSupplyList = ref([] as Record<string, any>[])
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_cost_of_supply } = configure_api

    const getCostOfSupplyList = async () => {
        loadingCostOfSupply.value = true

        const res = await $_get_cost_of_supply(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            costOfSupplyList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingCostOfSupply.value = false
    }
    setFunction(getCostOfSupplyList)

    return { getCostOfSupplyList, loadingCostOfSupply, costOfSupplyList, prev, ...metaObject, next, moveTo }
}

export const useUpdatePaymentOptions = () => {
    const updatingPaymentOption = ref(false)
    const paymentOptionsPayload = {
        payment_options_ids: ref([] as any)
    }
    const { $_update_payment_options } = configure_api

    const updatePaymentOption = async () => {
        updatingPaymentOption.value = true

        const payload = {
            payment_options_ids: paymentOptionsPayload.payment_options_ids.value
        }

        const res = await $_update_payment_options(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            // amenity was  created successfully
        }
        updatingPaymentOption.value = false
    }

    return { paymentOptionsPayload, updatePaymentOption, updatingPaymentOption }
}

export const useTripRatingSettings = () => {
    const loadingTripRatingSettings = ref(false)
    const { $_get_trip_ratings_settings } = configure_api

    const getTripRatingSettings = async (serviceId: string) => {
        loadingTripRatingSettings.value = true

        const res = await $_get_trip_ratings_settings(serviceId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripRatingSettingsReference.value = res?.data?.data?.reference
            useTripRatingSettingsCategories().getTripRatingSettingsCategories(tripRatingSettingsReference.value)
        }
        loadingTripRatingSettings.value = false
    }

    return { loadingTripRatingSettings, getTripRatingSettings, tripRatingSettingsReference }
}

const tripRatingSettingsCategories = ref([] as any)
const loadingTripRatingSettingsCategories = ref(false)
export const useTripRatingSettingsCategories = () => {
    const { $_get_categories_by_settings } = configure_api

    const getTripRatingSettingsCategories = async (serviceId: string) => {
        loadingTripRatingSettingsCategories.value = true
        const res = await $_get_categories_by_settings(serviceId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripRatingSettingsCategories.value = res.data.data
        }
        loadingTripRatingSettingsCategories.value = false
    }

    return { loadingTripRatingSettingsCategories, getTripRatingSettingsCategories, tripRatingSettingsCategories }
}

const loading_all_vehicles = ref(false)
const allVehicles = ref([] as Record<string, any>[])
export const useAllVehicleType = () => {
    const getAllVehicleWithoutLimit = async () => {
        loading_all_vehicles.value = true
        const res = await configure_api.$_get_all_vehicle_types_without_paginating() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            allVehicles.value = res.data.data?.length ? res.data.data : []
        }
        loading_all_vehicles.value = false
    }

    return { loading_all_vehicles, allVehicles, getAllVehicleWithoutLimit }
}
