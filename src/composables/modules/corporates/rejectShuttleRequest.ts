import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useGetCorporateShuttleRequests } from '@/composables/modules/corporates/shuttleRequest'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedRequest } = useGetCorporateShuttleRequests()

const rejectionPayload = {
    status: ref(''),
    rejection_reason: ref('')
}

export const useRejectShuttleRequest = () => {
    const loading = ref(false)
    const { $_update_shuttle_request_status } = corporates_api

    const rejectShuttleRequest = async () => {
        loading.value = true
        const res = await $_update_shuttle_request_status(selectedRequest.value.id, convertObjWithRefToObj(rejectionPayload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Shuttle request has been rejected successfully' })
            useCompaniesModal().closeRejectShuttleRequest()
        }
        loading.value = false
    }

    const populateRejectionForm = (data) => {
        rejectionPayload.status.value = data.status
        rejectionPayload.rejection_reason.value = data.rejection_reason
    }

    return { rejectShuttleRequest, loading, populateRejectionForm }
}
