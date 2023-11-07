import { useAlert } from '@/composables/core/notification'
import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetRentalById } from '@/composables/modules/Rentals/id'

export const useUpdateCharter = () => {
    const loading = ref(false)

    const charterStatus = ref('')
    const charterVehicleOrder = reactive([] as any[])

    const updateCharterOrder = async (rentalDetails) => {
        loading.value = true

        async function updateVehicleApi() {
            for (const value of charterVehicleOrder) {
                try {
                    const response = await rental_api.$_update_charter_order({ charter_id: rentalDetails.id, vehicle_id: value.id, cost: value.price }) as CustomAxiosResponse
                } catch (error: any) {
                    useAlert().openAlert({ type: 'ERROR', msg: error })
                }
            }
        }

        try {
            console.log(charterStatus.value)
            if (charterStatus.value === 'accepted') {
                    await updateVehicleApi()
            }

            const res = await rental_api.$_update_rental_status(rentalDetails.id, charterStatus.value) as CustomAxiosResponse
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

    return { updateCharterOrder, loading, charterStatus, charterVehicleOrder }
}
