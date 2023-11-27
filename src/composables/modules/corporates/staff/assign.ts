import { useSelectedStaff } from './select-staff'
import { useCorporateStaff } from './fetch'
import { useAlert } from '@/composables/core/notification'
import { routes_api, corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCompaniesModal } from '@/composables/core/modals'

const { selectedStaffIds, selectedStaffs } = useSelectedStaff()
const { getCorporateStaff } = useCorporateStaff()
const obj = {
	route_id: ref(null),
	itinerary_id: ref(null),
	work_days: ref([]) as Ref<any[]>,
	shift_id: ref(null),
	branch_id: ref(null),
	pickup: ref(null),
	dropoff: ref(null)
}

const clearObj = () => {
	obj.route_id.value = null
	obj.itinerary_id.value = null
	obj.work_days.value = []
	obj.shift_id.value = null
	obj.branch_id.value = null
	obj.pickup.value = null
	obj.dropoff.value = null
}

const itineraries = ref([]) as Ref<any[]>
const busstops = ref([]) as Ref<any[]>
const loading = ref(false)
export const useAssignStaff = () => {
	const assignStaff = async () => {
		const payload = {
			user_ids: selectedStaffIds.value,
			corporate_id: useRoute().params.id,
			branch_id: obj.branch_id.value,
			workshift_id: obj.shift_id.value,
			work_days: obj.work_days.value,
			itinerary_id: obj.itinerary_id.value,
			busstops: {
				pickup: obj.pickup.value,
				dropoff: obj.dropoff.value
			}
		}
		loading.value = true
		const res = await corporates_api.$_bulk_staff_assignments(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			console.log(res)
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Successful' })
			useCompaniesModal().closeAssignStaff()
			selectedStaffs.value = []
			getCorporateStaff()
        }
		loading.value = false
	}

	const fetchItineraries = async () => {
		obj.itinerary_id.value = null
		itineraries.value = []
		const res = await routes_api.$_get_itineraries_by_route_id(obj.route_id.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			itineraries.value = res.data.data?.length ? res.data.data : []
        }
	}

	const fetchBusStops = async () => {
		obj.pickup.value = null
		obj.dropoff.value = null
		busstops.value = []
		const res = await routes_api.$_get_routes_busstops(obj.route_id.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			busstops.value = res.data.data?.length ? res.data.data : []
        }
	}

	watch(obj.route_id, () => {
		fetchItineraries()
		fetchBusStops()
	})

	return { ...obj, assignStaff, loading, itineraries, busstops, clearObj }
}
