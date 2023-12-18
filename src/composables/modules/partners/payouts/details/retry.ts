import { ref } from 'vue'
import { usePayoutDetails } from './fetch'
import { usePasswordConfirmationModal } from '@/composables/core/confirmation'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const password = ref('')
const { partnerInfo } = usePayoutDetails()

export const useRetry = () => {
	const initRetry = () => {
		usePasswordConfirmationModal().openAlert({
			call_function: retry,
			desc: 'You are about to to retry payout for this vehicle partner. Are you sure that the information is correct and accurate?',
			title: 'Retry payout',
			loading,
			password,
			type: 'DANGER'
		})
	}
	const retry = async () => {
		const payload = {
			password: password.value
		}
		loading.value = true
		const earningId = useRoute().params.earningId as string
		const res = await earnings_api.$_retry_approve_revenue(partnerInfo.value.account_sid, earningId, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			usePasswordConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'You have successfully approved payouts for this partner.' })
			usePayoutDetails().fetchEarningInfo()
        }
		loading.value = false
	}

	return { loading, initRetry, password }
}
