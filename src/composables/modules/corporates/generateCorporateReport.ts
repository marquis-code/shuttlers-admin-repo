import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
import { useAlert } from '@/composables/core/notification'
const { selectedRoute } = useRouteIdDetails()
const processing = ref(false)
const requestPayload = {
  corporateId: ref(''),
  routeId: ref(selectedRoute.value.id),
  monthId: ref('')
}

export const useGenerateBusinessBookingReport = () => {
	const generateBusinessBookingReport = async () => {
		processing.value = true
		const res = await corporates_api.$_generate_business_booking_report(requestPayload.corporateId.value, requestPayload.routeId.value, requestPayload.monthId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'ERROR', msg: 'Download error: We could not process download for this report' })
        }
        processing.value = false
	}

    const setRequestPayload = (data) => {
        requestPayload.corporateId.value = data.corporateId
        requestPayload.monthId.value = data.monthId
    }

	return { processing, setRequestPayload, generateBusinessBookingReport }
}
