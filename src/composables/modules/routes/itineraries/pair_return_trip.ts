import { useItineraries, singleItinerary } from './fetch'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useRouteModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'

const routes = ref([]) as Ref<Record<string, any>[]>
const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_itineraries = ref(false)
const obj = {
	selectedRoutes: ref(null) as Ref<any>,
	selectedItineraries: ref(null) as Ref<any>
}

const clearObj = () => {
	obj.selectedItineraries.value = null
	obj.selectedRoutes.value = null
}

const enableButton = computed(() => {
  return !!(obj.selectedItineraries.value)
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
			default_fare: singleItinerary.value?.default_fare || 0,
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

	const initRemovePairedTrip = () => {
		useConfirmationModal().openAlert({ call_function: removePairedTrip, desc: 'Are you sure you want to unpair this trip?', title: 'Unpair return trip', loading, type: 'DANGER' })
	}

	const removePairedTrip = async () => {
		const payload = {
			default_fare: singleItinerary.value?.default_fare || 0,
			itinerary_pair_id: null
		}
		const itinerary_id = useRoute().params.iti_id as string
		loading.value = true
		const res = await routes_api.$_update_itineraries(itinerary_id, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Return trip un-paired successfully' })
			useItineraries().getSingleItinerary(itinerary_id)
			useConfirmationModal().closeAlert()
		}
		loading.value = false
	}

	return { ...obj, routes, itineraries, clearObj, loading, fetchItineraries, enableButton, pairReturnTrip, initRemovePairedTrip }
}
