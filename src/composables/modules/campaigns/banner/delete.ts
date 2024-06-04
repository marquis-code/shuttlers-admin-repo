import { use_get_baners } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { campaigns_api } from '@/api_factory/modules/campaigns'

const loading = ref(false)
const banner = ref()
export const useDeleteBanner = () => {
	const initDelete = (data) => {
		banner.value = data
		useConfirmationModal().openAlert({
			call_function: deleteBanner,
			desc: 'Are you sure you want to delete this Banner?',
			title: 'Delete Banner',
			loading,
			type: 'DANGER'
		})
	}
	const deleteBanner = async () => {
		loading.value = true
		const res = await campaigns_api.$_delete_banner(banner.value.id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            use_get_baners().getBaners()
			useConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Banner was deleted successfully'
			})
        }
        loading.value = false
	}

	return { initDelete, loading }
}
