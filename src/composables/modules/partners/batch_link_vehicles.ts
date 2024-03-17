import { useGetPartnersVehiclesList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const plate_numbers = ref([]) as Ref<string[]>
const plate_no_errors = ref([]) as Ref<Record<string, any>[]>

const clearObj = () => {
    plate_numbers.value = []
    plate_no_errors.value = []
}

export const usePlateNumberToLinkVehicle = () => {
    const linkVehicleWithPlateNumber = async () => {
        const partnerId = useRoute().params.id as string
		const payload = plate_numbers.value.map((el) => {
            return {
                vehicle_id: el,
                partner_id: partnerId
            }
        })
		loading.value = true
		const res = await partners_api.$_link_vehicles(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            if (res?.data?.errors?.length) {
                useAlert().openAlert({ type: 'ERROR', msg: 'Some plate numbers not found' })
                plate_no_errors.value = res?.data?.errors
            } else {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicles linked successfully' })
                usePartnerModal().closeBatchLinkVehicle()
                useGetPartnersVehiclesList().getPartnersVehiclesList()
            }
        }
        loading.value = false
	}

    const initlinkVehicleWithPlateNumber = () => {
        useYesConfirmationModal().openAlert({
            call_function: linkVehicleWithPlateNumber,
            desc: 'If this vehicle has already been assigned to another vehicle partner, assigning the vehicle/driver to this new partner would automatically unassign the vehicle from the previous vehicle partner.',
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, plate_no_errors, plate_numbers, initlinkVehicleWithPlateNumber, clearObj }
}
