import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
export const useDeleteCapacityConfiguration = () => {
    const loading = ref(false)
    const { $_delete_corporate_vehicle_capacity } = corporates_api
    const deleteCapacityConfiguration = async (id: number) => {
        loading.value = true
        const res = await $_delete_corporate_vehicle_capacity(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Capacity was successfully deleted'
			})
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { deleteCapacityConfiguration, loading }
}
