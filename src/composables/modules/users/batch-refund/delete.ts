import { useGetBatchRefundList } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const deleteRefundId = ref('')

export const useDeleteRefund = () => {
    const { $_delete_refund } = users_api

	const loading = ref(false)
	const setDeleteRefundId = (id: string) => {
		deleteRefundId.value = id
		// useRefundModal().openDeleteRefund()
		useConfirmationModal().openAlert({ call_functuon: deleteRefund, desc: 'Are you sure you want to remove this refund from the refund log?', title: 'Delete trip log', loading, type: 'DANGER' })
	}
	const deleteRefund = async () => {
		loading.value = true
        const res = await $_delete_refund(deleteRefundId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            await useGetBatchRefundList().getBatchRefundList()
            useConfirmationModal().closeAlert()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund Deleted successfully' })
        }
        loading.value = false
	}
	return { loading, deleteRefund, setDeleteRefundId }
}
