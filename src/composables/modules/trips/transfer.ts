import { useGetCompletedTripsList } from './fetch'
import { useTripsModal } from '@/composables/core/modals'
import { trips_api, partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const { getCompletedTrips } = useGetCompletedTripsList()
const obj = {
	trip_id: ref(null) as Ref<number|null>,
	partner: ref({}) as Ref<Record<string, any>>,
	vehicle_id: ref(null) as Ref<number|null>
}
const vehicles = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_vehicles = ref(false)

const clearObj = () => {
	obj.trip_id.value = null
	obj.partner.value = {}
	obj.vehicle_id.value = null
}

const enableButton = computed(() => {
	return !!(obj.vehicle_id.value)
})

export const useTransferTrip = () => {
	const initTransfer = (tripId: number) => {
		if (!tripId) useAlert().openAlert({ type: 'ERROR', msg: 'You need trip id to proceed' })
		obj.trip_id.value = tripId
		useTripsModal().openTransferTrip()
	}

	const transferTrip = async () => {
		const payload = {
			trip_ids: [obj.trip_id.value],
			vehicle_id: obj.vehicle_id.value
		}
		loading.value = true
		const res = await trips_api.$_transfer_trip(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			if (res.data.success) {
				useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip transferred successfully' })
				useTripsModal().closeTransferTrip()
				getCompletedTrips()
			}
        }
		loading.value = false
	}

	watch(obj.partner, () => {
		vehicles.value = []
		obj.vehicle_id.value = null
		if (obj.partner.value?.id) getVehicles()
	})

	const getVehicles = async () => {
		loading_vehicles.value = true
		const res = await partners_api.$_get_all_partner_vehicle_by_id(obj.partner.value?.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            vehicles.value = res.data?.data?.length ? res.data.data : []
        }
		loading_vehicles.value = false
	}

	return { ...obj, loading, loading_vehicles, initTransfer, transferTrip, vehicles, clearObj, enableButton }
}
