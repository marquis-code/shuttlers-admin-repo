import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useUserPastBookings } from '@/composables/modules/users/past-bookings'
import { useConfirmationModal, usePasswordConfirmationModal } from '@/composables/core/confirmation'

export const useLogBatchRefund = () => {
    const loading = ref(false)
    const selectedUser = ref()

    const logRefundData = {
        user_id: ref(),
        trip_id: ref(),
        refund_value: ref(),
        reason: ref()
    }
    const { getUserPastBookings, pastBookingsList, loading: pastBookingsLoading, filterData } = useUserPastBookings()
    watch(selectedUser, async (newVal:any) => {
        if (newVal) {
            filterData.status.value = 'COMPLETED'
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

export const useProcessBatchRefund = () => {
    const loading = ref(false)
    const log_ids = ref([] as Record<string, any>[])
    const { $_process_refund } = users_api

    const getConfirmation = (id: string) => {
		useConfirmationModal().openAlert({ call_functuon: getPasswordConfirmation, desc: `Are you sure you want to process the selected refund of (${log_ids.value.length}) trips`, title: 'Refund Comfirmation', loading, type: 'NORMAL' })
    }

    const getPasswordConfirmation = () => {
        useConfirmationModal().closeAlert()
        usePasswordConfirmationModal().openAlert({ call_functuon: processBatchRefund, desc: 'Please enter your password to confirm', title: 'Password Comfirmation', loading, type: 'NORMAL' })
    }

    const processBatchRefund = async () => {
        loading.value = true
        const res = await $_process_refund(log_ids.value.map((i) => i.id)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund processed successfully' })
            usePasswordConfirmationModal().closeAlert()
        }
        loading.value = false
    }
    const formattedName = (object: Record<string, any>) => {
        return object.name
    }

    return { processBatchRefund, loading, log_ids, formattedName, getConfirmation }
}
