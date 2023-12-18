import { Ref, ref } from 'vue'
import { usePayoutDetails, useEarningsRevenues } from './fetch'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePayoutModal } from '@/composables/core/modals'

const loading = ref(false)
const data = ref({}) as Ref<Record<string, any>>
const dateRange = ref([])

export const useMarkRevenueAsPaid = () => {
	const initMarkRevenueAsPaid = (_data: Record<string, any>, isMultiple = false) => {
		data.value = _data
		if (isMultiple) {
			usePayoutModal().openMarkMultipleAsPaid()
			return
		}
		useYesConfirmationModal().openAlert({ call_function: markRevenueAsPaid, desc: 'Are you sure you want to mark this revenue as paid?', title: 'Mark as paid', loading, type: 'DANGER' })
	}
	const markRevenueAsPaid = async () => {
		const payload = {
			partnerId: data.value.partnerId,
			earningId: data.value.accruedEarningsId,
			revenueIds: [data.value.id]
		}
		loading.value = true
		const res = await earnings_api.$_mark_as_paid(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Revenue Marked as paid successfully' })
			useEarningsRevenues().fetchRevenues()
        }
		loading.value = false
	}

	const markMultipleRevenueAsPaid = async () => {
		const payload = {
			partnerId: data.value.partnerId,
			earningId: data.value.accruedEarningsId,
			startDate: dateRange.value[0],
			endDate: dateRange.value[1]
		}
		loading.value = true
		const res = await earnings_api.$_mark_as_paid(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			usePayoutModal().closeMarkMultipleAsPaid()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Revenues Marked as paid successfully' })
			useEarningsRevenues().fetchRevenues()
        }
		loading.value = false
	}

	return { loading, initMarkRevenueAsPaid, dateRange, markMultipleRevenueAsPaid }
}
