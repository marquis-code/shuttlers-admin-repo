import { ref, Ref } from 'vue'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
interface RoutePassengersPayloadInterface {
  booking_days: Ref<Record<string, any>>;
  driver_id: Ref<string>;
  itinerary_id?: Ref<number>;
}

const routePassengersPayload: RoutePassengersPayloadInterface = {
  booking_days: ref([] as Record<string, any>),
  driver_id: ref(''),
  itinerary_id: ref('') as any
}

const loadingRoutePassengers = ref(false)
const routePassengers = ref([] as any)

export const useRoutePassengers = () => {
  const getRoutePassengers = async (id: string, isCancelled = false) => {
    routePassengers.value = []
    if (!id) return
    loadingRoutePassengers.value = true
    const { itinerary_id, ...remainingPayload } = routePassengersPayload

    const computedPayload = routePassengersPayload.itinerary_id?.value ? routePassengersPayload : remainingPayload
    const res = (await routes_api.$_get_route_bookings_passengers(
      id,
      convertObjWithRefToObj(computedPayload as any),
      isCancelled
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      routePassengers.value = res?.data?.data[0]?.data
    }
    loadingRoutePassengers.value = false
  }

  const populateRoutePassengers = (data: any) => {
    routePassengersPayload.driver_id.value = data.driver_id
    routePassengersPayload.booking_days.value = data.booking_days
    if (data.itinerary_id) {
      routePassengersPayload.itinerary_id!.value = data.itinerary_id
    }
  }
  return {
    routePassengersPayload,
    loadingRoutePassengers,
    getRoutePassengers,
    routePassengers,
    populateRoutePassengers
  }
}