import { drivers_api, trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'

const obj = {
	imageUri: ref('')
}
const loading = ref(false)
const clearObj = () => {
	obj.imageUri.value = ''
}

export const useDriverPicture = () => {
	const changePicture = async () => {
		const payload = {
			avatar: obj.imageUri.value
		}
		loading.value = true
		const id = useRoute().params.id as string
		const res = await drivers_api.$_update_driver(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Driver profile picture was changed successfully'
			})
			// useDriverModal().closeChangeDriverPassword()
        }
        loading.value = false
	}

	return { ...obj, changePicture, loading, clearObj }
}
