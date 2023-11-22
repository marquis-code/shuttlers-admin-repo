import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

export const useCreateUsers = () => {
	const loading = ref(false)

    const updateRouteStatus = async (id: string, type: string) => {
        loading.value = true

        const res = (await routes_api.$_update_route_status(
            {
                status: type === 'suspend' ? 0 : 1
            }, id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `Route has been ${type === 'suspend' ? 'suspened' : 'un-suspended'} successfully`
            })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }
    return { loading, updateRouteStatus }
}
