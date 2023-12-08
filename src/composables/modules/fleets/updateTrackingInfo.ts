import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'
import { useVehicleModal } from '@/composables/core/modals'
const { selectedVehicle } = useVehicleIdDetails()
const updateForm = {
    tracking_id: ref(''),
    provider_name: ref(''),
    provider_description: ref('')
}

export const useUpdateTrackingInfo = () => {
    const loading = ref(false)
    const id = useRoute().params.id as string

    onMounted(() => {
        updateForm.tracking_id.value = selectedVehicle.value.tracking_id
        updateForm.provider_name.value = selectedVehicle.value.trackerProvider.name
        updateForm.provider_description.value = selectedVehicle.value.trackerProvider.description
    })
	const updateVehicleTrackingInfo = async () => {
		loading.value = true
		const res = await fleets_api.$_update_tracking(id, convertObjWithRefToObj(updateForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Tracking Information was updated successfully' })
            useVehicleModal().closeUpdateVehicleTracking()
        }
		loading.value = false
	}

	return { updateForm, loading, updateVehicleTrackingInfo }
}
