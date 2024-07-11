import { useUpdateItineraries } from './update'
import { useAlert } from '@/composables/core/notification'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

const { resetObj } = useUpdateItineraries()
const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_single_iti = ref(false)
export const singleItinerary = ref({}) as Ref<Record<string, any>>
const returnTripItinerary = ref({}) as Ref<Record<string, any>>
const lookupTablePrices = ref([] as Record<string, any>[])
const loading_lookup_price = ref(false)

export const useItineraries = () => {
	const getItineraries = async () => {
		itineraries.value = []
		loading.value = true
		const res = await routes_api.$_get_itineraries_by_route_id(useRoute().params.id as string) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			itineraries.value = res.data.data?.length ? res.data.data : []
		}
		loading.value = false
	}

	const getReturnTripItinerary = async (itinerary_id: number) => {
		const res = await routes_api.$_get_single_itinerary_details(itinerary_id) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			returnTripItinerary.value = res.data?.id ? res.data : {}
		}
	}

	const getSingleItinerary = async (itinerary_id:number|string) => {
		returnTripItinerary.value = {}
		loading_single_iti.value = true
		const res = await routes_api.$_get_single_itinerary_details(itinerary_id) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			singleItinerary.value = res.data?.id ? res.data : {}
			if (singleItinerary.value?.itinerary_pair_id) getReturnTripItinerary(singleItinerary.value.itinerary_pair_id)
				lookupTablePrices.value = singleItinerary.value?.prices?.length ? singleItinerary.value?.prices : []
			resetObj()
		}
		loading_single_iti.value = false
	}

	const updatePriceBound = async (toDeleteLookupPrices: Record<string, any>[]) => {
		const payload = {
			create: lookupTablePrices.value.filter((item) => !item?.id).map((el) => {
				return {
					start_route_bus_stop_id: el?.start_route_bus_stop_id,
					end_route_bus_stop_id: el?.end_route_bus_stop_id,
					fare: el?.fare,
					fare_currency: 'NGN'
				}
			}),
			delete: toDeleteLookupPrices.filter((item) => item?.id).map((el) => el?.id),
			update: lookupTablePrices.value.filter((item) => item?.id).map((el) => {
				return {
					id: el?.id,
					start_route_bus_stop_id: el?.start_route_bus_stop_id,
					end_route_bus_stop_id: el?.end_route_bus_stop_id,
					fare: el?.fare,
					fare_currency: 'NGN'
				}
			})
		}
		loading_lookup_price.value = true
		const itinerary_id = useRoute().params.iti_id as string
		const res = await routes_api.$_update_itinerary_price_bound(Number(itinerary_id), payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Route price updated successfully'
			})
			getSingleItinerary(itinerary_id)
		}
		loading_lookup_price.value = false
	}

	return { loading, itineraries, getItineraries, loading_single_iti, singleItinerary, getSingleItinerary, returnTripItinerary, lookupTablePrices, updatePriceBound, loading_lookup_price }
}
