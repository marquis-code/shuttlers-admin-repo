import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
const { getRouteById } = useRouteIdDetails()
const selectedRouteId = ref('')

export const useUpdateRouteStatus = () => {
    const loading = ref(false)
    const updateRoute = async (id: string, type: string) => {
        loading.value = true
        selectedRouteId.value = id
        const res = (await routes_api.$_update_route_status(Number(id),
            {
                status: type === 'suspend' ? 0 : 1
            }
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `Route has been ${type === 'suspend' ? 'suspened' : 'un-suspended'} successfully`
            })
            useConfirmationModal().closeAlert()
            getRouteById(id)
        }
        loading.value = false
    }

    return { updateRoute, loading }
}
