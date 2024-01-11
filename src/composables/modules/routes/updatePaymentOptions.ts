import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'

const payload = {
    payment_options_ids: ref([] as Record<string, any>),
    route_id: ref()
}
const loading = ref(false)
export const useUpdateRoutePaymentOptions = () => {
    const updatePaymentOptions = async () => {
        loading.value = true
        const res = await routes_api.$_update_payment_options(convertObjWithRefToObj(payload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Payment Options has been updated successfully' })
        }
        loading.value = false
    }

    const populatePayload = (data) => {
        payload.route_id.value = data.route_id
        payload.payment_options_ids.value = data.payment_options_ids
    }
    return { populatePayload, updatePaymentOptions, loading }
}
