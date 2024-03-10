import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { populateFields } from '@/composables/modules/routes/createRoute'
export const useGetRouteDetailsToPrefillFields = () => {
    const loading_details = ref(false)
  const getRouteDetailsToPrefillFields = async (routeId: string | number) => {
    loading_details.value = true
    const res = (await routes_api.$_get_route_by_id(
      routeId
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      if (res?.data?.id) {
        populateFields(res.data)
      } else {
        useAlert().openAlert({
          type: 'WARNING',
          msg: 'Unable to fetch route details'
        })
      }
    }
    loading_details.value = false
  }

  return { getRouteDetailsToPrefillFields, loading_details }
}
