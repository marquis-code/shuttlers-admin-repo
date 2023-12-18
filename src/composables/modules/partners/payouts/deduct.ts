import { Ref, ref } from 'vue'
import { usePendingPayouts } from './pending'
import { usePayoutDetails, useEarningsRevenues } from './details/fetch'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePayoutModal } from '@/composables/core/modals'

const loading = ref(false)
const obj = {
	amount: ref(null) as Ref<number|null>,
	desc: ref(''),
	yes_text: ref(''),
	total_amount: ref(null) as Ref<number|null>,
	id: ref(null) as Ref<number|null>,
	isDeductFromRevenue: ref(false)
}

const clearObj = () => {
	obj.amount.value = null
	obj.desc.value = ''
	obj.yes_text.value = ''
	obj.total_amount.value = null
	obj.id.value = null
}
const isFromDetailsPage = ref(false)

export const useDeductPayout = () => {
	const initDeduct = (_data: Record<string, any>, from_details_page = false, isRevenue = false) => {
		obj.id.value = _data.id
		obj.total_amount.value = isRevenue ? _data.finalPartnersRevenue : _data.amount
		isFromDetailsPage.value = from_details_page
		obj.isDeductFromRevenue.value = isRevenue
		usePayoutModal().openDeductPayout()
	}
	const deduct = async () => {
		const payload = {
			amount: Number(obj.amount.value),
			description: obj.desc.value
		}
		loading.value = true
		const res = await earnings_api.$_deduct_earnings(obj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deduction successful' })
			usePayoutModal().closeDeductPayout()
			if (isFromDetailsPage.value) {
				usePayoutDetails().fetchDeductions()
				usePayoutDetails().fetchEarningInfo()
			} else {
				usePendingPayouts().fetchPendingPayouts()
			}
        }
		loading.value = false
	}

	const deductRevenue = async () => {
		const payload = {
			amount: Number(obj.amount.value),
			description: obj.desc.value
		}
		loading.value = true
		const res = await earnings_api.$_deduct_revenue(obj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deduction successful' })
			usePayoutModal().closeDeductPayout()
			useEarningsRevenues().fetchRevenues()
			usePayoutDetails().fetchEarningInfo()
        }
		loading.value = false
	}

	return { loading, ...obj, clearObj, deduct, initDeduct, deductRevenue }
}
