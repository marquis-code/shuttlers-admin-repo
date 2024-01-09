import moment from 'moment'
import { useGetCompletedTripsList } from './fetch'
import { useTripsModal } from '@/composables/core/modals'
import { trips_api, partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useYesConfirmationModal } from '@/composables/core/confirmation'

const { getCompletedTrips } = useGetCompletedTripsList()
const obj = {
	trip: ref({}) as Ref<Record<string, any>>,
	partner: ref({}) as Ref<Record<string, any>>,
	vehicle_id: ref(null) as Ref<number|null>
}
const vehicles = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_vehicles = ref(false)

const clearObj = () => {
	obj.trip.value = {}
	obj.partner.value = {}
	obj.vehicle_id.value = null
}

const enableButton = computed(() => {
	return !!(obj.vehicle_id.value)
})

export const useTransferTrip = () => {
	const initTransfer = (trip: Record<string, any>) => {
		if (!trip?.id) {
			useAlert().openAlert({ type: 'ERROR', msg: 'You need trip id to proceed' })
			return
		}
		obj.trip.value = trip
		useTripsModal().openTransferTrip()
	}

	const transferTrip = () => {
		useYesConfirmationModal().openAlert({ call_function: proceedToTransferTrip, desc: `Are you sure you want to transfer trip ${obj.trip.value?.route?.route_code} for ${moment(obj.trip.value?.trip_start_time).format('LL')} from ${obj.trip.value?.vehicle?.partner?.company_name || obj.trip.value?.partner} to ${obj.partner.value?.company_name || ''}`, title: 'Transfer Trip', loading, type: 'DANGER' })
	}

	const proceedToTransferTrip = async () => {
		const payload = {
			trip_ids: [obj.trip.value?.id],
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
