import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetCorporateShuttleRequests } from '@/composables/modules/corporates/shuttleRequest'
const { selectedRequest } = useGetCorporateShuttleRequests()

export const useGetCorporateShuttleRequestsDetails = () => {
    const loading = ref(false)
    const shuttleRequestsDetails = ref({} as any)
    const { $_get_corporate_shuttle_request_by_id } = corporates_api

    const getCorporateShuttleRequestDetails = async () => {
        loading.value = true
        const res = await $_get_corporate_shuttle_request_by_id(selectedRequest.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            shuttleRequestsDetails.value = res.data.data
        }
        loading.value = false
    }

    return { getCorporateShuttleRequestDetails, loading, shuttleRequestsDetails }
}
