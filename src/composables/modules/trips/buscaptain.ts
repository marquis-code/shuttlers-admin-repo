import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
export const useRemoveBusCaptain = () => {
    const loading = ref(false)
    const { $_remove_bus_captain } = trips_api

    const removeBusCaptain = async (id:string) => {
        loading.value = true
        const res = await $_remove_bus_captain(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Bus captain has been removed successfully' })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { removeBusCaptain, loading }
}
