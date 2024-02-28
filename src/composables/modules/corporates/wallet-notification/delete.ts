import { useFetchCompaniesWalletNotification } from './fetch'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

const { getNotifications } = useFetchCompaniesWalletNotification()
const loading = ref(false)
const id = ref('')

export const useDeleteCompaniesWalletNotification = () => {
    const deleteNotification = async () => {
        loading.value = true
        const res = await corporates_api.$_delete_corporate_wallet_threshold(id.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deleted successfully' })
            useConfirmationModal().closeAlert()
            getNotifications()
        }
        loading.value = false
    }

    const initDelete = (data: Record<string, any>) => {
		id.value = data.id
		useConfirmationModal().openAlert({
			call_function: deleteNotification,
			desc: 'Are you sure you want to delete this notification?',
			title: 'Delete notification',
			loading,
			type: 'DANGER'
		})
	}

    return { loading, initDelete }
}
