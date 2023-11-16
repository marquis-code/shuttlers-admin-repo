import { ref, Ref } from 'vue'
import { useFetchConfiguredCharges } from './fetch'
import { usePasswordConfirmationModal } from '@/composables/core/confirmation'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const password = ref('')
const id = ref(null) as Ref<number|null>
const activation_status = ref(false)
const { fetchConfiguredCharges } = useFetchConfiguredCharges()

export const useActivateConfiguration = () => {
	const intiActivate = (_id:number, status: boolean) => {
		password.value = ''
		activation_status.value = status
		id.value = _id
		usePasswordConfirmationModal().openAlert({
			call_function: activateConfiguredCharge,
			desc: 'The charge will immediately apply to all routes bookings in the selected country/cities.',
			title: `Are you sure you want to ${status ? 'activate' : 'deactivate'} this charge?`,
			loading,
			type: 'NORMAL',
			password
		})
	}
	const activateConfiguredCharge = async () => {
		loading.value = true
		const payload = {
			activate: activation_status.value,
			password: password.value
		}
		const res = await charges_api.$_activate_config(id.value!, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			usePasswordConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: `Configuration ${activation_status.value ? 'activated' : 'deactivated'} successfully` })
			fetchConfiguredCharges()
        }
		loading.value = false
	}

	return { loading, intiActivate, password }
}
