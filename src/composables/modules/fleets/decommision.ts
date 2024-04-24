import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

const { getVehicleById } = useVehicleIdDetails()

export const useDecommissionVehicle = () => {
    const loading = ref(false)

    const handleDecommisionVehicle = async (vehicle:Record<string, any>) => {
        loading.value = true
        const payload = {
            status: vehicle?.status === 'active' ? 'inactive' : 'active'
        }
        const res = await fleets_api.$_update_vehicle(vehicle?.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: `Vehicle has been successfully ${vehicle?.status === 'active' ? 'de-commissioned' : 'commissioned'}`
			})
            getVehicleById(vehicle?.id)
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }
    return { handleDecommisionVehicle, loading }
}
