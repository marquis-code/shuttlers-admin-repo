import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUpdateCharter = () => {
        const loading = ref(false)
    const rentalDetails = ref({} as Record<string, any>)

    const charterStatus = ref('')

    const updateCharterOrder = async (vehicleArray: Record<string, any>[]) => {
        loading.value = true
        const res = await rental_api.$_update_charter_order({ charter_id: null, vehicle_id: null, cost: 0 }) as CustomAxiosResponse
        const res2 = await rental_api.$_update_rental_status('id', charterStatus.value) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            rentalDetails.value = res.data
        }
        loading.value = false
    }

    return { updateCharterOrder, loading, rentalDetails, charterStatus }
}
