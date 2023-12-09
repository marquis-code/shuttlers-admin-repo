import { ref, Ref, watch, computed } from 'vue'
import { useFetchConfiguredCharges } from './fetch'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useChargeModal } from '@/composables/core/modals'
import { usePasswordConfirmationModal } from '@/composables/core/confirmation'

const loading = ref(false)
const date = ref([])
const password = ref('')
const to_mark_id = ref(null) as Ref<number|null>
const totalCharge = ref(null)
const loading_total = ref(false)

const closeMarkAsRemittedModal = () => {
	date.value = []
	password.value = ''
	totalCharge.value = null
}

export const useRemitted = () => {
	const initRemit = () => {
		// to_mark_id.value = id
		usePasswordConfirmationModal().openAlert({
			call_function: markAsRemitted,
			desc: 'The selected period would be permanently marked as remitted after confirming this action.',
			title: 'Are you sure you want to Remit charges for the selected period?',
			loading,
			type: 'NORMAL',
			password
		})
	}
	const markAsRemitted = async () => {
		const payload = {
			start_date: date.value[0],
			end_date: date.value[1],
			password: password.value
		}
		const id = useRoute().params.id as string
		const res = await charges_api.$_remit_charge(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge marked as remitted' })
			useChargeModal().closeRemitCharge()
			usePasswordConfirmationModal().closeAlert()
        }
		loading.value = false
	}
	const getTotalCharges = async () => {
		const id = useRoute().params.id as string
		loading_total.value = true
		totalCharge.value = null
		const res = await charges_api.$_get_total_charges(Number(id), date.value, 'all') as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			totalCharge.value = res.data
        }
		loading_total.value = false
	}
	watch(date, () => {
		getTotalCharges()
	})

	return { loading, closeMarkAsRemittedModal, markAsRemitted, date, initRemit, to_mark_id, getTotalCharges, loading_total, totalCharge }
}
