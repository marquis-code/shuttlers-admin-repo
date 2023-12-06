import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

// const driver = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useDeleteDriver = () => {
	const initDelete = () => {
		// driver.value = data
		useConfirmationModal().openAlert({
			call_function: deleteDriver,
			desc: 'Are you sure you want to delete this driver?',
			title: 'Delete driver',
			loading,
			type: 'DANGER'
		})
	}
	const deleteDriver = async () => {
		loading.value = true
		const id = useRoute().params.id as string
		const res = await drivers_api.$_delete_driver(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Driver was deleted successfully'
			})
			useRouter().push('/drivers')
        }
        loading.value = false
	}

	return { initDelete, loading }
}
