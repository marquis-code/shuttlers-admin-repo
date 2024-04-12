import { useGetPartnersVehiclesList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { vehicles_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const vehicle_id = ref(null) as Ref<null|number>

export const useUnlinkVehicle = () => {
    const unlinkVehicle = async () => {
		const payload = {
            partner_id: null
        }
		loading.value = true
		const res = await vehicles_api.$_update_vehicle(vehicle_id.value!, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Vehicle unlinked successfully'
			})
            useGetPartnersVehiclesList().getPartnersVehiclesList()
        }
        loading.value = false
	}

    const initUnlinkVehicle = (vehicleId:number) => {
        vehicle_id.value = vehicleId
        useYesConfirmationModal().openAlert({
            call_function: unlinkVehicle,
            desc: 'Un-assigning a vehicle from a vehicle partner will delete the vehicle’s record from the partner’s vehicle list.',
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, initUnlinkVehicle }
}
