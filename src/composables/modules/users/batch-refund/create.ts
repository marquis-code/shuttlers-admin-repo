import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/useNotification'
import { useUserPastBookings } from '@/composables/modules/users/past-bookings'

export const useLogBatchRefund = () => {
    const loading = ref(false)

    const logRefundData = {
        user: ref(),
        user_id: ref(),
        trip_id: ref(),
        refund_value: ref(),
        reason: ref()
    }
    const { getUserPastBookingsById, pastBookingsList, loading: pastBookingsLoading } = useUserPastBookings()
    watch(logRefundData.user, (newVal:any) => {
        if (newVal) {
            getUserPastBookingsById(newVal.id)
            logRefundData.user_id.value = logRefundData.user.value?.id
        }
     })

    const { $_create_refund } = users_api

    const logBatchRefund = async () => {
        loading.value = true

        const res = await $_create_refund(
            Object.fromEntries(
                Object.entries(logRefundData).map(([key, value]) => [key, value.value])
            )

        ) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund logged successfully' })
        }
        loading.value = false
    }

    return { logBatchRefund, loading, logRefundData, pastBookingsList }
}
