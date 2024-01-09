import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useFileDownloadFromUrl } from '@/composables/utils/downloadFile'
const { downloadFile } = useFileDownloadFromUrl()

export const useDownloadBookingReport = () => {
    const processing = ref(false)
    const requestPayload = {
      start_date: ref(''),
      routeId: ref(),
      end_date: ref('')
    }
    const downloadBookingReport = async () => {
		processing.value = true
		const res = await routes_api.$_generate_business_booking_report(Number(requestPayload.routeId.value), requestPayload.start_date.value, requestPayload.end_date.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Report was downloaded successfully' })
            downloadFile(res.data.url, 'Business Routes Manifest')
        }
        processing.value = false
	}

    const setPayload = (data) => {
        requestPayload.start_date.value = data.start_date
        requestPayload.routeId.value = data.routeId
        requestPayload.end_date.value = data.end_date
    }

	return { processing, setPayload, downloadBookingReport }
}
