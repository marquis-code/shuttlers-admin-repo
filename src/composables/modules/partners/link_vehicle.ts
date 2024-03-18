import { useGetPartnersVehiclesList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const vehicles = ref([]) as Ref<Record<string, any>[]>

export const useLinkVehicle = () => {
    const linkVehicle = async () => {
        const partnerId = useRoute().params.id as string
		const payload = vehicles.value.map((el) => {
            return {
                vehicle_id: el.id,
                partner_id: partnerId
            }
        })
		loading.value = true
		const res = await partners_api.$_link_vehicles(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Vehicle linked successfully'
			})
            usePartnerModal().closeLinkVehicle()
            useGetPartnersVehiclesList().getPartnersVehiclesList()
        }
        loading.value = false
	}

    const initlinkVehicle = () => {
        useYesConfirmationModal().openAlert({
            call_function: linkVehicle,
            desc: 'If this vehicle has already been assigned to another vehicle partner, assigning the vehicle/driver to this new partner would automatically unassign the vehicle from the previous vehicle partner.',
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, vehicles, initlinkVehicle }
}
