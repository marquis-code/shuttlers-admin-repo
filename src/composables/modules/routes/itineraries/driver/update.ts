import { useItineraryDrivers } from './fetch'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'
import { useAddDriver } from '@/composables/modules/routes/itineraries/driver/create'

const { driverExportItems } = useAddDriver()
export const useUpdateDriver = () => {
  const editObj = ref({}) as any
  const updateDriver = async () => {
    const routeId = useRoute().params.id as string
    const iti_id = useRoute().params.iti_id as string
    useItineraryDrivers().getItineraryDrivers()
    const payload: Record<string, any> = {
      cost_of_supply: editObj.value.cost_of_supply
    }
    if (
      driverExportItems().singleItinerary.value.pricing_type !==
      'route_price_table_lookup'
    ) {
      payload.break_even_utilization = editObj.value.break_even
      payload.pricing_margin_unit = editObj.value.pricing_unit
      payload.pricing_margin = editObj.value.pricing_margin
      payload.driver_id = editObj.value.driver.id
      payload.vehicle_id = editObj.value.vehicle.id
    }
    driverExportItems().loading.value = true
    const res = (await drivers_api.$_update_assigned_driver_to_route(
      Number(editObj.value.id),
      payload
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useDriverModal().closeAddDriver()
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Driver updated successfully'
      })
      useItineraryDrivers().getItineraryDrivers()
    }
    driverExportItems().loading.value = false
  }

  const populateUpdateFields = (data: any) => {
    editObj.value = data
  }

  return {
    updateDriver,
    populateUpdateFields
    // vehicle
  }
}
