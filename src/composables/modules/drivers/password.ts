import { drivers_api, trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'

const obj = {
	password: ref(''),
	confirm_password: ref('')
}
const loading = ref(false)
const clearObj = () => {
	obj.password.value = ''
	obj.confirm_password.value = ''
}

export const useDriverPassword = () => {
	const changePassword = async () => {
		const payload = {
			password: obj.password.value
		}
		loading.value = true
		const id = useRoute().params.id as string
		const res = await drivers_api.$_update_driver(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Driver password was changed successfully'
			})
			useDriverModal().closeChangeDriverPassword()
        }
        loading.value = false
	}

	return { ...obj, changePassword, loading, clearObj }
}
