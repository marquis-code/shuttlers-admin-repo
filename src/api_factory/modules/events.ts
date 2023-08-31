import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'

export const events_api = {
	$_get_events: () => {
		const url = '/event/admin/events?metadata=true&page=1&size=10&related=itineraries'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},

    $_get_upcoming_events: () => {
		const url = '/event/admin/events?metadata=true&page=1&size=10&related=itineraries&status=accepted'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
