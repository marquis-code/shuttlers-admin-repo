import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'
import { useAlert } from '@/composables/core/notification'
import { useVehicleModal } from '@/composables/core/modals'
const { selectedVehicle } = useVehicleIdDetails()

export const useUpdateVehicle = () => {
	const selectedDriver = ref({}) as any
	const loading = ref(false)
	const updateVehicleDriver = async () => {
		loading.value = true
		const id = useRoute().params.id as string
		const payload = {
			vehicle_id: selectedVehicle.value?.id
		}
		const res = await drivers_api.$_update_driver(selectedVehicle.value.driver.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicle driver was updated successfully' })
            useVehicleModal().closeChangeFleetDriver()
        }
		loading.value = false
	}

	return { selectedVehicle, loading, updateVehicleDriver, selectedDriver }
}
