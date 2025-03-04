import { useAlert } from '@/composables/core/notification'
import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetRentalById } from '@/composables/modules/Rentals/id'
import { useCommuteModal, useRouteModal } from '@/composables/core/modals'

const selectedVehicleRental = ref({} as Record<string, any>)
const loading = ref(false)
const charterStatus = ref('')
const rejection_reason = ref('')
const charterVehicleOrder = ref([] as Record<string, any>[])
const globalRentalDetails = ref({} as Record<string, any>)

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
        useCommuteModal().closeUpdateVehicle()
    }

    const checkMainVehicleIdExists = computed(() => {
        return charterVehicleOrder.value.every((item) => item.main_vehicle?.id)
    })
    const checkMainVehicleDriverExists = computed(() => {
        return charterVehicleOrder.value.every((item) => item.main_vehicle?.driver?.id)
    })

    const updateCharterOrder = async (rentalDetails = globalRentalDetails.value) => {
        loading.value = true
        const payload = ref({} as Record<string, any>)

        try {
            if (charterStatus.value === 'rejected') {
                payload.value = {
                    status: charterStatus.value,
                    reason: rejection_reason.value
                }
            } else if (checkMainVehicleDriverExists) {
                        payload.value = {
                status: charterStatus.value,
                            vehicle_orders: charterVehicleOrder.value.map((item: any) => ({ id: item.id, vehicle_id: item.main_vehicle?.id, driver_id: item.main_vehicle?.driver?.id, cost_of_supply: item?.cost_of_supply, margin: item?.margin }))
                                // .filter((item: any) => item.vehicle_id && item.driver_id)
                        }
                } else {
                    useAlert().openAlert({ type: 'ERROR', msg: 'Please select driver for all vehicles' })
                    loading.value = false
                    return
            }
            if (payload.value?.vehicle_orders?.length === 0 && rentalDetails.status === 'accepted') {
                useAlert().openAlert({ type: 'ERROR', msg: 'No change has been made to the Vehicle or price by you' })
                loading.value = false
                return
            }
            if (rentalDetails.status === 'rejected' || rentalDetails.status === 'accepted') {
                delete payload.value.status
            }
            if (!payload.value.status) {
                payload.value.status = 'draft'
            }

            const res = await rental_api.$_update_rental_status(rentalDetails.id, payload.value) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                useGetRentalById().getRentalById(rentalDetails.id)
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Rental Request Updated' })
                loading.value = false
            }
            useRouteModal().closeRejectRental()
            loading.value = false
        } catch (e:any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message || 'Something went wrong' })
            loading.value = false
        }

        // const res = await rental_api.$_update_charter_order({ charter_id: null, vehicle_id: null, cost: 0 }) as CustomAxiosResponse
    }

    return { updateCharterOrder, rejection_reason, loading, charterStatus, updateVehicle, selectedVehicleRental, addVehicle, charterVehicleOrder, checkMainVehicleIdExists, globalRentalDetails }
}
