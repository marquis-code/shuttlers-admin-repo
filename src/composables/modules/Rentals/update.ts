import { useAlert } from '@/composables/core/notification'
import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetRentalById } from '@/composables/modules/Rentals/id'

const selectedVehicleRental = ref({})
    const loading = ref(false)

    const charterStatus = ref('')
    const charterVehicleOrder = ref([] as any[])

export const useUpdateCharter = () => {
        const updateVehicle = (route) => {
            selectedVehicleRental.value = route
        }

    const updateCharterOrder = async (rentalDetails) => {
        loading.value = true

        try {
            const payload = {

            }

            const res = await rental_api.$_update_rental_status(rentalDetails.id, payload) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                    useGetRentalById().getRentalById(rentalDetails.id)
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Rental Request Updated' })
                loading.value = false
            }
        } catch (e) {
            loading.value = false
        }

        // const res = await rental_api.$_update_charter_order({ charter_id: null, vehicle_id: null, cost: 0 }) as CustomAxiosResponse
    }

    return { updateCharterOrder, loading, charterStatus, charterVehicleOrder, updateVehicle }
}
