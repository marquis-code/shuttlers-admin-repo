import { useUserPastBookingsById } from './past-bookings'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useUserModal } from '@/composables/core/modals'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'

const selectedTrip = ref({} as Record<string, any>)

export const useRefundPastBookings = () => {
    const loading = ref(false)

    const refundData = {
        amount: ref(''),
        description: ref('')
    }

    const intialRefund = (data) => {
        selectedTrip.value = data
        useUserModal().openUserRefund()
    }
    const refund = async () => {
        loading.value = true
        const res = await users_api.$_refund_user(selectedTrip.value.id, convertObjWithRefToObj(refundData)) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useUserModal().closeUserRefund()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund successful' })
            useUserPastBookingsById().getUserPastBookingsById(selectedTrip.value.id)
        }
        loading.value = false
    }

    return { loading, intialRefund, selectedTrip, refundData, refund }
}

export const useLogRefund = () => {
    const loading = ref(false)
    const mode = ref('CREATE') as Ref<'CREATE' | 'EDIT'>

    const refundData = {
        amount: ref(''),
        description: ref('')
    }

    const openLogRefund = (data: 'CREATE' | 'EDIT', trip) => {
        mode.value = data
        selectedTrip.value = trip
        useUserModal().openRefundLogger()
    }

    const logRefund = async (data) => {
        loading.value = true
        let res

        const sent_data = {
            user_id: selectedTrip.value.user_id,
            trip_id: selectedTrip.value.id,
            refund_value: refundData.amount.value,
            reason: refundData.description.value
        }
        if (mode.value === 'EDIT') {
            res = await users_api.$_edit_refund(selectedTrip.value.refund_log.id, sent_data) as CustomAxiosResponse
        } else {
            res = await users_api.$_create_refund(sent_data) as CustomAxiosResponse
        }

        if (res.type !== 'ERROR') {
            useUserModal().closeRefundLogger()
            if (mode.value === 'EDIT') {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund updated successful' })
            } else {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund logged successful' })
            }
            useUserPastBookingsById().getUserPastBookingsById(selectedTrip.value.id)
        }
        loading.value = false
    }

    return { loading, mode, openLogRefund, selectedTrip, logRefund, refundData }
}
