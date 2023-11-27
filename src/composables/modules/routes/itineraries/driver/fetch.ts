import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const itineraryDrivers = ref([]) as Ref<Record<string, any>[]>

export const useItineraryDrivers = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()
	const getItineraryDrivers = async () => {
		itineraryDrivers.value = []
		loading.value = true
		const res = await routes_api.$_get_routes_itineraries_vehicles_by_itinerary_id(useRoute().params.iti_id as string) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			itineraryDrivers.value = res.data.data?.length ? res.data.data : []
			metaObject.total.value = res.data?.metadata?.total_pages || 0
		}
		loading.value = false
	}

	setFunction(getItineraryDrivers)

	return { loading, itineraryDrivers, getItineraryDrivers, prev, next, moveTo, ...metaObject }
}
