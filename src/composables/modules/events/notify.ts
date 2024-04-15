import { useEventIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const type = ref('organizer') as Ref<'organizer'|'attendees'>
const { event_routes } = useEventIdDetails()

export const useNotifyEvent = () => {
	const initNotifyEvent = (_type: 'organizer'|'attendees') => {
        if (_type === 'attendees' && !event_routes.value?.length) {
            useAlert().openAlert({ type: 'WARNING', msg: 'No routes assigned' })
            return
        }
        type.value = _type
		useConfirmationModal().openAlert({
			call_function: sendNotification,
			desc: `Do you want to notify ${type.value === 'organizer' ? 'organizer' : 'all attendees'} that routes are available?`,
			title: `Notify ${type.value}`,
			loading,
			type: 'NORMAL'
		})
	}
	const sendNotification = async () => {
		loading.value = true
        const eventId = useRoute().params.id as string
        let res:CustomAxiosResponse
        if (type.value === 'organizer') {
            res = await events_api.$_notify_organizer(eventId) as CustomAxiosResponse
        } else {
            res = await events_api.$_notify_attendees(eventId) as CustomAxiosResponse
        }

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: res?.data?.message || 'Notification sent successfully' })
			useConfirmationModal().closeAlert()
        }
        loading.value = false
	}

	return { loading, initNotifyEvent }
}
