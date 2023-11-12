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

const closeMarkAsRemittedModal = () => {
	date.value = []
	password.value = ''
}

export const useRemitted = () => {
	const initRemit = () => {
		// to_mark_id.value = id
		usePasswordConfirmationModal().openAlert({
			call_function: markAsRemitted,
			desc: 'The selected period would be permanently marked as remitted after confirming this action.',
			title: 'Are you sure you want to Remit charges for the selected month?',
			loading,
			type: 'NORMAL',
			password
		})
	}
	const markAsRemitted = async () => {
		const payload = {
			is_remitted: true,
			startDate: date.value[0],
			endDate: date.value[1],
			password: password.value
		}
		const res = await charges_api.$_remit_charge(to_mark_id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge marked as remitted' })
			useChargeModal().closeCreateChargeConfigurations()
        }
		loading.value = false
	}

	return { loading, closeMarkAsRemittedModal, markAsRemitted, date, initRemit, to_mark_id }
}
