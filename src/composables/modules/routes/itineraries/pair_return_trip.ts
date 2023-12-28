import { useItineraries } from './fetch'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useRouteModal } from '@/composables/core/modals'

const routes = ref([]) as Ref<Record<string, any>[]>
const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_itineraries = ref(false)
const obj = {
	selectedRoutes: ref(null) as Ref<any>,
	selectedItineraries: ref(null) as Ref<any>,
	return_fare: ref(1000)
}

const clearObj = () => {
	obj.selectedItineraries.value = null
	obj.selectedRoutes.value = null
	obj.return_fare.value = 1000
}

const enableButton = computed(() => {
  return !!(obj.selectedItineraries.value && obj.return_fare.value)
})

export const usePairReturnTrip = () => {
	const fetchItineraries = async () => {
		itineraries.value = []
		loading_itineraries.value = true
		const res = await routes_api.$_get_itineraries_by_route_id(obj.selectedRoutes.value?.id) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			itineraries.value = res.data.data?.length ? res.data.data : []
		}
		loading_itineraries.value = false
	}

	const pairReturnTrip = async () => {
		const payload = {
			default_fare: obj.return_fare.value,
			itinerary_pair_id: obj.selectedItineraries.value || null
		}
		const itinerary_id = useRoute().params.iti_id as string
		loading.value = true
		const res = await routes_api.$_update_itineraries(itinerary_id, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Return trip paired successfully' })
			useItineraries().getSingleItinerary(itinerary_id)
			useRouteModal().closePairReturnTrip()
		}
		loading.value = false
	}

	watch(obj.selectedRoutes, () => {
		obj.selectedItineraries.value = null
		if (obj.selectedRoutes.value?.id) fetchItineraries()
	  })

	return { ...obj, routes, itineraries, clearObj, loading, fetchItineraries, enableButton, pairReturnTrip }
}
