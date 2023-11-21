import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_single_iti = ref(false)
const singleItinerary = ref({}) as Ref<Record<string, any>>

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

	const getSingleItinerary = async (id:number|string) => {
		loading_single_iti.value = true
		const res = await routes_api.$_get_single_itinerary_details(id) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			console.log(res)
			singleItinerary.value = res.data
		}
		loading_single_iti.value = false
	}

	return { loading, itineraries, getItineraries, loading_single_iti, singleItinerary, getSingleItinerary }
}
