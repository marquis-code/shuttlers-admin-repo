import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

const obj = {
	route_id: ref(null),
	itinerary_id: ref(null),
	work_days: ref([]) as Ref<any[]>,
	shift_id: ref(null),
	branch_id: ref(null),
	bus_stop: ref(null)
}

const itineraries = ref([]) as Ref<any[]>
const loading = ref(false)
export const useAssignStaff = () => {
	const assignStaff = () => {
		loading.value = true
	}

	const fetchItineraries = async () => {
		obj.itinerary_id.value = null
		itineraries.value = []
		const res = await routes_api.$_get_itineraries_by_route_id(obj.route_id.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			itineraries.value = res.data.data?.length ? res.data.data : []
        }
	}

	watch(obj.route_id, () => {
		fetchItineraries()
	})

	return { ...obj, assignStaff, loading, itineraries }
}
