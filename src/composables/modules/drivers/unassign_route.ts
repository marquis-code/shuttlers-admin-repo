import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'
import { useDriverIdDetails } from '@/composables/modules/drivers'
const { getDriverById } = useDriverIdDetails()

const loading = ref(false)
const id = useRoute().params.id as string

export const useUnAssignRouteToDriver = () => {
  const unassignRoute = async (routeId: number) => {
    loading.value = true
    const payload = {
      route_id: routeId
    }
    const res = (await drivers_api.$_unassign_driver_to_route(Number(id), payload)) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useDriverModal().closeAssignRoute()
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Route has been unassigned successfully'
      })
      getDriverById(id)
    //   useRouter().push(`/drivers/${id}/driver-info`)
    }
    loading.value = false
  }

  return { loading, unassignRoute }
}
