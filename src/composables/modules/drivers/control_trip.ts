import { drivers_api, trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'

const obj = {
	start: ref(true),
	route: ref({}) as Ref<Record<string, any>>,
	trip: ref({}) as Ref<Record<string, any>>,
	driver_routes: ref([]) as Ref<Record<string, any>[]>,
	active_trips: ref([]) as Ref<Record<string, any>[]>
}
const loading = ref(false)
const clearObj = () => {
	obj.start.value = true
	obj.route.value = {}
	obj.trip.value = {}
	obj.driver_routes.value = []
	obj.active_trips.value = []
}

export const useControlTrips = () => {
	const initControlTrips = () => {
		useDriverModal().openControlTrip()
	}
	const controlTrips = async () => {
		const id = useRoute().params.id as string
		loading.value = true
		let res:CustomAxiosResponse
		if (obj.start.value) {
			const payload = {
				route_id: obj.route.value?.id,
				pickup_coordinate: obj.route.value?.pickup_coordinate,
				driver_id: id
			}
			res = await trips_api.$_start_trip(payload) as CustomAxiosResponse
		} else {
			const payload = {
				destination_coordinate: obj.trip.value?.route.destination_coordinate
			}
			res = await trips_api.$_end_trip(obj.trip.value?.id, payload) as CustomAxiosResponse
		}
        if (res.type !== 'ERROR') {
			useDriverModal().closeControlTrip()
			useAlert().openAlert({ type: 'SUCCESS', msg: `Trip ${obj.start.value ? 'started' : 'ended'} successfully` })
        }
		loading.value = false
	}

	const getActiveTrips = async () => {
		obj.active_trips.value = []
		const id = useRoute().params.id as string
		const res = await drivers_api.$_get_driver_active_trips(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			obj.active_trips.value = res.data?.length ? res.data : []
        }
	}

	const getDriverRoutes = async () => {
		obj.active_trips.value = []
		const id = useRoute().params.id as string
		const res = await drivers_api.$_get_driver_routes(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			obj.driver_routes.value = res.data?.routes?.length ? res.data.routes : []
        }
	}

	return { loading, ...obj, controlTrips, initControlTrips, clearObj, getActiveTrips, getDriverRoutes }
}
