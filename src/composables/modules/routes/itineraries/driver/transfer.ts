import { ref, Ref } from 'vue'
import { useItineraryDrivers } from './fetch'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse, routes_api } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'

const loading = ref(false)
const old_driver = ref({}) as Ref<Record<string, any>>
const new_driver = ref({}) as Ref<Record<string, any>>
const drivers = ref([]) as Ref<Record<string, any>>

const getVehicleDesc = (vehicleObj:Record<string, any>) => {
	return `${vehicleObj?.vehicle?.brand || ''} ${vehicleObj?.vehicle?.name || ''} ${vehicleObj?.vehicle?.type || ''}`
}

const getDriverName = (driverObj: Record<string, any>) => {
	return `${driverObj?.fname || ''} ${driverObj?.lname || ''}`
}

export const useTransferBooking = () => {
	const initTransfer = (data:Record<string, any>, allDrivers:Record<string, any>[]) => {
		old_driver.value = { ...data.driver, vehicle: data?.vehicle, route_vehicle: data.id }
		const arr = allDrivers.map((el) => {
			return { ...el.driver, vehicle: el?.vehicle, route_vehicle: el.id }
		})
		drivers.value = arr.filter((el) => el.id !== old_driver.value.id)
		useDriverModal().openItineraryTransferBooking()
	}

	const transfer = () => {
		useYesConfirmationModal().openAlert({
			call_function: proceedTransfer,
			desc: `Are you sure you want to transfer all active/upcoming trip bookings for ${getDriverName(old_driver.value)} • ${getVehicleDesc(old_driver.value)} • ${old_driver.value?.vehicle?.seats || 'N/A'} seater to this selected driver (${getDriverName(new_driver.value)} • ${getVehicleDesc(new_driver.value)} • ${new_driver.value?.vehicle?.seats} seater)?`,
			title: 'Transfer Bookings',
			loading,
			type: 'NORMAL'
		})
	}

	const proceedTransfer = async () => {
		const payload = {
			// params: {
			from_route_vehicle_id: old_driver.value?.route_vehicle,
			to_route_vehicle_id: new_driver.value?.route_vehicle
			// }
		}
		loading.value = true
		const res = await routes_api.$_transfer_booking_within_itineraries(payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useDriverModal().closeItineraryTransferBooking()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Booking transferred successfully' })
			useItineraryDrivers().getItineraryDrivers()
		}
		loading.value = false
	}

	return { loading, initTransfer, old_driver, new_driver, drivers, transfer }
}
