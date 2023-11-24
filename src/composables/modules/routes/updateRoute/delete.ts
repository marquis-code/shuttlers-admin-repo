import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
const { getRouteById } = useRouteIdDetails()
const selectedRouteId = ref('')

export const useUpdateDeletion = () => {
    const loading = ref(false)
    const deleteRoute = async (id: string) => {
        loading.value = true
        selectedRouteId.value = id
        const res = (await routes_api.$_handle_route_deletion(id)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Route has been successfully deleted'
            })
            useConfirmationModal().closeAlert()
            getRouteById(id)
        }
        loading.value = false
    }

    return { deleteRoute, loading }
}
