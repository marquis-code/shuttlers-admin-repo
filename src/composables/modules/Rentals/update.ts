import { useAlert } from '@/composables/core/notification'
import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetRentalById } from '@/composables/modules/Rentals/id'
import { useCommuteModal } from '@/composables/core/modals'

const selectedVehicleRental = ref({} as Record<string, any>)
const loading = ref(false)
const charterStatus = ref('')
const charterVehicleOrder = ref([] as Record<string, any>[])

export const useUpdateCharter = () => {
    const updateVehicle = (route) => {
        selectedVehicleRental.value = route
        useCommuteModal().openUpdateVehicle()
    }

    const addVehicle = (vehicle) => {
        const pos = charterVehicleOrder.value.findIndex((item) => item.id === selectedVehicleRental.value.id)
        charterVehicleOrder.value[pos] = {
            ...charterVehicleOrder.value[pos],
            ...vehicle
        }
        console.log(charterVehicleOrder.value[pos])
        useCommuteModal().closeUpdateVehicle()
    }

    const checkMainVehicleIdExists = computed(() => {
        return charterVehicleOrder.value.every((item) => item.main_vehicle?.id)
    })

    const updateCharterOrder = async (rentalDetails) => {
        console.log(charterVehicleOrder.value)
        loading.value = true

        try {
            const payload = {
                status: charterStatus.value,
                vehicle_orders: charterVehicleOrder.value.map((item: any) => ({ id: item.id, vehicle_id: item.main_vehicle?.id, driver_id: item.main_vehicle.drivers[0]?.id, cost_of_supply: item?.cost }))
            }

            const res = await rental_api.$_update_rental_status(rentalDetails.id, payload) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                useGetRentalById().getRentalById(rentalDetails.id)
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Rental Request Updated' })
                loading.value = false
            }
        } catch (e) {
            console.log(e)
            loading.value = false
        }

        // const res = await rental_api.$_update_charter_order({ charter_id: null, vehicle_id: null, cost: 0 }) as CustomAxiosResponse
    }

    return { updateCharterOrder, loading, charterStatus, updateVehicle, selectedVehicleRental, addVehicle, charterVehicleOrder, checkMainVehicleIdExists }
}
