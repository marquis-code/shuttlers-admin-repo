import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
export const useUpdateCorporateStatus = () => {
	const loading = ref(false)

	const updateCorporateStatus = async (id: string, type: string) => {
		loading.value = true

        const res = (await corporates_api.$_update_corporate_status(id,
            {
				active: type === 'suspend' ? 0 : 1
			}
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `Corporate has been ${type === 'suspend' ? 'suspened' : 'un-suspended'} successfully`
            })
			useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

	return { updateCorporateStatus, loading }
}
