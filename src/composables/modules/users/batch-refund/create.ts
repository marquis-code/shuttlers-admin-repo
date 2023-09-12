import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useUserPastBookings } from '@/composables/modules/users/past-bookings'

export const useLogBatchRefund = () => {
    const loading = ref(false)
    const selectedUser = ref()

    const logRefundData = {
        user_id: ref(),
        trip_id: ref(),
        refund_value: ref(),
        reason: ref()
    }
    const { getUserPastBookings, pastBookingsList, loading: pastBookingsLoading } = useUserPastBookings()
    watch(selectedUser, async (newVal:any) => {
        if (newVal) {
            await getUserPastBookings(newVal.id)
            if (pastBookingsList.value.length === 0) return useAlert().openAlert({ type: 'ERROR', msg: 'No past bookings found for this user' })
            logRefundData.user_id.value = selectedUser.value?.id
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
            useRouter().push('/users/batch-refund')
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund logged successfully' })
        }
        loading.value = false
    }

    return { logBatchRefund, loading, logRefundData, pastBookingsList, selectedUser }
}
