// $_get_route_passengers_bookings
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRoutePassengersBookings = () => {
    const processing = ref(false)
    const requestPayload = {
      routeId: ref(),
      corporateId: ref(),
      booking_days: ref()
    }
    const bookingResult = ref([] as Record<string, any>)
    const getRoutePassengersBookings = async () => {
        const formattedBookingDays = {
            booking_days: requestPayload.booking_days.value
        }
		processing.value = true
		const res = await routes_api.$_get_route_passengers_bookings(Number(requestPayload.routeId.value), requestPayload.corporateId.value, formattedBookingDays) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            bookingResult.value = res.data.data
        }
        processing.value = false
	}

    const setBookingPassengersPayload = (data) => {
        requestPayload.routeId.value = data.routeId
        requestPayload.corporateId.value = data.corporateId
        requestPayload.booking_days.value = data.booking_days
    }

	return { processing, setBookingPassengersPayload, getRoutePassengersBookings, bookingResult }
}
