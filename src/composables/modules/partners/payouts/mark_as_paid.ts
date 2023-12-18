import { Ref, ref } from 'vue'
import { usePendingPayouts } from './pending'
import { usePayoutDetails } from './details/fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const data = ref({}) as Ref<Record<string, any>>
const isFromDetailsPage = ref(false)

export const useMarkAsPaid = () => {
	const initMarkAsPaid = (_data: Record<string, any>, from_details_page = false) => {
		data.value = _data
		isFromDetailsPage.value = from_details_page
		useConfirmationModal().openAlert({ call_function: markAsPaid, desc: 'Are you sure you want to mark this slip as paid?', title: 'Mark as paid', loading, type: 'DANGER' })
	}
	const markAsPaid = async () => {
		const payload = {
			partnerId: data.value.partnerId,
			earningId: data.value.id
		}
		loading.value = true
		const res = await earnings_api.$_mark_as_paid(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Mark as paid successfully' })
			if (isFromDetailsPage.value) {
				usePayoutDetails().fetchDeductions()
				usePayoutDetails().fetchEarningInfo()
			} else {
				usePendingPayouts().fetchPendingPayouts()
			}
        }
		loading.value = false
	}

	return { loading, initMarkAsPaid }
}
