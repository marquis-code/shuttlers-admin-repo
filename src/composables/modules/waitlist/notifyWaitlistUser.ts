import { waitlist_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
export const useNotifyWaitlistUser = () => {
    const processing = ref(false)
    const notifyWaitlistUser = async (notificationId) => {
        processing.value = true
        const res = await waitlist_api.$_notify_waitlist_itinerary_user(notificationId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useConfirmationModal().closeAlert()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'User has been notified successfully' })
        }
        processing.value = false
    }

    return { notifyWaitlistUser, processing }
}
