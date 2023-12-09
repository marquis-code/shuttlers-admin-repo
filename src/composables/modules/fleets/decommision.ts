import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
export const useDecommissionVehicle = () => {
    const loading = ref(false)

    const handleDecommisionVehicle = async (id: string) => {
        loading.value = true
        const res = await fleets_api.$_decomission_vehicle(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Vehicle has been successfully de-commissioned'
			})
        }
        loading.value = false
        return res.data
    }
    return { handleDecommisionVehicle, loading }
}
