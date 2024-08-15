import { Ref, ref } from 'vue'
import moment from 'moment'
import { usePendingPayouts } from './pending'
import { usePayoutDetails, useEarningsRevenues } from './details/fetch'
import { earnings_api, CustomAxiosResponse, partners_api } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePayoutModal } from '@/composables/core/modals'

const loading = ref(false)
const partnerDeductionObj = {
	data: ref(),
	type: ref('default'),
	percentage: ref(null) as Ref<number|null>,
	amount: ref(null) as Ref<number|null>,
	desc: ref(''),
	yes_text: ref(''),
	total_amount: ref(null) as Ref<number|null>,
	id: ref(null) as Ref<number|null>,
	isDeductFromRevenue: ref(false)
}

const clearObj = () => {
	partnerDeductionObj.amount.value = null
	partnerDeductionObj.desc.value = ''
	partnerDeductionObj.yes_text.value = ''
	partnerDeductionObj.total_amount.value = null
	partnerDeductionObj.id.value = null
	partnerDeductionObj.type.value = 'default'
	partnerDeductionObj.percentage.value = null
}
const isFromDetailsPage = ref(false)
const partnerSid = ref('')

const WHT_deducted_amount = computed(() => {
	return Number((((partnerDeductionObj.percentage.value || 0) / 100) * partnerDeductionObj.data.value.netRevenue!).toFixed(2))
})

watch([partnerDeductionObj.type, partnerDeductionObj.percentage], (val) => {
	if (val[0] === 'wht') {
		partnerDeductionObj.desc.value = `WHT Deduction for ${moment(partnerDeductionObj.data.value.referenceTime).format('MMMM, YYYY')}`
	} else {
		partnerDeductionObj.desc.value = ''
	}
	if (val[1]) {
		partnerDeductionObj.amount.value = WHT_deducted_amount.value
	} else {
		partnerDeductionObj.amount.value = 0
	}
})

export const useDeductPayout = () => {
	const initDeduct = (_data: Record<string, any>, from_details_page = false, isRevenue = false) => {
		partnerSid.value = _data?.account_sid || ''
		partnerDeductionObj.data.value = _data.earningInfo
		partnerDeductionObj.id.value = _data.id
		partnerDeductionObj.total_amount.value = isRevenue ? _data.finalPartnersRevenue : _data.amount
		isFromDetailsPage.value = from_details_page
		partnerDeductionObj.isDeductFromRevenue.value = isRevenue
		usePayoutModal().openDeductPayout()
	}
	const deduct = async () => {
		const payload = {
			amount: Number(partnerDeductionObj.amount.value),
			description: partnerDeductionObj.desc.value
		}
		const wthPayload = {
			withholdingTax: partnerDeductionObj.percentage.value
		}
		loading.value = true
		let res: CustomAxiosResponse
		if (partnerDeductionObj.type.value === 'default') {
			res = await earnings_api.$_deduct_earnings(partnerDeductionObj.id.value!, payload) as CustomAxiosResponse
		} else {
			if (!partnerSid.value) {
				useAlert().openAlert({
					type: 'ERROR',
					msg: 'Partner id is required'
				})
				return
			}
			res = await partners_api.$_set_earning_cycle(partnerSid.value, wthPayload) as CustomAxiosResponse
		}
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deduction successful' })
			usePayoutModal().closeDeductPayout()
			if (isFromDetailsPage.value) {
				useEarningsRevenues().fetchRevenues()
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
			amount: Number(partnerDeductionObj.amount.value),
			description: partnerDeductionObj.desc.value
		}
		loading.value = true
		const res = await earnings_api.$_deduct_revenue(partnerDeductionObj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deduction successful' })
			usePayoutModal().closeDeductPayout()
			useEarningsRevenues().fetchRevenues()
			usePayoutDetails().fetchEarningInfo()
			usePayoutDetails().fetchDeductions()
        }
		loading.value = false
	}

	return { loading, partnerDeductionObj, clearObj, deduct, initDeduct, deductRevenue, WHT_deducted_amount }
}
