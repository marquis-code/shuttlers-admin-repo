import { useConfirmationModal } from '@/composables/core/confirmation'
import { promotions_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

// const code = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useDeletePromo = () => {
	const initDelete = () => {
		// code.value = data
		useConfirmationModal().openAlert({
			call_function: deletecode,
			desc: 'Are you sure you want to delete this code?',
			title: 'Delete code',
			loading,
			type: 'DANGER'
		})
	}
	const deletecode = async () => {
		loading.value = true
		const id = useRoute().params.id as string
		const res = await promotions_api.$_delete_promotions_by_id(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'code was deleted successfully'
			})
			useRouter().push('/promotion')
        }
        loading.value = false
	}

	return { initDelete, loading }
}
