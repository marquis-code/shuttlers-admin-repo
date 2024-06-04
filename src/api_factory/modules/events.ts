import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const events_api = {
	$_get_events: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/event/admin/events?metadata=true&page=${metaObject.page.value}&size=${metaObject.page_size.value}&related=itineraries&${queryParams}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_get_event_attendees: (eventId, metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/event/${eventId}/attendee?metadata=true&page=${metaObject.page.value}&size=${metaObject.page_size.value}&related=itineraries&${queryParams}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_create_event: (credentials: any) => {
        const url = '/event/create'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, credentials)
    },
	$_get_events_by_id: (id:string) => {
		const url = `/event/admin/events/${id}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_accept_events: (event_id:string) => {
		const url = '/event/admin/event/accept'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, { eventId: event_id })
	},
	$_reject_events: (payload:{eventId: string;feedback:string}) => {
		const url = '/event/admin/event/reject'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_cancel_events: (payload:{eventId: string;feedback:string}) => {
		const url = '/event/admin/event/cancel'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_query_events: (payload:{eventId: string;feedback:string}) => {
		const url = '/event/admin/event/query'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_add_routes_to_events: (event_id:string, payload:{routes: Record<string, any>[]}) => {
		const url = `/event/events/${event_id}/routes`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
	},
	$_get_event_routes: (event_id:string) => {
		const url = `/event/events/${event_id}/routes`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_notify_organizer: (event_id:string) => {
		const url = `/event/admin/events/${event_id}/notify-organizer`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url)
	},
	$_notify_attendees: (event_id:string) => {
		const url = `/event/${event_id}/attendees/notify`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url)
	}
}
