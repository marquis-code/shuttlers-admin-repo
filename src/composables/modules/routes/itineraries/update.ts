import { ref } from 'vue'
import { singleItinerary, useItineraries } from './fetch'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const obj = {
	time: ref(''),
	busstop_id: ref(''),
	default_fare: ref(0),
	pricing_type: ref(''),
	pricing_scheme: ref(''),
	pricing_margin: ref(''),
	pricing_margin_unit: ref('')
}

const loading = ref(false)

export const useUpdateItineraries = () => {
	const resetObj = () => {
		obj.time.value = singleItinerary.value.trip_time.length === 7 ? `0${singleItinerary.value.trip_time}` : singleItinerary.value.trip_time
		obj.busstop_id.value = singleItinerary.value.pickup_id
		obj.default_fare.value = singleItinerary.value.default_fare
		obj.pricing_type.value = singleItinerary.value.pricing_type
		obj.pricing_scheme.value = singleItinerary.value.pricing_scheme
		obj.pricing_margin.value = singleItinerary.value.pricing_margin
		obj.pricing_margin_unit.value = singleItinerary.value.pricing_margin_unit
	}

	const updateItineraries = async () => {
		const iti_id = useRoute().params.iti_id as string
		loading.value = true
		const payload = singleItinerary.value
		payload.departure_time = obj.time.value.split(' ')[0]
		payload.time_of_day = obj.time.value.split(' ')[1]
		payload.default_fare = obj.default_fare.value
		payload.pickup_id = obj.busstop_id.value
		payload.pricing_margin = obj.pricing_margin.value
		payload.pricing_margin_unit = obj.pricing_margin_unit.value
		payload.pricing_scheme = obj.pricing_scheme.value
		payload.pricing_type = obj.pricing_type.value
		const res = await routes_api.$_update_itineraries(iti_id, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Itinerary updated successfully' })
			useItineraries().getSingleItinerary(iti_id)
		}
		loading.value = false
	}

	return { ...obj, resetObj, loading, updateItineraries }
}
