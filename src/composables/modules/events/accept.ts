import { useEventIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useEventModal } from '@/composables/core/modals'

const loading = ref(false)
const feedback = ref('')
const type = ref('query') as Ref<'query'|'reject'>

export const useAcceptEvent = () => {
	const initAcceptEvent = () => {
		useConfirmationModal().openAlert({
			call_function: acceptEvent,
			desc: 'Do you want to accept this event request?',
			title: 'Accept request',
			loading,
			type: 'NORMAL'
		})
	}
	const acceptEvent = async () => {
		loading.value = true
        const eventId = useRoute().params.id as string
		const res = await events_api.$_accept_events(eventId) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Event request accepted successfully' })
			useConfirmationModal().closeAlert()
            useEventIdDetails().getEventById()
        }
        loading.value = false
	}

	return { loading, initAcceptEvent }
}

export const useQueryOrRejectEvent = () => {
    const initQueryOrReject = (_type: 'reject'|'query') => {
        type.value = _type
        useEventModal().openEventFeedback()
    }

    const queryOrRejectEvent = async () => {
        loading.value = true
        const payload = {
            eventId: useRoute().params.id as string,
            feedback: feedback.value
        }
        let res:CustomAxiosResponse
        if (type.value === 'query') {
            res = await events_api.$_query_events(payload) as CustomAxiosResponse
        } else {
            res = await events_api.$_reject_events(payload) as CustomAxiosResponse
        }

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: `Event request ${type.value === 'query' ? 'queried' : 'rejected'} successfully` })
            useEventIdDetails().getEventById()
            useEventModal().closeEventFeedback()
        }
        loading.value = false
    }

    return { initQueryOrReject, feedback, type, queryOrRejectEvent, loading }
}
