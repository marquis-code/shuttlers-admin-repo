import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCommuteModal } from '@/composables/core/modals'

export const useSetAvailability = () => {
    const processing = ref(false)
    const requestPayload = {
        cancel_user_bookings: ref(false),
        corporate_ids: ref([]),
        dates: ref([] as Record<string, any>),
        route_ids: ref([] as Record<string, any>),
        reason: ref(),
        route_type: ref(''),
        route_visibility: ref(''),
        staff_password: ref('')
    }
    const setRouteAvailabilityConfig = async () => {
		processing.value = true
		const res = await routes_api.$_set_availability_configuration(convertObjWithRefToObj(requestPayload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useCommuteModal().closeRouteAvailabilityConfig()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Route availability configuration was successfully' })
        }
        processing.value = false
	}

    const setAvailabilityPayload = (data) => {
        requestPayload.cancel_user_bookings.value = data.cancel_user_bookings
        requestPayload.corporate_ids.value = data.corporate_ids
        requestPayload.dates.value = data.dates
        requestPayload.route_ids.value = data.route_ids
        requestPayload.reason.value = data.reason
        requestPayload.route_type.value = data.route_type
        requestPayload.route_visibility.value = data.route_visibility
        requestPayload.staff_password.value = data.staff_password
    }

	return { processing, setAvailabilityPayload, setRouteAvailabilityConfig, requestPayload }
}
