import { ref, Ref } from 'vue'
import { useItineraryDrivers } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const driver_id = ref(null) as Ref<number|null>

export const useDeleteDriverFromItinerary = () => {
	const initDelete = (driverId:number) => {
		if (!driverId) {
			useAlert().openAlert({ type: 'ERROR', msg: 'Driver id is required' })
			return
		}
		driver_id.value = driverId
		useConfirmationModal().openAlert({ call_function: deleteDriver, desc: 'Are you sure you want to delete this driver?', title: 'Delete driver from itinerary', loading, type: 'DANGER' })
	}
	const deleteDriver = async () => {
		const routeId = useRoute().params.id as string
		const iti_id = useRoute().params.iti_id as string
		const payload:Record<string, any> = {
			data: {
				route_id: routeId,
				itinerary_id: iti_id
			}
		}
		loading.value = true
		const res = await drivers_api.$_delete_driver_from_itinerary(driver_id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Driver removed successfully' })
			useItineraryDrivers().getItineraryDrivers()
        }
		loading.value = false
	}

	return { loading, initDelete }
}
