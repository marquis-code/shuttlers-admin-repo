// $_update_shuttle_request_status

import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
const selectedRequest = ref({} as any)

const acceptPayload = {
    status: ref('active')
}

export const useAcceptShuttleRequest = () => {
    const loading = ref(false)
    const { $_update_shuttle_request_status } = corporates_api

    const acceptShuttleRequest = async (id) => {
        loading.value = true
        const res = await $_update_shuttle_request_status(id, convertObjWithRefToObj(acceptPayload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Shuttle request has been accepted successfully' })
            useCompaniesModal().closeRejectShuttleRequest()
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { acceptShuttleRequest, loading }
}
