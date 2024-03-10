import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import {
  obj,
  clearObj,
  activeRoute,
  legTotalDurationValue,
  legTotalDurationText,
  legTotalDistanceValue,
  legTotalDistanceText,
  all_days
} from '@/composables/modules/routes/createRoute'

export const useUpdateRoute = () => {
  const loading = ref(false)
  const updateRoute = async () => {
    loading.value = true
    const payload: Record<string, any> = {
      pickup: obj.pickup.value,
      destination: obj.destination.value,
      day_of_week: 'MON - FRI',
      visibility: obj.visibility.value,
      corporate_id: obj.corporate.value?.id || null,
      is_future_route: obj.is_future_route.value,
      is_exclusive: obj.is_exclusive.value === 'exclusive' ? 1 : 0,
      route_code: obj.route_code.value,
      info: {
        description: obj.desc.value
      },
      route_preview: JSON.parse(activeRoute.value.overview_geojson),
      bounds: activeRoute.value.bounds,
      duration_value: legTotalDurationValue.value,
      distance_value: legTotalDistanceValue.value,
      duration: legTotalDurationText.value,
      distance: legTotalDistanceText.value,
      start_location: {
        lat: obj.startLocation.value?.lat,
        lng: obj.startLocation.value?.lng
      },
      end_location: {
        lat: obj.endLocation.value?.lat,
        lng: obj.endLocation.value?.lng
      },
      route_availability_end_date: obj.avail_end_date.value,
      route_availability_start_date: obj.avail_start_date.value,
      blacklisted_availability_days: obj.unavailable_days.value,
      owner_type: obj.route_owner_type.value,
      owner_id: obj.route_owner.value?.id || obj.route_owner.value?.id,
      payer: obj.who_pays.value,
      payment_mode: obj.payment_mode.value,
      status: obj.status.value === 'active' ? 1 : 0
    }
    if (obj.route_availability.value === 'everyday') {
      payload.route_availability_days = all_days
    } else {
      payload.route_availability_days = obj.route_availability_days.value
    }
    const id = useRoute().params.id as string
    const res = (await routes_api.$_update_route(
      id,
      payload
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Route was updated successfully'
      })
      if (res.data?.id)
        useRouter().push(`/trips/routes/${res.data?.id}/details`)
      clearObj()
    }
    loading.value = false
  }

  return { updateRoute }
}
