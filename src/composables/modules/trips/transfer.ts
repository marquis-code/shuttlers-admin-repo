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
	vehicle: ref({}) as Ref<Record<string, any>>,
	driver_id: ref(null) as Ref<null|number>,
	// select_driver: ref(false),
	cost_of_supply: ref(null) as Ref<number|null>
}
const vehicles = ref([]) as Ref<Record<string, any>[]>
const drivers = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const loading_vehicles = ref(false)
const loading_drivers = ref(false)

const clearObj = () => {
	obj.trip.value = {}
	obj.partner.value = {}
	obj.vehicle.value = {}
	obj.driver_id.value = null
	// obj.select_driver.value = false
	obj.cost_of_supply.value = null
}

const enableButton = computed(() => {
	return !!(obj.vehicle.value?.id && obj.cost_of_supply.value)
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
		if (!obj.driver_id.value) {
			useAlert().openAlert({ type: 'ERROR', msg: 'Driver not found' })
		}
		useYesConfirmationModal().openAlert({ call_function: proceedToTransferTrip, desc: `Are you sure you want to transfer trip ${obj.trip.value?.route?.route_code} for ${moment(obj.trip.value?.trip_start_time).format('LL')} from ${obj.trip.value?.vehicle?.partner?.company_name || obj.trip.value?.partner} to ${obj.partner.value?.company_name || ''}`, title: 'Transfer Trip', loading, type: 'DANGER' })
	}

	const proceedToTransferTrip = async () => {
		const payload:Record<string, any> = {
			trip_ids: [obj.trip.value?.id],
			vehicle_id: obj.vehicle.value?.id,
			cost_of_supply: obj.cost_of_supply.value,
			cost_of_supply_currency: 'NGN',
			driver_id: obj.driver_id.value
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

	// watch(obj.select_driver, () => {
	// 	if (obj.select_driver.value) getDrivers()
	// })

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

	return { ...obj, loading, loading_vehicles, initTransfer, transferTrip, vehicles, clearObj, enableButton, loading_drivers, drivers }
}
