import moment from 'moment'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch/completedTrips'
import { useTripsModal } from '@/composables/core/modals'
import { trips_api, partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useYesConfirmationModal } from '@/composables/core/confirmation'

const selectedTrips = ref([] as Record<string, any>[])
const obj = {
	trip: ref([]) as Ref<Record<string, any>[]>,
	partner: ref({}) as Ref<Record<string, any>>,
	vehicle: ref({}) as Ref<Record<string, any>>,
	driver_id: ref(null) as Ref<null|number>,
	cost_of_supply: ref(null) as Ref<number|null>,
	is_multiple: ref(false)
}
const vehicles = ref([]) as Ref<Record<string, any>[]>
const drivers = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_vehicles = ref(false)
const loading_drivers = ref(false)

const clearObj = () => {
	obj.trip.value = []
	obj.partner.value = {}
	obj.vehicle.value = {}
	obj.driver_id.value = null
	obj.cost_of_supply.value = null
	obj.is_multiple.value = false
}

const trip_ids = computed(() => {
	return obj.trip.value.map((el) => el?.id)
})

const enableButton = computed(() => {
	return !!(obj.vehicle.value?.id && obj.cost_of_supply.value)
})

const generateTripText = (trips:Record<string, any>[]) => {
	let text = ''
	for (const x of trips) {
		text += `<br>${x?.route?.route_code} for ${moment(x?.trip_start_time).format('LL')} from ${x.vehicle?.partner?.company_name || x?.partner} to ${obj.partner.value?.company_name}`
	}
	return text
}

const single_desc = computed(() => {
	const trip = obj.trip.value[0]
	return `Are you sure you want to transfer trip ${trip?.route?.route_code} for ${moment(trip.trip_start_time).format('LL')} from ${trip.vehicle?.partner?.company_name || trip?.partner} to ${obj.partner.value?.company_name || ''}`
})

const multiple_desc = computed(() => {
	// return `Are you sure you want to transfer the trips below:<br> ${obj.trip.value.map((el) => el?.route_code).join(', ')} to ${obj.partner.value?.company_name || ''}`
	return `Are you sure you want to transfer the trips below: ${generateTripText(obj.trip.value)}`
})

export const useTransferTrip = () => {
	const initTransfer = (trip: Record<string, any>[], is_multiple = false) => {
		if (!trip?.length) {
			useAlert().openAlert({ type: 'ERROR', msg: 'You need a trip to proceed' })
			return
		}
		obj.trip.value = trip
		obj.is_multiple.value = is_multiple
		useTripsModal().openTransferTrip()
	}

	const transferTrip = () => {
		if (!obj.driver_id.value) {
			useAlert().openAlert({ type: 'ERROR', msg: 'Driver not found' })
		}
		useYesConfirmationModal().openAlert({
			call_function: proceedToTransferTrip,
			desc: obj.is_multiple.value ? multiple_desc.value : single_desc.value,
			title: 'Transfer Trip',
			loading,
			type: 'DANGER'
		})
	}

	const proceedToTransferTrip = async () => {
		const payload:Record<string, any> = {
			trip_ids: trip_ids.value,
			vehicle_id: obj.vehicle.value?.id,
			cost_of_supply: obj.cost_of_supply.value,
			cost_of_supply_currency: 'NGN',
			driver_id: obj.driver_id.value
		}
		loading.value = true
		const res = await trips_api.$_transfer_trip(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			if (res.data.success) {
				const { getCompletedTrips } = useGetCompletedTripsList()
				useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip(s) transferred successfully' })
				useTripsModal().closeTransferTrip()
				selectedTrips.value = []
				getCompletedTrips()
			}
        }
		loading.value = false
	}

	watch(obj.partner, () => {
		vehicles.value = []
		drivers.value = []
		obj.driver_id.value = null
		obj.vehicle.value = {}
		if (obj.partner.value?.id) {
			getVehicles()
			getDrivers()
		}
	})

	const getVehicles = async () => {
		loading_vehicles.value = true
		const res = await partners_api.$_get_all_partner_vehicle_by_id(obj.partner.value?.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            vehicles.value = res.data?.data?.length ? res.data.data : []
        }
		loading_vehicles.value = false
	}

	watch(obj.vehicle, () => {
		if (obj.vehicle.value?.id) {
			obj.driver_id.value = obj.vehicle?.value?.driver?.id || null
		}
	})

	const getDrivers = async () => {
		loading_drivers.value = true
		const res = await partners_api.$_get_all_partner_drivers_by_id(obj.partner.value?.account_sid) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            drivers.value = res.data?.data?.length ? res.data.data : []
        }
		loading_drivers.value = false
	}

	return { ...obj, loading, loading_vehicles, initTransfer, transferTrip, vehicles, clearObj, enableButton, loading_drivers, drivers, selectedTrips }
}
