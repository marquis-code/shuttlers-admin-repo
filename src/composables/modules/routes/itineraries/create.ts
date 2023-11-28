import { ref } from 'vue'
import { useItineraries } from './fetch'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useRouteModal } from '@/composables/core/modals'

const { getItineraries } = useItineraries()
const obj = {
	time: ref(''),
	busstop_id: ref(''),
	default_fare: ref(0)
}
const loading = ref(false)
const busStops = ref([]) as Ref<Record<string, any>[]>
const loading_busstop = ref(false)

const clearObj = () => {
	obj.time.value = ''
	obj.busstop_id.value = ''
	obj.default_fare.value = 0
}

export const useCreateItinerary = () => {
	const createItinerary = async () => {
		const payload = {
            departure_time: obj.time.value.slice(0, 5),
            time_of_day: obj.time.value.slice(-2),
            default_fare: obj.default_fare.value,
            pickup_id: obj.busstop_id.value
        }
		loading.value = true
		const res = await routes_api.$_create_itineraries(useRoute().params.id as string, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouteModal().closeAddItinerary()
			clearObj()
			getItineraries()
		}
		loading.value = false
	}

	const getRouteBusstops = async () => {
		loading_busstop.value = true
		const res = await routes_api.$_get_route_busstops_by_id(useRoute().params.id as string) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			busStops.value = res.data.data?.length ? res.data.data : []
		}
		loading_busstop.value = false
	}

	return { loading, ...obj, createItinerary, loading_busstop, getRouteBusstops, busStops, clearObj }
}
