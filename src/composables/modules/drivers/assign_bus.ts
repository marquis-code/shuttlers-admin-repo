import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const selectedVehicle = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useAssignBus = () => {
	const assignBus = async () => {
		loading.value = true
		const id = useRoute().params.id as string
		const payload = {
			vehicle_id: selectedVehicle.value?.id
		}
		const res = await drivers_api.$_update_driver(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicle assigned to driver successfully' })
			useRouter().push(`/drivers/${res.data.id}/driver-info`)
        }
		loading.value = false
	}

	return { selectedVehicle, loading, assignBus }
}
