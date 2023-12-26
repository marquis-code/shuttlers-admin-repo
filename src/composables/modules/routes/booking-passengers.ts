import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

const routePassengersPayload = {
    booking_days: ref([] as Record<string, any>),
    driver_id: ref()
}

const loadingRoutePassengers = ref(false)
const routePassengers = ref([] as any)

export const useRoutePassengers = () => {
    const getRoutePassengers = async (id: string) => {
        if (!id) return
        loadingRoutePassengers.value = true
        const res = await routes_api.$_get_route_bookings_passengers(id, convertObjWithRefToObj(routePassengersPayload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            routePassengers.value = res?.data?.data[0]?.data
        }
        loadingRoutePassengers.value = false
    }

    const populateRoutePassengers = (data) => {
        routePassengersPayload.driver_id.value = data.driver_id
        routePassengersPayload.booking_days.value = data.booking_days
    }
    return { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers }
}
